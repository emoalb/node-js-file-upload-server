const fs = require("fs");
module.exports = {
    loadHtml: (filename) => {
        let fileContent;
        const index = fs.readFileSync("./index.html").toString();
        const partials = fs.readFileSync(filename);
        fileContent = index.replace(`{{body}}`, partials);
        return fileContent;
    },
    loadAsset: (assetFileName) => {
        return fs.readFileSync(assetFileName).toString();
    },
    streamAsset: (assetFileName, res) => {
        fs.createReadStream(assetFileName).pipe(res);
    }
};
