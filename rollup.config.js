import typescript from "@rollup/plugin-typescript";
import { minify } from "rollup-plugin-esbuild-minify";

export default {
  input: "./src/services/config-diagonal-box.ts",
  output: {
    dir: "output",
    format: "es",
  },
  plugins: [typescript(), minify()],
};
