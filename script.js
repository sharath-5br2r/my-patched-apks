/** * ==========================================
 * CONFIGURATION & CUSTOMIZATION
 * Edit these values to update the app catalog behavior, branding, and notices.
 * ==========================================
 */
const CONFIG = {
  owner: "sharath-5br2r",
  repo: "my-patched-apks",
  cacheDuration: 1, // Cache duration in minutes

  // App Categories for the top filter buttons (maps filter-btn dataset to keywords)
  appCategories: {
    google: ["youtube", "google"],
    amazon: ["amazon", "primevideo"],
    games: ["geode", "levilauncher", "eden", "zalithlauncher", "dolphin" ],
    meta: ["threads", "instagram", "messenger", "facebook", "!plusmessenger"],
    vpn: ["1111warp", "vpnify", "vpn"]
  },

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
    "All Document Reader": "alldocumentsreader.documentviewer",
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
    "Google Keyboard": {
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
    "LeviLauncher Unlocked": {
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
    "Moon+ Reader": "com.flyersoft.moonreader",
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
    "Zalith Launcher 2 Plus": {
      default: "com.movtery.zalithlauncher.v2",
      "Call of Duty Mobile Spoof": "com.activision.callofduty.shooter",
    },
    "ZalithLauncher": {
      default: "com.movtery.zalithlauncher.v2",
      "Call of Duty Mobile Spoof": "com.activision.callofduty.shooter",
    }
  },

  // App-specific notices to display on App Cards
  appNotices: [
    {
      triggers: ["youtube", "google", "gboard"], // App name keywords that trigger this notice
      type: "note",
      className: "microg-note", // Defines the CSS prefix
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

// State
let allReleases = [];
let cachedFullCatalog = [];
let searchTerm = "";
let appViewFilter = "all";
let dynamicAppFilters = [];
let currentAppCatalog = [];
let activeModalAppKey = null;
let activeModalPatchKey = null;
let modalBuildFilter = "all";
let themeMode = "system";

// Render State for Infinite Scroll
let currentVisibleCount = 0;
const RENDER_CHUNK_SIZE = 50;

const SHARED_APP_WORD_MIN_COUNT = 2;

// Caches for Memoization
const parseCache = new Map();
const tokenCache = new Map();

// Initialize
document.addEventListener("DOMContentLoaded", () => {
  setupTheme();
  setupEventListeners();

  // Pre-fill search from ?q= URL param
  const urlQuery = new URLSearchParams(window.location.search).get("q");
  if (urlQuery) {
    searchTerm = urlQuery.toLowerCase();
    const searchInput = document.getElementById("searchInput");
    searchInput.value = urlQuery;
    searchInput.closest(".search-input-wrap").classList.add("has-value");
  }

  loadReleases();
});

// Theme Management
function setupTheme() {
  const savedTheme = localStorage.getItem("theme");
  themeMode =
    savedTheme === "light" || savedTheme === "dark" || savedTheme === "system"
      ? savedTheme
      : "system";

  applyTheme(themeMode);

  const mediaQuery = window.matchMedia("(prefers-color-scheme: light)");
  mediaQuery.addEventListener("change", () => {
    if (themeMode !== "system") {
      return;
    }
    applyTheme("system");
  });
}

function applyTheme(theme) {
  const isLight =
    theme === "light"
      ? true
      : theme === "dark"
        ? false
        : window.matchMedia("(prefers-color-scheme: light)").matches;

  document.body.classList.toggle("light-mode", isLight);
  const themeBtn = document.getElementById("themeBtn");
  themeBtn.textContent =
    theme === "system" ? "🖥️" : theme === "light" ? "☀️" : "🌙";
  themeBtn.setAttribute("aria-label", `Theme mode: ${theme}`);
}

// Event Listeners
function setupEventListeners() {
  let searchTimeout;

  // Theme button
  document.getElementById("themeBtn").addEventListener("click", () => {
    const nextTheme =
      themeMode === "system"
        ? "light"
        : themeMode === "light"
          ? "dark"
          : "system";
    themeMode = nextTheme;
    localStorage.setItem("theme", nextTheme);
    applyTheme(nextTheme);
  });

  const menuBtn = document.getElementById("menuBtn");
  const actionMenu = document.getElementById("actionMenu");

  if (menuBtn && actionMenu) {
    menuBtn.addEventListener("click", (e) => {
      e.stopPropagation();
      actionMenu.classList.toggle("open");
      menuBtn.setAttribute(
        "aria-expanded",
        actionMenu.classList.contains("open"),
      );
    });

    document.addEventListener("click", (e) => {
      if (
        actionMenu.classList.contains("open") &&
        !actionMenu.contains(e.target)
      ) {
        actionMenu.classList.remove("open");
        menuBtn.setAttribute("aria-expanded", "false");
      }
    });
  }

  // 1. Debounced Search Input
  const searchInput = document.getElementById("searchInput");
  const searchWrap = searchInput.closest(".search-input-wrap");
  const searchClearBtn = document.getElementById("searchClearBtn");

  const syncClearBtn = () => {
    searchWrap.classList.toggle("has-value", searchInput.value.length > 0);
  };

  searchInput.addEventListener("input", (e) => {
    syncClearBtn();
    clearTimeout(searchTimeout);
    searchTimeout = setTimeout(() => {
      searchTerm = e.target.value.toLowerCase();

      // Sync ?q= in the URL so results are shareable
      const url = new URL(window.location);
      if (searchTerm) {
        url.searchParams.set("q", e.target.value);
      } else {
        url.searchParams.delete("q");
      }
      history.replaceState(null, "", url);

      filterAndRenderReleases();
    }, 250);
  });

  searchClearBtn.addEventListener("click", () => {
    searchInput.value = "";
    searchTerm = "";
    syncClearBtn();
    history.replaceState(null, "", location.pathname);
    filterAndRenderReleases();
  });

  searchInput.addEventListener("focus", (e) => {
    if (window.innerWidth <= 768) {
      const searchBox = e.target.closest(".search-box") || e.target;
      const y = searchBox.getBoundingClientRect().top + window.scrollY - 15;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  });

  const appFilterButtons = document.getElementById("appFilterButtons");
  if (appFilterButtons) {
    appFilterButtons.addEventListener("click", (e) => {
      const filterBtn = e.target.closest(".filter-btn");
      if (!filterBtn) return;

      appViewFilter = filterBtn.dataset.filter || "all";
      filterAndRenderReleases();
    });
  }

  document.getElementById("builds").addEventListener("click", (e) => {
    const trigger = e.target.closest(".patch-open-box");
    if (trigger) {
      e.preventDefault();
      e.stopPropagation();
      openPatchModal(
        trigger.dataset.appKey,
        trigger.dataset.patchKey,
        trigger.dataset.filter || "all",
      );
      return;
    }

    const collapsedCard = e.target.closest(".app-card:not([open])");
    if (collapsedCard && !e.target.closest(".app-card-summary")) {
      collapsedCard.open = true;
      return;
    }
  });

  document.getElementById("patchModal").addEventListener("click", (e) => {
    const downloadBtn = e.target.closest(".download-btn");
    if (downloadBtn) {
      e.stopPropagation();
      return;
    }

    const filterBtn = e.target.closest(".modal-filter-btn");
    if (filterBtn) {
      if (filterBtn.disabled) return;
      modalBuildFilter = filterBtn.dataset.filter;
      renderOpenPatchModal();
      return;
    }

    if (e.target.id === "patchModal" || e.target.closest(".modal-close")) {
      closePatchModal();
    }
  });

  document.getElementById("obtainiumBtn").addEventListener("click", (e) => {
    e.stopPropagation();
    openObtainiumModal();
  });

  document.getElementById("obtainiumModal").addEventListener("click", (e) => {
    if (e.target.id === "obtainiumModal" || e.target.closest(".modal-close")) {
      closeObtainiumModal();
    }
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closePatchModal();
      closeObtainiumModal();
    }
  });

  // 2. Infinite Scroll Observer
  const observer = new IntersectionObserver(
    (entries) => {
      if (entries[0].isIntersecting) {
        renderNextChunk();
      }
    },
    { rootMargin: "400px" },
  );

  const sentinel = document.createElement("div");
  sentinel.id = "scroll-sentinel";
  sentinel.style.height = "1px";
  document.getElementById("builds").after(sentinel);

  observer.observe(sentinel);
}

// Fetch releases from local static cache (generated by GitHub Actions)
async function loadReleases() {
  try {
    // 1. Trigger the yellow spinning state immediately
    setPillState("checking", "Checking for updates...");

    const cached = getCachedReleases();
    if (cached) {
      allReleases = cached;
      document.getElementById("loading").style.display = "none";
      document.getElementById("error").style.display = "none";
      rebuildCatalogCache();
      updateLastUpdateTimestamp();
      filterAndRenderReleases();
      return;
    }

    document.getElementById("loading").style.display = "block";
    document.getElementById("error").style.display = "none";

    // Add a timestamp to bypass GitHub Pages CDN cache
    const cacheBuster = new Date().getTime();
    let fetchedData = null;
    let useFallback = true;

    try {
      const response = await fetch(`releases.json?v=${cacheBuster}`);
      if (response.ok) {
        const data = await response.json();
        if (Array.isArray(data) && data.length > 0) {
          fetchedData = data;
          useFallback = false;
        }
      }
    } catch (e) {
      console.warn(
        "Network error fetching releases.json (likely file:// protocol).",
        e,
      );
    }

    // Fallback to live API if releases.json is missing, empty, or fetch threw an error
    if (useFallback) {
      console.warn(
        "Static cache not found or empty. Falling back to live API...",
      );
      const response = await fetch(
        `https://api.github.com/repos/${CONFIG.owner}/${CONFIG.repo}/releases`,
        { headers: { Accept: "application/vnd.github.v3+json" } },
      );

      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }

      fetchedData = await response.json();
    }

    allReleases = fetchedData;

    cacheReleases(allReleases);
    rebuildCatalogCache();

    document.getElementById("loading").style.display = "none";
    updateLastUpdateTimestamp();
    filterAndRenderReleases();
  } catch (error) {
    console.error("Error loading releases:", error);

    // 2. Trigger the red error state if fetching fails
    setPillState("error", "Failed to check updates");

    document.getElementById("loading").style.display = "none";
    document.getElementById("error").style.display = "block";
    document.getElementById("error").textContent =
      `Failed to load releases: ${error.message}`;
  }
}

// Caching utilities for LocalStorage
function getCachedReleases() {
  const cached = localStorage.getItem("releases_cache");
  const timestamp = localStorage.getItem("releases_cache_time");

  if (!cached || !timestamp) return null;

  const age = (Date.now() - parseInt(timestamp)) / (1000 * 60);
  if (age > CONFIG.cacheDuration) {
    localStorage.removeItem("releases_cache");
    localStorage.removeItem("releases_cache_time");
    return null;
  }

  return JSON.parse(cached);
}

function cacheReleases(releases) {
  localStorage.setItem("releases_cache", JSON.stringify(releases));
  localStorage.setItem("releases_cache_time", Date.now().toString());
}

// Build and cache the full app catalog — called once when release data changes
function rebuildCatalogCache() {
  cachedFullCatalog = buildAppCatalog(allReleases.filter((r) => !r.draft));
  dynamicAppFilters = getDynamicAppFilters(cachedFullCatalog);
}

// Apply a search query to an already-built catalog without rebuilding from scratch
function filterCatalogBySearch(catalog, query) {
  if (!query) return catalog;
  return catalog
    .map((app) => ({
      app,
      score: getAppSearchScore(app.appName, query),
    }))
    .filter((item) => item.score !== Infinity)
    .sort(
      (a, b) => a.score - b.score || a.app.appName.localeCompare(b.app.appName),
    )
    .map((item) => item.app);
}

// Filter and render releases
function filterAndRenderReleases() {
  renderDynamicAppFilterButtons(dynamicAppFilters);

  if (
    appViewFilter.startsWith("word-") &&
    !dynamicAppFilters.some((filter) => filter.key === appViewFilter)
  ) {
    appViewFilter = "all";
  }

  const searchedCatalog = filterCatalogBySearch(cachedFullCatalog, searchTerm);
  const filteredApps = applyAppViewFilter(searchedCatalog);

  renderAppCards(filteredApps);
  updateAppFilterButtons();
  document.getElementById("loading").style.display = "none";
}

function updateAppFilterButtons() {
  document.querySelectorAll("#appFilterButtons .filter-btn").forEach((btn) => {
    btn.classList.toggle("active", btn.dataset.filter === appViewFilter);
  });
}

function getAppLatestPublishedAt(app) {
  return app.patches.reduce((latest, patch) => {
    const patchTime = new Date(patch.latestPublishedAt).getTime();
    return Number.isNaN(patchTime) ? latest : Math.max(latest, patchTime);
  }, 0);
}

function getAppTotalDownloads(app) {
  let total = 0;
  (app.patches || []).forEach((patch) => {
    (patch.builds || []).forEach((build) => {
      (build.assets || []).forEach((asset) => {
        total += asset.download_count || 0;
      });
    });
  });
  return total;
}

function getAppSearchScore(appName, query) {
  const normalizedQuery = normalizeForSearch(query);
  const normalizedAppName = normalizeForSearch(appName);
  if (!normalizedQuery || !normalizedAppName) return Infinity;

  if (normalizedAppName === normalizedQuery) return 0;
  if (normalizedAppName.startsWith(normalizedQuery)) return 1;

  const appTokens = getSearchTokens(appName);
  if (appTokens.length === 0) return Infinity;

  const exactTokenMatch = appTokens.some((token) => token === normalizedQuery);
  if (exactTokenMatch) return 2;

  const tokenPrefixMatch = appTokens.some((token) =>
    token.startsWith(normalizedQuery),
  );
  if (tokenPrefixMatch) return 3;

  if (normalizedAppName.includes(normalizedQuery)) return 4;

  return Infinity;
}

function applyAppViewFilter(apps) {
  if (CONFIG.appCategories[appViewFilter]) {
    return apps.filter((app) => {
      const name = normalizeForSearch(app.appName);
      const keywords = CONFIG.appCategories[appViewFilter];

      const includes = keywords.filter(k => !k.startsWith("!"));
      const excludes = keywords.filter(k => k.startsWith("!")).map(k => k.slice(1));

      const isIncluded = includes.some((keyword) => name.includes(keyword));
      const isExcluded = excludes.some((keyword) => name.includes(keyword));

      return isIncluded && !isExcluded;
    });
  }

  if (appViewFilter.startsWith("word-")) {
    const word = appViewFilter.slice(5);
    return apps.filter((app) => getAppNameWords(app.appName).includes(word));
  }

  if (appViewFilter === "recent") {
    return [...apps].sort(
      (a, b) => getAppLatestPublishedAt(b) - getAppLatestPublishedAt(a),
    );
  }

  if (appViewFilter === "popular") {
    return [...apps].sort(
      (a, b) => getAppTotalDownloads(b) - getAppTotalDownloads(a),
    );
  }

  return apps;
}

function buildAppCatalog(releases, query = "") {
  const normalizedQuery = normalizeForSearch(query);
  const sortedReleases = [...releases].sort(
    (a, b) => new Date(b.published_at) - new Date(a.published_at),
  );

  const appMap = new Map();

  sortedReleases.forEach((release) => {
    const isArchive =
      release.tag_name === "stable" || release.tag_name === "beta";
    let releaseType = release.prerelease ? "beta" : "stable";
    if (release.tag_name === "stable") releaseType = "stable";
    if (release.tag_name === "beta") releaseType = "beta";

    (release.assets || []).forEach((asset) => {
      const fileType = getFileType(asset.name);
      const parsed = parseAssetDisplay(asset.name, fileType);
      const arch = detectArchitecture(asset.name);

      if (!assetMatchesSearch(parsed, asset, release, query, normalizedQuery)) {
        return;
      }

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
      setLatestBuildMeta(appEntry, releaseType, release);

      const patchKey = normalizeForSearch(parsed.patchName) || "patchedbuild";
      if (!appEntry.patches.has(patchKey)) {
        appEntry.patches.set(patchKey, {
          patchKey,
          patchName: parsed.patchName,
          latestVersion: null, // Wait for a real date
          latestPublishedAt: 0,
          latestStable: null,
          latestBeta: null,
          latestVariant: null,
          latestArchiveStable: null, // NEW FALLBACK
          latestArchiveBeta: null, // NEW FALLBACK
          builds: new Map(),
        });
      }

      const patchEntry = appEntry.patches.get(patchKey);
      const buildLabel = getBuildNumberLabel(release);

      // Get the true date of the APK upload
      const buildDateString = isArchive
        ? asset.updated_at || asset.created_at || release.published_at
        : release.published_at;
      const buildDateMs = new Date(buildDateString).getTime();

      // STRICT PROTECTION: Only update the App Card timestamps if it is NOT an archive!
      if (!isArchive) {
        const patchDate = new Date(patchEntry.latestPublishedAt).getTime();

        if (buildDateMs > patchDate) {
          patchEntry.latestVersion = parsed.version;
          patchEntry.latestPublishedAt = buildDateString;
        }

        if (!parsed.variant) {
          setLatestPatchMeta(
            patchEntry,
            releaseType,
            parsed.version,
            buildLabel,
            buildDateString,
          );
        } else {
          setLatestVariantMeta(
            patchEntry,
            parsed.variant,
            parsed.version,
            buildLabel,
            buildDateString,
          );
        }
      } else {
        // FALLBACK: Quietly track the newest archive for Dead Apps
        // FIX: Only track non-variants for the generic Stable/Beta fallback boxes!
        if (!parsed.variant) {
          if (releaseType === "stable") {
            const currentMs = patchEntry.latestArchiveStable
              ? new Date(patchEntry.latestArchiveStable.publishedAt).getTime()
              : 0;
            if (buildDateMs > currentMs) {
              patchEntry.latestArchiveStable = {
                version: parsed.version,
                build: buildLabel,
                publishedAt: buildDateString,
              };
            }
          } else if (releaseType === "beta") {
            const currentMs = patchEntry.latestArchiveBeta
              ? new Date(patchEntry.latestArchiveBeta.publishedAt).getTime()
              : 0;
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

      // Split archives into their own separate dropdowns based on Version!
      const buildKey = isArchive
        ? `archive-${releaseType}-${parsed.version}`
        : String(release.id);
      if (!patchEntry.builds.has(buildKey)) {
        patchEntry.builds.set(buildKey, {
          releaseId: release.id,
          build: isArchive ? parsed.version : getBuildNumberLabel(release),
          releaseType,
          isArchive, // Flag for the modal
          publishedAt: isArchive
            ? asset.updated_at || asset.created_at || release.published_at
            : release.published_at,
          releaseUrl: release.html_url,
          version: parsed.version,
          assets: [],
        });
      }

      const buildEntry = patchEntry.builds.get(buildKey);
      const exists = buildEntry.assets.some(
        (existing) => existing.name === asset.name,
      );
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
      // NEW: Apply fallback dates for archive-only apps before sorting
      app.patches.forEach((patch) => {
        if (!patch.latestStable && patch.latestArchiveStable) {
          patch.latestStable = patch.latestArchiveStable;
          patch.latestStable.isArchiveFallback = true;
          const archiveMs = new Date(
            patch.latestArchiveStable.publishedAt,
          ).getTime();
          const currentMs = patch.latestPublishedAt
            ? new Date(patch.latestPublishedAt).getTime()
            : 0;
          if (archiveMs > currentMs) {
            patch.latestVersion = patch.latestArchiveStable.version;
            patch.latestPublishedAt = patch.latestArchiveStable.publishedAt;
          }
        }
        if (!patch.latestBeta && patch.latestArchiveBeta) {
          patch.latestBeta = patch.latestArchiveBeta;
          patch.latestBeta.isArchiveFallback = true;
          const archiveMs = new Date(
            patch.latestArchiveBeta.publishedAt,
          ).getTime();
          const currentMs = patch.latestPublishedAt
            ? new Date(patch.latestPublishedAt).getTime()
            : 0;
          if (archiveMs > currentMs) {
            patch.latestVersion = patch.latestArchiveBeta.version;
            patch.latestPublishedAt = patch.latestArchiveBeta.publishedAt;
          }
        }
      });

      return {
        ...app,
        patches: Array.from(app.patches.values())
          .sort(
            (a, b) =>
              new Date(b.latestPublishedAt) - new Date(a.latestPublishedAt),
          )
          .map((patch) => ({
            ...patch,
            // Sink archives to the bottom!
            builds: Array.from(patch.builds.values()).sort((a, b) => {
              // 1. If one is an archive and the other isn't, sink the archive
              if (a.isArchive && !b.isArchive) return 1;
              if (!a.isArchive && b.isArchive) return -1;

              // 2. If BOTH are archives, sort them nicely by version number (highest first)
              if (a.isArchive && b.isArchive) {
                const versionComparison = b.version.localeCompare(
                  a.version,
                  undefined,
                  { numeric: true, sensitivity: "base" },
                );
                if (versionComparison !== 0) return versionComparison;
                // If same version, sort by date (newest first)
                return new Date(b.publishedAt) - new Date(a.publishedAt);
              }

              // 3. Otherwise (normal builds), just sort by date
              return new Date(b.publishedAt) - new Date(a.publishedAt);
            }),
          })),
      };
    })
    .filter((app) => app.patches.length > 0)
    .sort((a, b) => a.appName.localeCompare(b.appName));
}

function assetMatchesSearch(parsed, asset, release, rawQuery, normalizedQuery) {
  if (!rawQuery) return true;

  return [
    parsed.appName,
    parsed.patchName,
    parsed.version,
    parsed.archLabel,
    parsed.fileType,
    asset.name,
    release.name || "",
    release.tag_name || "",
  ].some((value) =>
    matchesSearch(String(value || ""), rawQuery, normalizedQuery),
  );
}

function setLatestBuildMeta(appEntry, releaseType, release) {
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
}

function setLatestPatchMeta(
  patchEntry,
  releaseType,
  version,
  build,
  publishedAt,
) {
  const key = releaseType === "beta" ? "latestBeta" : "latestStable";
  const current = patchEntry[key];
  const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
  const releaseDate = new Date(publishedAt).getTime();

  if (!current || releaseDate > currentDate) {
    patchEntry[key] = { version, build, publishedAt };
  }
}

function setLatestVariantMeta(
  patchEntry,
  variant,
  version,
  build,
  publishedAt,
) {
  const current = patchEntry.latestVariant;
  const currentDate = current ? new Date(current.publishedAt).getTime() : 0;
  const releaseDate = new Date(publishedAt).getTime();

  if (!current || releaseDate > currentDate) {
    patchEntry.latestVariant = { variant, version, build, publishedAt };
  }
}

function getBuildNumberLabel(release) {
  return String(release.tag_name || release.name || "N/A");
}

// Render app cards to DOM (Progressive Rendering)
function renderAppCards(apps) {
  const buildsContainer = document.getElementById("builds");
  currentAppCatalog = apps;
  currentVisibleCount = 0;

  buildsContainer.innerHTML = "";

  if (apps.length === 0) {
    buildsContainer.innerHTML = '<div class="no-results">No apps found.</div>';
    return;
  }

  renderNextChunk();
}

function renderNextChunk() {
  const buildsContainer = document.getElementById("builds");
  const nextChunk = currentAppCatalog.slice(
    currentVisibleCount,
    currentVisibleCount + RENDER_CHUNK_SIZE,
  );

  if (nextChunk.length === 0) return;

  const tempDiv = document.createElement("div");
  tempDiv.innerHTML = nextChunk.map((app) => createAppCard(app)).join("");

  while (tempDiv.firstChild) {
    buildsContainer.appendChild(tempDiv.firstChild);
  }

  currentVisibleCount += RENDER_CHUNK_SIZE;
}
function createNoticeMarkup(notice) {
  // Safe default fallback: if notice.links is missing, use an empty array
  const links = notice.links || [];
  
  // Only render the wrapper div if there are actual links to display
  const linksMarkup = links.length > 0 
    ? `
            <div class="app-notice-links">
                ${links
                  .map(
                    (link) => `<a href="${link.url}" target="_blank" rel="noopener noreferrer">${escapeHtml(link.label)}</a>`,
                  )
                  .join("\n                    ")}
            </div>`
    : ""; // Drops the empty container completely

  const emoji = notice.type === "warning" ? "⚠️" : "ℹ️";
  const typeClass = notice.type === "warning" ? "notice-warning" : "notice-note";

  return `
        <div class="app-notice ${typeClass} ${escapeHtml(notice.className)}">
            <div class="app-notice-title">${emoji} ${escapeHtml(notice.title)}</div>
            <div class="app-notice-text">${escapeHtml(notice.text)}</div>${linksMarkup}
        </div>
    `;
}

function createAppCard(app) {
  const patchesMarkup = app.patches
    .map((patch) => createPatchMarkup(app, patch))
    .join("");

  let noticesMarkup = "";
  CONFIG.appNotices.forEach((notice) => {
    const matches = notice.triggers.some((trigger) =>
      normalizeForSearch(app.appName).includes(trigger),
    );
    if (matches) {
      noticesMarkup += createNoticeMarkup(notice);
    }
  });

  return `
        <details class="build-card app-card">
            <summary class="app-card-summary">
                <div class="build-header">
                    <div class="app-name">${escapeHtml(app.appName)}</div>
                    <span class="patch-count">${app.patches.length} patch${app.patches.length > 1 ? "es" : ""}</span>
                </div>
            </summary>
            <div class="app-card-body">
                ${noticesMarkup}
                <div class="patches-title">Available patches</div>
                <div class="patches-list">
                    ${patchesMarkup}
                </div>
            </div>
        </details>
    `;
}

function getDynamicAppFilters(apps) {
  const wordToAppKeys = new Map();

  apps.forEach((app) => {
    const words = getAppNameWords(app.appName);
    words.forEach((word) => {
      if (!wordToAppKeys.has(word)) {
        wordToAppKeys.set(word, new Set());
      }
      wordToAppKeys.get(word).add(app.appKey);
    });
  });

  const allWordEntries = Array.from(wordToAppKeys.entries());
  const categoryKeys = new Set(Object.keys(CONFIG.appCategories));
  const dynamicFilters = allWordEntries
    .filter(([word, appKeys]) => appKeys.size >= SHARED_APP_WORD_MIN_COUNT && !categoryKeys.has(word))
    .sort((a, b) => a[0].localeCompare(b[0])) // Strictly alphabetical sort
    .map(([word]) => ({
      key: `word-${word}`,
      label: toFilterLabel(word),
    }));

  const categoryFilters = Object.keys(CONFIG.appCategories).map(key => ({
    key: key,
    label: toFilterLabel(key),
  }));

  return [...categoryFilters, ...dynamicFilters];
}

function renderDynamicAppFilterButtons(filters) {
  const filterButtons = document.getElementById("appFilterButtons");
  if (!filterButtons) return;

  filterButtons
    .querySelectorAll(".dynamic-filter-btn")
    .forEach((btn) => btn.remove());

  filters.forEach((filter) => {
    const button = document.createElement("button");
    button.className = "filter-btn dynamic-filter-btn";
    button.dataset.filter = filter.key;
    button.type = "button";
    button.textContent = filter.label;
    filterButtons.appendChild(button);
  });

  // --- ALPHABETICAL SORTING LOGIC ---
  // 1. Grab every button inside the filter container
  const allBtns = Array.from(filterButtons.querySelectorAll(".filter-btn"));

  // 2. Separate the fixed buttons from the ones we want to sort, in exact order!
  const fixedKeys = ["all", "recent", "popular"];
  const fixedBtns = [];
  fixedKeys.forEach((key) => {
    const foundBtn = allBtns.find((btn) => btn.dataset.filter === key);
    if (foundBtn) fixedBtns.push(foundBtn);
  });

  const sortableBtns = allBtns.filter(
    (btn) => !fixedKeys.includes(btn.dataset.filter),
  );

  // 3. Sort the remaining buttons alphabetically by their text label
  sortableBtns.sort((a, b) => a.textContent.localeCompare(b.textContent));

  // 4. Re-append them to the container in the exact order we want
  fixedBtns.forEach((btn) => filterButtons.appendChild(btn));
  sortableBtns.forEach((btn) => filterButtons.appendChild(btn));
}

function getAppNameWords(appName) {
  const words = (appName || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean)
    .filter((word) => word.length >= 3)
    .filter((word) => !CONFIG.sharedAppWordStoplist.has(word));

  return Array.from(new Set(words));
}

function toFilterLabel(value) {
  const lower = (value || "").toLowerCase();
  if (CONFIG.brandOverrides[lower]) {
    return CONFIG.brandOverrides[lower];
  }
  return value.replace(/\b[a-z]/g, (char) => char.toUpperCase());
}

function getPatchTotalDownloads(patch) {
  let total = 0;
  (patch.builds || []).forEach((b) => {
    (b.assets || []).forEach((asset) => {
      total += asset.download_count || 0;
    });
  });
  return total;
}

function createPatchMarkup(app, patch) {
  const buildCount = patch.builds.length;
  const allMeta = [
    patch.latestStable,
    patch.latestBeta,
    patch.latestVariant,
  ].filter(Boolean);
  const latestBuild =
    allMeta.length > 0
      ? allMeta.reduce((a, b) =>
        new Date(a.publishedAt) > new Date(b.publishedAt) ? a : b,
      ).build
      : null;

  const boxes = [];

  if (patch.latestStable) {
    const buildMarkup = patch.latestStable.isArchiveFallback
      ? ""
      : `<span class="patch-meta-build">Build ${escapeHtml(patch.latestStable.build || "N/A")}</span>`;
    boxes.push({
      label: "Stable",
      html: `
            <button class="patch-open-box stable" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="stable" type="button">
                <span class="patch-meta-label">
                    <span class="channel-label stable">Stable</span>
                </span>
                <span class="patch-meta-value">${escapeHtml(patch.latestStable.version)}</span>
                ${buildMarkup}
                <span class="patch-meta-date">${formatDate(patch.latestStable.publishedAt)}</span>
            </button>
        `,
    });
  }

  if (patch.latestBeta) {
    const buildMarkup = patch.latestBeta.isArchiveFallback
      ? ""
      : `<span class="patch-meta-build">Build ${escapeHtml(patch.latestBeta.build || "N/A")}</span>`;
    boxes.push({
      label: "Beta",
      html: `
            <button class="patch-open-box beta" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="beta" type="button">
                <span class="patch-meta-label">
                    <span class="channel-label beta">Beta</span>
                </span>
                <span class="patch-meta-value">${escapeHtml(patch.latestBeta.version)}</span>
                ${buildMarkup}
                <span class="patch-meta-date">${formatDate(patch.latestBeta.publishedAt)}</span>
            </button>
        `,
    });
  }

  const variants = getUniqueVariants(patch);
  variants.forEach((variant) => {
    const latestVariantBuild = getLatestVariantBuild(patch, variant);
    if (latestVariantBuild) {
      const buildMarkup = latestVariantBuild.isArchiveFallback
        ? ""
        : `<span class="patch-meta-build">Build ${escapeHtml(latestVariantBuild.build || "N/A")}</span>`;
      boxes.push({
        label: variant,
        html: `
                <button class="patch-open-box variant" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="variant-${variant}" type="button">
                    <span class="patch-meta-label">
                        <span class="channel-label ${latestVariantBuild.releaseType}">${escapeHtml(latestVariantBuild.releaseType)}</span>
                        <span class="variant-label">${escapeHtml(variant.split(" + ").join("+"))}</span>
                    </span>
                    <span class="patch-meta-value">${escapeHtml(latestVariantBuild.version)}</span>
                    ${buildMarkup}
                    <span class="patch-meta-date">${formatDate(latestVariantBuild.publishedAt)}</span>
                </button>
            `,
      });
    }
  });

  // Keep logical order: Stable -> Beta -> Variants
  const patchMetaBoxes = boxes.map((b) => b.html);

  if (patchMetaBoxes.length === 0) {
    patchMetaBoxes.push(`
            <button class="patch-open-box" data-app-key="${app.appKey}" data-patch-key="${patch.patchKey}" data-filter="all" type="button">
                <span class="patch-meta-label">Latest</span>
                <span class="patch-meta-value">${escapeHtml(patch.latestVersion)}</span>
                <span class="patch-meta-date">${formatDate(patch.latestPublishedAt)}</span>
            </button>
        `);
  }

  const buildIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-right: 2px;"><polygon points="12 2 2 7 12 12 22 7 12 2"></polygon><polyline points="2 12 12 17 22 12"></polyline><polyline points="2 17 12 22 22 17"></polyline></svg>`;
  const buildCountBadge = `<span class="patch-build-count" title="${buildCount} Build${buildCount > 1 ? "s" : ""}">${buildIcon}${buildCount}</span>`;

  const patchDownloads = getPatchTotalDownloads(patch);
  const dlIcon = `<svg width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" style="vertical-align: -1px; margin-right: 2px;"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path><polyline points="7 10 12 15 17 10"></polyline><line x1="12" y1="15" x2="12" y2="3"></line></svg>`;
  const dlBadge =
    patchDownloads > 0
      ? `<span class="patch-downloads-count" title="${formatCompactNumber(patchDownloads)} Downloads">${dlIcon}${formatCompactNumber(patchDownloads)}</span>`
      : "";

  const patchChipsMarkup = patch.patchName
    .split(" + ")
    .map((name) => `<span class="patch-chip">${escapeHtml(name)}</span>`)
    .join("");

  return `
        <div class="patch-entry">
            <div class="patch-trigger-left">
                <div class="patch-chip-group">
                    ${patchChipsMarkup}
                    ${buildCountBadge}
                    ${dlBadge}
                </div>
                <div class="patch-meta-grid">
                    ${patchMetaBoxes.join("")}
                </div>
            </div>
        </div>
    `;
}

function openPatchModal(appKey, patchKey, preferredFilter = "all") {
  activeModalAppKey = appKey;
  activeModalPatchKey = patchKey;

  const app = currentAppCatalog.find((item) => item.appKey === appKey);
  const patch = app
    ? app.patches.find((item) => item.patchKey === patchKey)
    : null;
  const hasStableBuild = patch
    ? getFilteredBuildsForFilter(patch, "stable").length > 0
    : false;
  const hasBetaBuild = patch
    ? getFilteredBuildsForFilter(patch, "beta").length > 0
    : false;
  const hasVariantBuild = patch
    ? getFilteredBuildsForFilter(patch, "variant").length > 0
    : false;
  const variants = patch ? getUniqueVariants(patch) : []; // Retrieve variants list

  const prefersStable = preferredFilter === "stable" && hasStableBuild;
  const prefersBeta = preferredFilter === "beta" && hasBetaBuild;
  const prefersSpecificVariant =
    preferredFilter.startsWith("variant-") &&
    getFilteredBuildsForFilter(patch, preferredFilter).length > 0;
  const prefersGenericVariant =
    preferredFilter === "variant" && hasVariantBuild;
  const prefersVersion =
    preferredFilter.startsWith("version-") &&
    getFilteredBuildsForFilter(patch, preferredFilter).length > 0;

  if (prefersStable) {
    modalBuildFilter = "stable";
  } else if (prefersBeta) {
    modalBuildFilter = "beta";
  } else if (prefersSpecificVariant) {
    modalBuildFilter = preferredFilter;
  } else if (prefersGenericVariant) {
    modalBuildFilter =
      variants.length === 1 ? `variant-${variants[0]}` : "variant";
  } else if (prefersVersion) {
    modalBuildFilter = preferredFilter;
  } else if (hasStableBuild) {
    modalBuildFilter = "stable";
  } else if (hasBetaBuild) {
    modalBuildFilter = "beta";
  } else if (hasVariantBuild) {
    modalBuildFilter =
      variants.length === 1 ? `variant-${variants[0]}` : "variant";
  } else {
    modalBuildFilter = "all";
  }

  renderOpenPatchModal();

  const modal = document.getElementById("patchModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");
}

function closePatchModal() {
  const modal = document.getElementById("patchModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
  activeModalAppKey = null;
  activeModalPatchKey = null;
}

function openObtainiumModal() {
  const modal = document.getElementById("obtainiumModal");
  modal.classList.add("open");
  modal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-open");

  const body = document.getElementById("obtainiumBody");
  body.innerHTML = createObtainiumInstructions();
}

function closeObtainiumModal() {
  const modal = document.getElementById("obtainiumModal");
  modal.classList.remove("open");
  modal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-open");
}

function createObtainiumInstructions() {
  const repoUrl = `https://github.com/${CONFIG.owner}/${CONFIG.repo}`;
  const obtainiumLatestUrl =
    "https://github.com/ImranR98/Obtainium/releases/latest";
  const app = currentAppCatalog.find(
    (item) => item.appKey === activeModalAppKey,
  );
  const patch = app
    ? app.patches.find((item) => item.patchKey === activeModalPatchKey)
    : null;

  const filteredBuilds = patch
    ? getFilteredBuildsForFilter(patch, modalBuildFilter)
    : [];
  const fallbackBuilds = patch ? getFilteredBuildsForFilter(patch, "all") : [];
  const sourceBuilds =
    filteredBuilds.length > 0 ? filteredBuilds : fallbackBuilds;
  const patchAssets = sourceBuilds.flatMap((build) => build.assets || []);

  const regexMap = new Map();
  patchAssets
    .filter((asset) => (asset?.name || "").toLowerCase().endsWith(".apk"))
    .forEach((asset) => {
      const result = buildObtainiumRegexFromAsset(asset);
      if (!result?.regex || regexMap.has(result.regex)) return;

      const appLabel = asset?.parsed?.appName || app?.appName || "App";
      const patchLabel =
        asset?.parsed?.patchName || patch?.patchName || "patch";
      const variantLabel = asset?.parsed?.variant
        ? ` (${escapeHtml(asset.parsed.variant)})`
        : "";

      // Extract normalized slugs for patch/variant-specific app ID lookup
      const patchSlug =
        asset?.parsed?.patchSlug || normalizeForSearch(patch?.patchName || "");
      const variantSlug = asset?.parsed?.variant
        ? normalizeForSearch(asset.parsed.variant)
        : "default";

      // Save both the label and lookup keys
      regexMap.set(result.regex, {
        label: `${appLabel} ${patchLabel}${variantLabel}`,
        patchSlug: patchSlug,
        variantSlug: variantSlug,
      });
    });

  const copyCode = (text, defaultLabel = "Copy") => {
    const escaped = escapeForOnclickCopy(text);
    return `onclick="navigator.clipboard.writeText('${escaped}').then(() => { this.textContent='Copied!'; setTimeout(() => { this.textContent='${defaultLabel}'; }, 2000); })" `;
  };

  const selectedExamplesMarkup =
    Array.from(regexMap.entries()).length > 0
      ? Array.from(regexMap.entries())
        .map(([regex, data]) => {
          const label = data.label;
          const patchSlug = data.patchSlug;
          const variantSlug = data.variantSlug;
          const appId = resolveObtainiumAppId(
            activeModalAppKey,
            patchSlug,
            variantSlug,
          );

          if (!appId)
            console.warn(
              `Missing App ID for: ${activeModalAppKey} (Patch: ${patchSlug}, Variant: ${variantSlug})`,
            );

          const additionalSettings = { apkFilterRegEx: regex };
          if (modalBuildFilter === "beta") {
            additionalSettings.includePrereleases = true;
          }

          // Conditionally generate the Obtainium button HTML
          let obtainiumButtonHtml = "";
          if (appId) {
            const obtainiumConfig = {
              id: appId,
              name: label,
              author: CONFIG.owner,
              url: repoUrl,
              additionalSettings: JSON.stringify(additionalSettings),
            };
            const configStr = JSON.stringify(obtainiumConfig);
            const directUrl = `obtainium://app/${encodeURIComponent(configStr)}`;
            const oneClickUrl = `https://apps.obtainium.imranr.dev/redirect?r=${encodeURIComponent("obtainium://app/" + configStr)}`;
            obtainiumButtonHtml = `
              <a href="${directUrl}" class="copy-btn obtainium-add-btn direct-link" target="_blank" rel="noopener noreferrer">Add to Obtainium</a>
              <a href="${oneClickUrl}" class="copy-btn obtainium-add-btn redirect-link" target="_blank" rel="noopener noreferrer">Add to Obtainium (Redirect)</a>
            `;
          }

          return `
                    <div class="example">
                        <strong>${escapeHtml(label)}</strong>
                        <div class="code-with-copy ${appId ? "" : "no-obtainium"}">
                            <code>${escapeHtml(regex)}</code>
                            ${obtainiumButtonHtml}
                            <button type="button" class="copy-btn" ${copyCode(regex, "Copy Regex")}>Copy Regex</button>
                        </div>
                    </div>`;
        })
        .join("")
      : `
                    <div class="example">
                        <strong>No APK URLs found for this patch.</strong>
                    </div>`;

  const betaPrereleaseStepMarkup =
    modalBuildFilter === "beta" ? "<li>Enable include prereleases.</li>" : "";

  const variantStepMarkup = modalBuildFilter.startsWith("variant")
    ? "<li>To get beta updates enable include prereleases.</li>"
    : "";

  return `
        <div class="obtainium-instructions">
            <ol>
                <li>Download and install Obtainium from <a href="${obtainiumLatestUrl}" target="_blank" rel="noopener noreferrer">GitHub</a>.</li>
                <li>Open Obtainium on your device.</li>
                <li>Tap Add app.</li>
                <li>In the app source URL box, enter:
                    <div class="instruction-code">
                        <code>${escapeHtml(repoUrl)}</code>
                        <button type="button" class="copy-btn" ${copyCode(repoUrl)}>Copy</button>
                    </div>
                </li>
                <li>Scroll down to filter APKs by regular expression and enter regex for the APK you want:
                    <div class="filter-examples">
                        ${selectedExamplesMarkup}
                    </div>
                </li>
                ${betaPrereleaseStepMarkup}
                ${variantStepMarkup}
                <li>Tap add to begin downloading. In future, Obtainium will automatically fetch updates when new releases are published.</li>
            </ol>
        </div>
    `;
}

function tokenizeAndPreserveHyphens(str) {
  const hyphenBrands = Object.keys(CONFIG.brandOverrides)
    .filter(key => key.includes("-"))
    .sort((a, b) => b.length - a.length);

  let processed = str;
  hyphenBrands.forEach((brand) => {
    const escapedBrand = escapeRegex(brand);
    const regex = new RegExp(escapedBrand, "gi");
    processed = processed.replace(regex, (match) => {
      return match.replace(/-/g, "TEMPHYPHEN");
    });
  });

  const tokens = processed.split(/[^a-zA-Z0-9]+/).filter(Boolean);
  return tokens.map(token => token.replace(/TEMPHYPHEN/g, "-"));
}

function buildObtainiumRegexFromAsset(asset) {
  if (!asset || !asset.name) return null;
  const assetName = asset.name;
  if (!assetName.toLowerCase().endsWith(".apk")) return null;

  const parsed = asset.parsed || parseAssetDisplay(assetName, "APK");
  const cleanName = parsed.cleanName || assetName.replace(/\.apk$/i, "");
  const appNameRaw = parsed.appNameRaw || parsed.appName || "";

  const allTokens = tokenizeAndPreserveHyphens(cleanName);
  const appTokens = appNameRaw ? tokenizeAndPreserveHyphens(appNameRaw) : [];

  const regexTokens = [];
  allTokens.forEach((token, index) => {
    if (!token) return;

    // Always keep app name tokens
    if (index < appTokens.length) {
      regexTokens.push({ value: token, isRegex: false });
      return;
    }

    // Check if version token starting with v/V
    if (isVersionToken(token)) {
      const lastToken = regexTokens[regexTokens.length - 1];
      if (!lastToken || lastToken.value !== "(v\\w*\\d|\\d|vbuild)") {
        regexTokens.push({ value: "(v\\w*\\d|\\d|vbuild)", isRegex: true });
      }
      return;
    }

    // Keep if known patch token or known variant keyword
    const lower = token.toLowerCase();
    const isPatch = CONFIG.knownPatchTokens.has(lower);
    const isVariant = CONFIG.variantKeywords.has(lower) || 
                      (lower.startsWith("v") && CONFIG.variantKeywords.has(lower.slice(1)));

    if (isPatch || isVariant) {
      regexTokens.push({ value: token, isRegex: false });
    }
  });

  let regex;
  if (regexTokens.length > 0) {
    const escapedTokens = regexTokens.map(t => t.isRegex ? t.value : escapeRegex(t.value));
    regex = `^.*${escapedTokens.join(".*")}.*\\.apk$`;
  } else {
    regex = `^.*\\.apk$`;
  }

  return { regex, assetName };
}

function escapeRegex(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function escapeForOnclickCopy(value) {
  return String(value || "")
    .replace(/\\/g, "\\\\")
    .replace(/'/g, "\\'");
}

function resolveObtainiumAppId(appKeyOrName, patchNameOrSlug, variantNameOrSlug) {
  let appConfig = CONFIG.appIds[appKeyOrName];
  if (!appConfig) {
    // Try normalized match across all keys of CONFIG.appIds
    const normalizedKey = normalizeForSearch(appKeyOrName);
    const matchedKey = Object.keys(CONFIG.appIds).find(
      (k) => normalizeForSearch(k) === normalizedKey
    );
    if (matchedKey) {
      appConfig = CONFIG.appIds[matchedKey];
    }
  }
  if (!appConfig) return null;

  if (typeof appConfig === "string") return appConfig;
  if (typeof appConfig !== "object") return null;

  // 1. Resolve nested patch configs by splitting on ' + ' combinations
  let patchConfig = null;
  if (patchNameOrSlug) {
    const individualPatches = patchNameOrSlug.split(" + ");
    for (const p of individualPatches) {
      const normalizedP = normalizeForSearch(p);
      patchConfig = appConfig[p] || appConfig[normalizedP];
      if (!patchConfig) {
        const matchedPatchKey = Object.keys(appConfig).find(
          (k) => normalizeForSearch(k) === normalizedP
        );
        if (matchedPatchKey) {
          patchConfig = appConfig[matchedPatchKey];
        }
      }
      if (patchConfig) break;
    }
  }

  const resolvedVariant = variantNameOrSlug || "default";
  const individualVariants = resolvedVariant.split(" + ");

  if (patchConfig) {
    if (typeof patchConfig === "string") return patchConfig;
    if (typeof patchConfig === "object" && patchConfig !== null) {
      // Evaluate matching variant configurations under the nested patch
      for (const v of individualVariants) {
        const normalizedV = normalizeForSearch(v);
        let val = patchConfig[v] || patchConfig[normalizedV];
        if (!val) {
          const matchedVariantKey = Object.keys(patchConfig).find(
            (k) => normalizeForSearch(k) === normalizedV
          );
          if (matchedVariantKey) {
            val = patchConfig[matchedVariantKey];
          }
        }
        if (val) return val;
      }
      return patchConfig.default || null;
    }
  }

  // 2. Fallback to direct flat/nested variant lookups on app config level
  for (const v of individualVariants) {
    const normalizedV = normalizeForSearch(v);
    let variantConfig = appConfig[v] || appConfig[normalizedV];
    if (!variantConfig) {
      const matchedVariantKey = Object.keys(appConfig).find(
        (k) => normalizeForSearch(k) === normalizedV
      );
      if (matchedVariantKey) {
        variantConfig = appConfig[matchedVariantKey];
      }
    }
    if (typeof variantConfig === "string") return variantConfig;
    if (typeof variantConfig === "object" && variantConfig !== null) {
      return variantConfig.default || null;
    }
  }

  return appConfig.default || null;
}

function renderOpenPatchModal() {
  if (!activeModalAppKey || !activeModalPatchKey) return;

  const app = currentAppCatalog.find(
    (item) => item.appKey === activeModalAppKey,
  );
  if (!app) return;

  const patch = app.patches.find(
    (item) => item.patchKey === activeModalPatchKey,
  );
  if (!patch) return;

  const body = document.getElementById("patchModalBody");
  const title = document.getElementById("patchModalTitle");
  title.textContent = `${app.appName} • ${patch.patchName}`;

  updateModalFilterButtons(patch);
  body.innerHTML = createPatchModalContent(patch, modalBuildFilter);
}

function getUniqueVariants(patch) {
  const variants = new Set();
  (patch.builds || []).forEach((build) => {
    (build.assets || []).forEach((asset) => {
      if (asset?.parsed?.variant) {
        variants.add(asset.parsed.variant);
      }
    });
  });
  return Array.from(variants).sort();
}

function getUniqueVersions(patch) {
  const versions = new Set();
  (patch.builds || []).forEach((build) => {
    (build.assets || []).forEach((asset) => {
      if (asset?.parsed?.version) {
        versions.add(asset.parsed.version);
      }
    });
  });

  // OPTIMIZATION: Semantic version sorting using natural numeric collation.
  // Correctly sorts "v11.80" as newer than "v9.80".
  return Array.from(versions).sort((a, b) =>
    b.localeCompare(a, undefined, { numeric: true, sensitivity: "base" }),
  );
}

function getLatestVariantBuild(patch, variantName) {
  let latestNormal = null;
  let latestArchive = null;
  let latestNormalDate = 0;
  let latestArchiveDate = 0;

  (patch.builds || []).forEach((build) => {
    const variantAsset = (build.assets || []).find(
      (asset) => asset?.parsed?.variant === variantName,
    );
    if (variantAsset) {
      const buildDate = new Date(build.publishedAt).getTime();

      if (!build.isArchive) {
        if (buildDate > latestNormalDate) {
          latestNormalDate = buildDate;
          latestNormal = {
            version: variantAsset.parsed.version,
            build: build.build,
            publishedAt: build.publishedAt,
            isArchiveFallback: false,
            releaseType: build.releaseType,
          };
        }
      } else {
        if (buildDate > latestArchiveDate) {
          latestArchiveDate = buildDate;
          latestArchive = {
            version: variantAsset.parsed.version,
            build: build.build,
            publishedAt: build.publishedAt,
            isArchiveFallback: true,
            releaseType: build.releaseType,
          };
        }
      }
    }
  });

  return latestNormal || latestArchive;
}

function updateModalFilterButtons(patch = null) {
  const hasStableBuild = patch
    ? getFilteredBuildsForFilter(patch, "stable").length > 0
    : true;
  const hasBetaBuild = patch
    ? getFilteredBuildsForFilter(patch, "beta").length > 0
    : true;
  const hasVariantBuild = patch
    ? getFilteredBuildsForFilter(patch, "variant").length > 0
    : false;
  const variants = patch ? getUniqueVariants(patch) : [];

  const showGenericVariant = hasVariantBuild && variants.length > 1;

  const versions = patch ? getUniqueVersions(patch).slice(0, 5) : [];

  const activeTypesCount =
    (hasStableBuild ? 1 : 0) +
    (hasBetaBuild ? 1 : 0) +
    (hasVariantBuild ? 1 : 0);

  if (
    modalBuildFilter === "variant" &&
    hasVariantBuild &&
    variants.length === 1
  ) {
    modalBuildFilter = `variant-${variants[0]}`;
  }

  if (modalBuildFilter === "all" && activeTypesCount <= 1) {
    modalBuildFilter = hasStableBuild
      ? "stable"
      : hasBetaBuild
        ? "beta"
        : hasVariantBuild
          ? variants.length === 1
            ? `variant-${variants[0]}`
            : "variant"
          : "all";
  } else if (modalBuildFilter === "stable" && !hasStableBuild) {
    modalBuildFilter = hasBetaBuild
      ? "beta"
      : hasVariantBuild
        ? variants.length === 1
          ? `variant-${variants[0]}`
          : "variant"
        : "all";
  } else if (modalBuildFilter === "beta" && !hasBetaBuild) {
    modalBuildFilter = hasStableBuild
      ? "stable"
      : hasVariantBuild
        ? variants.length === 1
          ? `variant-${variants[0]}`
          : "variant"
        : "all";
  } else if (modalBuildFilter === "variant" && !showGenericVariant) {
    modalBuildFilter = hasStableBuild
      ? "stable"
      : hasBetaBuild
        ? "beta"
        : "all";
  } else if (modalBuildFilter.startsWith("variant-") && !hasVariantBuild) {
    modalBuildFilter = hasStableBuild
      ? "stable"
      : hasBetaBuild
        ? "beta"
        : "all";
  } else if (modalBuildFilter.startsWith("version-")) {
    const activeVersion = modalBuildFilter.slice(8);
    if (
      !versions.includes(activeVersion) ||
      getFilteredBuildsForFilter(patch, modalBuildFilter).length === 0
    ) {
      modalBuildFilter = hasStableBuild
        ? "stable"
        : hasBetaBuild
          ? "beta"
          : hasVariantBuild
            ? variants.length === 1
              ? `variant-${variants[0]}`
              : "variant"
            : "all";
    }
  }

  document.querySelectorAll(".modal-filter-btn").forEach((btn) => {
    const filter = btn.dataset.filter;

    if (!["all", "stable", "beta", "variant"].includes(filter)) return;

    let available = false;
    if (filter === "all") available = activeTypesCount > 1;
    else if (filter === "stable") available = hasStableBuild;
    else if (filter === "beta") available = hasBetaBuild;
    else if (filter === "variant") available = showGenericVariant;

    btn.style.display = available ? "" : "none";
    btn.disabled = !available;
    btn.classList.toggle("active", available && filter === modalBuildFilter);
  });

  const filterButtonsContainer = document.querySelector(
    ".modal-filter-buttons",
  );

  if (filterButtonsContainer) {
    filterButtonsContainer
      .querySelectorAll(".variant-btn, .version-btn, .filter-separator")
      .forEach((btn) => btn.remove());

    if (variants.length > 0) {
      const separator = document.createElement("span");
      separator.className = "filter-separator";
      separator.textContent = "•";
      filterButtonsContainer.appendChild(separator);

      variants.forEach((variant) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "modal-filter-btn variant-btn";
        btn.dataset.filter = `variant-${variant}`;
        btn.textContent = variant;
        btn.disabled = false;
        btn.classList.toggle(
          "active",
          `variant-${variant}` === modalBuildFilter,
        );
        filterButtonsContainer.appendChild(btn);
      });
    }

    if (versions.length > 1) {
      versions.forEach((version) => {
        const btn = document.createElement("button");
        btn.type = "button";
        btn.className = "modal-filter-btn version-btn";
        btn.dataset.filter = `version-${version}`;
        btn.textContent = version;
        btn.disabled = false;
        btn.classList.toggle(
          "active",
          `version-${version}` === modalBuildFilter,
        );
        filterButtonsContainer.appendChild(btn);
      });
    }
  }
}

function createPatchModalContent(patch, buildFilter = "all") {
  const builds = getFilteredBuildsForFilter(patch, buildFilter);

  if (builds.length === 0) {
    return '<div class="no-results">No builds in this filter.</div>';
  }

  return builds
    .map((build, index) => createModalBuildMarkup(build, index === 0))
    .join("");
}

function getFilteredBuildsForFilter(patch, buildFilter = "all") {
  return (patch.builds || [])
    .map((build) => ({
      ...build,
      assets: getFilteredAssets(build, buildFilter),
    }))
    .filter((build) => build.assets.length > 0);
}

function getFilteredAssets(build, buildFilter) {
  const assets = build.assets || [];

  if (buildFilter === "stable") {
    if (build.releaseType !== "stable") return [];
    return assets.filter((asset) => !isVariantAsset(asset));
  }

  if (buildFilter === "beta") {
    if (build.releaseType !== "beta") return [];
    return assets.filter((asset) => !isVariantAsset(asset));
  }

  if (buildFilter === "variant") {
    return assets.filter((asset) => isVariantAsset(asset));
  }

  if (buildFilter.startsWith("variant-")) {
    const variantName = buildFilter.slice(8);
    return assets.filter((asset) => asset?.parsed?.variant === variantName);
  }

  if (buildFilter.startsWith("version-")) {
    const version = buildFilter.slice(8);
    return assets.filter((asset) => asset?.parsed?.version === version);
  }

  return assets;
}

function isVariantAsset(asset) {
  return Boolean(asset?.parsed?.variant);
}

function createModalBuildMarkup(build, openByDefault = false) {
  const assetsByArch = groupAssetsByArchitecture(build.assets);

  const buildBadgeClass =
    build.releaseType === "beta" ? "prerelease" : "stable";
  const badgeText = build.releaseType === "beta" ? "Beta" : "Stable";

  const archiveBadgeMarkup = build.isArchive
    ? '<span class="release-badge archive">Archive</span>'
    : "";
  const titleText = build.isArchive
    ? escapeHtml(build.build)
    : `Build ${escapeHtml(build.build)}`;

  const hasVariantAssets = build.assets.some((asset) => isVariantAsset(asset));
  let downloadsMarkup = "";

  const uniqueBuildVersions = Array.from(
    new Set(build.assets.map((a) => a.parsed?.version).filter(Boolean)),
  ).join(" / ");

  // Remove the app version string from the date line if it is an archive
  const dateText = build.isArchive
    ? formatDate(build.publishedAt)
    : `${formatDate(build.publishedAt)} • ${escapeHtml(uniqueBuildVersions)}`;

  Object.entries(assetsByArch).forEach(([arch, assets]) => {
    if (assets.length === 0) return;

    downloadsMarkup += `<div class="asset-group"><div class="asset-group-label">${capitalizeArch(arch)}</div>`;
    assets.forEach((asset) => {
      const sizeStr = formatBytes(asset.size);

      const downloads = formatCompactNumber(asset.download_count || 0);

      const variantBadge = asset.parsed.variant
        ? `<span class="variant-badge">${escapeHtml(asset.parsed.variant)}</span>`
        : "";
      downloadsMarkup += `
                <a href="${asset.browser_download_url}"
                   class="download-btn ${arch}"
                   target="_blank"
                   rel="noopener noreferrer"
                   download
                   title="${asset.name}">
                    <span class="asset-left">
                        <span class="asset-title">${escapeHtml(asset.parsed.appName)}</span>
                        <span class="asset-subtitle">${escapeHtml(asset.parsed.patchName)} • ${escapeHtml(asset.parsed.version)}</span>
                    </span>
                    <span class="asset-right">
                        ${variantBadge}
                        <span class="btn-text">${escapeHtml(asset.parsed.archLabel)} • ${asset.fileType} • ${sizeStr} • ${downloads}</span>
                    </span>
                </a>`;
    });
    downloadsMarkup += `</div>`;
  });

  const modalBadges = [];
  if (build.isArchive) {
    modalBadges.push({
      label: "Archive",
      html: '<span class="release-badge archive">Archive</span>',
    });
  }
  modalBadges.push({
    label: badgeText,
    html: `<span class="release-badge ${buildBadgeClass}">${badgeText}</span>`,
  });
  if (hasVariantAssets) {
    modalBadges.push({
      label: "Variant",
      html: '<span class="variants-indicator">Variant</span>',
    });
  }

  // Sort the small pill badges alphabetically (Archive -> Beta/Stable -> Variant)
  modalBadges.sort((a, b) => a.label.localeCompare(b.label));
  const badgeGroupMarkup = modalBadges
    .map((b) => b.html)
    .join("\n                    ");

  return `
        <details class="modal-build-card" ${openByDefault ? "open" : ""}>
            <summary class="modal-build-summary">
                <div class="modal-build-header">
                    <div class="modal-build-header-left">
                        <div class="modal-build-title">${titleText}</div>
                        <div class="modal-build-date">${dateText}</div>
                    </div>
                    <span class="badge-group">
                        ${badgeGroupMarkup}
                    </span>
                </div>
            </summary>
            <div class="modal-build-downloads">
                ${downloadsMarkup || '<p style="color: var(--text-secondary); font-size: 0.9rem;">No downloads available</p>'}
                <a href="${build.releaseUrl}" target="_blank" class="release-link patch-release-link">View source release →</a>
            </div>
        </details>
    `;
}

function groupAssetsByArchitecture(assets) {
  const groups = {
    arm64: [],
    arm32: [],
    universal: [],
    x86_64: [],
    x86: [],
    other: [],
  };

  assets.forEach((asset) => {
    const detectedArch = detectArchitecture(asset.name);
    groups[detectedArch].push(asset);
  });

  const filtered = {};
  ["arm64", "arm32", "universal", "x86_64", "x86", "other"].forEach((arch) => {
    if (groups[arch].length > 0) {
      const sorted = groups[arch].sort((a, b) => {
        const aIsApk = a.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        const bIsApk = b.name.toLowerCase().endsWith(".apk") ? 0 : 1;
        return aIsApk - bIsApk;
      });
      filtered[arch] = sorted;
    }
  });

  return filtered;
}

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

  const allPatchesAndVariants = [...patches, ...variants].sort((a, b) => a.index - b.index);
  const firstPatchOrVariantIndex = allPatchesAndVariants.length > 0 ? allPatchesAndVariants[0].index : cleanName.length;

  const result = {
    appName,
    patchName,
    appSlug,
    patchSlug,
    variant: variantStr,
    version: displayVersion,
    versionIndex: versions.length > 0 ? versions[0].index : -1,
    firstPatchOrVariantIndex,
    cleanName,
    appNameRaw,
    patchTokens: patches.map(p => p.token),
    variantTokens: activeVariants.map(v => v.token),
    archLabel: formatArchitectureLabel(archCategory, fileType),
    fileType,
  };

  parseCache.set(filename, result);
  return result;
}

function capitalizeArch(arch) {
  const map = {
    arm64: "ARM64",
    arm32: "ARM32",
    universal: "Universal",
    x86_64: "x86_64",
    x86: "X86",
    other: "Other",
  };
  return map[arch] || arch;
}

function formatBytes(bytes) {
  if (bytes === 0) return "0 B";
  const k = 1024,
    sizes = ["B", "KB", "MB", "GB"];
  const i = Math.floor(Math.log(bytes) / Math.log(k));
  return Math.round((bytes / Math.pow(k, i)) * 100) / 100 + " " + sizes[i];
}

function formatCompactNumber(n) {
  if (n >= 1_000_000)
    return (
      (n / 1_000_000).toFixed(n % 1_000_000 === 0 ? 0 : 1).replace(/\.0$/, "") +
      "M"
    );
  if (n >= 1_000)
    return (
      (n / 1_000).toFixed(n % 1_000 === 0 ? 0 : 1).replace(/\.0$/, "") + "k"
    );
  return String(n);
}

function formatDate(value) {
  return new Date(value).toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });
}

function normalizeForSearch(value) {
  return (value || "").toLowerCase().replace(/[^a-z0-9]/g, "");
}

function matchesSearch(value, rawQuery, normalizedQuery) {
  const lowerValue = (value || "").toLowerCase();
  const normalizedValue = normalizeForSearch(lowerValue);

  if (lowerValue.includes(rawQuery)) return true;
  if (!normalizedQuery) return false;
  if (normalizedValue.includes(normalizedQuery)) return true;
  if (normalizedQuery.length < 4) return false;

  const queryTokens = getSearchTokens(rawQuery);
  const valueTokens = getSearchTokens(lowerValue);

  if (queryTokens.length === 0 || valueTokens.length === 0) return false;

  return queryTokens.every((queryToken) =>
    valueTokens.some((valueToken) => tokensFuzzyMatch(queryToken, valueToken)),
  );
}

// Cached Search Tokens
function getSearchTokens(value) {
  if (tokenCache.has(value)) {
    return tokenCache.get(value);
  }
  const tokens = (value || "")
    .toLowerCase()
    .split(/[^a-z0-9]+/)
    .filter(Boolean);
  tokenCache.set(value, tokens);
  return tokens;
}

function tokensFuzzyMatch(queryToken, valueToken) {
  if (!queryToken || !valueToken) return false;
  if (valueToken.includes(queryToken)) return true;
  if (queryToken.length < 3) return false;
  const maxDistance = getMaxEditDistance(queryToken.length);
  return isWithinEditDistance(queryToken, valueToken, maxDistance);
}

function getMaxEditDistance(length) {
  if (length <= 4) return 1;
  if (length <= 8) return 2;
  return 3;
}

function isWithinEditDistance(a, b, maxDistance) {
  if (Math.abs(a.length - b.length) > maxDistance) return false;

  const bLength = b.length;
  let previousRow = new Array(bLength + 1);
  for (let j = 0; j <= bLength; j++) previousRow[j] = j;

  for (let i = 1; i <= a.length; i++) {
    const currentRow = new Array(bLength + 1);
    currentRow[0] = i;
    let rowMin = currentRow[0];

    for (let j = 1; j <= bLength; j++) {
      const cost = a[i - 1] === b[j - 1] ? 0 : 1;
      currentRow[j] = Math.min(
        previousRow[j] + 1,
        currentRow[j - 1] + 1,
        previousRow[j - 1] + cost,
      );
      if (currentRow[j] < rowMin) rowMin = currentRow[j];
    }

    if (rowMin > maxDistance) return false;
    previousRow = currentRow;
  }

  return previousRow[bLength] <= maxDistance;
}

function escapeHtml(text) {
  return String(text ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");
}

// Update the last updated timestamp based on the newest release
function updateLastUpdateTimestamp() {
  if (!allReleases || allReleases.length === 0) {
    setPillState("success", "No releases found");
    return;
  }

  const latestTime = allReleases.reduce((max, release) => {
    const t = new Date(release.published_at).getTime();
    return t > max ? t : max;
  }, 0);

  if (latestTime === 0) return;

  const dateStr = new Date(latestTime).toLocaleString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
  setPillState("success", dateStr);
}

// Manages the visual state of the Update Pill (No click events)
function setPillState(state, text) {
  const textEl = document.getElementById("lastUpdateText");
  if (!textEl) return;

  const pill = textEl.closest(".update-pill");
  if (!pill) return;

  // Remove old colors and apply the new one
  pill.classList.remove("checking", "error", "success");
  pill.classList.add(state);
  textEl.textContent = text;

  // Swap the SVG icon to match the state
  const svgContainer = pill.querySelector("svg");
  if (!svgContainer) return;

  if (state === "checking") {
    svgContainer.innerHTML =
      '<path d="M21.5 2v6h-6M2.5 22v-6h6M2 11.5a10 10 0 0 1 18.8-4.3M22 12.5a10 10 0 0 1-18.8 4.3"/>';
    svgContainer.classList.add("spin");
  } else if (state === "error") {
    svgContainer.innerHTML =
      '<circle cx="12" cy="12" r="10"></circle><line x1="15" y1="9" x2="9" y2="15"></line><line x1="9" y1="9" x2="15" y2="15"></line>';
    svgContainer.classList.remove("spin");
  } else if (state === "success") {
    svgContainer.innerHTML =
      '<path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline>';
    svgContainer.classList.remove("spin");
  }
}
