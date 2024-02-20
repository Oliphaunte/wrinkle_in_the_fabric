%{
title: "Working with Localization in Liveview",
tags: ~w(Liveview React Localization),
description: "Working with localization has always been one of those necessary, but overlooked aspects of web development. It's time we talk about how to make localization a standardization in projects"
}

---

## Intro

Localization, along with accessibility, are two of the most commonly overlooked aspects of web development. Fortunately, as technologies get more evolved and companies more established, both implementations are starting to gain prominence and importance in their usage. Accessibility has always been an important topic of conversation for me, but I will save that conversation for another post. Here, I wish to talk about a relevant experience I had regarding localization, and how it made me realize that AI will have an ever growing importance in helping us provide solutions to such practices.

## What is localization?

Seems like a silly question, but it is a topic of conversation I realize a lot of devs know about, but do not actually know how to talk about. A majority of devs are familiar with working with English, as well as their own native languages, but the implementation of other localities sometimes takes a back seat in implementation.

Most companies focus on their immediate market, which means a narrowness in locality support.

This is understandable to a certain extent. Websites in North America look fundamentally different from those in Asia, Europe, and even South America, which also leads companies to have to dedicate resources to re-create their services in multiple, different formats for different regions, which can be costly

<div style="margin-top:16px; text-align:center">
  <image src="/images/blog/bk-japan.png" alt="burger_king_japan" />
  <p style="font-size:12px">A screenshot of Burger King Japan</p>
</div>

<div style="margin-top:16px; text-align:center">
  <image src="/images/blog/bk-america.png" alt="burger_king_america" />
  <p style="font-size:12px">Compared to the American version. Notice the subtle differences in design</p>
</div>

A simple solution to this is to have a base website you use that can change localities based on the users location or preferences. You may not yet have the resources to provide a different experience for different regions, but you can at least make it easier for your user to navigate your site in their native language!

So, let's deep dive into what exactly localization is, and how we can make it part of our arsenal of toolkits!

## Implementation

Depending on your tooling and use cases, there are many ways to accomplish localization. I have been playing around with it to some great effect via Contentful, but for the purposes of this article, we will stick to using Liveview and thankfully for us, Phoenix + Liveview provides great support for localization via the Gettext module.
