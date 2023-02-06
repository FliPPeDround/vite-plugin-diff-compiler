<h1 align="center">vite-plugin-diff-compiler<h1>

<!-- install  -->
## Install

```bash
npm install vite-plugin-diff-compiler -D
```

<!-- usage  -->
## Usage

```json
// package.json
{
  "scripts": {
    "dev": "vite",
    "build": "vite build",
    "dev:h5": "vite -m h5",
    "build:h5": "vite build -m h5"
  }
}
```

```js
// vite.config.js
import { defineConfig } from 'vite'
import DiffCompiler from 'vite-plugin-diff-compiler'

export default defineConfig({
  plugins: [
    DiffCompiler(),
  ],
})
```
```ts
// only run `pnpm dev:h5` or `pnpm build:h5` will compile the code below

// #diff-compiler-start: h5
console.log('h5')
// #diff-compiler-end: h5
```
