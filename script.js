
// The different collected bookmarks
const bookmarkLinks = [];
// The id of THE bookmark bar
let bookmarksBarId = null;

function findBookmarksBarId(nodes) {
    for (const node of nodes) {
        if (node.folderType === "bookmarks-bar") {
            bookmarksBarId = node.id;
            return;
        }
        if (node.children) {
            findBookmarksBarId(node.children);
        }
    }
}

function faviconURL(u) {
    const url = new URL(chrome.runtime.getURL("/_favicon/"));
    url.searchParams.set("pageUrl", u);
    url.searchParams.set("size", "32");
    return url.toString();
}

function collectBookmarks(nodes) {
    for (const node of nodes) {
        if (node.parentId === bookmarksBarId && node.url) {
            const list = document.getElementById("bookmarks");

            /*
            - The first 9 bookmarks:
                <a class="bookmark" href="website">
                    <div class="indexed">#order</div>
                    <div class="site">
                        <img src="chrome://favicon/website">
                        Bookmark name
                    </div>
                </a>

            - The rest:
                <a class="bookmark" href="website">
                    <div class="site">
                        <img src="chrome://favicon/website">
                        Bookmark name
                    </div>
                </a>
            */

            const isIndexed = bookmarkLinks.length < 9

            const a = document.createElement("a");
            a.className = "bookmark";
            a.href = node.url;

            if (isIndexed) {
                const index = document.createElement("div");
                index.className = "indexed";
                index.textContent = `#${bookmarkLinks.length + 1}`;
                a.appendChild(index);
            }

            const site = document.createElement("div");
            site.className = "site";

            const img = document.createElement("img");
            img.src = faviconURL(node.url)

            const text = document.createTextNode(node.title || node.url);

            site.appendChild(img);
            site.appendChild(text);
            a.appendChild(site);

            list.appendChild(a);

            bookmarkLinks.push(node.url);
        }

        if (node.children) {
            collectBookmarks(node.children);
        }
    }
}

// Collect and append bookmarks
chrome.bookmarks.getTree((tree) => {
    findBookmarksBarId(tree);
    if (bookmarksBarId) {
        collectBookmarks(tree);
    }

    // Hide the "nothing" text if any bookmark was found
    if (bookmarkLinks.length > 0) {
        document.querySelector('.nothing').classList.add('hidden');
    }
});


// Listens to the keyboard shortcuts
document.addEventListener("keydown", (e) => {
    if (e.key >= "1" && e.key <= "9") {
        const index = Number(e.key) - 1;
        if (bookmarkLinks[index]) {
            window.location.href = bookmarkLinks[index];
            document.querySelectorAll(".bookmark")[index].classList.add("hover");
        }
    }
});

function updateFocusState() {
    const focused = document.hasFocus() && document.visibilityState === 'visible';
    document.body.classList.toggle('blurred', !focused);
}

// Run on load
updateFocusState();

// Keep in sync
window.addEventListener('focus', updateFocusState);
window.addEventListener('blur', updateFocusState);
document.addEventListener('visibilitychange', updateFocusState);
