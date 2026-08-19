import { cpSync, existsSync, mkdirSync, rmSync } from "node:fs";
import path from "node:path";

const distDir = process.argv[2] || ".next";
const projectRoot = process.cwd();
const standaloneDir = path.join(projectRoot, distDir, "standalone");

function copyDirectory(source, target) {
  if (!existsSync(source)) {
    return false;
  }

  rmSync(target, { recursive: true, force: true });
  mkdirSync(path.dirname(target), { recursive: true });
  cpSync(source, target, { recursive: true });
  return true;
}

if (!existsSync(standaloneDir)) {
  throw new Error(`Standalone output not found: ${path.relative(projectRoot, standaloneDir)}`);
}

const copiedPublic = copyDirectory(
  path.join(projectRoot, "public"),
  path.join(standaloneDir, "public")
);

const copiedStatic = copyDirectory(
  path.join(projectRoot, distDir, "static"),
  path.join(standaloneDir, distDir, "static")
);

if (!copiedPublic) {
  throw new Error("public directory not found");
}

if (!copiedStatic) {
  throw new Error(`${distDir}/static directory not found`);
}

console.log(`Synced standalone assets for ${distDir}`);
