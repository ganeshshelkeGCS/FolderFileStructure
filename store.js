// store.js
const data = [
    {
        id: 101,
        name: "Folder 1",
        type: "folder",
        children: [
            { name: "File 1.1", type: "file" },
            { name: "File 1.2", type: "file" }
        ]
    },
    {
        id: 201,
        name: "Folder 2",
        type: "folder",
        children: [
            { name: "Subfolder 2.1", type: "folder", children: [] },
            { name: "File 2.1", type: "file" }
        ]
    }
    // Add more data as needed
];

export default data;
