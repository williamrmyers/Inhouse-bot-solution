function getNavigatorSignals() {
  const nav = navigator || {};

  return {
    userAgent: nav.userAgent,
    platform: nav.platform,
    language: nav.language,
    languages: nav.languages,
    vendor: nav.vendor,
    webdriver: nav.webdriver === true,
    hardwareConcurrency: nav.hardwareConcurrency,
    deviceMemory: nav.deviceMemory,
    maxTouchPoints: nav.maxTouchPoints,
    cookieEnabled: nav.cookieEnabled,
    doNotTrack: nav.doNotTrack,
  };
}

function getScreenSignals() {
  if (!window.screen) return null;

  return {
    width: screen.width,
    height: screen.height,
    availWidth: screen.availWidth,
    availHeight: screen.availHeight,
    colorDepth: screen.colorDepth,
    pixelRatio: window.devicePixelRatio || 1,
  };
}

function getWebGLSignals() {
  try {
    const canvas = document.createElement("canvas");
    const gl =
      canvas.getContext("webgl") || canvas.getContext("experimental-webgl");
    if (!gl) return null;

    const dbg = gl.getExtension("WEBGL_debug_renderer_info");

    return {
      renderer: dbg ? gl.getParameter(dbg.UNMASKED_RENDERER_WEBGL) : null,
      vendor: dbg ? gl.getParameter(dbg.UNMASKED_VENDOR_WEBGL) : null,
    };
  } catch (e) {
    return null;
  }
}

function getCanvasSample() {
  try {
    const canvas = document.createElement("canvas");
    canvas.width = 150;
    canvas.height = 50;

    const ctx = canvas.getContext("2d");
    ctx.textBaseline = "top";
    ctx.font = '14px "Arial"';
    ctx.fillStyle = "#f60";
    ctx.fillRect(0, 0, 150, 50);
    ctx.fillStyle = "#069";
    ctx.fillText("canvas-test", 2, 15);

    return canvas.toDataURL();
  } catch (e) {
    return null;
  }
}

function getNetworkSignals() {
  const c = navigator.connection;
  if (!c) return null;

  return {
    effectiveType: c.effectiveType,
    downlink: c.downlink,
    rtt: c.rtt,
  };
}

function getPerformanceSignals() {
  if (!performance || !performance.timing) return null;

  const t = performance.timing;

  return {
    navigationStart: t.navigationStart,
    domContentLoaded: t.domContentLoadedEventEnd,
    loadEventEnd: t.loadEventEnd,
  };
}

function checkFont(font) {
  try {
    return document.fonts.check(`12px "${font}"`);
  } catch {
    return null;
  }
}

function getFontSignals() {
  const fonts = ["Arial", "Roboto", "Courier New", "Times New Roman"];
  return fonts.map((f) => ({ font: f, available: checkFont(f) }));
}

function getStorageSignals() {
  function testStorage(store) {
    try {
      store.setItem("_t", "1");
      store.removeItem("_t");
      return true;
    } catch (e) {
      return false;
    }
  }

  return {
    localStorage: testStorage(localStorage),
    sessionStorage: testStorage(sessionStorage),
  };
}

function probeInteraction(durationMs = 800) {
  return new Promise((resolve) => {
    let interacted = false;
    const handler = () => {
      interacted = true;
      cleanup();
      resolve({ interacted: true });
    };

    const events = ["mousemove", "keydown", "pointerdown", "touchstart"];
    const cleanup = () => {
      events.forEach((e) => window.removeEventListener(e, handler));
    };

    events.forEach((e) =>
      window.addEventListener(e, handler, { passive: true })
    );
    setTimeout(() => {
      cleanup();
      resolve({ interacted });
    }, durationMs);
  });
}

async function fullFrontEndSnapshot() {
  return {
    timestamp: Date.now(),
    navigator: getNavigatorSignals(),
    screen: getScreenSignals(),
    webgl: getWebGLSignals(),
    canvas: getCanvasSample(),
    network: getNetworkSignals(),
    performance: getPerformanceSignals(),
    fonts: getFontSignals(),
    storage: getStorageSignals(),
    interaction: await probeInteraction(),
  };
}

export {
  fullFrontEndSnapshot,
  getNavigatorSignals,
  getScreenSignals,
  getWebGLSignals,
  getCanvasSample,
  getNetworkSignals,
  getPerformanceSignals,
  getFontSignals,
  getStorageSignals,
  probeInteraction,
};
