// operations.js
import data from './store.js';
import { isNameUnique } from './util.js';

function createButton(text, clickHandler) {
    const button = document.createElement("button");
    button.setAttribute("id", "btnId");
    button.textContent = text;
    button.addEventListener("click", clickHandler);
    return button;
}

function createItem(item) {
    const listItem = document.createElement("div");
    listItem.classList.add("item");

    const expandIcon = document.createElement("span");
    expandIcon.classList.add("expand-icon");
    expandIcon.textContent = item.expanded ? "▼" : "▶";
    listItem.appendChild(expandIcon);

    const icon = document.createElement("span");
    icon.classList.add(`${item.type}-icon`);
    listItem.appendChild(icon);

    const itemName = document.createElement("span");
    itemName.textContent = item.name;
    listItem.appendChild(itemName);

    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");

    if (item.type === "folder") {
        buttonContainer.appendChild(createButton("Create Folder", () => {
            const newName = prompt("Enter folder name:");
            if (!newName || !isNameUnique(newName, item, null)) {
                alert("Invalid folder name");
                return;
            }
            const newItem = {
                name: newName,
                type: "folder",
                expanded: true,
                children: []
            };
            item.children.push(newItem);
            renderFileExplorer();
        }));

        buttonContainer.appendChild(createButton(item.expanded ? "Collapse" : "Expand", () => {
            item.expanded = !item.expanded;
            renderFileExplorer();
        }));
        
        buttonContainer.appendChild(createButton("Create File", () => {
            const newName = prompt("Enter file name:");
            if (!newName || !isNameUnique(newName, item, null)) {
                alert("Invalid file name");
                return;
            }
            const newFile = {
                name: newName,
                type: "file"
            };
            item.children.push(newFile);
            renderFileExplorer();
        }));
    } else if (item.type === "file") {
       
    }

    buttonContainer.appendChild(createButton("Delete", () => {
        const parentChildren = item.parent ? item.parent.children : data;
        const index = parentChildren.indexOf(item);
        if (index !== -1) {
            parentChildren.splice(index, 1);
            renderFileExplorer();
        }
    }));

    listItem.appendChild(buttonContainer);

    return listItem;
}

function renderFileExplorer() {
    const fileExplorer = document.getElementById("file-explorer");
    fileExplorer.innerHTML = '';

    const generateFolderStructure = (parent, items) => {
        const childrenList = document.createElement("div");
        childrenList.classList.add("children-list");

        items.forEach(item => {
            item.parent = parent ? parent.itemData : null;

            const listItem = createItem(item);
            listItem.itemData = item;
            childrenList.appendChild(listItem);

            if (item.expanded && item.children.length > 0) {
                generateFolderStructure(listItem, item.children);
            }
        });

        parent.appendChild(childrenList);
    };

    generateFolderStructure(fileExplorer, data);
}

export { createItem, renderFileExplorer };
