import resolve from '@rollup/plugin-node-resolve';
import replace from '@rollup/plugin-replace';
import typescript from '@rollup/plugin-typescript';
import commonjs from '@rollup/plugin-commonjs';


const config = {
  input: 'src/index.tsx',
  output: [
    {
      file: 'public/script.js',
    }
  ],
  plugins: [
    replace({
      "process.env.NODE_ENV": JSON.stringify("development"),
      preventAssignment: true
    }),
    commonjs({
      include: /node_modules/,
    }),
    typescript(),
    resolve({
      browser: true
    })
  ]
};

export default config;