// util.js
export function isNameUnique(name, parent, currentItem) {
    return parent.children.every(item => item.name !== name || item === currentItem);
}
