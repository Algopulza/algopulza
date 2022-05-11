const tabId = getTabId()
chrome.scripting.executeScript(
  {
    target: {tabId: tabId},
    files: ['script.js']
  },
  () => {}
)