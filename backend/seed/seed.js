const fs = require("fs");
const path = require("path");

// 1) Read config from .env.seed
const envText = fs.readFileSync(
  path.join(__dirname, "..", ".env.seed"),
  "utf8",
);
const env = Object.fromEntries(
  envText
    .split(/\r?\n/)
    .filter((line) => line.includes("="))
    .map((line) => {
      const i = line.indexOf("=");
      return [line.slice(0, i).trim(), line.slice(i + 1).trim()];
    }),
);

const BASE = env.STRAPI_URL;
const headers = {
  "Content-Type": "application/json",
  Authorization: `Bearer ${env.SEED_TOKEN}`,
};

async function api(method, url, body) {
  const res = await fetch(`${BASE}${url}`, {
    method,
    headers,
    body: body ? JSON.stringify(body) : undefined,
  });
  if (!res.ok) {
    throw new Error(`${method} ${url} -> ${res.status} ${await res.text()}`);
  }
  return res.status === 204 ? null : res.json();
}

async function main() {
  const data = require("./books.json");

  // 2) Create categories and remember their documentIds
  const categoryIds = {};
  for (const c of data.categories) {
    const created = await api("POST", "/api/categories", { data: c });
    categoryIds[c.slug] = created.data.documentId;
    console.log("category:", c.name);
  }

  // 3) Create books linked to their category
  for (const b of data.books) {
    const { category, ...fields } = b;
    await api("POST", "/api/books", {
      data: { ...fields, category: { connect: [categoryIds[category]] } },
    });
    console.log("book:", b.title);
  }

  console.log("Done.");
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
