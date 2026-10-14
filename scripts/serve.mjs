import http from "node:http";
import { readFile, stat } from "node:fs/promises";
import { resolve, extname, sep } from "node:path";
const root = resolve("dist");
const types = {
  ".html": "text/html;charset=utf-8",
  ".js": "text/javascript",
  ".css": "text/css",
  ".webp": "image/webp",
  ".png": "image/png",
  ".svg": "image/svg+xml",
  ".woff2": "font/woff2",
  ".xml": "application/xml",
  ".txt": "text/plain",
};
http
  .createServer(async (req, res) => {
    try {
      const pathname = decodeURIComponent(
        new URL(req.url, "http://localhost").pathname,
      );
      let file = resolve(
        root,
        "." + (pathname === "/" ? "/index.html" : pathname),
      );
      if (file !== root && !file.startsWith(root + sep)) {
        res.writeHead(403);
        res.end();
        return;
      }
      let status = 200;
      try {
        if (!(await stat(file)).isFile()) throw new Error();
      } catch {
        try {
          file += ".html";
          await stat(file);
        } catch {
          file = resolve(root, "404.html");
          status = 404;
        }
      }
      const bytes = await readFile(file);
      res.writeHead(status, {
        "Content-Type": types[extname(file)] || "application/octet-stream",
      });
      res.end(bytes);
    } catch {
      res.writeHead(400);
      res.end("Bad request");
    }
  })
  .listen(5173, "127.0.0.1", () =>
    console.log("ART preview: http://127.0.0.1:5173"),
  );
