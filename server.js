/****************************************************
* How to use:                                       *
*  Write markdown files in the md directory         *
*  Run this file with node                          *
*****************************************************/

const fs = require('fs');
const showdown  = require('showdown');

const mdDir = './md';

fs.readdirSync(mdDir).forEach((file, index, arr) => {
    // Tell Terminal which file is being worked on
    console.log("Working on file: " + file + " | " + (index + 1) + " of " + arr.length)
    // Create Path to file
    const pth = mdDir + "/" + file
    // Read file
    const md = fs.readFileSync(pth, 'utf8');
    // Convert to HTML
    const converter = new showdown.Converter();
    // Wrap in HTML
    const parse = `<!DOCTYPE html><html><body><div>${converter.makeHtml(md)}</div></body></html>`
    // Write to file (in P directory)
    fs.writeFileSync("./p/" + file.replace(".md", ".html"), parse, "utf8")
    // Tell Terminal which file is finished
    console.log("Finished: " + file + " | " + (index + 1) + " of " + arr.length)
});