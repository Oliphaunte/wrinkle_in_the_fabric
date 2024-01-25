%{
title: "Setup Typescript in Phoenix Liveview",
tags: ~w(typescript contentful liveview),
description: "Setting up Phoenix Liveview to use TypeScript can be tricky for the faint of heart, but not anymore!"
}

---

## Intro

Phoenix Liveview is an absolute joy to use, and one of the nice features about it is the ease in which you can integrate new JS technologies. In our case, we would like to have TypeScript setup. This tutorial will walk you through the steps and have you on your way for your TypeScript journey!

## Setup

Inside of the `assets/` folder, you will want to add a `tsconfig.json` file and add the follwing contents:

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

Now, inside of `assets/js` rename `app.js` to `app.tsx` and also add a new file called `types.ts`. This file is essential to help TypeScript understand Liveview specifics. Inside that file, you can insert the following:

```
import { LiveSocket } from "phoenix_live_view";

declare global {
  interface Window {
    liveSocket: LiveSocket; //Phoenix LiveView
    userToken: string; //Phoenix Sockets
  }
}
```

Finally, let's tell the Phoenix compiler to look for TypeScript. Inside of your `config/config.exs`, update your esbuild config to this:

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

- Update the esbuild version, the Phoenix generator is lagging behind the versions a a bit and we need the latest
- Update the target to es2020 (yours is probably set to es2017)
- Update `js/app.js` to `js/app.tsx`

And congratulations! You have setup Typescript in your Phoenix application!
