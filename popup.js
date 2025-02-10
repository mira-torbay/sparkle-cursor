document.getElementById('applyButton').addEventListener('click', () => {
    const color = document.getElementById('colorPicker').value;

    // save colour to Chrome's storage
    chrome.storage.sync.set({ sparkleColor: color }, () => {
        console.log('Color saved:', color);
    });

    // send selected color to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        chrome.tabs.sendMessage(tabs[0].id, { action: 'updateColor', color: color });
    });
});

// load saved color when popup opens
chrome.storage.sync.get('sparkleColor', (data) => {
    if (data.sparkleColor) {
        document.getElementById('colorPicker').value = data.sparkleColor;
    }
});