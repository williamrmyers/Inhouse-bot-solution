function detectBot() {
  const detectors = {
    webDriver: navigator.webdriver, // Checks if the browser is controlled by automation
    headlessBrowser: navigator.userAgent.includes("Headless"), // Detects headless browsers
    noLanguages: (navigator.languages?.length || 0) === 0, // Checks if no languages are set, uncommon for regular users
    inconsistentEval: detectInconsistentEval(), // Check for inconsistent eval lengths
  };
  // 1. Stores the detection results and the final verdict
  const detections = {};
  let verdict = { bot: false };

  // 2. Iterates over the detectors and sets the verdict to true if any of them detects bot-like activity
  for (const detectorName in detectors) {
    const detectorResult = detectors[detectorName];
    detections[detectorName] = { bot: detectorResult };
    if (detectorResult) {
      verdict = { bot: true }; // Sets the verdict to true at the first detection of bot-like activity
    }
  }

  // 3. Returns the detection results and the final verdict
  return { detections, verdict };
}

function detectInconsistentEval() {
  let length = eval.toString().length;
  let userAgent = navigator.userAgent.toLowerCase();
  let browser;

  if (userAgent.indexOf("edg/") !== -1) {
    browser = "edge";
  } else if (
    userAgent.indexOf("trident") !== -1 ||
    userAgent.indexOf("msie") !== -1
  ) {
    browser = "internet_explorer";
  } else if (userAgent.indexOf("firefox") !== -1) {
    browser = "firefox";
  } else if (
    userAgent.indexOf("opera") !== -1 ||
    userAgent.indexOf("opr") !== -1
  ) {
    browser = "opera";
  } else if (userAgent.indexOf("chrome") !== -1) {
    browser = "chrome";
  } else if (userAgent.indexOf("safari") !== -1) {
    browser = "safari";
  } else {
    browser = "unknown";
  }

  if (browser === "unknown") return false;

  return (
    (length === 33 && !["chrome", "opera", "edge"].includes(browser)) ||
    (length === 37 && !["firefox", "safari"].includes(browser)) ||
    (length === 39 && !["internet_explorer"].includes(browser))
  );
}

const { detections, verdict } = detectBot();
document.getElementById("result").innerText = verdict.bot
  ? "Bot detected"
  : "No bot detected"; // Displays the detection result on the web page
console.log(JSON.stringify(verdict, null, 2)); // Logs the final verdict
console.log(JSON.stringify(detections, null, 2)); // Logs detailed detections
