import { useState } from "react";
import { ArrowUpRight, MapPin, Phone, Mail } from "lucide-react";
import company from "../data/company.json";
import t from "../locales/en.json";
import { products, whatsappUrl } from "../catalog";
import { Breadcrumb, WhatsAppLink } from "../components/UI";
export function Contact() {
  const [error, setError] = useState("");
  return (
    <>
      <section className="page-intro container">
        <Breadcrumb name={t.common.contact} />
        <div className="section-heading">
          <h1>{t.contact.title}</h1>
          <p>{t.contact.intro}</p>
        </div>
      </section>
      <section className="contact-grid container">
        <div className="contact-info">
          <h2>{t.contact.address}</h2>
          <a href={`tel:+${company.phoneDigits}`}>
            <Phone size={22} />
            <span>
              <small>{t.contact.call}</small>
              {company.phone}
            </span>
            <ArrowUpRight size={18} />
          </a>
          <a href={`mailto:${company.email}`}>
            <Mail size={22} />
            <span>
              <small>{t.contact.email}</small>
              {company.email}
            </span>
            <ArrowUpRight size={18} />
          </a>
          <div className="address-block">
            <MapPin size={22} />
            <p>{company.address}</p>
          </div>
          <WhatsAppLink />
          <div className="contact-mark" aria-hidden="true">
            {company.brand}
            <span style={{ whiteSpace: "pre-line" }}>
              {t.common.contactMark}
            </span>
          </div>
        </div>
        <form
          className="enquiry-form"
          onSubmit={(e) => {
            e.preventDefault();
            const form = e.currentTarget;
            if (!form.reportValidity()) {
              setError(t.contact.error);
              return;
            }
            const data = new FormData(form);
            const message = [
              t.messages.intro.replace(
                "{name}",
                String(data.get("name")).trim(),
              ),
              data.get("company")
                ? t.messages.company.replace(
                    "{value}",
                    String(data.get("company")),
                  )
                : "",
              data.get("phone")
                ? t.messages.phone.replace("{value}", String(data.get("phone")))
                : "",
              data.get("product")
                ? t.messages.productField.replace(
                    "{value}",
                    String(data.get("product")),
                  )
                : "",
              t.messages.requirements.replace(
                "{value}",
                String(data.get("message")).trim(),
              ),
            ]
              .filter(Boolean)
              .join("\n");
            if (
              !String(data.get("name")).trim() ||
              !String(data.get("message")).trim()
            ) {
              setError(t.contact.error);
              form
                .querySelector<HTMLElement>(
                  !String(data.get("name")).trim()
                    ? '[name="name"]'
                    : '[name="message"]',
                )
                ?.focus();
              return;
            }
            setError("");
            window.open(
              whatsappUrl(company.phoneDigits, message),
              "_blank",
              "noopener,noreferrer",
            );
          }}
        >
          <h2>{t.contact.formTitle}</h2>
          <p>{t.contact.handoff}</p>
          <div className="form-grid">
            <label>
              {t.contact.name}
              <span className="required">{t.contact.required}</span>
              <input
                name="name"
                autoComplete="name"
                required
                maxLength={100}
                aria-describedby={error ? "form-error" : undefined}
              />
            </label>
            <label>
              {t.contact.phone}
              <input
                name="phone"
                type="tel"
                autoComplete="tel"
                maxLength={40}
              />
            </label>
          </div>
          <label>
            {t.contact.company}
            <input name="company" autoComplete="organization" maxLength={160} />
          </label>
          <label>
            {t.contact.product}
            <select name="product" defaultValue="">
              <option value="">{t.contact.choose}</option>
              {products.map((p) => (
                <option key={p.id} value={p.name}>
                  {p.name}
                </option>
              ))}
            </select>
          </label>
          <label>
            {t.contact.message}
            <span className="required">{t.contact.required}</span>
            <textarea
              name="message"
              rows={5}
              required
              maxLength={2000}
              aria-describedby={`message-hint${error ? " form-error" : ""}`}
            />
          </label>
          <p id="message-hint" className="field-hint">
            {t.contact.messageHint}
          </p>
          {error ? (
            <p role="alert" id="form-error" className="form-error">
              {error}
            </p>
          ) : null}
          <button className="button button-green" type="submit">
            {t.contact.submit}
            <ArrowUpRight size={18} />
          </button>
          <p className="field-hint privacy">{t.contact.privacy}</p>
          <noscript>
            <p>{t.contact.noJs}</p>
          </noscript>
        </form>
      </section>
    </>
  );
}
