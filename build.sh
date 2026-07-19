#!/usr/bin/env bash
set -euo pipefail
shopt -s nullglob

source utils.sh
echo '{}' >"$BUILD_JSON_FILE"


if [ "${1-}" = "clean" ]; then
  rm -r "$TEMP_DIR" "$BUILD_DIR" build.md
  exit 0
fi


trap "abort" INT

bcversion=$(curl -fsSL https://repo1.maven.org/maven2/org/bouncycastle/bcprov-jdk18on/maven-metadata.xml | grep -oPm1 '(?<=<release>)[^<]+')
pr "Downloading Bouncy Castle Provider"
mkdir -p temp
wget -qO temp/bcprov.jar "https://repo1.maven.org/maven2/org/bouncycastle/bcprov-jdk18on/$bcversion/bcprov-jdk18on-$bcversion.jar"
LAST_PROV=$(grep "^security.provider\." "$JAVA_HOME/conf/security/java.security" | grep -oP '(?<=security\.provider\.)\d+' | sort -n | tail -1)
echo "security.provider.$((LAST_PROV + 1))=org.bouncycastle.jce.provider.BouncyCastleProvider" >temp/bc.security
pr "Downloading APKEditor"
wget -q $(gh api repos/REAndroid/APKEditor/releases/latest | jq -r '.assets[0].browser_download_url') -O ./temp/apkeditor.jar

jq --version >/dev/null || abort "\`jq\` is not installed. install it with 'apt install jq' or equivalent"
java --version >/dev/null || abort "\`openjdk 17\` is not installed. install it with 'apt install openjdk-17-jre' or equivalent"
zip --version >/dev/null || abort "\`zip\` is not installed. install it with 'apt install zip' or equivalent"

set_prebuilts

vtf() { if ! isoneof "${1}" "true" "false"; then abort "ERROR: '${1}' is not a valid option for '${2}': only true or false is allowed"; fi; }

# -- Main config --
toml_prep "${1:-config.toml}" || abort "could not find config file '${1:-config.toml}'\n\tUsage: $0 <config.toml>"
main_config_t=$(toml_get_table_main)
COMPRESSION_LEVEL=$(toml_get "$main_config_t" compression-level) || COMPRESSION_LEVEL="9"
if [[ $(toml_get "$main_config_t" parallel-jobs) == "nproc" ]]; then
  PARALLEL_JOBS=$(nproc)
elif [[ $(toml_get "$main_config_t" parallel-jobs) ]]; then
  PARALLEL_JOBS=$(toml_get "$main_config_t" parallel-jobs)
else
  PARALLEL_JOBS=1
fi
REMOVE_RV_INTEGRATIONS_CHECKS=$(toml_get "$main_config_t" remove-rv-integrations-checks) || REMOVE_RV_INTEGRATIONS_CHECKS="false"
DEF_PATCHES_VER=$(toml_get "$main_config_t" patches-version) || DEF_PATCHES_VER="latest"
DEF_CLI_VER=$(toml_get "$main_config_t" cli-version) || DEF_CLI_VER="latest"
DEF_PATCHES_SRC=$(toml_get "$main_config_t" patches-source) || DEF_PATCHES_SRC="MorpheApp/morphe-patches"
DEF_PATCHES_SRC_HOST=$(toml_get "$main_config_t" patches-source-host) || DEF_PATCHES_SRC_HOST="github"
DEF_CLI_SRC=$(toml_get "$main_config_t" cli-source) || DEF_CLI_SRC="MorpheApp/morphe-desktop"
DEF_CLI_SRC_HOST=$(toml_get "$main_config_t" cli-source-host) || DEF_CLI_SRC_HOST="github"
DEF_RV_BRAND=$(toml_get "$main_config_t" rv-brand) || DEF_RV_BRAND="ReVanced"
mkdir -p "$TEMP_DIR" "$BUILD_DIR"

if [ "${2-}" = "--config-update" ]; then
  config_update
  exit 0
fi

: >build.md
ENABLE_MODULE_UPDATE=$(toml_get "$main_config_t" enable-module-update) || ENABLE_MODULE_UPDATE=true
if [ "$ENABLE_MODULE_UPDATE" = true ] && [ -z "${GITHUB_REPOSITORY-}" ]; then
  pr "You are building locally. Module updates will not be enabled."
  ENABLE_MODULE_UPDATE=false
fi
if ((COMPRESSION_LEVEL > 9)) || ((COMPRESSION_LEVEL < 0)); then abort "compression-level must be within 0-9"; fi

rm -rf module/bin/*/tmp.*
for file in "$TEMP_DIR"/*/changelog.md; do
  [ -f "$file" ] && : >"$file"
done

mkdir -p ${MODULE_TEMPLATE_DIR}/bin/arm64 ${MODULE_TEMPLATE_DIR}/bin/arm ${MODULE_TEMPLATE_DIR}/bin/x86 ${MODULE_TEMPLATE_DIR}/bin/x64
gh_dl "${MODULE_TEMPLATE_DIR}/bin/arm64/cmpr" "https://github.com/j-hc/cmpr/releases/latest/download/cmpr-arm64-v8a"
gh_dl "${MODULE_TEMPLATE_DIR}/bin/arm/cmpr" "https://github.com/j-hc/cmpr/releases/latest/download/cmpr-armeabi-v7a"
gh_dl "${MODULE_TEMPLATE_DIR}/bin/x86/cmpr" "https://github.com/j-hc/cmpr/releases/latest/download/cmpr-x86"
gh_dl "${MODULE_TEMPLATE_DIR}/bin/x64/cmpr" "https://github.com/j-hc/cmpr/releases/latest/download/cmpr-x86_64"

idx=0
for table_name in $(toml_get_table_names); do
  if [ -z "$table_name" ]; then continue; fi
  t=$(toml_get_table "$table_name")

  enabled=$(toml_get "$t" enabled) || enabled=true
  vtf "$enabled" "enabled"
  if [ "$enabled" = false ]; then continue; fi

  # --- FIX 1: Clean/Isolate Loop-Specific Local Variables ---
  unset -v app_args p_srcs p_hosts p_vers
  declare -A app_args
  declare -a p_srcs p_hosts p_vers

  patches_data=$(jq -r ".patches | values" <<<"$t") || patches_data="[{\"source\": \"$DEF_PATCHES_SRC\"}]"

  # Read patches data into arrays
  while IFS= read -r patch; do
    patch_source=$(jq -r '.source // empty' <<<"$patch")
    patch_host=$(jq -r ".host // \"$DEF_PATCHES_SRC_HOST\" " <<<"$patch")
    patch_ver=$(jq -r ".version // \"$DEF_PATCHES_VER\" " <<<"$patch")
    p_srcs+=("$patch_source")
    p_hosts+=("$patch_host")
    p_vers+=("$patch_ver")
  done < <(jq -c '.[]' <<<"$patches_data")

  cli_src=$(toml_get "$t" cli-source) || cli_src=$DEF_CLI_SRC
  cli_src_host=$(toml_get "$t" cli-source-host) || cli_src_host=$DEF_CLI_SRC_HOST
  cli_ver=$(toml_get "$t" cli-version) || cli_ver=$DEF_CLI_VER
  if ! isoneof "$cli_src_host" github gitlab none; then abort "ERROR: cli-source-host '$cli_src_host' is not a valid option for '$table_name': only 'github' or 'gitlab' or 'none' is allowed"; fi

  for h in "${p_hosts[@]}"; do
    if ! isoneof "$h" github gitlab none; then abort "ERROR: patches.host '$h' is not a valid option for '$table_name': only 'github' or 'gitlab' or 'none' is allowed"; fi
  done

  if ! PREBUILTS="$(get_prebuilts "$cli_src_host" "$cli_src" "$cli_ver" "$patches_data")"; then
    epr "Could not get prebuilts"
    continue
  fi
  cli_jar=$(echo "$PREBUILTS" | sed -n '1p')
  patches_jar_all=$(echo "$PREBUILTS" | sed -n '2,$p' | jq -s add )
  app_args[cli]=$cli_jar
  app_args[ptjar]=$patches_jar_all
  app_args[cli_source]=$cli_src

  # Build aggregated patches_ref and changelog_url from all sources
  patches_ref_all="" changelog_url_all=""
  for i in "${!p_srcs[@]}"; do
    psrc="${p_srcs[$i]}"
    phost="${p_hosts[$i]:-${p_hosts[0]}}"
    pdir=${psrc%/*}
    pdir=${TEMP_DIR}/${pdir,,}-rv
    pfile=$(find "$pdir" -name 'patches-*.rvp' -o -name 'patches-*.jar' -o -name '*.mpp' -o -name '*.apk' 2>/dev/null | sort | tail -1)
    if [ -n "$pfile" ]; then
      pfilename=${pfile##*/}

      if [ -f "${pdir}/tag_name.txt" ]; then
        ptag=$(cat "${pdir}/tag_name.txt")
      else
        pver_actual=${pfilename#*-}
        pver_actual=${pver_actual%.*}
        ptag="v${pver_actual#v}"
      fi

      patches_ref_all+="${psrc%%/*}/${pfilename} "
      if [ "$phost" = github ]; then
        changelog_url_all+="https://github.com/${psrc}/releases/tag/${ptag} "
      else
        changelog_url_all+="https://gitlab.com/${psrc}/-/releases/${ptag} "
      fi
    fi
  done
  app_args[patches_data]=$patches_data
  app_args[patches_ref]="${patches_ref_all% }"
  app_args[changelog_url]="${changelog_url_all% }"
  app_args[rv_brand]=$(toml_get "$t" rv-brand) || app_args[rv_brand]="none"

  app_args[exclusive_patches]=$(toml_get "$t" exclusive-patches) && vtf "${app_args[exclusive_patches]}" "exclusive-patches" || app_args[exclusive_patches]=false
  app_args[version]=$(toml_get "$t" version) || app_args[version]="auto"
  app_args[app_name]=$(toml_get "$t" app-name) || app_args[app_name]=$table_name
  app_args[patcher_args]=$(toml_get "$t" patcher-args) || app_args[patcher_args]=""
  app_args[table]=$table_name
  app_args[prefer_dl_mode]=$(toml_get "$t" prefer-dl-mode) || app_args[prefer_dl_mode]="apk"
  app_args[build_mode]=$(toml_get "$t" build-mode) && {
    if ! isoneof "${app_args[build_mode]}" both apk module; then
      abort "ERROR: build-mode '${app_args[build_mode]}' is not a valid option for '${table_name}': only 'both', 'apk' or 'module' is allowed"
    fi
  } || app_args[build_mode]=apk
  app_args[include_stock]=$(toml_get "$t" include-stock) && {
    if ! isoneof "${app_args[include_stock]}" disable merged split; then
      abort "ERROR: include-stock '${app_args[include_stock]}' is not a valid option for '${table_name}': only 'disable', 'merged' or 'split' is allowed"
    fi
  } || app_args[include_stock]=merged

  for dl_from in "${DL_SRCS[@]}"; do
    if app_args[${dl_from}_dlurl]=$(toml_get "$t" "${dl_from}-dlurl"); then
      app_args[${dl_from}_dlurl]=${app_args[${dl_from}_dlurl]%/}
      app_args[${dl_from}_dlurl]=${app_args[${dl_from}_dlurl]%download}
      app_args[${dl_from}_dlurl]=${app_args[${dl_from}_dlurl]%/}
      app_args[dl_from]=${dl_from}
    else
      app_args[${dl_from}_dlurl]=""
    fi
  done
  if [ -z "${app_args[dl_from]-}" ]; then abort "ERROR: no 'dlurl' option was set for '$table_name'. (${DL_SRCS[*]})"; fi
  app_args[arch]=$(toml_get "$t" arch) || app_args[arch]="auto"
  if ! isoneof "${app_args[arch]}" "auto" "botharm" "both64" "all" "multi" "arm64-v8a" "arm-v7a" "x86_64" "x86"; then
    abort "wrong arch '${app_args[arch]}' for '$table_name'"
  fi

  app_args[pkg_name]=$(toml_get "$t" pkg-name) || app_args[pkg_name]=""
  app_args[dpi]=$(toml_get "$t" dpi) || app_args[dpi]=""
  table_name_f=${table_name,,}
  table_name_f=${table_name_f// /-}
  module_prop_base=$(toml_get "$t" module-prop-name) || module_prop_base="${table_name_f}-jhc"

  # --- FIX 2: Helper Function to enforce Parallel limits & Snapshot State Safely ---
  run_job_isolated() {
    local target_arch="$1"
    local target_table="$2"
    local target_prop="${module_prop_base}-${3}"

    # Check parallel window BEFORE changing parameters or spawning background jobs
    if ((idx >= PARALLEL_JOBS)); then
      wait -n || true
      idx=$((idx - 1))
    fi

    # Explicitly clone and update the unique tracking variables inside a subshell scope
    (
      app_args[arch]="$target_arch"
      app_args[table]="$target_table"
      app_args[module_prop_name]="$target_prop"
      build_rv "$(declare -p app_args)"
    ) &
    idx=$((idx + 1))
  }

  # --- Execution Dispatching ---
  if [ "${app_args[arch]}" = "botharm" ]; then
    run_job_isolated "arm64-v8a" "$table_name (arm64-v8a)" "arm64"
    run_job_isolated "arm-v7a" "$table_name (arm-v7a)" "arm"

  elif [ "${app_args[arch]}" = "both64" ]; then
    run_job_isolated "arm64-v8a" "$table_name (arm64-v8a)" "arm64"
    run_job_isolated "x86_64" "$table_name (x86_64)" "x86_64"

  elif [ "${app_args[arch]}" = "multi" ]; then
    run_job_isolated "arm64-v8a" "$table_name (multi)" "arm64"
    run_job_isolated "arm-v7a" "$table_name (arm-v7a)" "arm"
    run_job_isolated "x86_64" "$table_name (x86_64)" "x86_64"
    run_job_isolated "x86" "$table_name (x86)" "x86"

  else
    # Handle singular architectures explicitly
    arch_suffix="arm64"
    case "${app_args[arch]}" in
    "arm-v7a") arch_suffix="arm" ;;
    "x86_64") arch_suffix="x86_64" ;;
    "x86") arch_suffix="x86" ;;
    esac
    run_job_isolated "${app_args[arch]}" "$table_name" "$arch_suffix"
  fi
