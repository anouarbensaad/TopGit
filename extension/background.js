console.log("plugin running")
chrome.browserAction.onClicked.addListener(buttonClick)
function buttonClick(){
    console.log("buttomclick")
}