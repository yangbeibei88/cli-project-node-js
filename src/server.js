import fs from "node:fs/promises";
import http from "node:http";
import open from "open";

export const interpolate = (html, data) => {
  // {{ notes }} -> data.notes
  return html.replace(/\{\{\s*(\w+)\s*\}\}/g, (match, placeholder) => {
    return data[placeholder] || "";
  });
};

export const formatNotes = (notes) => {
  return notes
    .map((note) => {
      return `
    <div class="note">
      <h2>${note.content}</h2>
      <div class="tags">
        ${note.tags.map((tag) => `<span class="tag">${tag}</span>`).join(", ")}
      </div>
    </div>
    `;
    })
    .join("\n");
};

export const createServer = (notes) => {
  return http.createServer(async (req, res) => {
    let HTML_PATH = new URL("./template.html", import.meta.url).pathname;
    if (process.platform === "win32") {
      HTML_PATH = HTML_PATH.substring(1);
    }

    const template = await fs.readFile(HTML_PATH, "utf-8");

    const html = interpolate(template, { notes: formatNotes(notes) });

    res.writeHead(200, { "Content-Type": "text/html" });
    res.end(html);
  });
};

export const start = (notes, port) => {
  const server = createServer(notes);
  server.listen(port, () => {
    console.log(`Server is listening on port ${port}`);
  });
  open(`http://localhost:${port}`);
};
