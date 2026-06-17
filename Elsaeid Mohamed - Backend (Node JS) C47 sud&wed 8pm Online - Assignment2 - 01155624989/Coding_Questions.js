const fs = require("fs");
const path = require("path");
const os = require("os");
const EventEmitter = require("events");

// ===================================================================
// Q-1
// ===================================================================
function logCurrentPath() {
  console.log({ File: __filename, Dir: __dirname });
}
logCurrentPath();

// ===================================================================
// Q-2
// ===================================================================
function getFileName(filePath) {
  return path.basename(filePath);
}
console.log(getFileName("/user/files/report.pdf")); 

// ===================================================================
// Q-3
// ===================================================================
function buildPath(pathObj) {
  return path.format(pathObj);
}
console.log(buildPath({ dir: "/folder", name: "app", ext: ".js" }));

// ===================================================================
// Q-4
// ===================================================================
function getExtension(filePath) {
  return path.extname(filePath);
}
console.log(getExtension("/docs/readme.md"));

// ===================================================================
// Q-5
// ===================================================================
function parsePath(filePath) {
  const { name, ext } = path.parse(filePath);
  return { Name: name, Ext: ext };
}
console.log(parsePath("/home/app/main.js"));

// ===================================================================
// Q-6
// ===================================================================
function isAbsolutePath(filePath) {
  return path.isAbsolute(filePath);
}
console.log(isAbsolutePath("/home/user/file.txt"));

// ===================================================================
// Q-7
// ===================================================================
function joinSegments(...segments) {
  return path.join(...segments);
}
console.log(joinSegments("src", "components", "App.js"));

// ===================================================================
// Q-8
// ===================================================================
function resolvePath(relativePath) {
  return path.resolve(relativePath);
}
console.log(resolvePath("./index.js"));

// ===================================================================
// Q-9
// ===================================================================
function joinTwoPaths(path1, path2) {
  return path.join(path1, path2);
}
console.log(joinTwoPaths("/folder1", "folder2/file.txt"));

// ===================================================================
// Q-10
// ===================================================================
function deleteFileAsync(filePath) {
  fs.unlink(filePath, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log(`The ${path.basename(filePath)} is deleted.`);
  });
}
const demoDeleteFile = path.join(__dirname, "file.txt");
fs.writeFileSync(demoDeleteFile, "temporary content");
deleteFileAsync(demoDeleteFile);

// ===================================================================
// Q-11
// ===================================================================
function createFolderSync(folderPath) {
  try {
    fs.mkdirSync(folderPath);
    return "Success";
  } catch (err) {
    console.error(err);
    return "Failed";
  }
}
console.log(createFolderSync(path.join(__dirname, "newFolder")));

// ===================================================================
// Q-12
// ===================================================================
const emitter = new EventEmitter();
emitter.on("start", () => {
  console.log("Welcome event triggered!");
});
emitter.emit("start");

// ===================================================================
// Q-13
// ===================================================================
emitter.on("login", (username) => {
  console.log(`User logged in: ${username}`);
});
emitter.emit("login", "Ahmed");

// ===================================================================
// Q-14
// ===================================================================
function readFileContentSync(filePath) {
  const content = fs.readFileSync(filePath, "utf8");
  console.log(`the file content => "${content}"`);
  return content;
}
readFileContentSync(path.join(__dirname, "notes.txt"));

// ===================================================================
// Q-15
// ===================================================================
function writeFileAsync(filePath, content) {
  fs.writeFile(filePath, content, (err) => {
    if (err) {
      console.error(err);
      return;
    }
    console.log("File written successfully.");
  });
}
writeFileAsync(path.join(__dirname, "async.txt"), "Async save");

// ===================================================================
// Q-16
// ===================================================================
function checkExists(targetPath) {
  return fs.existsSync(targetPath);
}
console.log(checkExists(path.join(__dirname, "notes.txt"))); // true

// ===================================================================
// Q-17
// ===================================================================
function getOSInfo() {
  return { Platform: os.platform(), Arch: os.arch() };
}
console.log(getOSInfo());
// ===================================================================SSS