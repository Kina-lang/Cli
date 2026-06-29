import { spawn } from "child_process";
import { compile } from "./compile";

async function run(command: string, args: string[]) {
  return await new Promise<void>((res, rej) => {
    const proc = spawn(command, args, {
      stdio: "inherit",
      env: process.env,
      cwd: process.cwd(),
    });

    proc.on("exit", (code) => {
      if (code == null || code != 0)
        rej(`Process terminated with code ${code}`);
      else res();
    });
  });
}

export async function cliMain(args: string[]) {
  const [subcmd, ...cmdArgs] = args;

  switch (subcmd) {
    case "compile":
      return await compile();
    case "run":
      const path = await compile();
      await run(path, []).catch((e) => {
        console.error(`ERROR: ${e}`);
      });

      break;
    default:
      throw new Error(`Command ${subcmd} not found.`);
  }
}
