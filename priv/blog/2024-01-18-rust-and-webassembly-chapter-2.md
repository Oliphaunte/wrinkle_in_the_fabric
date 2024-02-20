%{
title: "Rust, WASM, Liveview, Oh my! -- Rich Text Editor (Chapter 2)",
tags: ~w(Rust WebAssembly Phoenix Liveview),
description: "Chapter 2 in a long series of posts"
}

---

## Intro

We will do a couple of things in this chapter.

1. We will add auto-reload functionality to our Rust app
2. We will get our rust app up and running inside our Phoenix app

## The Rust process

Our Rust application is going to use `wasm-bindgen` to output our .wasm and .js files that we will need to load our application into the web. If you don't know what wasm-bindgen is, don't worry, it isn't essential for this tutorial, but I do recommend reading those docs to get more familiar with it.

When we get around to building, we will need to store our .wasm and .js files in our static folder so our app can load them up.

Since we are using typescript, it will also output the respective type files to let Typescript be able to understand our application.

The entire process is a bit tedious to have to do on a repeat basis, copy and paste, copy and paste, and so on. So, how about we introduce an auto-reload that handles all this for us?

## Rust Auto-reload

An essential feature for any dev. We are going to be making a lot of changes within our rust file, which means we have to manually rebuild the wasm files, grab them, paste them into their respective folders, and ugh, now I'm starting to dread this project...

UNLESS

We can automate it!

And fortunately, it is quite straightforward and all you have to do is copy and paste it in!

First, add cargo-watch as a dependency in your `cargo.toml` file:

```
[dependencies]
cargo-watch = "8.5.2"
```

Inside your rust package at the root, create a `build_wasm.sh` bash file and paste the below into it. Hopefully the comments I left in it make it self-explanatory.

TLDR; this will take care of building the wasm and copying and pasting the wasm, js, and ts files into the folders we want them to be in.

```
#!/bin/bash

create_directory() {
  local dir="$1"
  if [ ! -d "$dir" ]; then
    mkdir -p "$dir"
  fi
}

# Fetch package name from Cargo.toml
get_package_name() {
  local cargo_toml="$1"
  grep "^name" "$cargo_toml" | head -1 | cut -d '"' -f 2
}

RUST_OUTPUT_DIR="./vendor/$(get_package_name "Cargo.toml")/pkg"
WASM_TARGET_DIR="../../priv/static/wasm"
TS_TARGET_DIR="../../assets/js"

# Get the package name from Cargo.toml
PACKAGE_NAME=$(get_package_name "Cargo.toml")

# Check and create the target directories if they don't exist
create_directory "$WASM_TARGET_DIR"
create_directory "$TS_TARGET_DIR"

# Remove existing output directory if it exists
if [ -d "$RUST_OUTPUT_DIR" ]; then
    echo "Removing existing $RUST_OUTPUT_DIR directory..."
    rm -rf "$RUST_OUTPUT_DIR"
fi

# Build the application before copying files
cargo build --target wasm32-unknown-unknown

# Run wasm-bindgen to generate new output
wasm-bindgen --target web target/wasm32-unknown-unknown/debug/"$PACKAGE_NAME".wasm --out-dir "$RUST_OUTPUT_DIR"

# Copy wasm and js files to the Phoenix static directory
echo "Copying wasm and js files to $WASM_TARGET_DIR..."
cp "$RUST_OUTPUT_DIR"/"$PACKAGE_NAME"_bg.wasm "$WASM_TARGET_DIR/"
cp "$RUST_OUTPUT_DIR"/$PACKAGE_NAME.js "$WASM_TARGET_DIR/"

# Copy TypeScript definition files to the Phoenix assets directory
echo "Copying TypeScript definition files to $TS_TARGET_DIR..."
cp "$RUST_OUTPUT_DIR"/"$PACKAGE_NAME"_bg.wasm.d.ts "$TS_TARGET_DIR/"
cp "$RUST_OUTPUT_DIR"/$PACKAGE_NAME.d.ts "$TS_TARGET_DIR/"

echo "Files copied successfully."
```

And from there, we run `cargo watch -w src -s "cargo build && ./build_wasm.sh"`

Make some changes to your rust file and watch the auto-reload in action!

Next up, let's set it all up in our Phoenix app to see it perform on the web

## Setting it all up in Phoenix

Now that we have our rust application auto-building and outputting the files into their respective locations, let's talk Phoenix.

We will need to make extensive use of hooks here.

First, let's start by creating a `hooks` folder inside of your `assets/js` folder.

You will then want to create a `wasm` folder with an `index.ts` file, inside the `hooks`

Your folder structure should looke like:

```
assets
  /js
    /hooks
      /wasm/index.ts
    index.ts
```

Now, inside your `wasm/index.ts` file, go ahead and put this in:

```
import init, { TextEditor } from '../../../../priv/static/wasm/rust_text_editor.js'

export default {
  mounted() {
    this.loadWasm()
  },

  async loadWasm() {
    try {
      await init('wasm/rust_text_editor_bg.wasm')
      this.textEditor = new TextEditor()
      console.log('TextEditor WASM module initialized')
      this.setupEditorListeners()
    } catch (err) {
      console.error('Error loading WASM module:', err)
    }
  },
}
```

Now, inside your `hooks/index.ts` file, export your hook, like so:

```
import Wasm from './wasm'

export default {
  Wasm
}
```

And finally, make sure you are importing your hooks into your app.tsx:

```
import hooks from './hooks'

let liveSocket = new LiveSocket('/live', Socket, { params: { _csrf_token: csrfToken }, hooks })
```

## Run the app already!

Alright, alright, we are almost there!

Inside your liveview page, I will assume `index.ex` add this line:

```
<div id="rich-text-editor" phx-hook="Wasm">
```

Now, when you start the server and visit the page, and check out the console.

You should see something like:

<image src="/images/blog/rrte_console.png" alt="rrte-console" />

If you see that, then success! You are now running a wasm binary inside your Liveview application!

## Next Steps

Stay tuned for the next chapter to the series where we will render a text box and make calls to our app to update our text editor in realtime!
