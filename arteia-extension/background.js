chrome.runtime.onInstalled.addListener(() => {
  // Create context menu
  chrome.contextMenus.create({
    id: "arteia-info",
    title: "ℹ️ About ArteIA Forge",
    contexts: ["action"]
  });

  // Set black icon on installation
  chrome.tabs.query({}, (tabs) => {
    tabs.forEach(tab => {
      chrome.action.setIcon({
        tabId: tab.id,
        path: "xt/media/arteia-iso-128-n.png"
      });
    });
  });
});

// Open popup from the context-menu item
chrome.contextMenus.onClicked.addListener((info, tab) => {
  if (info.menuItemId === "arteia-info") {
    chrome.windows.create({
      url: chrome.runtime.getURL("xt/popup.html"),
      type: "popup",
      width: 360,
      height: 500
    });
  }
});

// Inject the script when the toolbar icon is clicked
chrome.action.onClicked.addListener((tab) => {
  chrome.scripting.executeScript({
    target: { tabId: tab.id },
    files: ["xt/injector.js"]
  }, () => {
    // Change icon to yellow after injection
    chrome.action.setIcon({
      path: "xt/media/arteia-iso-128.png",
      tabId: tab.id
    });
  });
});

// 🛠 Restore black icon when the page reloads
chrome.tabs.onUpdated.addListener((tabId, changeInfo, tab) => {
  if (changeInfo.status === "loading") {
    chrome.action.setIcon({
      tabId,
      path: "xt/media/arteia-iso-128-n.png"
    });
  }
});