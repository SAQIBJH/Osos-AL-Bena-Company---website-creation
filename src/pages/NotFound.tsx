import { ArrowRight } from "lucide-react";
import t from "../locales/en.json";
export function NotFound() {
  return (
    <section className="container not-found">
      <h1>{t.notFound.title}</h1>
      <p>{t.notFound.body}</p>
      <a className="button" href="/products/">
        {t.actions.explore}
        <ArrowRight size={18} />
      </a>
      <a className="text-link" href="/">
        {t.notFound.home}
      </a>
    </section>
  );
}
