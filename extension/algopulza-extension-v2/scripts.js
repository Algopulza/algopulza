function getTitle() {
  return document.title
}

chrome.scripting.executeScript(
  {
    target: {tabId: window.tabs[0].id}
    func: getTitle
  },
  (result) => {
    console.log(result)
  }
)