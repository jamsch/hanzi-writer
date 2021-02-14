import { terser } from 'rollup-plugin-terser';
import ts from '@wessberg/rollup-plugin-ts';
import babel from '@rollup/plugin-babel';
import commonjs from '@rollup/plugin-commonjs';
import nodeResolve from '@rollup/plugin-node-resolve';
import filesize from 'rollup-plugin-filesize';

const SOURCE_DIR = '.';
const OUTPUT_DIR = 'dist';

const tsPlugin = ts({
  transpiler: 'babel',
});

export default function RollupConfig({ watch }) {
  // JS modules for bundlers
  const modules = [
    {
      input: `${SOURCE_DIR}/src/HanziWriter.ts`,
      output: {
        file: `${OUTPUT_DIR}/index.js`,
        format: 'esm',
        sourcemap: true,
      },
      plugins: [
        tsPlugin,
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
          presets: [['@babel/preset-env', { loose: true }]],
        }),
      ],
    },
  ];

  // JS modules for <script type=module>
  const webModules = [
    {
      input: `${SOURCE_DIR}/src/HanziWriter.ts`,
      output: {
        file: `${OUTPUT_DIR}/hanzi-writer.development.js`,
        format: 'esm',
        sourcemap: true,
      },
      plugins: [tsPlugin, babel({ exclude: /node_modules/, babelHelpers: 'bundled' })],
    },
    {
      input: `${SOURCE_DIR}/src/HanziWriter.ts`,
      output: {
        file: `${OUTPUT_DIR}/hanzi-writer.production.min.js`,
        format: 'esm',
        sourcemap: true,
      },
      plugins: [
        tsPlugin,
        babel({ exclude: 'node_modules/**', babelHelpers: 'bundled' }),
        terser({ ecma: 8, safari10: true }),
        filesize(),
      ],
    },
  ];

  // UMD modules for <script> tags and CommonJS (node)
  const globals = [
    {
      input: `${SOURCE_DIR}/src/HanziWriter.ts`,
      output: {
        file: `${OUTPUT_DIR}/umd/hanzi-writer.development.js`,
        format: 'umd',
        sourcemap: true,
        name: 'HanziWriter',
      },
      plugins: [
        tsPlugin,
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
          presets: [['@babel/preset-env', { loose: true }]],
        }),
        nodeResolve(),
        commonjs(),
      ],
    },
    {
      input: `${SOURCE_DIR}/src/HanziWriter.ts`,
      output: {
        file: `${OUTPUT_DIR}/umd/hanzi-writer.production.min.js`,
        format: 'umd',
        sourcemap: true,
        name: 'HanziWriter',
      },
      plugins: [
        tsPlugin,
        babel({
          exclude: 'node_modules/**',
          babelHelpers: 'bundled',
          presets: [['@babel/preset-env', { loose: true }]],
        }),
        terser(),
        filesize(),
      ],
    },
  ];

  // Node entry points
  const node = [
    {
      input: `${SOURCE_DIR}/node-main.js`,
      output: {
        file: `${OUTPUT_DIR}/main.js`,
        format: 'cjs',
      },
      plugins: [],
    },
  ];

  return [...modules, ...webModules, ...globals, ...node];
}
