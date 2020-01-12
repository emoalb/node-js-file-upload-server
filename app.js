const http = require("http");
const htmlLoader = require("./htmlLoader");
const constants = require("./constants");
const formidable = require('formidable');
const mv = require('mv');

http.createServer((req, res) => {
    console.log("\x1b[36m", req.headers['content-type'], "\x1b[0m");
    if (req.url === "/" && req.method === "GET") {
        res.writeHead(200, {'Content-Type': constants.HTML_HEADER});
        let homePage = htmlLoader.loadHtml("./home.html");
        res.write(homePage);
        res.end();

    } else if (req.url === "/jquery.js" && req.method === "GET") {
        res.writeHead(200, {'Content-Type': constants.JAVASCRIPT_HEADER});
        res.write(htmlLoader.loadAsset("./node_modules/jquery/dist/jquery.js"));
        res.end();

    } else if (req.url === "/script.js" && req.method === "GET") {
        res.writeHead(200, {'Content-Type': constants.JAVASCRIPT_HEADER});
        res.write(htmlLoader.loadAsset("./script.js"));
        res.end();

    } else if (req.url === "/upload" && req.method === "POST") {
        const form = new formidable.IncomingForm();
        form.parse(req, function (err, fields, files) {
            let oldpath = files.file.path;
            let newpath = process.cwd() + '/files/' + files.file.name;
            mv(oldpath, newpath, {mkdirp: true}, function (err) {
                // done. it first created all the necessary directories, and then
                // tried fs.rename, then falls back to using ncp to copy the dir
                // to dest and then rimraf to remove the source dir

                if (err) {
                    console.log(err);
                    return;
                }
                res.writeHead(200);
                res.end();
            });

            // fs.rename(oldpath, newpath, function (err) {
            //     if (err){
            //        console.log(err);
            //        return;
            //     }
            //     res.writeHead(301, {"Location": "/"});
            //     res.end();
            // });
        });
    } else if (req.url === "/test.png" && req.method === "GET") {
        console.log("png req");
        res.writeHead(200, {'Content-Type': 'image/png'});
        htmlLoader.streamAsset("./test.png", res);
    } else {
        res.writeHead(404, {'Content-Type': constants.HTML_HEADER});
        res.write(htmlLoader.loadHtml("./error.html"));
        res.end();

    }
}).listen(8000);
