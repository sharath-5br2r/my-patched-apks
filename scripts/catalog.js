#! /usr/bin/env node
// based on https://github.com/nullcpy/nullcpy.github.io/blob/main/script.js
const fs = require('fs');
const path = require('path');

/**
 * ==========================================
 * CONFIGURATION & CUSTOMIZATION
 * ==========================================
 */
const CONFIG = {
  owner: "sharath-5br2r",
  repo: "my-patched-apks",

  // Words ignored in the dynamic app filters (must be lowercase)
  sharedAppWordStoplist: new Set(["messenger", "document", "reader", "launcher", "emulator"]),

  // Known tokens indicating a patch name starts (must be lowercase)
  knownPatchTokens: new Set([
    "revanced",
    "morphe",
    "npatch",
    "cs",
    "signed",
    "viamorphe",
    "hooman",
    "rushiranpise",
    "revenge",
    "paresh",
    "piko",
    "binarymend",
    "hoodles",
    "xtra",
    "pubgvn",
    "anddea",
    "xshim",
    "jasonwu1994",
    "icysymmetra",
  ]),

  // Known tokens indicating a variant (must be lowercase)
  variantKeywords: new Set([
    "exp",
    "root",
    "gfp",
    "chromeos",
    "optimized",
    "pubgkr",
    "pubgvn",
    "bgmi",
    "codm",
  ]),

  // Known architectures (used for regex parsing)
  knownArchs: [
    "arm64-v8a",
    "arm64",
    "aarch64",
    "armeabi-v7a",
    "arm-v7a",
    "arm32",
    "x86_64",
    "x86",
    "universal",
    "all",
  ],

  // Brand name overrides (keys must be lowercase)
  brandOverrides: {
    youtube: "YouTube",
    revanced: "ReVanced",
    tiktok: "TikTok",
    icysymmetra: "TikTok Patches",
    soundcloud: "SoundCloud",
    xrecorder: "XRecorder",
    calcnote: "CalcNote",
    imdb: "IMDb",
    trakt: "trakt.TV",
    github: "GitHub",
    vpn: "VPN",
    rvx: "ReVanced Extended",
    anddea: "ReVanced Extended(anddea)",
    exp: "Experimental",
    macrodroid: "MacroDroid",
    ticktick: "TickTick",
    fing: "Fing - Network Tools",
    sdmaid: "SD Maid 2/SE",
    mocha: "Mocha Theme",
    nord: "Nord Theme",
    materialu: "Material You",
    photoshop: "Adobe Photoshop",
    lightroom: "Adobe Lightroom",
    xodo: "Xodo PDF Reader & Editor",
    hellochinese: "HelloChinese: Learn Chinese",
    gplay: "Google Play",
    foss: "FOSS",
    gboard: "Google Keyboard",
    jasonwu1994: "Gboard Patches",
    morphe: "Morphe",
    wps: "WPS",
    rar: "RAR",
    adguard: "AdGuard",
    "moonplus-reader": "Moon+ Reader",
    eyecon: "Eyecon Caller ID & Spam Block",
    camscanner: "CamScanner",
    inshorts: "Inshorts - News in 60 words",
    warp: "1.1.1.1 + WARP",
    acalendar: "aCalendar",
    at4k: "AT4K",
    androidtv: "Android TV",
    disneyplus: "Disney+",
    hbomax: "HBO Max",
    vix: "ViX",
    komoot: "komoot - hike, bike & run",
    vpnify: "VPNify",
    snorelab: "SnoreLab",
    myfitnesspal: "MyFitnessPal",
    terabox: "TeraBox",
    plutotv: "PlutoTV",
    accuweather: "AccuWeather",
    pixiv: "pixiv",
    mxplayer: "MX Player",
    adm: "Advanced Download Manager",
    dolphin: "Dolphin Emulator",
    cs: "Custom Storage",
    napatch: "NPatch",
    revenge: "Revenge",
    paresh: "Paresh",
    eden: "Eden Emulator",
    geode: "Geode Launcher",
    jiohotstar: "JioHotstar",
    levilauncher: "LeviLauncher",
    winlator: "Winlator Ludashi",
    x: "X/Twitter",
    xshim: "X-Shim",
    viamorphe: "via Morphe",
    gfp: "Game for Peace Spoof",
    optimized: "Genshin Impact Spoof",
    optmosed: "Genshin Impact Spoof", // Mapping of the typo to display name
    chromeos: "ChromeOS/x86",
    codm: "Call of Duty Mobile Spoof",
    pubgkr: "PUBG Mobile KR Spoof",
    pubgvn: "PUBG Mobile VN Spoof",
    bgmi: "Battlegrounds Mobile India Spoof",
    symfonium: "Symfonium",
    "youtube-music": "YouTube Music",
    "prime-video": "Prime Video",
    "zalith-launcher-2-plus": "Zalith Launcher 2 Plus",
    "instagram": "Instagram",
    "levilauncher-unlocked": "LeviLauncher Unlocked",
    "amazon-india": "Amazon India",
    "amazon-alexa": "Amazon Alexa",
    "proton-vpn": "Proton VPN",
    "discord": "Discord",
    "speedtest": "Speedtest",
    "symfonium": "Symfonium",
    "adobe-acrobat": "Adobe Acrobat",
  },

  // Map exact app names to true Android Package IDs for Obtainium
  appIds: {
    "Advanced Download Manager": "com.dv.adm",
    "1.1.1.1 + WARP": "com.cloudflare.onedotonedotonedotone",
    "aCalendar": "org.withouthat.acalendar",
    "AdGuard": "com.adguard.android",
    "Adobe Acrobat": "com.adobe.reader",
    "Adobe Lightroom": "com.adobe.lrmobile",
    "Adobe Photoshop Mix": "com.adobe.psmobile",
    "AccuWeather": "com.accuweather.android",
    "All Document Reader": "alldocumentsreader.docuemntviewer",
    "Amazon Alexa": "com.amazon.dee.app",
    "Amazon India": "in.amazon.mShop.android.shopping",
    "AT4K Launcher": "com.overdevs.at4k",
    "Automate": "com.llamalab.automate",
    "Autosync": "com.ttxapps.autosync",
    "Battery Guru": "com.paget96.batteryguru",
    "Betamaniac": "it.mirko.beta",
    "CalcNote": "com.appumstudios.calcnote",
    "CamScanner": "com.intsig.camscanner",
    "Cricbuzz": "com.cricbuzz.android",
    "Cryptomator": "org.cryptomator",
    "Document Scanner": "com.cv.docscanner",
    "Duolingo": "com.duolingo",
    "Disney+": "com.disney.disneyplus",
    "Discord": "com.discord",
    "Dolphin Emulator": {
      default: "org.dolphinemu.dolphinemu",
      "Game for Peace Spoof": "com.tencent.tmgp.pubgmhd",
    },
    "Eden Emulator": {
      default: "dev.eden_emulator.eden",
      "Genshin Impact Spoof": "com.miHoYo.Yuanshen",
    },
    "Eyecon Caller ID & Spam Block": "com.eyecon.global",
    "Facebook": "com.facebook.katana",
    "Fing - Network Tools": "com.overlook.android.fing",
    "Geode Launcher": {
      default: "com.geode.launcher",
      "PUBG Mobile KR Spoof": "com.pubg.krmobile"
    },
    "GitHub": "com.github.android",
    "Goodreads": "com.goodreads",
    "Gboard": {
      default: "com.google.android.inputmethod.latin",
      "Gboard Patches": "dev.jason.com.google.android.inputmethod.latin",
    },
    "Google News": "com.google.android.apps.magazines",
    "Google Photos": {
      "ReVanced": "app.revanced.android.apps.photos",
      "Morphe": "app.morphe.android.apps.photos",
      default: "com.google.android.apps.photos",
    },
    "Google Recorder": "com.google.android.apps.recorder",
    "HBO Max": "com.wbd.hbomax",
    "HelloChinese: Learn Chinese": "com.hellochinese",
    "Hola VPN": "org.hola.play",
    "Icon Packer": "cn.ommiao.iconpacker",
    "Instagram": "com.instagram.android",
    "InShot": "com.camerasideas.instashot",
    "Inshorts - News in 60 words": "com.nis.app",
    "IMDb": "com.imdb.mobile",
    "JioHotstar": "in.startv.hotstar",
    "komoot - hike, bike & run": "de.komoot.android",
    "LeviLauncher": {
      default: "org.levimc.launcher",
      "Battlegrounds Mobile India Spoof": "com.pubg.imobile",
    },
    "Lumina Wallpapers": "com.lumina.wallpapers",
    "MacroDroid": "com.arlosoft.macrodroid",
    "Medium": "com.medium.reader",
    "Merriam-Webster Dictionary": "com.merriamwebster",
    "Messenger": "com.facebook.orca",
    "Microsoft Lens": "com.microsoft.office.officelens",
    "Microsoft Edge": "com.microsoft.emmx",
    "Moon+": "com.flyersoft.moonreader",
    "Money Manager": "com.realbyteapps.moneymanagerfree",
    "MX Player": "com.mxtech.videoplayer.pro",
    "MyFitnessPal": "com.myfitnesspal.android",
    "Niagara Launcher": "bitpit.launcher",
    "Ninja VPN": "app.ninjavpn.android",
    "Nova Launcher": "com.teslacoilsw.launcher",
    "Pandora": "com.pandora.android",
    "Peacock": "com.peacocktv.peacockandroid",
    "Photomath": "com.microblink.photomath",
    "Pinterest": "com.pinterest",
    "pixiv": "jp.pxv.android",
    "Plus Messenger": "org.telegram.plus",
    "PlutoTV": { 
      "Android TV": "tv.pluto.android" 
    },
    "Podcast Addict": "com.bambuna.podcastaddict",
    "Poweramp": "com.maxmpz.audioplayer",
    "Prime Video": {
      default: "com.amazon.avod.thirdpartyclient",
      "Android TV": "com.amazon.amazonvideo.livingroom.mod"
    },
    "ProtonMail": "ch.protonmail.android",
    "Proton VPN": "ch.protonvpn.android",
    "Project Ivy Launcher": "com.spocky.projengmenu",
    "SD Maid 2/SE": "eu.darken.sdmse",
    "Showly": "com.michaldrabik.showly2",
    "Smart Launcher 6": "ginlemon.flowerfree",
    "Solid Explorer": "pl.solidexplorer2",
    "SoundCloud": "com.soundcloud.android",
    "SnoreLab": "com.snorelab.app",
    "Speedtest": "org.zwanoo.android.speedtest",
    "Symfonium": "app.symfonik.music.player",
    "Telegram": {
      default: "org.telegram.messenger",
      "FOSS": "org.telegram.messenger.web",
    },
    "TeraBox": "com.dubox.drive",
    "The Weather Channel": "com.weather.Weather",
    "Threads": "com.instagram.barcelona",
    "TickTick": "com.ticktick.task",
    "TikTok": "com.zhiliaoapp.musically",
    "Todoist": "com.todoist",
    "trakt.TV": "tv.trakt.trakt",
    "Truecaller": "com.truecaller",
    "Tubi": "com.tubitv",
    "Tumblr": "com.tumblr",
    "Twitch": "tv.twitch.android.app",
    "Reddit": "com.reddit.frontpage",
    "Rumble": "com.rumble.battles",
    "Ventusky": "cz.ackee.ventusky",
    "Viber": "com.viber.voip",
    "ViX": "com.univision.prendetv",
    "AdGuard": "com.adguard.android",
    "VPNify": "com.vpn.free.hotspot.secure.vpnify",
    "RAR": "com.rarlab.rar",
    "Winlator Ludashi": {
      default: "com.winlator.cmod",
      "PUBG Mobile VN Spoof": "com.vng.pubgmobile",
    },
    "Wallcraft": "com.wallpaperscraft.wallpaper",
    "Waze": "com.waze",
    "Windscribe VPN": "com.windscribe.vpn",
    "WPS": "cn.wps.moffice_eng",
    "X/Twitter": "com.twitter.android",
    "Xodo PDF Reader & Editor": "com.xodo.pdf.reader",
    "XRecorder": "videoeditor.videorecorder.screenrecorder",
    "YouTube": {
      "ReVanced": "app.revanced.android.youtube",
      "ReVanced Extended": "app.rvx.android.youtube",
      "ReVanced Extended(anddea)": "anddea.youtube",
      "Morphe": "app.morphe.android.youtube",
      default: "com.google.android.youtube",
    },
    "YouTube Music": {
      "ReVanced": "app.revanced.android.apps.youtube.music",
      "ReVanced Extended": "app.rvx.android.apps.youtube.music",
      "ReVanced Extended(anddea)": "anddea.youtube.music",
      "Morphe": "app.morphe.android.apps.youtube.music",
      default: "com.google.android.apps.youtube.music",
    },
    "ZalithLauncher": {
      default: "com.movtery.zalithlauncher.v2",
      "Call of Duty Mobile Spoof": "com.activision.callofduty.shooter",
    }
  },

  // App-specific notices
  appNotices: [
    {
      triggers: ["youtube", "google", "gboard"],
      type: "note",
      className: "microg-note",
      title: "Login Issue",
      text: "Signing into Google account on APK (not Module) requires MicroG. Please install from below before trying to sign in.",
      links: [
        {
          label: "Morphe",
          url: "https://github.com/MorpheApp/MicroG-RE/releases/latest",
        },
      ],
    },
    {
      triggers: ["amazon","primevideo"],
      type: "warning",
      className: "amazon-note",
      title: "Signing Compatibility",
      text: "Due to a modification in hoodles patch, all Amazon Apps are needed to have the same signature. So install the apps from here which is resigned for compatibility.",
    },
    {
      triggers: ["geode"],
      type: "note",
      className: "geode-note",
      title: "Requirements",
      text: "A copy of Geometry Dash is needed to launch Geode Launcher. Please install it from Play Store or any other source(cracked supported) before trying to launch Geode.",
    },
    {
      triggers: ["levilauncher"],
      type: "note",
      className: "levilauncher-note",
      title: "Requirements",
      text: "A copy of Minecraft Bedrock Edition is needed to launch LeviLauncher. Please install it from Play Store or any other source(cracked supported) before trying to launch LeviLauncher. Additionally you need APKs for other versions if you want to launch",
    },
    {
      triggers: ["twitter"],
      type: "warning",
      className: "twitter-login-note",
      title: "Login Issue",
      text: "Since October 2025, Twitter has started checking whether the app is modified or if the phone integrity fails during login. These checks are server-side, not client-side.",
      links: [
        { label: "Workarounds", url: "https://t.me/pikopatches/1/59772" },
      ],
    },
    {
      triggers: ['dolphin', 'eden', 'winlator', 'levilauncher', 'geode', 'zalithlauncher'],
      type: "warning",
      className: "spoofing-note",
      title: "About Package Spoofing",
      text: "These apps are spoofed into other apps to trick OEM software into optimizing them. You will have to uninstall the spoof target(eg: PUBG Mobile) to proceed. "
    },
    {
      triggers: ['dolphin'],
      type: "note",
      className: "customstorage-note",
      title: "Custom Storage Location Patch",
      text: "Due to a patch that allows custom storage location, You will have to manually grant storage permission to the app from settings or use a file manager to move files.",
      links: [
        { label: "Source Code", url: "https://github.com/sharath-5br2r/DolphinCS-master" }
      ]
    }
  ],
};

