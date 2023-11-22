///////////////////////////////////////////////////////
//  Write markdown files in the md directory         //
//  Run this file with node  (node server.js)        //
///////////////////////////////////////////////////////

const fs = require('fs');
const { marked } = require('marked');

const config = require('./config.json');
const mdDir = './md';
const process = require('process');


const farr = fs.readdirSync(mdDir)
farr.forEach((file, index, arr) => {
    // Tell Terminal which file is being worked on
    console.log("Working on file: " + file + " | " + (index + 1) + " of " + arr.length)
    // Create Path to file
    const pth = mdDir + "/" + file
    // Read file
    const md = fs.readFileSync(pth, 'utf8');
    // Convert to HTML
    // Wrap in HTML
    const parse = `<!DOCTYPE html>
    <html>
        <head>
            <title> ${config.name} | ${file.replace(".md", "").replace("_", " ")}</title>
        </head>
        <body>
            <div>
                ${marked.parse(md)}
            </div>
        </body>
    </html>`
    // Write to file (in P directory)
    fs.writeFileSync("./p/" + file.replace(".md", ".html"), parse, "utf8")
    // Tell Terminal which file is finished
    console.log("Finished: " + file + " | " + (index + 1) + " of " + arr.length)
});

// Write to pages.json

// Map Array to Object
const act = process.argv[2] === "-a" || false
if (act) {
    console.log("GH Pages Mode - No .html extension")
} else {
    console.log("Local Mode - .html extension")

}
const pgdt = farr.map((file) => {
    //
    return {
        "name": file.replace(".md", "").replace("_", " "),
        "url": "/p/" + (function () {
            if (act) {
                return file.replace(".md", "")
            } else {
                return file.replace(".md", ".html")
            }
        })(),
    }
})


fs.writeFileSync("pages.json", JSON.stringify({ info: config, pages: pgdt}, null, 4), "utf8")