"use client"

import { useLayoutEffect } from "react";
import { highlight } from "sugar-high";

export function Article({ html }: { html: string }) {
    const handleFormatCode = () => {
        const codes = document.querySelectorAll("pre code");
        codes.forEach((code) => {
        if (code.innerHTML.includes("span")) return;
          const html = highlight(code.textContent as string);
          // console.log(html)
          code.innerHTML = html;
        });
        const titles = document.querySelectorAll("h2");
        const subtitles = document.querySelectorAll("h3");
        const handleSetTitle = (title: any) => {
          title.id = title.textContent?.toLowerCase().replace(/\s/g, "-") as string;
        }
        titles.forEach(handleSetTitle)
        subtitles.forEach(handleSetTitle)
      }
      useLayoutEffect(handleFormatCode, [])
    return (
        <article dangerouslySetInnerHTML={{ __html: html }} />
    )
}