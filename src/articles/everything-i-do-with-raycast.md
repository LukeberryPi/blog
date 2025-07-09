---
title: "Everything I do with Raycast"
date: "2025-06-28"
tags: ["technology", "raycast"]
location: "London, United Kingdom"
---

In the last 50 days, Raycast released their [iOS app](https://www.raycast.com/ios), rolled out the much-awaited
[Windows Beta](https://x.com/thomaspaulmann/status/1937887427852488719) and got sherlocked ([or not?](https://x.com/thomaspaulmann/status/1932406174344757379)) by Apple, when they announced a
revolutionary update to the macOS Spotlight.

Raycast is growing fast and there are a lot of fresh eyes are on the product.

A year ago I wrote [Raycast: Second Impressions](https://www.lukeberrypi.com/articles/raycast-second-impressions), sharing why I switched from Alfred to Raycast. Since then I've spent hundreds of hours understanding how it works and extracting the most of it. It's time to write about it again.

Here's everything I do with Raycast in detail. Buckle up!

## Opening Applications

Let's start from the beginning, Raycast is a Launcher after all, right?

Opening apps with a hotkey. This is specially useful for a quick toggle, because pressing the hotkey again hides the app. Probably the easiest way to become quicker at navigating.

- `⌘` `esc` -> Terminal
- `⌥` `I` -> Visual Studio Code
- `⌥` `K` -> Google Chrome
- `⌥` `O` -> Obsidian

## Native Extensions

> These commands don't come with a hotkey by default. I customized these.

Let's start easy. These are all **zero configuration** and **free**.

### Clipboard History

> `⌘` `shift` `C`

Way before Raycast I used [Maccy](https://maccy.app) for clipboard history. Even before that on [Windows](https://support.microsoft.com/en-gb/windows/using-the-clipboard-30375039-ce71-9fe4-5b30-21b7aab6b13f).

If I convince you to use any Clipboard History and nothing else, I'll still be proud. Because it really is an impactful feature.

It reshapes how you think about a clipboard, from a simple asset transfer, to a global draft

Someone asked you for the link to a Pull Request you closed last week? Search for "pull". There it is.
Your mum accidentally deleted the kid photo you sent her? Filter by image. Easy.

I cannot express how much time this has saved me in a years time. Use it!

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

It's a clever move to have your community build

There's a lot to unpack, so I'll separate them into three sections:

- Essentials
- Surprising
- Quirky

## Essentials

Extensions I can no longer live without.

### Downloads Manager

> `Show Latest Download` `⌥` `D`

Shows, opens or copies the last download. Very useful for quickly installing apps by opening the `.dmg` or previewing video downloads.

### Color Picker

> `Pick Color` `⌥` `C`

Color utilities

### Spotify Controls

Pause Spotify by typing "sp", "sa"/"sd" for backwards/forwards

- `Pause/Play` `⌥` `P`
- `Next Song` `⌥` `]`
- `Previous Song` `⌥` `[`

### Google Translate

> `Quick Translate` `Alias: t`

Type in one language [EN, PT, ES, IT, FR] and receive translations in all languages instantly

### Toothpick

> `Manage Bluetooth Connections` `⌥` `B`

Switch between bluetooth and audio devices

### Image Tools

Compress and convert images. Useful for converting that photo you AirDropped to PNG.

## Surprising

Extensions I didn't expect to exist and I use frequently.

### Change Case

What a gem. Change case reads your selected text and

### Unsplash

> `Search Images` `⌥` `U`

Search for the biggest stock photo archive inside Raycast. When you find the perfect one download or copy it

## Quirky

Fun extensions I use once in a while.

### Premier League

> `Show Table` `Alias: pl`

Premier League table, fixtures and results. For the footy fanatic.

### Fancy text

Create 𝓯𝓪𝓷𝓬𝔂 𝓽𝓮𝔁𝓽 in seconds with Raycast

### Keyboard Lock

Have you ever tried to clean your MacBook keyboard? I know you haven't. But if you accidentally drop some bread crumbs on it, just use this extension to deactivate your keyboard and clean them off. There is a paid version of this app

### Get Youtube Thumbnail

Let's say you just posted a video and want to share it on X. How do you get the thumbnail? Drop the link into this extension.

Alternatively, visit the dozens of websites that do this and get flooded with ads.

that is a valid question

I see raycast as a layer that sits on top of everything I do on my computer

it makes all of the above > 20% better in terms of UX and speed

may be negligeable, but spread across the board it has changed my workflow completely

also it's free, so I'd rather use it instead of individual app alternatives (e.g, spotlight for app launch, rectangle for window management, maccy for clipboard history, etc...)

i just do it all inside raycast with better defaults and easier customization