const parseCache = new Map();

/**
 * Parsing & Helper Utilities
 */
function normalizeForSearch(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function normalizeSlug(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

/**
 * Extract architecture with explicit, longer-first sorting and boundary regexes
 * to safely handle arch tokens containing dashes, leveraging CONFIG.knownArchs.
 * Treats only the very last matching arch suffix as the architecture segment.
 */
function extractArchitecture(filename) {
  const clean = filename.replace(/\.(apk|zip)$/i, "");
  const lower = clean.toLowerCase();
  const sortedArchs = [...CONFIG.knownArchs].sort((a, b) => b.length - a.length);
  for (const arch of sortedArchs) {
    const escapedArch = escapeRegex(arch);
    const regexes = [
      new RegExp(`[-_]${escapedArch}$`, 'i') // Trailing matches only
    ];
    for (const r of regexes) {
      if (r.test(lower) || lower === arch) {
        return arch;
      }
    }
  }
  return "universal";
}

function detectArchitecture(filename) {
  const arch = extractArchitecture(filename);
  if (arch === "arm64-v8a" || arch === "arm64" || arch === "aarch64") return "arm64";
  if (arch === "armeabi-v7a" || arch === "arm-v7a" || arch === "arm32") return "arm32";
  if (arch === "universal" || arch === "all") return "universal";
  if (arch === "x86_64") return "x86_64";
  if (arch === "x86") return "x86";
  return "other";
}

function getFileType(filename) {
  const lower = filename.toLowerCase();
  if (lower.endsWith(".apk")) return "APK";
  if (lower.endsWith(".zip")) return "Module";
  return "File";
}

function formatArchitectureLabel(arch, fileType) {
  const labels = {
    arm64: "ARM64",
    arm32: "ARM32",
    universal: "Universal",
    x86_64: "x86_64",
    x86: "x86",
    other: fileType,
  };
  return labels[arch] || arch.toUpperCase();
}

/**
 * Auto-capitalization is disabled. Casing mappings are parsed exactly as defined inside CONFIG.brandOverrides.
 */
function formatBrandDisplayName(value) {
  if (!value) return "";
  const lowerValue = value.toLowerCase();
  if (CONFIG.brandOverrides[lowerValue]) {
    return CONFIG.brandOverrides[lowerValue];
  }
  return value
    .split(" ")
    .map((spaceToken) => {
      const lowerSpaceToken = spaceToken.toLowerCase();
      if (CONFIG.brandOverrides[lowerSpaceToken]) {
        return CONFIG.brandOverrides[lowerSpaceToken];
      }
      if (spaceToken.includes("-")) {
        return spaceToken
          .split("-")
          .map((hyphenToken) => {
            const lowerHyphenToken = hyphenToken.toLowerCase();
            return CONFIG.brandOverrides[lowerHyphenToken] || hyphenToken;
          })
          .join("-");
      }
      return spaceToken;
    })
    .join(" ");
}

/**
 * Checks if a token acts as an arbitrary version string.
 * Dynamically evaluates exclusions against defined config maps (including knownArchs) to avoid hardcoded rules.
 */
function isVersionToken(token) {
  const lower = token.toLowerCase();
  if (!token.startsWith('v') && !token.startsWith('V')) return false;

  // Dynamic config exclusions
  if (CONFIG.knownPatchTokens.has(lower)) return false;
  if (CONFIG.variantKeywords.has(lower) || CONFIG.variantKeywords.has(lower.slice(1))) return false;
  if (CONFIG.brandOverrides[lower]) return false;
  if (CONFIG.appIds[lower]) return false;

  const archSubTokens = new Set(CONFIG.knownArchs.flatMap((a) => a.split("-")));
  if (archSubTokens.has(lower)) return false;

  return true;
}

/**
 * Checks if a subsequent token should be combined as part of the currently active version.
 */
function isVersionPart(token) {
  const lower = token.toLowerCase();
  if (CONFIG.knownPatchTokens.has(lower)) return false;
  if (CONFIG.variantKeywords.has(lower) || CONFIG.variantKeywords.has(lower.slice(1))) return false;
  if (/^\d+$/.test(token)) return true;

  const versionWords = new Set(["beta", "alpha", "rc", "release", "build", "stable", "dev", "final", "patch", "ver"]);
  return versionWords.has(lower);
}

/**
 * Finds a bounded token in a string using word delimiters to avoid split dependencies.
 */
function findBoundToken(str, token) {
  const escaped = escapeRegex(token);
  const regex = new RegExp(`(^|[-_])${escaped}([-_]|$)`, 'i');
  const match = str.match(regex);
  if (match) {
    return {
      token,
      index: match.index + (match[1] ? match[1].length : 0),
      length: token.length
    };
  }
  return null;
}

/**
 * Parses all valid, bounded version-starting tokens from a string.
 * Ignores any potential version tokens occurring before the minStartIndex boundary.
 */
function findVersionTokens(str, minStartIndex = 0) {
  const regex = /(?:^|[-_])([vV][a-zA-Z0-9.]+)(?=[-_]|$)/g;
  let match;
  const versions = [];
  while ((match = regex.exec(str)) !== null) {
    const token = match[1];
    const fullMatch = match[0];
    const index = match.index + (fullMatch.startsWith('-') || fullMatch.startsWith('_') ? 1 : 0);
    
    // Skip any tokens occurring before the strict post-patch index boundary
    if (index < minStartIndex) continue;

    if (isVersionToken(token)) {
      versions.push({
        token,
        index,
        length: token.length
      });
    }
  }
  return versions.sort((a, b) => a.index - b.index);
}

/**
 * Parse single file asset details
 */
function parseAssetDisplay(filename, fileType) {
  if (parseCache.has(filename)) return parseCache.get(filename);

  const baseName = filename.replace(/\.(apk|zip)$/i, "");
  
  // Extract and isolate exact raw matching architecture suffix dynamically
  const rawArch = extractArchitecture(filename);
  const archCategory = detectArchitecture(filename);
  
  // Identify the exact starting index of the very last matching arch suffix
  let archSuffixIndex = baseName.length;
  if (rawArch && rawArch !== "universal") {
    const idxDash = baseName.toLowerCase().lastIndexOf("-" + rawArch.toLowerCase());
    const idxUnder = baseName.toLowerCase().lastIndexOf("_" + rawArch.toLowerCase());
    const idx = Math.max(idxDash, idxUnder);
    if (idx !== -1 && idx === baseName.length - rawArch.length - 1) {
      archSuffixIndex = idx;
    }
  }

  // Pre-strip architecture suffix from cleanName
  const cleanName = baseName.substring(0, archSuffixIndex);

  // Parse bounded tokens directly instead of splitting by hyphens
  const patches = [];
  CONFIG.knownPatchTokens.forEach((token) => {
    const match = findBoundToken(cleanName, token);
    if (match) patches.push(match);
  });
  patches.sort((a, b) => a.index - b.index);

  const variants = [];
  CONFIG.variantKeywords.forEach((token) => {
    const match = findBoundToken(cleanName, token);
    if (match) variants.push(match);
  });
  variants.sort((a, b) => a.index - b.index);

  // Versions strictly start after the first matched patch token
  const minVersionStartIndex = patches.length > 0 ? (patches[0].index + patches[0].length) : 0;
  const versions = findVersionTokens(cleanName, minVersionStartIndex);

  // App name boundary: Strictly up to the first explicit patch token match, version token, or variant token!
  // We find the first of each token that occurs strictly after index 0 to prevent an empty app name
  // when a file starts with one of these keywords (e.g., 'gboard-morphe-...').
  const validPatch = patches.find(p => p.index > 0);
  const firstPatchIndex = validPatch ? validPatch.index : cleanName.length;

  const validVersion = versions.find(v => v.index > 0);
  const firstVersionIndex = validVersion ? validVersion.index : cleanName.length;

  const validVariant = variants.find(v => v.index > 0);
  const firstVariantIndex = validVariant ? validVariant.index : cleanName.length;
  
  const appBoundary = Math.min(firstPatchIndex, firstVersionIndex, firstVariantIndex);

  let appNameRaw = cleanName.substring(0, appBoundary).replace(/[-_]+$/g, "");
  if (!appNameRaw) appNameRaw = baseName;

  const appName = formatBrandDisplayName(appNameRaw.replace(/_+/g, " "));
  
  // Concatenate multiple patches cleanly with ' + '
  const patchName = patches.length > 0 
    ? patches.map(p => formatBrandDisplayName(p.token)).join(" + ") 
    : "Patched Build";
    
  const appSlug = appNameRaw.toLowerCase().replace(/[^a-z0-9]/g, "");
  const patchSlug = patches.length > 0 ? patches.map(p => p.token).join("-").toLowerCase() : "patched";

  // Concatenate multiple variants cleanly with ' + '
  const activeVariants = variants.filter(v => v.index >= appBoundary);
  const variantStr = activeVariants.length > 0 
    ? activeVariants.map(v => formatBrandDisplayName(v.token)).join(" + ") 
    : null;

  // Version starts at the first valid non-patch/variant v and terminates right before arch suffix
  let displayVersion = "Version unknown";
  if (versions.length > 0) {
    displayVersion = cleanName.substring(versions[0].index);
  }

  const result = {
    appName,
    patchName,
    appSlug,
    patchSlug,
    variant: variantStr,
    version: displayVersion,
    archLabel: formatArchitectureLabel(archCategory, fileType),
    fileType,
  };

  parseCache.set(filename, result);
  return result;
}

function getBuildNumberLabel(release) {
  return String(release.tag_name || release.name || "N/A");
}

function escapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

/**
 * Builds a dynamic regular expression matching only explicit app, patch,
 * and variant names, wildcarding any arbitrary tokens in-between.
 */
function buildObtainiumRegexFromAsset(asset) {
  if (!asset || !asset.name) return null;
  const assetName = asset.name;
  if (!assetName.toLowerCase().endsWith(".apk")) return null;

  const baseName = assetName.replace(/\.apk$/i, "");
  const tokens = baseName.split("-");
  const parsed = asset.parsed;

  // Build a set of lowercase keywords belonging to the app name (both display and slug parts)
  const appParts = new Set([
    ...parsed.appName.toLowerCase().split(/[-_ ]+/).filter(Boolean),
    ...(parsed.appSlug ? parsed.appSlug.split(/[-_ ]+/).filter(Boolean) : [])
  ]);

  const regexTokens = tokens.map((token) => {
    // Strip leading/trailing quotes if present on the token
    const cleanToken = token.replace(/^["']|["']$/g, "");
    const lower = cleanToken.toLowerCase();

    // Preserve exact app name parts
    if (appParts.has(lower)) {
      return escapeRegex(cleanToken);
    }

    // Preserve explicit patch tokens
    if (CONFIG.knownPatchTokens.has(lower)) {
      return escapeRegex(cleanToken);
    }

    // Preserve explicit variant keywords
    const isExplicitVar = CONFIG.variantKeywords.has(lower) || 
                          (lower.startsWith('v') && CONFIG.variantKeywords.has(lower.slice(1))) ||
                          CONFIG.brandOverrides[lower];
    if (isExplicitVar) {
      return escapeRegex(cleanToken);
    }

    // Turn version tokens into wildcards
    if (isVersionToken(cleanToken)) {
      return "(v\\w*\\d|\\d|vbuild)[\\w.-]*";
    }

    // Keep explicit arch tags
    if (CONFIG.knownArchs.includes(lower)) {
      return escapeRegex(cleanToken);
    }

    // Unrecognized arbitrary names in-between are wildcarded
    return "[\\w.-]*";
  });

  const regex = `^${regexTokens.join("-")}\\.apk$`;
  return { regex, assetName };
}

/**
 * Performs dynamic case-sensitive lookup on configuration first,
 * falling back safely to slug normalization.
 * Resolves both flat and nested mappings for variants.
 * Resolves combinations of concatenated patches and variants joined by ' + '.
 */
function resolveObtainiumAppId(appName, patchName, variantName) {
  let appConfig = CONFIG.appIds[appName];
  if (!appConfig) {
    appConfig = CONFIG.appIds[normalizeForSearch(appName)];
  }
  if (!appConfig) return null;

  if (typeof appConfig === "string") return appConfig;
  if (typeof appConfig !== "object") return null;

  // 1. Resolve nested patch configs by splitting on ' + ' combinations
  let patchConfig = null;
  if (patchName) {
    const individualPatches = patchName.split(" + ");
    for (const p of individualPatches) {
      patchConfig = appConfig[p] || appConfig[normalizeForSearch(p)];
      if (patchConfig) break; // Matches the first resolved patch config
    }
  }

  const resolvedVariant = variantName || "default";
  const individualVariants = resolvedVariant.split(" + ");

  if (patchConfig) {
    if (typeof patchConfig === "string") return patchConfig;
    if (typeof patchConfig === "object" && patchConfig !== null) {
      // Evaluate matching variant configurations under the nested patch
      for (const v of individualVariants) {
        const val = patchConfig[v] || patchConfig[normalizeForSearch(v)];
        if (val) return val;
      }
      return patchConfig.default || null;
    }
  }

  // 2. Fallback to direct flat/nested variant lookups on app config level
  for (const v of individualVariants) {
    const variantConfig = appConfig[v] || appConfig[normalizeForSearch(v)];
    if (typeof variantConfig === "string") return variantConfig;
    if (typeof variantConfig === "object" && variantConfig !== null) {
      return variantConfig.default || null;
    }
  }

  return appConfig.default || null;
}

function formatBytes(bytes) {
  if (!bytes) return "Unknown size";
  const k = 1024;
  const sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

function formatCompactNumber(n) {
  if (!n) return "0";
  if (n >= 1_000_000) return ((n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1).replace(/\.0$/, "")) + "M";
  if (n >= 1_000) return ((n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1).replace(/\.0$/, "")) + "k";
  return String(n);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

/**
 * Catalog Building Core
 */
function buildAppCatalog(releases) {
  const sortedReleases = [...releases].sort((a, b) => new Date(b.published_at) - new Date(a.published_at));
  const appMap = new Map();

  sortedReleases.forEach((release) => {
    const isArchive = release.tag_name === "stable" || release.tag_name === "beta";
    let releaseType = release.prerelease ? "beta" : "stable";
    if (release.tag_name === "stable") releaseType = "stable";
    if (release.tag_name === "beta") releaseType = "beta";

    (release.assets || []).forEach((asset) => {
      const arch = detectArchitecture(asset.name);
      const fileType = getFileType(asset.name);
      const parsed = parseAssetDisplay(asset.name, fileType);

      const appKey = normalizeForSearch(parsed.appName);
      if (!appKey) return;

      if (!appMap.has(appKey)) {
        appMap.set(appKey, {
          appKey,
          appName: parsed.appName,
          latestStable: null,
          latestBeta: null,
          patches: new Map(),
        });
      }

      const appEntry = appMap.get(appKey);

      // track overall latest build metadata
      const key = releaseType === "beta" ? "latestBeta" : "latestStable";
      const current = appEntry[key];
      const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
      const releaseDate = new Date(release.published_at).getTime();

      if (!current || releaseDate > currentDate) {
        appEntry[key] = {
          build: getBuildNumberLabel(release),
          publishedAt: release.published_at,
          releaseUrl: release.html_url,
        };
      }

      const patchKey = normalizeForSearch(parsed.patchName) || "patchedbuild";
      if (!appEntry.patches.has(patchKey)) {
        appEntry.patches.set(patchKey, {
          patchKey,
          patchName: parsed.patchName,
          latestVersion: null,
          latestPublishedAt: 0,
          latestStable: null,
          latestBeta: null,
          latestVariant: null,
          latestArchiveStable: null,
          latestArchiveBeta: null,
          builds: new Map(),
        });
      }

      const patchEntry = appEntry.patches.get(patchKey);
      const buildLabel = getBuildNumberLabel(release);

      const buildDateString = isArchive
        ? asset.updated_at || asset.created_at || release.published_at
        : release.published_at;
      const buildDateMs = new Date(buildDateString).getTime();

      if (!isArchive) {
        const patchDate = new Date(patchEntry.latestPublishedAt).getTime();
        if (buildDateMs > patchDate) {
          patchEntry.latestVersion = parsed.version;
          patchEntry.latestPublishedAt = buildDateString;
        }

        if (!parsed.variant) {
          const pk = releaseType === "beta" ? "latestBeta" : "latestStable";
          const currentPk = patchEntry[pk];
          const currentPkDate = currentPk ? new Date(currentPk.publishedAt).getTime() : 0;
          if (!currentPk || buildDateMs > currentPkDate) {
            patchEntry[pk] = { version: parsed.version, build: buildLabel, publishedAt: buildDateString };
          }
        } else {
          const currentVar = patchEntry.latestVariant;
          const currentVarDate = currentVar ? new Date(currentVar.publishedAt).getTime() : 0;
          if (!currentVar || buildDateMs > currentVarDate) {
            patchEntry.latestVariant = { variant: parsed.variant, version: parsed.version, build: buildLabel, publishedAt: buildDateString };
          }
        }
      } else {
        if (!parsed.variant) {
          if (releaseType === "stable") {
            const currentMs = patchEntry.latestArchiveStable ? new Date(patchEntry.latestArchiveStable.publishedAt).getTime() : 0;
            if (buildDateMs > currentMs) {
              patchEntry.latestArchiveStable = {
                version: parsed.version,
                build: buildLabel,
                publishedAt: buildDateString,
              };
            }
          } else if (releaseType === "beta") {
            const currentMs = patchEntry.latestArchiveBeta ? new Date(patchEntry.latestArchiveBeta.publishedAt).getTime() : 0;
            if (buildDateMs > currentMs) {
              patchEntry.latestArchiveBeta = {
                version: parsed.version,
                build: buildLabel,
                publishedAt: buildDateString,
              };
            }
          }
        }
      }

      const buildKey = isArchive ? `archive-${releaseType}-${parsed.version}` : String(release.id);
      if (!patchEntry.builds.has(buildKey)) {
        patchEntry.builds.set(buildKey, {
          releaseId: release.id,
          build: isArchive ? parsed.version : getBuildNumberLabel(release),
          releaseType,
          isArchive,
          publishedAt: buildDateString,
          releaseUrl: release.html_url,
          version: parsed.version,
          assets: [],
        });
      }

      const buildEntry = patchEntry.builds.get(buildKey);
      const exists = buildEntry.assets.some((existing) => existing.name === asset.name);
      if (!exists) {
        buildEntry.assets.push({
          ...asset,
          parsed,
          arch,
          fileType,
        });
      }
    });
  });

  return Array.from(appMap.values())
    .map((app) => {
      app.patches.forEach((patch) => {
        if (!patch.latestStable && patch.latestArchiveStable) {
          patch.latestStable = patch.latestArchiveStable;
          patch.latestStable.isArchiveFallback = true;
          const archiveMs = new Date(patch.latestArchiveStable.publishedAt).getTime();
          const currentMs = patch.latestPublishedAt ? new Date(patch.latestPublishedAt).getTime() : 0;
          if (archiveMs > currentMs) {
            patch.latestVersion = patch.latestArchiveStable.version;
            patch.latestPublishedAt = patch.latestArchiveStable.publishedAt;
          }
        }
        if (!patch.latestBeta && patch.latestArchiveBeta) {
          patch.latestBeta = patch.latestArchiveBeta;
          patch.latestBeta.isArchiveFallback = true;
          const archiveMs = new Date(patch.latestArchiveBeta.publishedAt).getTime();
          const currentMs = patch.latestPublishedAt ? new Date(patch.latestPublishedAt).getTime() : 0;
          if (archiveMs > currentMs) {
            patch.latestVersion = patch.latestArchiveBeta.version;
            patch.latestPublishedAt = patch.latestArchiveBeta.publishedAt;
          }
        }
      });

      return {
        ...app,
        patches: Array.from(app.patches.values())
          .sort((a, b) => new Date(b.latestPublishedAt) - new Date(a.latestPublishedAt))
          .map((patch) => ({
            ...patch,
            builds: Array.from(patch.builds.values()).sort((a, b) => {
              if (a.isArchive && !b.isArchive) return 1;
              if (!a.isArchive && b.isArchive) return -1;
              if (a.isArchive && b.isArchive) {
                const versionComparison = b.version.localeCompare(a.version, undefined, { numeric: true, sensitivity: "base" });
                if (versionComparison !== 0) return versionComparison;
                return new Date(b.publishedAt) - new Date(a.publishedAt);
              }
              return new Date(b.publishedAt) - new Date(a.publishedAt);
            }),
          })),
      };
    })
    .filter((app) => app.patches.length > 0)
    .sort((a, b) => a.appName.localeCompare(b.appName));
}

/**
 * Fetch Releases Local/Remote
 */
async function loadReleases() {
  const localCachePath = path.join(process.cwd(), 'releases.json');
  if (fs.existsSync(localCachePath)) {
    console.log("Loading releases from local releases.json...");
    try {
      const data = JSON.parse(fs.readFileSync(localCachePath, 'utf-8'));
      if (Array.isArray(data) && data.length > 0) {
        return data;
      }
    } catch (e) {
      console.warn("Failed to parse local releases.json, trying GitHub API...", e);
    }
  }

  const url = `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases`;
  console.log(`Fetching live releases from ${url}...`);
  const response = await fetch(url, {
    headers: { Accept: "application/vnd.github.v3+json", "User-Agent": "Node-App-Catalog-Generator" },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch releases: ${response.status} ${response.statusText}`);
  }

  return await response.json();
}

/**
 * Performs strict variant segregation by splitting patch builds into
 * Stable, Beta, and specific Variant-grouped builds.
 */
function getSegregatedTracks(patch) {
  const tracks = {
    stable: [],
    beta: [],
    variants: {}
  };

  (patch.builds || []).forEach((build) => {
    const stableAssets = [];
    const betaAssets = [];
    const variantAssetsMap = {};

    (build.assets || []).forEach((asset) => {
      const isVar = Boolean(asset.parsed && asset.parsed.variant);
      if (isVar) {
        const vName = asset.parsed.variant;
        if (!variantAssetsMap[vName]) variantAssetsMap[vName] = [];
        variantAssetsMap[vName].push(asset);
      } else {
        if (build.releaseType === "beta") {
          betaAssets.push(asset);
        } else {
          stableAssets.push(asset);
        }
      }
    });

    if (stableAssets.length > 0) {
      tracks.stable.push({
        build: build.build,
        isArchive: build.isArchive,
        publishedAt: build.publishedAt,
        releaseUrl: build.releaseUrl,
        version: build.version,
        assets: stableAssets
      });
    }

    if (betaAssets.length > 0) {
      tracks.beta.push({
        build: build.build,
        isArchive: build.isArchive,
        publishedAt: build.publishedAt,
        releaseUrl: build.releaseUrl,
        version: build.version,
        assets: betaAssets
      });
    }

    Object.entries(variantAssetsMap).forEach(([vName, assets]) => {
      if (!tracks.variants[vName]) tracks.variants[vName] = [];
      tracks.variants[vName].push({
        build: build.build,
        isArchive: build.isArchive,
        publishedAt: build.publishedAt,
        releaseUrl: build.releaseUrl,
        version: build.version,
        assets: assets
      });
    });
  });

  return tracks;
}

/**
 * Group assets cleanly by their exact architecture, fully separating x86 and x86_64,
 * dynamically populating categories instead of hardcoding initial groupings.
 */
function groupAssetsByArchitecture(assets) {
  const groups = {};

  assets.forEach((asset) => {
    const detectedArch = detectArchitecture(asset.name);
    if (!groups[detectedArch]) {
      groups[detectedArch] = [];
    }
    groups[detectedArch].push(asset);
  });

  // Standard ordering for structured display output
  const order = ["arm64", "arm32", "universal", "x86_64", "x86", "other"];
  const filtered = {};

  order.forEach((arch) => {
    if (groups[arch] && groups[arch].length > 0) {
      filtered[arch] = groups[arch].sort((a, b) => {
        const aIsApk = a.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        const bIsApk = b.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        return aIsApk - bIsApk;
      });
    }
  });

  // Ensure any other dynamic categories from detectArchitecture are cleanly appended
  Object.keys(groups).forEach((arch) => {
    if (!filtered[arch] && groups[arch].length > 0) {
      filtered[arch] = groups[arch].sort((a, b) => {
        const aIsApk = a.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        const bIsApk = b.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        return aIsApk - bIsApk;
      });
    }
  });

  return filtered;
}

/**
 * Builds standard markdown output for a single release block.
 * Note: Avoids header levels like "####" which break nested collapsible lists in GFM.
 */
function renderBuildMarkdown(build, app, patch) {
  const dateStr = formatDate(build.publishedAt);
  const isBeta = build.releaseType === "beta";
  const typeLabel = isBeta ? " (Beta)" : "";
  let md = `* **Version:** <code>${build.version}</code> (Build [${build.build}](${build.releaseUrl})${typeLabel}) - *Released ${dateStr}*\n`;
  
  const archGroups = groupAssetsByArchitecture(build.assets);
  
  Object.entries(archGroups).forEach(([arch, assets]) => {
    const archLabel = formatArchitectureLabel(arch, assets[0].fileType);
    md += `  * \`${archLabel}\`:\n`;
    assets.forEach((asset) => {
      const typeLabel = asset.fileType;
      const sizeLabel = formatBytes(asset.size);
      const dls = asset.download_count ? ` (${formatCompactNumber(asset.download_count)} downloads)` : "";
      md += `    * **[Download ${typeLabel}](${asset.browser_download_url})** - <code>${asset.name}</code> (${sizeLabel})${dls}\n`;
    });
  });
  
  return md;
}

/**
 * Renders the entire application catalog into GFM markdown
 */
function generateMarkdown(catalog) {
  let md = `# Catalog\n\n`;
  md += `This is a dynamically generated catalog of pre-patched Android applications hosted in the repository, providing direct download links for various builds, including stable, beta, and specific variants. Each application entry includes detailed information about available versions, architectures, and release dates.\n\n`;
  md += `📅 *Last generated on: ${new Date().toLocaleDateString("en-US", { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric', hour: '2-digit', minute: '2-digit', second: '2-digit' })} (UTC)*\n\n`;
  
  md += `## 📦 Applications\n\n`;

  catalog.forEach((app) => {
    const slug = normalizeSlug(app.appName);
    md += `<details>\n`;
    md += `<summary>📱 <b>${app.appName}</b></summary>\n\n`;
    md += `### <a name="${slug}"></a>${app.appName}\n\n`;
    
    // Check for applicable app-wide notices
    const lowerAppName = app.appName.toLowerCase();
    const notices = CONFIG.appNotices.filter((notice) => {
      return notice.triggers.some((trigger) => lowerAppName.includes(trigger));
    });

    if (notices.length > 0) {
      notices.forEach((notice) => {
        const type = (notice.type || "warning").toUpperCase();
        md += `> [!${type}]\n`;
        md += `> **${notice.title}**\n`;
        md += `> ${notice.text}\n`;
        if (notice.links && notice.links.length > 0) {
          const linksStr = notice.links.map(l => `[${l.label}](${l.url})`).join(", ");
          md += `> Links: ${linksStr}\n`;
        }
        md += `>\n`;
      });
      md += `\n`;
    }

    // List patches for this app
    app.patches.forEach((patch) => {
      md += `<details>\n`;
      md += `<summary>🛠️ <b>${patch.patchName}</b> (Latest: <code>${patch.latestVersion || "unknown"}</code>)</summary>\n\n`;

      const tracks = getSegregatedTracks(patch);

      // Stable track
      if (tracks.stable.length > 0) {
        md += `##### 🟢 Stable Releases\n\n`;
        md += renderBuildMarkdown(tracks.stable[0], app, patch) + `\n`;
        
        if (tracks.stable.length > 1) {
          md += `<details>\n`;
          md += `<summary>📂 Older Versions</summary>\n\n`;
          tracks.stable.slice(1).forEach((build) => {
            md += renderBuildMarkdown(build, app, patch) + `\n`;
          });
          md += `</details>\n\n`;
        }
      }

      // Beta track
      if (tracks.beta.length > 0) {
        md += `##### 🟡 Beta Releases\n\n`;
        md += renderBuildMarkdown(tracks.beta[0], app, patch) + `\n`;
        
        if (tracks.beta.length > 1) {
          md += `<details>\n`;
          md += `<summary>📂 Older Versions</summary>\n\n`;
          tracks.beta.slice(1).forEach((build) => {
            md += renderBuildMarkdown(build, app, patch) + `\n`;
          });
          md += `</details>\n\n`;
        }
      }

      // Variant tracks
      if (Object.keys(tracks.variants).length > 0) {
        md += `##### 🔵 Specific Variants / Spoofs\n\n`;
        Object.entries(tracks.variants).forEach(([vName, builds]) => {
          md += `* **Variant: ${vName}**\n`;
          md += renderBuildMarkdown(builds[0], app, patch) + `\n`;
          
          if (builds.length > 1) {
            md += `<details>\n`;
            md += `<summary>📂 Older Versions</summary>\n\n`;
            builds.slice(1).forEach((build) => {
              md += renderBuildMarkdown(build, app, patch) + `\n`;
            });
            md += `</details>\n\n`;
          }
        });
      }

      // Obtainium Integration
      const resolvedId = resolveObtainiumAppId(app.appName, patch.patchName, null);
      if (resolvedId) {
        // Find a representative asset to build filter regex
        const sampleAsset = patch.builds[0]?.assets?.find(a => a.name.toLowerCase().endsWith(".apk"));
        let regexObj = null;
        if (sampleAsset) {
          regexObj = buildObtainiumRegexFromAsset(sampleAsset);
        }
        const regexStr = regexObj ? regexObj.regex : ".*";
        
        const obtainiumConfig = {
          id: resolvedId,
          name: `${app.appName} ${patch.patchName}`,
          author: CONFIG.owner,
          url: `https://github.com/${CONFIG.owner}/${CONFIG.repo}`,
          additionalSettings: {
            apkFilterRegEx: regexStr
          }
        };
        const oneClickUrl = `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent("obtainium://app/" + JSON.stringify(obtainiumConfig))}`;

        md += `<details>\n`;
        md += `<summary>🤖 <b>Obtainium Integration</b></summary>\n\n`;
        md += `* **Package ID:** \`${resolvedId}\`\n`;
        md += `* **[Add to Obtainium (One-Click Import)](${oneClickUrl})**\n`;
        md += `* Add this app directly to [Obtainium](https://github.com/Adolfintel/Obtainium) to receive automatic updates:\n`;
        md += `  * **App Source URL:** \`https://github.com/${CONFIG.owner}/${CONFIG.repo}\`\n`;
        md += `  * **Filter Source:** \`Release Title and Asset\`\n`;
        md += `  * **Asset Filter Regex:** \n\`\`\`regex\n${regexStr}\n\`\`\`\n\n`;
        md += `</details>\n\n`;
      }

      md += `</details>\n\n`;
    });

    md += `</details>\n\n`;
    md += `---\n\n`;
  });

  return md;
}

/**
 * Main Runner
 */
async function main() {
  try {
    console.log("-----------------------------------------");
    console.log("Patched APK Catalog Generator starting...");
    console.log("-----------------------------------------");

    const releases = await loadReleases();
    console.log(`Successfully loaded ${releases.length} releases.`);

    const catalog = buildAppCatalog(releases);
    console.log(`Parsed into ${catalog.length} unique application groupings.`);

    // Log the groupings for debugging
    catalog.forEach((app) => {
      console.log(` - App: "${app.appName}" (${app.patches.length} patch types found)`);
      app.patches.forEach((patch) => {
        const variants = patch.builds.flatMap(b => b.assets.map(a => a.parsed.variant)).filter(Boolean);
        const uniqueVariants = Array.from(new Set(variants));
        console.log(`   └─ Patch: "${patch.patchName}" | Versions: ${patch.builds.length} | Variants: [${uniqueVariants.join(", ") || "None"}]`);
      });
    });

    const markdownOutput = generateMarkdown(catalog);
    const outputPath = path.join(process.cwd(), 'CATALOG.md');
    fs.writeFileSync(outputPath, markdownOutput, 'utf-8');

    console.log("-----------------------------------------");
    console.log(`Success! Catalog generated at: ${outputPath}`);
    console.log("-----------------------------------------");
  } catch (err) {
    console.error("Fatal error running generator:", err);
    process.exit(1);
  }
}

// Run if directly called
if (require.main === module) {
  main();
}

module.exports = {
  CONFIG,
  parseAssetDisplay,
  buildAppCatalog,
  generateMarkdown
};
