# My Chrome Extension

This is a starter project for a Chrome extension built using Node.js and TypeScript. The extension includes a background script, content script, and a popup interface.

## Project Structure

```
my-chrome-extension
├── src
│   ├── background.ts        # Background script for handling events and tasks
│   ├── content.ts          # Content script for interacting with web pages
│   ├── popup
│   │   ├── popup.html      # HTML structure for the popup
│   │   ├── popup.ts        # TypeScript code for the popup
│   │   └── popup.css       # Styles for the popup
│   └── manifest.json       # Configuration file for the Chrome extension
├── package.json             # npm configuration file
├── tsconfig.json            # TypeScript configuration file
└── README.md                # Documentation for the project
```

## Getting Started

1. **Clone the repository:**
   ```
   git clone <repository-url>
   cd my-chrome-extension
   ```

2. **Install dependencies:**
   ```
   npm install
   ```

3. **Build the project:**
   ```
   npm run build
   ```

4. **Load the extension in Chrome:**
   - Open Chrome and navigate to `chrome://extensions/`
   - Enable "Developer mode"
   - Click "Load unpacked" and select the `my-chrome-extension/src` directory.

## Features

- Background script for handling events and background tasks.
- Content script for DOM manipulation and interaction with web pages.
- Popup interface for user interactions.

## License

This project is licensed under the MIT License.