done
wait

rm -rf temp/tmp.*
if [ -z "$(ls -A1 "${BUILD_DIR}")" ]; then abort "All builds failed."; fi

log "\n**Notes:**"
log "• Install [MicroG-RE](https://github.com/MorpheApp/MicroG-RE/releases/latest), required for Google APKs."
log "• Use [Zygisk Detach](https://github.com/j-hc/zygisk-detach) to stop Play Store from updating Modules."

changelog_merged=$(cat "$TEMP_DIR"/*/changelog.md 2>/dev/null || :)
changelog_merged=$(awk '
{
	line=$0
	if (line ~ /^(CLI|Patches): /) {
		key=line
		sub(/\r$/, "", key)
		gsub(/[[:space:]]+$/, "", key)
		if (seen[key]++) {
			skip_changelog = 1
			next
		}
		skip_changelog = 0
	} else if (skip_changelog) {
		if (line ~ /^\[Changelog\]/ || line == "" || line == "\r") {
			next
		}
		skip_changelog = 0
	}
	print line
}' <<<"$changelog_merged")
log "$changelog_merged"

SKIPPED=$(cat "$TEMP_DIR"/skipped 2>/dev/null || :)
if [ -n "$SKIPPED" ]; then
  log "\nSkipped:"
  log "$SKIPPED"
fi

pr "Done"
