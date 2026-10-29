import { ArrowUpRight, ImageOff, MessageCircle } from "lucide-react";
import { useState, type ReactNode } from "react";
import company from "../data/company.json";
import t from "../locales/en.json";
import { whatsappUrl, type Product } from "../catalog";
export function WhatsAppLink({
  children = t.actions.whatsapp,
  message = t.messages.general,
  className = "button button-green",
}: {
  children?: ReactNode;
  message?: string;
  className?: string;
}) {
  return (
    <a
      className={className}
      href={whatsappUrl(company.phoneDigits, message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <MessageCircle size={18} />
      {children}
      <ArrowUpRight size={17} />
    </a>
  );
}
export function ProductImage({
  src,
  alt,
  className = "",
}: {
  src?: string | null;
  alt: string;
  className?: string;
}) {
  const [failed, setFailed] = useState(false);
  const unavailable = !src || failed;
  return (
    <div className={`product-image ${className}`}>
      <img
        src={unavailable ? "/images/product-fallback.svg" : src!}
        alt={unavailable ? t.catalog.imageUnavailable : alt}
        width="960"
        height="720"
        loading="lazy"
        onError={() => {
          if (!failed) setFailed(true);
        }}
      />
      {unavailable ? (
        <span className="image-note">
          <ImageOff size={14} />
          {t.catalog.imageUnavailable}
        </span>
      ) : null}
    </div>
  );
}
export function ProductCard({ product }: { product: Product }) {
  return (
    <article className="product-card">
      <a
        href={`/products/${product.slug}/`}
        className="product-image-link"
        tabIndex={-1}
        aria-hidden="true"
      >
        <ProductImage src={product.image} alt={product.imageAlt} />
      </a>
      <div className="product-card-body">
        <h3>
          <a href={`/products/${product.slug}/`}>{product.name}</a>
        </h3>
        <p className="metadata">{product.family}</p>
        <p className="product-meta">
          {product.model || product.partNumber || product.brand}{" "}
          <span aria-hidden="true">/</span> {product.origin}
        </p>
        <a className="text-link" href={`/products/${product.slug}/`}>
          {t.actions.view}
          <ArrowUpRight size={18} />
        </a>
      </div>
    </article>
  );
}
export function EnquiryBand() {
  return (
    <section className="enquiry-band">
      <div className="container enquiry-inner">
        <h2>{t.cta.title}</h2>
        <div>
          <p>{t.cta.body}</p>
          <WhatsAppLink />
        </div>
      </div>
    </section>
  );
}
export function Breadcrumb({
  name,
  parent,
}: {
  name: string;
  parent?: boolean;
}) {
  return (
    <nav className="breadcrumb" aria-label={t.common.breadcrumb}>
      <a href="/">{t.common.home}</a>
      <span aria-hidden="true">/</span>
      {parent ? (
        <>
          <a href="/products/">{t.common.products}</a>
          <span aria-hidden="true">/</span>
        </>
      ) : null}
      <span aria-current="page">{name}</span>
    </nav>
  );
}
