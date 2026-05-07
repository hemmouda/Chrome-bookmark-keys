# Chrome bookmark keys &nbsp; ![DEVELOPMENT STATUS: completed](https://badgen.net/badge/DEVELOPMENT%20STATUS/completed/green)

A local Google Chrome extension that lets you quickly open bookmarks from your bookmarks bar using number keys on a custom New Tab page.

I mainly made it so that I don't have to take my hands of the keyboard to access my bookmarks.

## How-to:

1. Download ([click here](https://github.com/hemmouda/Chrome-bookmark-keys/archive/refs/heads/master.zip)) or clone this repository:
```bash
$ git clone https://github.com/hemmouda/Chrome-bookmark-keys.git
```
2. Open Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** (toggle in the top-right corner).
4. Click **Load unpacked** and select the folder containing this extension.
5. You will see a warning the first time you Open a new tab; choose to let the extension manage your new tab. In the new tab you will see the bookmarks from your bookmark bar and can use number keys `1–9` to open them quickly.

When you open a new tab, the focus is automatically taken by the search bar. This is the normal intended behavior. To make it visually easy to tell when the focus is on the page (so that you can use the shortcuts), a blur effect is added when the page is out of focus.

## Uninstall / remove:

1. Open Chrome and navigate to `chrome://extensions/`.
2. Click the **Remove** button on the extension.
3. Finally, simply delete the folder containing the extension from your PC. The extension doesn't create any additional files anywhere.

