chrome.runtime.onMessage.addListener(function (msg, sender) {
  if ((msg.event === 'pageAction:show')) {
    chrome.pageAction.show(sender.tab.id);
  }
});