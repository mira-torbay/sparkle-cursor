document.addEventListener('DOMContentLoaded', () => {
    const applyButton = document.getElementById('applyButton');
    const colorPicker = document.getElementById('colorPicker');

    console.log("applyButton:", applyButton);
    console.log("colorPicker:", colorPicker);
  
    if (applyButton && colorPicker) {
      applyButton.addEventListener('click', () => {
        const color = colorPicker.value;
  
        // save chosen colour to Chrome's storage
        chrome.storage.sync.set({ sparkleColour: color }, () => {
          console.log('Colour saved:', color);
        });
  
        // send colour to content script
        chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
          if (tabs[0].id) {
            chrome.tabs.sendMessage(tabs[0].id, { action: 'updateColour', color: color }, (response) => {
              if (chrome.runtime.lastError) {
                console.error("Could not establish connection:", chrome.runtime.lastError);
              } else {
                console.log("Message sent successfully");
              }
            });
          }
        });
      });
  
      // load saved colour when popup opens
      chrome.storage.sync.get('sparkleColour', (data) => {
        if (data.sparkleColour) {
          colorPicker.value = data.sparkleColour;
        }
      });
    } else {
      console.error("Could not find required elements in the DOM.");
    }
  });