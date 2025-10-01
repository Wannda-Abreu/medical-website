import fs from "fs";
import path from "path";

const ROOT = new URL("../medical-website", import.meta.url).pathname;
const EXTENSIONS = new Set([".js", ".jsx", ".ts", ".tsx", ".html", ".css"]);

function fixFile(filePath) {
  const original = fs.readFileSync(filePath, "utf8");
  const repaired = Buffer.from(original, "latin1").toString("utf8");
  if (original !== repaired) {
    fs.writeFileSync(filePath, repaired, "utf8");
    console.log("fixed", path.relative(ROOT, filePath));
  }
}

function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) {
      walk(full);
    } else if (EXTENSIONS.has(path.extname(entry.name))) {
      fixFile(full);
    }
  }
}

walk(ROOT);
