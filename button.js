async function chageBackGroundToRed() {
    let [tab] = await chrome.tabs.query({active: true});
    chrome.scripting.executeScript({
        target: {tabId: tab.id},
        func: () => {
            document.body.style.backgroundColor = 'red';
            // alert('hello from extension');
        }
    });
}

document.getElementById("myButton").addEventListener("click", chageBackGroundToRed);