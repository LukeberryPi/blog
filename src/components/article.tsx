"use client"

import { useEffect } from "react";
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
        titles.forEach((title) => {
          console.log(title.textContent)
          title.id = title.textContent?.toLowerCase().replace(/\s/g, "-") as string;
        });
      }
      useEffect(handleFormatCode, [])
    return (
        <article dangerouslySetInnerHTML={{ __html: html }} />
    )
}