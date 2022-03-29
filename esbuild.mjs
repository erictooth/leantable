/* eslint-disable */
import { build } from "esbuild";
import { solidPlugin } from "esbuild-plugin-solid";
import glob from "glob";

const sharedConfig = {
    entryPoints: glob.sync("./src/**/*.+(ts|tsx)"),
    sourcemap: true,
    plugins: [solidPlugin()],
    target: "es2019"
};

build({
    ...sharedConfig,
    format: "esm",
    outdir: "dist-esm",
}).catch(() => process.exit(1));

build({
    ...sharedConfig,
    format: "cjs",
    outdir: "dist-cjs",
}).catch(() => process.exit(1));
