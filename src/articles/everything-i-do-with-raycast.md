---
title: "Everything I do with Raycast"
date: "2025-06-28"
tags: ["technology", "raycast"]
location: "London, United Kingdom"
---

Raycast is growing fast and there are a lot of fresh eyes are on the product.

In the last 50 days, they released their [iOS app](https://www.raycast.com/ios), rolled out the much-awaited
[Windows Beta](https://x.com/thomaspaulmann/status/1937887427852488719) and got sherlocked ([or not?](https://x.com/thomaspaulmann/status/1932406174344757379)) by Apple, when they announced a
revolutionary update to the macOS Spotlight.

Since I wrote [Raycast: Second Impressions](https://www.lukeberrypi.com/articles/raycast-second-impressions) a year ago, I've spent over 200 hours understanding Raycast and trying to get the most of it. It's time to write about it again.

Here's Everything I do with Raycast. Buckle up!

## Opening Applications

On any MacBook, you can press `⌘` `space`, write the name of an app and open it. Of course you can do that in Raycast too.

But can we make that quicker? Especially for apps that you open a lot? Yes, by **opening apps with a hotkey**.

The cherry on top is that pressing the hotkey again hides the app, making it super easy to toggle between different apps. Probably the biggest ROI tip in this article.

I press these hotkeys at least 500 times a day:

- `⌘` `esc` -> Terminal
- `⌥` `I` -> Visual Studio Code
- `⌥` `K` -> Google Chrome
- `⌥` `O` -> Obsidian

## Native Extensions

Let's start easy. These are all **zero configuration** and **free**.

> By default, these commands don't have a hotkey. The hotkeys below are custom.

### Clipboard History

> `⌘` `shift` `C`

Way before Raycast I used [Maccy](https://maccy.app) for clipboard history. And even before that on [Windows](https://support.microsoft.com/en-gb/windows/using-the-clipboard-30375039-ce71-9fe4-5b30-21b7aab6b13f).

It reshapes how you think about copying stuff, from momentary convenience to infinite storage of anything you may want in the future. It's like a bookmark and a draft had a baby.

Someone asked you for the link to a Pull Request you closed last week? Open Clipboard History and search for "pull". And there it is.

Here's a tip: always use **Copy picture of selected area to the clipboard** instead of **Save picture of selected area as a file**. The latter floods your Desktop with screenshot files.

You can find the hotkeys for these in **System Settings > Keyboard > Keyboard Shortcuts > Screenshots**

By doing this you make Clipboard History even more powerful, since you can search for **all screenshots** you've ever taken.

Your mum accidentally deleted the kid photo you sent her and is asking for it again? Filter by "Images only". Easy.

### Snippets

> `Search Snippets` `⌥` `.`

- macOS text replacement
- alias != search snippet

### Quicklinks

> `Search Quicklinks` `⌥` `L`

- google maps query param
- go to specific folder in macos

### Emojis

> `Search Emojis` `^` `;`

- macOS emoji is unusably slow

### Raycast Notes

> `⌥` `N`

- supports markdown
- great for floating window
  - meetings
  - interviews
  - DJ sets
- export options as HTML or Markdown

### Window Management

- macOS has bad windows management
- has presets for rectangle, magnet, etc...
- Pro

### Calculator

- has history (hit arrow up)
- days since/to specific date
- unit conversion (feet to meter, miles to km, fahrenheit to C)
- currency conversion (gbp brl, btc usd)

## Third-party Extensions

This is the secret sauce. Anyone can build an extension with React + TypeScript and hook into Raycast's native Swift bindings through a [remarkable API](https://developers.raycast.com/basics/create-your-first-extension).

Here's [an extension I built](https://github.com/raycast/extensions/pull/15493). It didn't go to the store because I had build issues, but I still use it locally.

It's a clever move to have your community extend your product for you, and Raycast has striken the perfect balance between open source (extensions) and closed source (the rest of the software).

In fact, the recent addition of [AI Extensions](https://manual.raycast.com/ai-extensions) was only possible by leveraging these community-built extensions.

There's a lot to unpack, so I'll separate them into three sections:

- Essentials
- Surprising
- Quirky

## Essentials

Extensions I can no longer live without.

### Downloads Manager

> `Show Latest Download` `⌥` `D`

Shows, opens or copies the last download. Very useful for quickly installing apps by opening the `.dmg` or previewing videos that you've downloaded. And for quickly copying the last image you downloaded. [Download it](#)

### Color Picker

> `Pick Color` `⌥` `C`

Grab the color of any pixel on your screen. I've used alternatives in the past but they either had poor UX or were constrained to the browser. Extra marks for supporting other color formats such as OKLCH. [Download it](#)

### Spotify Controls

- `Pause/Play` `⌥` `P`
- `Next Song` `⌥` `]`
- `Previous Song` `⌥` `[`

. You may ask: "Why not use the dedicated media controls (F7, F8, F9) on the MacBook? Because if you're watching a youtube video, that's what they will control. It varies depending on what you're playing. [Download it](#)

### Google Translate

> `Quick Translate` `Alias: t`

Type in one language [EN, PT, ES, IT, FR] and receive translations in all languages instantly [Download it](#)

### Toothpick

> `Manage Bluetooth Connections` `⌥` `B`

Connect/disconnect from your Bluetooth devices. [Download it](#)

### Image Tools

Compress and convert images. Useful for converting that photo you AirDropped to PNG. [Download it](#)

## Surprising

Extensions I didn't expect to exist and I use frequently. [Download it](#)

### Change Case

What a gem. Change case reads your selected text and replaces it with changed casing: UPPERCASE, lowercase, kebab-case. You name it. [Download it](#)

### Unsplash

> `Search Images` `⌥` `U`

Download and copy images the biggest stock photo archive in the internet. [Download it](#)

## Quirky

Fun extensions I use once in a while.

### Premier League

> `Show Table` `Alias: pl`

Premier League table, fixtures and results. For the footy fanatic. [Download it](#)

### Fancy text

Create 𝓯𝓪𝓷𝓬𝔂 𝓽𝓮𝔁𝓽 in seconds with Raycast [Download it](#)

### Keyboard Lock

Have you ever tried to clean your MacBook keyboard? I know you haven't. But if you accidentally drop some bread crumbs on it, just use this extension to deactivate your keyboard and clean them off. [Download it](#)

### Get Youtube Thumbnail

Let's say you just posted a video and want to share it on X. How do you get the thumbnail? Drop the link into this extension. Alternatively, visit the dozens of websites that do this and get flooded with ads. [Download it](#)

## Money Talks

Let's talk about Raycast Pro

## Conclusion

that is a valid question

I see raycast as a layer that sits on top of everything I do on my computer

it makes all of the above > 20% better in terms of UX and speed

may be negligeable, but spread across the board it has changed my workflow completely

also it's free, so I'd rather use it instead of individual app alternatives (e.g, spotlight for app launch, rectangle for window management, maccy for clipboard history, etc...)

i just do it all inside raycast with better defaults and easier customization
