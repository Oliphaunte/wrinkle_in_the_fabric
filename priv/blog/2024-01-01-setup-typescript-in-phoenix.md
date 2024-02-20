%{
title: "Setup Typescript in Phoenix Liveview",
tags: ~w(typescript liveview),
description: "Setting up Phoenix Liveview to use TypeScript can be tricky for the faint of heart, but not anymore!"
}

---

## Intro

Phoenix Liveview is an absolute joy to use, and one of the nice features about it is the ease in which you can integrate new JS technologies. In our case, we would like to have TypeScript setup. This tutorial will walk you through the steps and have you on your way for your TypeScript journey!

## Step 1 - config

Inside of your `config/config.exs`, update your esbuild config to this:

```
config :esbuild,
  version: "0.19.12",
  default: [
    args:
      ~w(js/app.tsx --bundle --format=esm --target=es2020 --outdir=../priv/static/assets --external:/fonts/* --external:/images/*),
    cd: Path.expand("../assets", __DIR__),
    env: %{"NODE_PATH" => Path.expand("../deps", __DIR__)}
  ]
```

We are doing several things here:

- Update the esbuild version, the Phoenix generator is lagging behind the versions a bit and we need the latest
- Update the target to es2020 (yours is probably set to es2017)
- Update `js/app.js` to `js/app.tsx`

## Step 2 - package.json

Phoenix has decided to wipe their hands clean of the node.js ecosystem as much as they can (who can blame them?)

Unfortunately though, we will need it for our TypeScript purposes.

Inside of the `assets/` folder, you will want to run npm/yarn/pnpm init, or whatever initilization script to get us a package.json file.

Now, you will want to add type definitions. Below is my simple package.json file that I copy and paste (I use pnpm)

```
{
  "repository": {},
  "description": " ",
  "license": "MIT",
  "scripts": {
    "update": "pnpm up --latest --interactive"
  },
  "engines": {
    "node": "^20.0.0",
    "npm": "^9.0.0"
  },
  "devDependencies": {
    "@types/phoenix": "^1.6.4",
    "@types/phoenix_live_view": "^0.18.4",
    "@types/react": "^18.2.46",
    "@types/react-dom": "^18.2.18"
  }
}
```

Make sure to run whatever installation scrip tfor the packages (`pnpm install` for example)

The versions will probably have updated, but you can just run `pnpm run update` to update yours. If you are using yarn or npm, you will want to adjust the script accordingly.

## Step 3 - app.tsx

This one is very simple. Rename your app.js to app.tsx (simple wins FOR the win!)

## Step 4 - tsconfig.json and types.ts

Inside of the `assets/` folder, you will want to add a `tsconfig.json` file and add the following contents:

```
{
  "compilerOptions": {
    "types": [
      "phoenix"
    ],
    "typeRoots": [
      "node_modules/@types"
    ],
    "lib": [
      "ES2021",
      "dom"
    ],
    "jsx": "react-jsx"
  },
  "exclude": [
    "node_modules"
  ]
}
```

Next, go to `assets/js` and also add a new file called `types.ts`. This file is essential to help TypeScript understand Liveview specifics. Inside that file, you can insert the following:

```
import { LiveSocket } from "phoenix_live_view";

declare global {
  interface Window {
    liveSocket: LiveSocket; //Phoenix LiveView
    userToken: string; //Phoenix Sockets
  }
}
```

And congratulations! You have setup Typescript in your Phoenix application!
