import { ArrowRight, ArrowUpRight, MapPin } from "lucide-react";
import company from "../data/company.json";
import site from "../data/site.json";
import t from "../locales/en.json";
import { products, selectionUrl, emptyFilters, type Product } from "../catalog";
import { EnquiryBand, ProductCard } from "../components/UI";
export function Home() {
  return (
    <>
      <section className="home-hero container">
        <div className="hero-copy">
          <h1>{t.home.title}</h1>
          <p>{t.home.intro}</p>
          <div className="hero-actions">
            <a className="button" href="/products/">
              {t.actions.explore}
              <ArrowUpRight size={20} />
            </a>
            <a className="text-link" href="/about/">
              {t.home.aboutLink}
              <ArrowRight size={18} />
            </a>
          </div>
          <div className="hero-origin">
            <MapPin size={16} />
            <span>{t.home.location}</span>
            <span className="origin-line" />
            <span>{t.home.since}</span>
          </div>
        </div>
        <figure className="hero-figure">
          <img
            src="/images/hero.webp"
            srcSet="/images/hero-640.webp 640w, /images/hero-960.webp 960w, /images/hero.webp 1440w"
            sizes="(max-width: 639px) calc(100vw - 40px), (max-width: 1439px) 48vw, 620px"
            alt={t.images.heroAlt}
            width="1440"
            height="960"
            fetchPriority="high"
          />
          <figcaption>{t.home.imageCaption}</figcaption>
          <div className="hero-image-label" aria-hidden="true">
            {company.brand}
            <span>{t.common.heroLabel}</span>
          </div>
        </figure>
      </section>
      <section className="range-section section">
        <div className="container">
          <div className="section-heading">
            <h2>{t.home.rangeTitle}</h2>
            <p>{t.home.rangeIntro}</p>
          </div>
          <div className="family-grid">
            {site.families.map((f, i) => (
              <a
                className={`family-card family-${i}`}
                href={selectionUrl("", { ...emptyFilters(), family: [f.name] })}
                key={f.name}
              >
                <div className="family-image">
                  <img
                    src={f.image || "/images/product-fallback.svg"}
                    alt={f.short}
                    width="600"
                    height="450"
                    loading="lazy"
                  />
                </div>
                <div>
                  <h3>{f.short}</h3>
                  <ArrowUpRight size={24} />
                </div>
                <p>{f.description}</p>
              </a>
            ))}
          </div>
        </div>
      </section>
      <section className="section company-section container">
        <div className="company-visual">
          <img
            src="/images/system.webp"
            alt={t.images.systemAlt}
            width="1200"
            height="900"
            loading="lazy"
          />
          <span>{company.legalName}</span>
        </div>
        <div className="company-copy">
          <h2>{t.home.aboutTitle}</h2>
          <p>{company.intro}</p>
          <p>{company.about}</p>
          <a className="text-link" href="/about/">
            {t.home.aboutLink}
            <ArrowUpRight size={18} />
          </a>
        </div>
      </section>
      <section className="section featured-section">
        <div className="container">
          <div className="section-heading">
            <div>
              <h2>{t.home.featuredTitle}</h2>
              <p>{t.home.featuredIntro}</p>
            </div>
            <a className="text-link" href="/products/">
              {t.actions.all}
              <ArrowUpRight size={18} />
            </a>
          </div>
          <div className="featured-grid">
            {site.featuredIds
              .map((id) => products.find((p) => p.id === id))
              .filter((p): p is Product => !!p)
              .map((p) => (
                <ProductCard key={p.id} product={p} />
              ))}
          </div>
        </div>
      </section>
      <EnquiryBand />
    </>
  );
}
