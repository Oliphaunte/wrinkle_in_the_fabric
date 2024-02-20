%{
title: "Rust, WASM, Liveview, Oh my! (Chapter 2)",
tags: ~w(Rust WebAssembly Phoenix Liveview),
description: "Chapter 2 in a long series of posts"
}

---

## Auto-reload

An essential feature for any dev. We are going to be making a lot of changes within our rust file, which means we have to manually rebuild the wasm files, grab them, paste them into their respective folders, and ugh, now I'm starting to dread this project...

UNLESS

We can automate it!

And fortunately, it is quite straightforward and all you have to do is copy and paste it in!

First, add cargo-watch as a dependency in your `cargo.toml` file:

```
[dependencies]
cargo-watch = "8.5.2"
```

Inside your rust package at the root, create a `build_wasm.sh` bash file and paste the below into it. Hopefully the comments I left in it make it self-explanatory. TLDR; this will take care of building the wasm and copying and pasting the wasm, js, and ts files into the folders we want them to be in.

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
