import type { OutputOptions, RollupOptions } from "rollup";
import server from "./rollupPlugins/server";
import clean from "./rollupPlugins/clean";
import nodeResolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";
import typescript from "@rollup/plugin-typescript";
import terser from "@rollup/plugin-terser";
import html from "@rollup/plugin-html";
import json from "@rollup/plugin-json";
import livereload from "rollup-plugin-livereload";
import { extname } from "path";

const NODE_ENV = process.env.NODE_ENV;
const isDevelopment = NODE_ENV === "development";

const config: RollupOptions = {
  input: isDevelopment ? "test/index.ts" : "src/index.ts",
  output: {
    dir: "dist",
    format: "es",
    entryFileNames: "[name]-[hash].js",
    sourcemap: isDevelopment,
  },
  plugins: [
    clean(),
    // node_modules packages path resolve
    nodeResolve(),
    // commonjs module path resolve
    commonjs(),
    typescript(),
    json(),
    isDevelopment && html(),
    !isDevelopment && terser(),
    isDevelopment && server(),
    isDevelopment && livereload(),
  ],
};

export default config;
