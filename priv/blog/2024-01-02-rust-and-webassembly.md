%{
title: "Rust, WASM, Liveview, Oh my!",
tags: ~w(Rust WebAssembly Phoenix Liveview),
description: "Setting up Rust and WASM in a Phoeinx Liveview project and being part of the future of the web"
}

---

## Intro

Web devs have been stuck in a weird medium for a while. We have control over one of the most powerful tools to communicate products, news, messages and so much more to the entire world, and yet, when it came to building high-performant and intensive apps, we had to sit on our hands and wait for the low-level language professionals to step in and steal the limelight. If only there was a way for us to build low-level applications directly into the browser!

Rust and WebAssembly come to our rescue to make this dream a reality. Now, we finally have fine-grained and high-performant technologies at our fingers direct on the web, allowing us to accomplish goals that previously were reserved for mobile and application devs only.

As time goes on, we will continue to see the rise of these two technologies and maybe even supplant the necessity for different mediums to host our applications on (looking at you, Swift and Java). Unlikely, but you never know.

I will be showing the use case and simplicity in which we can now build highly-performant web apps, with Phoenix Liveview, a relatively new kid on the web framework block, and Rust with WASM. A unison of two of the most powerful technologies and a boon to web devs everywhere!

To begin, we will be building a very basic Rich Text Editor within Rust, and pass it into Liveview for immediate consumption. This project is currently ongoing, with the intention of eventually using it to write these very blog posts!

## Installations

Make sure you have the latest version of Elixir/Erlang and Phoenix installed. I will skip over the details of this, but I will say I personally use asdf to manage the Elixir/Erlang version and run the installations from the Phoenix page to get that setup.

You will then want to install rust, I recommend using `rustup` and that is the mot straightforward approach.

## Setup Liveview

To start, let's create our Phoenix application (We won't need a db for this project, not yet, at least):

`mix phx.new rrte --no-ecto`

Once create, cd into the folder and go ahead and run:

`mix phx.server`

Your server should start and you should be able to visit the localhost url and see your beautiful phoenix application!

## Setup Rust

Now, let's go ahead and intiailize the Rust setup.

We will have our Rust application live within our phoenix application to demonstrate how we can create a simplistic WASM pipeline within our Phoenix app for future use.

Go ahead and a `vendor/` folder at the root of your Phoenix application

Inside that, we are going to now run cargo and create our Rust project as a lib (so we consume the binary):

`cargo new rust_text_editor --lib`

## Setup TypeScript

One of the additional features we will want to setup, is TypeScript. Now, the nice thing about LiveView is that opposed to most other JS frameworks, our interaction to JS is more limited, but we still have the capability of utilizing it when necessary via Hooks, which we will make use of for this project.

Before that, let's setup TypeScript.

I have a separate post dedicated to this process, so if you haven't yet setup TypeScript, [feel free to go over here and set it up](/posts/setup-typescript-in-phoenix)
