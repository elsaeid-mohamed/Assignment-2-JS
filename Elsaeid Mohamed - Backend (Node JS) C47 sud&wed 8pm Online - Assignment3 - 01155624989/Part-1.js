const fs = require('fs');
const zlib = require('zlib');
const { pipeline } = require('stream');
//=============================================================================

// Q-1
const readStream = fs.createReadStream("./big.txt", { encoding: 'utf-8' });
readStream.on("data", (chunk) => {
    console.log("New Chunk Received");
    console.log(chunk);
});
readStream.on("end", () => {
    console.log("Finished Reading big.txt");
});
//=============================================================================

// Q-2
const sourceStream = fs.createReadStream("./source.txt", { encoding: 'utf-8' });
const destStream = fs.createWriteStream("./dest.txt");
sourceStream.pipe(destStream);
destStream.on("finish", () => {
    console.log("File copied using streams");
});
//=============================================================================

// Q-3
const dataStream = fs.createReadStream("./data.txt");
const compressedStream = fs.createWriteStream("./data.txt.gz");
const gzip = zlib.createGzip();
pipeline(
    dataStream, 
    gzip, 
    compressedStream, 
    (err) => {
        if (err) {
            console.log("An error occurred:", err);
        } else {
            console.log("File compressed successfully!");
        }
    }
);
//=============================================================================
