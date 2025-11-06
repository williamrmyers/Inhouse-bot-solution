import resolve from "@rollup/plugin-node-resolve";
import commonjs from "@rollup/plugin-commonjs";

export default {
  input: "static/main.js", //  Your entry point
  output: {
    file: "dist/bundle.js", //  Output bundle
    format: "iife", //  Browser-ready <script> tag
    name: "MyBundle", //  Global variable name (required for iife)
  },
  plugins: [
    resolve(), //  Allow importing from node_modules & ES imports
    commonjs(), //  Allow CJS packages if needed
  ],
};
