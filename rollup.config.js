// rollup.config.js
import resolve from "rollup-plugin-node-resolve";
import babel from "rollup-plugin-babel";

export default {
  input: "src/index.js",
  output: {
    file: "dist/main.js",
    format: "cjs",
    name: "yellowantRTMClient"
  },
  plugins: [
    resolve(),
    babel({
      exclude: "node_modules/**", // only transpile our source code
      plugins: ["transform-object-rest-spread", "external-helpers"]
    })
  ]
};