import http from "http";
import fs from "fs";
import path from "path";
import url from "url";

const favicon = path.join(__dirname, "image", "favicon.png");
// console.log({ favicon });

const server = http.createServer((req, res) => {
  const pathname = url.parse(req.url!).pathname;

  //* If this request is asking for our favicon, respond with it:
  if (req.method === "GET" && pathname === "/favicon.ico") {
    // console.log({ pathname });
    //* MIME type of your favicon.
    // .ico = 'image/x-icon' or 'image/vnd.microsoft.icon'
    // .png = 'image/png'
    // .jpg = 'image/jpeg'
    // .jpeg = 'image/jpeg'
    res.setHeader("Content-Type", "image/png");
    // Serve your favicon and finish response. You don't need to call `.end()` yourself because `pipe` will do it automatically.
    fs.createReadStream(favicon).pipe(res);
    return;
  }

  console.log("req.httpVersion:", req.httpVersion);
  console.log("req.url:", req.url);
  // console.log({ res });

  if (req.url === "/") {
    res.writeHead(200, { "Content-Type": "text/html" });
    // res.write("<h1 style='color:blue; text-align:center'>This is the Home Page!</h1>");
    const homePageHTML = fs.readFileSync("node.html");
    // console.log({ homePageHTML });
    res.write(homePageHTML);
    res.end();
  } else if (req.url === "/image/favicon.png") {
    res.writeHead(200, { "Content-Type": "image/png" });
    const pageImage = fs.readFileSync("./image/favicon.png");
    // console.log({ pageImage });
    res.write(pageImage);
    res.end();
  } else if (req.url === "/style.less") {
    res.writeHead(200, { "Content-Type": "text/less" });
    const pageStyle = fs.readFileSync("./style.less");
    // console.log({ pageStyle });
    res.write(pageStyle);
    res.end();
  } else {
    res.writeHead(404, { "Content-Type": "text/html" });
    // res.write("<h4 style='color:red; text-align:center'>Sorry, the Page doesn't exists!</h4>");
    res.end();
  }
});

server.listen({ port: 5000 });
