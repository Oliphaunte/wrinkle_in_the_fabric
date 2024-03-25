%{
title: "Setting up authentication in Liveview -- Firestore",
tags: ~w(Liveview Firestore),
description: "Setting up authentication in Liveview, this section on Firestore"
}

---

## Intro

Everything listed will assume you have already setup your Firebase account and hooked up the authentication on Firebase.

I personally am not a huge fan of Firebase, but it definitely helps make MVP products get out faster, but also creates a false sense of scalability, but that is a rant for another post. Firebase still has a lot of popularity, hence the reason for this post.

## Setup Part 1 - Adding Firebase

The very first thing we will want to do is setup the JavaScript for out firebase project. I will be using TypeScript for the code (if you want tips on how to setup Typescript in your phoenix app, check out my other blog post on that here)

1.  Run `yarn|npm|pnpm install\add firebase` (use your preferred package manager)
2.  Now we have some fun. We will be using a hook to setup our JS/Liveview interaction, if you are not familiar with those, I would take a look at the docs to get a feel for it as the setup is a bit different from most JS projects

Create a new .js|.ts file and add this to it -

```
import { getAuth } from 'firebase/auth'
import { initializeApp } from 'firebase/app'

export default {
  mounted() {
    const firebaseConfig = {
      apiKey: ...,
      authDomain: ...,
      projectId: ...,
      storageBucket: ...,
      messagingSenderId: ...,
      appId: ...,
      measurementId: ...,
    }

    // Initialize Firebase
    const app = initializeApp(firebaseConfig)
    const auth = getAuth()
  }
}
```

Make sure you properly export the js file and expose it through app.js|.tsx We then will create the LiveView setup. You will just need a Liveview or LiveComponent and setup the phx-hook, like so:

```
<.simple_form id="firebase-auth-form" for={@form} phx-hook="Firebase">
  <.input field={@form[:email]} placeholder="Enter your e-mail" />

  <button>Submit</button>
</.simple_form>
```

The listed code will initialize your firebase account and let you subsequently fire authentication requests which we will get into in the next steps.

## Setup Part 2 - Calling Firebase (Coming soon!)
