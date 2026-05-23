const fs = require("fs");
const path = require("path");

const sourceDir = path.resolve(
  __dirname,
  "../../../connected-sites/agm-pro-main/src/frontend/dist",
);
const targetDir = path.resolve(__dirname, "../public/connected-sites/agm");

function copyRecursive(source, target) {
  const stat = fs.statSync(source);
  if (stat.isDirectory()) {
    fs.mkdirSync(target, { recursive: true });
    for (const entry of fs.readdirSync(source)) {
      copyRecursive(path.join(source, entry), path.join(target, entry));
    }
    return;
  }
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.copyFileSync(source, target);
}

if (!fs.existsSync(sourceDir)) {
  console.warn(`[sync-agm-build] AGM build not found at ${sourceDir}. Skipping sync.`);
  process.exit(0);
}

fs.rmSync(targetDir, { recursive: true, force: true });
copyRecursive(sourceDir, targetDir);
console.log(`[sync-agm-build] Synced AGM build into ${targetDir}`);
