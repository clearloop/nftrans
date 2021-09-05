/**
 *  backgorund entry
 */

function injectedFunction() {
  alert("hello, world");
  document.body.style.backgroundColor = "orange";
}

chrome.runtime.onInstalled.addListener(function () {
  console.log("installed");
});

chrome.tabs.onActivated.addListener((tab) => {
  console.log(tab);
  chrome.scripting.executeScript({
    target: { tabId: tab.tabId, allFrames: true },
    func: injectedFunction,
  });
});
