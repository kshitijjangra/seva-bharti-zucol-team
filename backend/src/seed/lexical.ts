// Builds Payload Lexical rich-text JSON from plain paragraphs.
// "**word**" inside a paragraph becomes bold (rendered as a highlight by the frontend).

export function paragraph(text: string) {
  return {
    type: "paragraph",
    version: 1,
    direction: "ltr" as const,
    format: "" as const,
    indent: 0,
    textFormat: 0,
    textStyle: "",
    // "**word**" → bold text node (rendered as a highlight by the frontend).
    children: text
      .split(/(\*\*[^*]+\*\*)/)
      .filter(Boolean)
      .map((part) => {
        const bold = part.startsWith("**") && part.endsWith("**");
        return {
          type: "text",
          version: 1,
          detail: 0,
          format: bold ? 1 : 0,
          mode: "normal",
          style: "",
          text: bold ? part.slice(2, -2) : part,
        };
      }),
  };
}

export function lexical(paragraphs: readonly string[]) {
  return {
    root: {
      type: "root",
      version: 1,
      direction: "ltr" as const,
      format: "" as const,
      indent: 0,
      children: paragraphs.map(paragraph),
    },
  };
}
