---
title: "Building an Image Blur Tool in 3 Hours with Claude Code"
date: "2025-07-30"
tags: ["technology"]
location: "Brazil"
---

In the last weeks, 1 every 5 posts in my X timeline are about Claude Code. Especially since the company announced [](https://)

I recently spent 3 hours experimenting with Claude Code Pro, and the results exceeded my expectations. Using Claude Sonnet 4 ($20/month subscription), I built a fully functional web application that allows users to selectively blur portions of images—a feature that typically requires careful handling of JavaScript events, canvas manipulation, and blob operations.

In this article, I'll walk through my development process, the prompts I used, and the key insight that made everything click.

## The Challenge

Creating a web application for image censoring might sound straightforward, but it involves several technical complexities:

- Handling multiple image formats (PNG, JPEG, WebP)
- Implementing drag-and-drop functionality
- Creating movable and resizable overlay elements
- Manipulating canvas elements to apply blur effects
- Generating downloadable images with persistent modifications

All frontend processing, no backend required—but definitely not trivial.

## Setting Up the Project

I started by creating a Next.js project using better-t-stack, a template that provides a solid foundation. Since all processing happens client-side, I disabled all backend-related features:

```
bun create better-t-stack@latest freeblur --yes --frontend next --backend none --runtime none --api none --database none --orm none --no-auth --addons husky  pwa
```

## Working with Claude Code

### Step 1: Documentation Enhancement

After initializing Claude Code, my first request was to improve the project documentation:

```
read the README.​md and improve it so that any developer that onboards this project can easily understand the stack, file structure, useful commands and code style. be thorough.
```

### Step 2: Code Generation Guidelines

I ran `/init` to generate CLAUDE.md, a file that provides Claude with specific instructions on code generation, refactoring patterns, and project conventions.

### Step 3: Core Feature Implementation

Here's where things got interesting. I specified the application requirements using Claude's Plan Mode (activated with Shift+Tab), which allows Claude to think through requirements, generate a task list, and solve them sequentially:

```
i want to create a website that allows users to blur photos for free.

here are the specifications:

- the website should have EXCELLENT SEO and Accessibility metrics. use aria attributes wherever needed. add consistent metadata and robots.txt for the best SEO placement.

- the user can upload any image (png, jpeg, webp) by dragging it onto the homepage or by clicking an upload button.

- when the image loads, the user is still in the same page, and can see the uploaded image, as well as a toast confirming the succesful upload.

- create a button with the text "blur selected area". when the user clicks this, it spawns a blurred rectangle of 150px wide by 50px height. 

- the user can move this rectangle over the original image freely. the user can also drag each of the four corners of the rectangle to redimension it.

- if at any point the user clicks download image or copy image, the blurred rectangle should persist and be part of the final image downloaded or copied.

- below the image there should be two buttons: one to copy the blurred/censored picture to the clipboard and another to download it to the user's device
```

The initial results were positive but imperfect—the download functionality was broken.

## The Game Changer: Playwright Integration

This is where I discovered the key to dramatically improving Claude's output quality. I installed the MCP (Model Context Protocol) server for Playwright:

```
claude mcp add playwright npx '@playwright/mcp@latest'
```

This integration allows Claude to:
- Navigate localhost
- Take screenshots of features
- Create and run E2E tests
- Verify functionality programmatically

### Test-Driven Development with AI

With Playwright integrated, I adopted a new approach—requesting E2E tests for every feature. When I encountered a bug where clicking "blur image" didn't apply the blur effect, I used this prompt:

```
when i click blur image, nothing happens to the image. what i expected was to see the image itself blurred.

do the following: use the playwright mcp server to create an end to end tests that verifies that the user can click the blur button to correctly blur the whole image and then download it correctly.

you should iterate and change code until you can attest via playwright that you have successfully completed this requirement.
```

This approach transformed the development process. Claude would:
1. Write the test case
2. Run it and observe failures
3. Modify the code
4. Re-run tests until passing

## Results

The final product, while aesthetically basic, was fully functional. Users can:
- Upload images via drag-and-drop or file selection
- Position and resize blur rectangles
- Download or copy the modified images

The entire development process took just 3 hours, showcasing the potential of AI-assisted coding when properly configured with testing capabilities.

## Key Takeaways

1. **Plan Mode is powerful**: Using Shift+Tab to activate Plan Mode helps Claude break down complex requirements systematically.

2. **Testing integration is crucial**: The Playwright MCP server transformed vague bug reports into concrete, testable requirements.

3. **Iterative development works**: Allowing Claude to run tests, fail, and retry creates a feedback loop similar to human development.

4. **Clear specifications matter**: Detailed prompts with specific requirements yield better results than vague requests.

## Conclusion

Claude Code demonstrates the evolving landscape of AI-assisted development. By combining clear specifications, proper tooling (Playwright), and iterative testing, I built a functional web application in a fraction of the typical development time.

While the UI might not win design awards, the rapid prototyping capability is undeniable. As these tools continue to evolve, the barrier between idea and implementation continues to shrink.

Have you experimented with AI coding assistants? I'd love to hear about your experiences.

