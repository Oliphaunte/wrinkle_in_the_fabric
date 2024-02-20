%{
title: "Using Contentful to avoid Wordpress",
tags: ~w(contentful liveview),
description: "Using Contentful and Liveview to create interactive and easily customizable pages that allow us to bring Wordpress functionality into the modern age"
}

---

## TL;DR

I have released a package that allows for Liveview users to easily query for their content and assets via contentful (with locale support!):

[Click here for that](https://hex.pm/packages/contentful_elixir)

## Intro

Contentful is a fantastic CMS product that allows us to create easily customizable components for our clients to be able to work
with and update their pages seamlessly and easily. Mix the ease of that with the ease of Liveview, and you have a fantastic combo that in my opinion, should give Wordpress a true run for its money.

However, with all good things, come caveats.

Contentful, gives us a JSON output of the content from the user and depending on how complex your user's project is, this can be a bit problematic.

We need to render each and every piece, not to mention any references to other components.

This article will help show and outline what needs to be done to get Contentful to work well within our Liveview application!

## Setup

The first thing we will need, is an actual Contentful account. From there, you can fetch your `space_id` and your `access_token`, which we will need shortly

Next, we need an ability to query out our requests from Contentful.

Make sure you have the latest `{:req, "~> 0.4.0"}` in the mix.exs file

Now, let's go ahead and make a request to Contentful! This will be assuming you have a content_type of "post" and some entries populated using that content_type.

We can then make a corresponsing request, like so:

```
Req.get("#{@base_url}/spaces/#{@space_id}/entries",
           params: [
             access_token: @access_token,
             content_type: "post",
             locale: locale \\ "en-US"
           ]
         )
```

This will fetch us our entries under that content_type. But, this will not yet be able to be rendered, how can we accomplish that? Well, we could manually go through and parse out the respective. Or, we can make a helper module that does this for us!

```
def render_content(data, opts \\ %{}) when is_list(data),
    do: Enum.map(data, &render_node(&1, opts)) |> Enum.join()

defp render_node(%{"nodeType" => type, "content" => content} = node, opts) do
  case type do
    "paragraph" -> "<p>#{render_content(content, opts)}</p>"
    "heading-1" -> "<h1>#{render_content(content, opts)}</h1>"
  end
end
```

This script will not only parse th elements, it will go through the entire list of the content and parse everything accordingly! Obviously, you will have more additional types like tables and spans, you can add them here yourself, or, you can just use a package I wrote to help with all this: [ContentfulElixir](https://github.com/Oliphaunte/contentful_elixir)

And that's it for now! Hopefully this all made sense and helps you move farther away from WordPress :D
