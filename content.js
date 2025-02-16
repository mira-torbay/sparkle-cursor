let sparkleColour = '#5d00a9'; // default colour

// listen for messages from popup
chrome.runtime.onMessage.addListener((message, sender, sendResponse) => {
    if (message.action === 'updateColour') {
        sparkleColour = message.color;
    }
});

// sparkle cursorrrr
document.addEventListener('mousemove', (event) => {
    const sparkle = document.createElement('div');
    sparkle.className = 'sparkle';

    // set css vars
    sparkle.style.setProperty('--sparkle-colour1', lightenColour(sparkleColour, 40));
    sparkle.style.setProperty('--sparkle-colour2', sparkleColour);
    sparkle.style.setProperty('--sparkle-shadow', lightenColour(sparkleColour, 20));

    sparkle.style.left = `${event.pageX}px`;
    sparkle.style.top = `${event.pageY}px`;
    document.body.appendChild(sparkle);

    setTimeout(() => {
        sparkle.remove();
    }, 700);
});

// darken colour helper function (will implement in dark mode or based on background?)
function darkenColour(color, percent) {
    let num = parseInt(color.slice(1), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) - amt,
        G = (num >> 8 & 0x00FF) - amt,
        B = (num & 0x0000FF) - amt;

    return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
}

// lighten colour helper function
function lightenColour(color, percent) {
    let num = parseInt(color.slice(1), 16),
        amt = Math.round(2.55 * percent),
        R = (num >> 16) + amt,
        G = (num >> 8 & 0x00FF) + amt,
        B = (num & 0x0000FF) + amt;

    return `#${(0x1000000 + (R < 255 ? R < 1 ? 0 : R : 255) * 0x10000 +
        (G < 255 ? G < 1 ? 0 : G : 255) * 0x100 +
        (B < 255 ? B < 1 ? 0 : B : 255)).toString(16).slice(1)}`;
}
