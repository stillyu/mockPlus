export { };

let currentTarget: EventTarget | null = null;

document.addEventListener('contextmenu', e => {
    currentTarget = e.target;
})

chrome.runtime.onMessage.addListener((data, sender, sendMessage) => {
    if (data.action === 'generate') {
        if (currentTarget) {
            const input = currentTarget as HTMLInputElement;
            const event = new CustomEvent('input', { bubbles: true, detail: { value: data.payload } });
            input.value = data.payload;
            input.dispatchEvent(event);
        }
    }
    sendMessage('had received')
})