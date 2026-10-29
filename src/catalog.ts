import data from "./data/products.json";
export type Product = (typeof data)[number];
export const products: Product[] = data;
export const facetKeys = ["family", "material", "finish", "brand"] as const;
export type Facet = (typeof facetKeys)[number];
export type Filters = Record<Facet, string[]>;
export const emptyFilters = (): Filters => ({
  family: [],
  material: [],
  finish: [],
  brand: [],
});
export function values(product: Product, facet: Facet): string[] {
  if (facet === "finish") return product.finishes;
  const value = product[facet];
  return value ? [value] : [];
}
export const options = Object.fromEntries(
  facetKeys.map((key) => [
    key,
    [...new Set(products.flatMap((p) => values(p, key)))].sort(),
  ]),
) as Record<Facet, string[]>;
export function filterProducts(query: string, filters: Filters) {
  const terms = query.toLowerCase().trim().split(/\s+/).filter(Boolean);
  return products.filter((p) => {
    const haystack = [p.name, p.model, p.partNumber, p.description]
      .filter(Boolean)
      .join(" ")
      .toLowerCase();
    return (
      terms.every((term) => haystack.includes(term)) &&
      facetKeys.every(
        (key) =>
          !filters[key].length ||
          filters[key].some((value) => values(p, key).includes(value)),
      )
    );
  });
}
export function readSelection(search: string) {
  const params = new URLSearchParams(search),
    filters = emptyFilters();
  for (const key of facetKeys)
    filters[key] = [...new Set(params.getAll(key))].filter((value) =>
      options[key].includes(value),
    );
  return { query: params.get("q") || "", filters };
}
export function selectionUrl(query: string, filters: Filters) {
  const params = new URLSearchParams();
  if (query.trim()) params.set("q", query.trim());
  for (const key of facetKeys)
    for (const value of filters[key]) params.append(key, value);
  return "/products/" + (params.size ? "?" + params.toString() : "");
}
export function whatsappUrl(phone: string, message: string) {
  return `https://wa.me/${phone}?text=${encodeURIComponent(message)}`;
}
