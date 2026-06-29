import { KinaCompiler, KinaProjectConfig } from "@kina-lang/compiler";
import { readFile } from "fs/promises";
import path from "path";

export async function compile() {
  const rootDir = process.cwd();
  const buildDir = path.join(rootDir, "build");
  const projectConfigPath = path.join(rootDir, "kina.toml");

  const compiler = new KinaCompiler();

  const projectConfig = KinaProjectConfig.parse(
    await readFile(projectConfigPath, "utf-8"),
  );

  const resultPath = await compiler.compile({
    name: projectConfig.package.name,
    version: projectConfig.package.version,
    entry: projectConfig.package.entry,
    rootDir: rootDir,
    buildDir: buildDir,
  });

  return resultPath;
}
