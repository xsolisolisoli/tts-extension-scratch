// This file contains the background script for the Chrome extension. It sets up event listeners and handles background tasks.

chrome.runtime.onInstalled.addListener(() => {
    console.log('Extension installed');
});

chrome.runtime.onMessage.addListener((request, sender, sendResponse) => {
    if (request.action === 'getData') {
        // Handle the request and send a response
        sendResponse({ data: 'Sample data from background script' });
    }
});