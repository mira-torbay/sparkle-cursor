document.getElementById('applyButton').addEventListener('click', () => {
    const color = document.getElementById('colorPicker').value;

    // save colour to Chrome's storage
    chrome.storage.sync.set({ sparkleColor: color }, () => {
        console.log('Color saved:', color);
    });

    // send selected color to content script
    chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
        if (tabs[0].id) {
          chrome.tabs.sendMessage(tabs[0].id, { action: 'updateColor', color: color }, (response) => {
            if (chrome.runtime.lastError) {
              console.error("Could not establish connection:", chrome.runtime.lastError);
            } else {
              console.log("Message sent successfully");
            }
          });
        }
      });
    });

// load saved color when popup opens
chrome.storage.sync.get('sparkleColor', (data) => {
    if (data.sparkleColor) {
        document.getElementById('colorPicker').value = data.sparkleColor;
    }
});