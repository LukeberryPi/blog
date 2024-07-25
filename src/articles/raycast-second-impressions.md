---
title: "Raycast: Second Impressions"
date: "2024-07-15"
---

When I first bought a MacBook, I came across Alfred: an app launcher to replace Apple's Spotlight. What I liked the most was:

- Opening apps with just a keystroke (e.g.: "s" opened Spotify)
- Looking stuff up online and searching files on my computer
- Searching all of my bookmarks and opening them

When I first heard of Raycast. I was curious, but skeptical. I downloaded it and tried it out. The product felt a bit undercooked:

- It opened up files when I wanted to open browser bookmarks
- File search felt slower and less assertive than Alfred

Even if my first experience with Raycast wasn't convincing, I definitely saw the potential. It felt slick and modern, it just didn't fit my use case.

> Disclaimer: I didn't take the time to configure Raycast as I had done with Alfred. In that sense, it was a bit unfair to expect Raycast's default to behave exactly as I desired.

Still, out-of-the-box (OOTB) behavior plays a huge role on migrating to/from a similar tool. Most users won't have the patience to configure the new tool and will give up migrating altogether.

I recently decided to give Raycast a second try. **Spoiler: I no longer use Alfred.** In this article I will explain why I came back, what I love and what I wish would change.

## Why I Tried it Again

What brought me back was [@peduarte](https://x.com/peduarte), a Software Engineer at Raycast, asking me in an [X thread](https://x.com/peduarte/status/1793990811014865072) what I thought Alfred did better.

After reading through my feedback, he invited me to join Slack and become a beta tester. This showed me Raycast excels at community and convinced me to try it again.

## What I Love

### User Interface and Experience

First off, something that Raycast is impeccable at: UI + UX. The user feedback, the subtle animations, how they embraced keyboard-first. It felt seamless to customize and the onboarding was amazing.

### Uninstalling other Apps

Uninstalling apps always feels good. And opting for Raycast's implementation often resulted in a better experience. Some applications that I chopped off in favor of using Raycast's own Extensions:

- [Maccy](https://maccy.app/) for clipboard history
- [Rocket](https://matthewpalmer.net/rocket/) for typing emojis
- [Rectangle](https://rectangleapp.com/) for window management

### Extensions and More Extensions!

This is the soul of Raycast. Here is what I use the most:

- [Spotify Controls](https://www.raycast.com/thomas/spotify-controls): I use "sp" to Play/Pause and "sa" and "sd" for the Next/Previous Track. These are better than the native keyboard controls because they don't conflict with other players (such as accidentally pausing a Youtube video instead of a Spotify track).

- [Google Chrome](https://www.raycast.com/Codely/google-chrome): one feature makes this extension for me: Search Tabs. Even if Chrome is minimized, I can access specific tabs in seconds. A common use case is to go from VS Code straight into ChatGPT. Or open my WhatsApp tab from anywhere.

- [Google Translate](https://www.raycast.com/gebeto/translate): I'm currently travelling around Europe and the possibility of translating a sentence [from/into any number of languages](https://x.com/LukeberryPi/status/1813352420623188453) is unbelievably handy.

## What I Wish Would Change

### Snippets and Text Replacements

I have been using MacOS Text Replacement for a long time. Mostly for contact information, for example: "myemail" replaces into "lukeberrypi@gmail.com". Super handy.

Unfortunately, Raycast Snippets break on X and WhatsApp, two of my most used websites. They also [don't work on VS Code](https://x.com/LukeberryPi/status/1806094087658807370).

For now, I will stick to the native Text Replacements.

### Disable Fuzzy Search for Emojis

When I used [Rocket](https://matthewpalmer.net/rocket/), there was an option to enable/disable fuzzy search. This would be a great addition to Raycast Emojis exntension, as it is currently [impossible to disable it](https://x.com/LukeberryPi/status/1801228787826229632).

### Browser Agnostic Bookmarks

Question: if you bookmark "google.com" in Safari and Google Chrome is your default web browser, where do you expect the bookmark to open when accessing it via a launcher?

Alfred opens it in Google Chrome and Raycast opens it in Safari. I much prefer the former. An "Always Open in Default Browser" toggle would also be amazing.

### Navigating with Escape

In Raycast, `esc` goes back to the previous page. I wish I could configure this to the more universal `cmd + [` and `cmd + ]`, which I've grown used to. And an option for `esc` to close the entire Raycast app would be amazing.

### Using "fn" as a Modifier Key

It is impossible to setup hotkeys for Raycast using the "globe/fn" key. This would be a nice addition since using `cmd` and `ctrl` often leads to conflicting hotkeys between different apps.

## Conclusion

Raycast is phenomenal. Huge shout out to [@peduarte](https://x.com/peduarte) and the team for developing such an impressive, all-encompassing application.

As with any software, there are improvement points, but I wouldn't write about it to this length if I didn't love it! [Try it out yourself (MacOS only)](https://www.raycast.com/).
