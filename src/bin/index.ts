#!/usr/bin/env tsx

import { cliMain } from "..";

const args = process.argv.slice(2);

await cliMain(args);
