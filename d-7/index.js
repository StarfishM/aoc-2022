// step 1 -> generate object that resembles the fs based on the instructions
// -> probbaly should be an object, with a nested object structure
// -> maybe think about making it, so that things withint the object get ordered based on size (is that possible?)
// go through instructions, first question
// is it navigation? or info?
// if info, we can have folders and files, files, have names, and number values, folders have objects that can be empty,
// orcontain more files
// based on that we add a property to the object an value depending on what we found

// then write a recursive function, that gow through the fs object finding directories
// that contain more than 100000 in size -> could be sth we already do while generating the
// mapobject based on the instructions, but keep separate for first development.

const { testInput, input } = require("./input");

const fileTreeBuilder = (instructionArray) => {
    const fsTree = {
        isDir: true,
        // folderSize: 0,
        children: [],
        files: {},
        parent: null,
        path: "./",
        name: "global",
    };
    let currNode = fsTree;
    let currPath = "";
    instructionArray.forEach((ins) => {
        if (ins.startsWith("$")) {
            [, command, navigation] = ins.split(" ");
            if (command === "cd") {
                if (navigation === "..") {
                    let tempPathBuilder = currPath.split("/").filter(Boolean);
                    tempPathBuilder.pop();
                    currPath =
                        tempPathBuilder.length === 1
                            ? (tempPathBuilder = "./")
                            : tempPathBuilder.join("/");
                    !currPath.endsWith("/") && (currPath = `${currPath}/`);
                    currNode = currNode.parent;
                } else if (navigation === "/") {
                    currNode = fsTree;
                    currPath = currNode.path;
                } else {
                    !currNode.children && (currNode.children = []);
                    currPath += `${navigation}/`;

                    if (
                        currNode.children.filter(
                            (node) => node.name === navigation
                        ).length === 0
                    ) {
                        const folderObj = {
                            name: navigation,
                            isDir: true,
                            path: currPath,
                            files: {},
                            children: [],
                            parent: currNode,
                        };
                        currNode.children.push(folderObj);
                    }
                    currNode = currNode.children.find(
                        (child) => child.name === navigation
                    );
                }
            }
        } else {
            [dirOrFileSize, name] = ins.split(" ");
            if (isNaN(parseInt(dirOrFileSize))) {
                const folderObj = {
                    name,
                    path: `${currPath}${name}/`,
                    isDir: true,
                    files: {},
                    children: [],
                    parent: currNode,
                };
                currNode.children.push(folderObj);
            } else {
                const fileObj = {
                    path: `${currPath}${name}`,
                    isFile: true,
                    size: parseInt(dirOrFileSize),
                };
                currNode.files[name] = fileObj;
            }
        }
    });
    return fsTree;
};

// const dataTree = fileTreeBuilder(testInput);
const dataTree = fileTreeBuilder(input);

let countDeletables = 0;
let totalSum = 0;
// get to deepest nested child
// calculate size of folder
// if size is below 10000 -> increse deletable count && go to parent
// until there is no more parent to go up to OR we've reached beyond our limit
function sumUpFolderSizes(node, isMoveUp = false, childNodesSize = 0) {
    // console.log("node:", dataTree)
    let totalFolderSize = childNodesSize;
    if (!isMoveUp && node.children.length > 0) {
        return node.children.forEach((child) => sumUpFolderSizes(child));
    } else if (node.children.length === 0) {
        let folderSize = node.size;
        totalFolderSize += folderSize;
        if (totalFolderSize < 100000) {
            countDeletables++;
            totalSum += totalFolderSize;
            return sumUpFolderSizes(node.parent, true, totalFolderSize);
        } else {
            return
        }
    } else if (isMoveUp && totalFolderSize > 100000) {
        return;
    } else if (isMoveUp && totalFolderSize < 100000 && node.parent) {
        let folderSize = node.size;
        totalFolderSize += folderSize;
        if (totalFolderSize < 100000) {
            countDeletables++;
            totalSum += totalFolderSize;
            return sumUpFolderSizes(node.parent, true, totalFolderSize);
        }
    }
}

function getFileSizes(fileObj) {
    let folderSize = 0;
    const fileObjs = Object.keys(fileObj);
    fileObjs.length > 0 &&
        fileObjs.forEach((file) => {
            folderSize += fileObj[file].size;
        });
    return folderSize;
}

function setDirSizes(dataTree){
    dataTree.size = getFileSizes(dataTree.files);
    if(dataTree.children.length>0){
        dataTree.children.forEach(child=>setDirSizes(child))
    }
}
//100000
setDirSizes(dataTree);
sumUpFolderSizes(dataTree)
// console.log("dataTree", dataTree)
// console.log("fsTree", dataTree.children[1].files);
// console.log("countDeletables", countDeletables);
console.log("totalSum", totalSum);
