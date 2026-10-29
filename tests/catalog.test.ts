import { test } from "node:test";
import assert from "node:assert/strict";
import {
  products,
  filterProducts,
  emptyFilters,
  readSelection,
  selectionUrl,
  whatsappUrl,
} from "../src/catalog";
test("all source rows retained, identities unique and BTS origin correct", () => {
  assert.equal(products.length, 41);
  assert.equal(new Set(products.map((p) => p.slug)).size, 41);
  assert.deepEqual(
    products.map((p) => p.source.row),
    Array.from({ length: 41 }, (_, i) => i + 2),
  );
  const bts = products.find((p) => p.brand === "BTS")!;
  assert.equal(bts.origin, "India");
  assert.equal(bts.manufacturer, "BTS (India)");
});
test("search handles terms, model, part number and no results", () => {
  assert.equal(filterProducts(" TYPE-TF ", emptyFilters()).length, 1);
  assert.equal(filterProducts("S-C1", emptyFilters()).length, 1);
  assert.equal(filterProducts("horizontal 90", emptyFilters()).length, 2);
  assert.equal(filterProducts("unobtainium", emptyFilters()).length, 0);
});
test("facets OR internally and AND across facets", () => {
  const f = { ...emptyFilters(), family: ["Cable cleats", "Cable baskets"] };
  assert.equal(filterProducts("", f).length, 3);
  assert.equal(filterProducts("", { ...f, brand: ["BTS"] }).length, 1);
  assert.equal(filterProducts("basket", { ...f, brand: ["BTS"] }).length, 0);
});
test("URL state roundtrips, rejects unknown values and deduplicates", () => {
  const f = {
    ...emptyFilters(),
    family: ["Cable trays & fittings"],
    finish: ["Hot Dip Galvanized"],
  };
  const url = selectionUrl("90 elbow", f);
  assert.deepEqual(readSelection(url.split("?")[1]), {
    query: "90 elbow",
    filters: f,
  });
  assert.deepEqual(
    readSelection("?brand=unknown&brand=BTS&brand=BTS").filters.brand,
    ["BTS"],
  );
});
test("WhatsApp encodes reserved characters and Unicode", () => {
  const message = "Name: A&B + فريق\nSize: 41×41";
  const url = new URL(whatsappUrl("966563702823", message));
  assert.equal(url.searchParams.get("text"), message);
  assert.equal(url.pathname, "/966563702823");
});
