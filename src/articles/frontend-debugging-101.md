---
title: "Frontend Debugging 101"
date: "23-07-2024"
---

> I have created a website with a checkbox for every one of these steps. \
Check it out here: [https://frontend-debugging-101.vercel.app](https://frontend-debugging-101.vercel.app/)

I believe the cliché "there are no dumb questions". I even created a [website](https://possoperguntar.com.br) that is the Portuguese equivalent of [dontasktoask.com](https://dontasktoask.com). I heavily encourage asking in public and learning to formulate questions.

However, solving your own problems in software is the unlock for progress. The more you do it, the more errors you instantly recognize and the faster you will move.

In my first programming job, I would often call colleagues in despair with errors in my code, only for them to solve it in seconds. Even though my questions weren't "dumb" _per se_, I felt silly since the solution was that simple.

If you're a beginner, you will face these situations a lot. It is completely natural, and more experienced people won't mind. As long as you learn from your mistakes and don't repeat them.

Here is a list of steps I take before asking other people for help. It will range from very simple to medium-effort steps for debugging. I also added my usual time spent with each step.

> Disclaimer: this list is heavily Frontend-oriented. It is also aimed at beginners.

## If there's an error message

### Have you read it? (~30 seconds)

You must read the error message. I know, I know: it's red and it's confusing. But even if it doesn't solve your problem right away, you can better understand what is wrong.

You **must** exercise reading error messages. You will do it thousands of times as a Software Developer.

### Have you asked in public? (~2 minutes)

I am a huge proponent of asking in public, especially this early into debugging. It is very common that someone replies an interesting alternative (or the outright solution) and saves me the time of debugging it myself.

My favorite means to do this is X (formerly Twitter). Here is an example of [how I do it](https://x.com/LukeberryPi/status/1808877006957797781) and a [guide on how to do it (in Portuguese)](https://possoperguntar.com.br).

### Have you searched the codebase for a similar implementation? (~1 minute)

It is said that the more code you copy, the more experienced you are. You might be attempting to write code that is very similar to other code in the same repository.

Develop the habit of searching the codebase for the methods you are trying to implement. I do this with `cmd + shift + f` on VS Code. And search for `useInfiniteQuery(`, for example.

### Have you accessed the documentation? (~15 minutes)

Searching the documentation may be the quickest way to solve your problem. Docs usually have definitions for methods, its parameters, what it returns, and even a "Common Errors" section that might include yours.

I usually do this by looking up the `method + library` on Google. For example, `useInfiniteQuery react query`. [Here is this specific example's documentation](https://tanstack.com/query/v4/docs/framework/react/reference/useInfiniteQuery).

### Have you looked up the error? (~15 minutes)

Use whatever tool you prefer for this. It can be Google, ChatGPT, Claude AI or something else. Again, even if you don't solve it right away, it will help you understand the type of error and put you in the right path towards solving it.

For Large Language Models (LLMs), I prefer to paste my code and ask "Why is this wrong?", instead of just pasting the error message directly. I have had better results with this approach.

But what if you don't have an error message?

## Things stopped working for "no reason"

### Have you saved the file? (~5 seconds)

VS Code has autosave disabled by default. This means you will have to save your file to see your changes reflected on the browser, usually via `cmd + s`.

I highly recommend [turning on autosave](https://code.visualstudio.com/docs/editor/codebasics#_save-auto-save). I use the `afterDelay` option set to 1000ms.

### Are you returning something? (~1 minute)

If you are using `.map()`, `.filter()` or `.reduce()` make sure you are returning something. A common mistake is when refactoring from an implicit return to an explicit return:

When using parenthesis, you don't need to write "return":

```
{list.map((item) => (
  <p key={item.id}>{item.content}</p>
))}
```

If you refactor to brackets, you need to write "return":

```
{list.map((item) => {
  const upperCaseContent = item.content.toUpperCase()
  return <p key={item.id}>{upperCaseContent}</p>
})}
```

### Are you in the right URL? (~5 seconds)

You might be in the wrong page or even the wrong environment. Your local changes won't show in the production environment, for example.

While developing, you probably want to be checking your changes at `localhost:<some-number>`.

### Are you connected to the VPN? (~10 seconds)

Many enterprise companies use Virtual Private Networks (VPN) for accessing sensitive information.

The staging environment, as well as project documentation or Kanban boards, may be unaccessible without logging into the VPN.

## Turn it off and on again

### Have you restarted the local server? (~30 seconds)

This solves most hardware problems and a few software problems as well!

You can do this by navigating to the terminal where the server is running and hitting `ctrl + c`. Then, you can restart the server (usually via `npm run dev`).

### Have you restarted the TypeScript Server? (~10 seconds)

Language Server Protocols (LSP) can be hard sometimes. If you are seeing uncommon type errors in your IDE, there's a chance it's just the LSP malfunctioning.

I have created the habit of running the `TypeScript: Restart TS Server` command in VS Code every 15 minutes.

### Have you reinstalled node_modules? (~1 minute)

It is common for your `node_modules` to become corrupted. If the error looks unrelated to your changes, try it.

You can accomplish it by running `rm -rf ./node_modules` in your project root. Then, reinstall them by running the install command, most commonly `npm i`.

## Specific yet common errors

### Have you cleared the cache? (~10 seconds)

Stale state is a big enemy of Frontend development. Often you can't see changes because you are accessing a cached (old) version of the whatever you're developing.

You can use the `cmd + shift + r` hotkey for clearing the cache in most browsers.

### Are you using the correct file extension? (~10 seconds)

You might be using JavaScript XML (JSX) syntax on a `.js` or `.ts` file. You should use JSX and TSX syntax only in `.jsx` and `.tsx` files. It causes some apparently nonsensical errors, such as:

```
typescript: Cannot find name 'div'.
```

### Are you in sync with the correct branch? (~1 minute)

Development is commonly a team effort. It is possible that you're facing an issue that your teammate has already fixed. Keep up to date with the main branch by running `git pull origin main`. I do it daily.

This is assuming you use Trunk-Based Development (TBD). If you use Gitflow, it may be the `develop` branch that you should be pulling from.

### Are your imports correct? (~30 seconds)

Verify that you are importing code from the correct source, especially if there are similarly named files.

It is also common to mix up imports from libraries. I recently lost a lot of time due to VS Code's auto import. Can you spot the difference?

What it gave me:

```
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from '@radix-ui/react-dialog';
```

What I wanted:

```
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogDescription,
} from '@/shared/components/ui/dialog';
```

### Does it happen in an anonymous window? (~2 minutes)

You should always check if an error also occurs in an anonymous window. You might have browser extensions that are affecting your development. You can do this with `cmd + shift + n` on most browsers.

This can also surface issues with authentication, since you will be logged off.

### Does your current user have the correct role permissions? (~5 minutes)

If your application relies on permissions and roles for business logic, check if the action you're trying to perform is allowed for your current user.

I had this recently: I was developing with an admin user, and the Quality Assurance (QA) was testing with a non-admin user. Since the roles are different, there were inconsistencies in the app's functionality.

## I didn't solve it yet, what now?

### Take a break (~10 minutes)

I can't overstate the importance of this. Just take your eyes off screens. At this point, you've been debugging for a while. You can take the trash out, make a sandwich, pet your dog, floss your teeth, lie down. Anything goes.

> Using your cellphone is complete self-sabotage and will make it harder to solve your problem. If you're serious about it, don't do it.

### Write it down (~20 minutes)

Whenever you are back, ask yourself the following questions and **write the answer**:

- What are you trying to do?
- What is the problem you're running into?
- What have you tried so far?

Here is a real example I wrote:

> I am trying to save a draft post whenever a user tries to close the `<CreatePost />` component and they have filled something in any form field. The problem I am running into is that I can't save a draft because there are properties in the `saveDraftSchema` that are required, but still undefined at this point. I have tried updating the schema and using `.optional()` method but I'm still receiving a `ZodError: required_error`.

This is called [rubber duck debugging](https://en.wikipedia.org/wiki/Rubber_duck_debugging). And something magical will happen if you do it. You will either:

- Think of an alternative that you haven't tried yet
- Think of the solution immediately

If it doesn't happen...

### Send it! (~2 minutes)

At this point you know how to explain what you want to do and what you've already tried: the perfect recipe for someone to help you!

Just send the message into a group chat from work. If you prefer sending it to an specific person, you can do that too, just be mindful that they:

- Might not be available
- Might not know how to solve your problem

Sending it to a group chat increases the probability that someone helps you. And with all of the info you've gathered about your task, solving it will be a breeze.

## Conclusion

This was my step-by-step guide for debugging common Frontend development issues. Worst case scenario this takes 90 minutes. But most of the times, you will make progress a lot earlier.

I am still learning and I don't know everything. This list may be useless if you work with something other than Frontend web development.

If you are a beginner in Frontend, give this a try! You won't regret it.
