import resolve from '@rollup/plugin-node-resolve';
import commonjs from '@rollup/plugin-commonjs';
import babel from 'rollup-plugin-babel';
import { terser } from "rollup-plugin-terser";

export default {
  input: 'src/index.js',
  output: {
    file: 'decoders.js',
    format: 'amd'
  },
  plugins: [
    resolve(),
    babel(),
    commonjs({
      namedExports: {
        debrief: [
          'summarize', 'serialize', 'annotate', 'indent', 'isAnnotation', 'annotateFields'
        ]
      }
    }),
    terser(),
  ]
};
