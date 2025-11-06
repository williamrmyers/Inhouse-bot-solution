import {
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
} from "./signals.js";

// Initialize the agent at application startup.
const botdPromise = import("https://openfpcdn.io/botd/v2").then((Botd) =>
  Botd.load()
);
// Get detection results when you need them.
botdPromise
  .then((botd) => botd.detect())
  .then((result) => setFCookie(result))
  .catch((error) => console.error(error));

const setCookie = (name, value, minutes) => {
  const date = new Date();
  date.setTime(date.getTime() + minutes * 60 * 1000); // Calculate future time in milliseconds
  const expires = "; expires=" + date.toGMTString(); // Convert to GMT string
  document.cookie = name + "=" + value + expires + "; path=/"; // Set the cookie
};

const setFCookie = async (result) => {
  console.log(result);
  const cookieString = result;

  setCookie("fTrack", JSON.stringify(result), 3);
  const data = await fullFrontEndSnapshot();
  console.log(data);
};
