import { useState, type FormEvent } from "react";
import { Link, useSearchParams } from "react-router-dom";
import { ArrowDown, ArrowRight, CalendarDays, Check, Clock3, Copy, Download, MapPin, Sparkles } from "lucide-react";
import cx from "./cx";
import tokens from "./tokens.module.css";
import styles from "./Contact.module.css";
import SectionTags from "./SectionTags";
import Button from "./Button";
import { businessProfile } from "../content/brand";
import { orderLeadTimeDays, orderMinimumCents, products } from "../content/products";

interface Inquiry {
  name: string;
  email: string;
  phone: string;
  occasion: string;
  eventDate: string;
  city: string;
  treatInterest: string;
  details: string;
}

const currency = (cents: number) => new Intl.NumberFormat("en-US", { style: "currency", currency: "USD" }).format(cents / 100);

function formatInquiry(inquiry: Inquiry) {
  return [
    "Goldie Ann’s Sweets & More — Inquiry",
    `Name: ${inquiry.name}`,
    `Email: ${inquiry.email}`,
    `Phone: ${inquiry.phone || "Not provided"}`,
    `Occasion: ${inquiry.occasion}`,
    `Event date: ${inquiry.eventDate || "Not set"}`,
    `City / area: ${inquiry.city || "Not provided"}`,
    `Treats of interest: ${inquiry.treatInterest || "Open to suggestions"}`,
    "",
    inquiry.details,
  ].join("\n");
}

export default function Contact() {
  const [searchParams] = useSearchParams();
  const productId = searchParams.get("product");
  const selectedProduct = products.find((product) => product.id === productId);
  const [minimumDate] = useState(() => {
    const date = new Date();
    date.setDate(date.getDate() + orderLeadTimeDays);
    return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
  });
  const [inquiry, setInquiry] = useState<Inquiry | null>(null);
  const [copied, setCopied] = useState(false);
  const [copyError, setCopyError] = useState(false);
  const [defaults, setDefaults] = useState<Partial<Inquiry>>({ treatInterest: selectedProduct?.name ?? "" });

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const form = new FormData(event.currentTarget);
    const nextInquiry: Inquiry = {
      name: String(form.get("name") ?? "").trim(),
      email: String(form.get("email") ?? "").trim(),
      phone: String(form.get("phone") ?? "").trim(),
      occasion: String(form.get("occasion") ?? "Celebration"),
      eventDate: String(form.get("eventDate") ?? ""),
      city: String(form.get("city") ?? "").trim(),
      treatInterest: String(form.get("treatInterest") ?? "").trim(),
      details: String(form.get("details") ?? "").trim(),
    };
    setDefaults(nextInquiry);
    setInquiry(nextInquiry);
    setCopied(false);
    setCopyError(false);
  };

  const copyInquiry = async () => {
    if (!inquiry) return;
    try {
      await navigator.clipboard.writeText(formatInquiry(inquiry));
      setCopied(true);
      setCopyError(false);
    } catch {
      setCopied(false);
      setCopyError(true);
    }
  };

  const downloadInquiry = () => {
    if (!inquiry) return;
    const file = new Blob([formatInquiry(inquiry)], { type: "text/plain;charset=utf-8" });
    const url = URL.createObjectURL(file);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "goldie-ann-inquiry.txt";
    anchor.click();
    window.setTimeout(() => URL.revokeObjectURL(url), 1000);
  };

  return (
    <main className={styles.page}>
      <header className={styles.hero} data-reveal>
        <SectionTags variant="Mid" tag="A note for Goldie Ann" />
        <h1 className={cx(tokens["text-n-72-r"], styles.heroTitle)}>Let’s plan something <em>sweet</em></h1>
        <p className={styles.heroCopy}>Tell us a little about your celebration, your treat ideas, or the question on your mind. We’ll help you figure out the next step.</p>
        <a className={styles.jumpLink} href="#inquiry-form">Start an inquiry <ArrowDown size={16} aria-hidden="true" /></a>
      </header>

      <div className={styles.layout}>
        <section className={styles.formCard} id="inquiry-form" aria-labelledby="form-title" data-reveal>
          {inquiry ? (
            <div className={styles.prepared} role="status">
              <div className={styles.preparedIcon}><Check size={22} aria-hidden="true" /></div>
              <p className={styles.eyebrow}>Inquiry prepared</p>
              <h2 id="form-title">Your note is ready, {inquiry.name.split(" ")[0]}.</h2>
              <p className={styles.preparedCopy}>This website doesn’t send messages yet. Copy or download your inquiry to share it with Goldie Ann; your date and availability aren’t confirmed until reviewed.</p>
              <div className={styles.preview}>
                <div><span>Occasion</span><strong>{inquiry.occasion}</strong></div>
                <div><span>Date</span><strong>{inquiry.eventDate || "Flexible"}</strong></div>
                <div><span>Area</span><strong>{inquiry.city || businessProfile.location}</strong></div>
                <p>{inquiry.details}</p>
              </div>
              <div className={styles.draftActions}>
                <button type="button" className={styles.copyButton} onClick={copyInquiry}><Copy size={16} aria-hidden="true" />{copied ? "Copied" : "Copy inquiry"}</button>
                <button type="button" className={styles.downloadButton} onClick={downloadInquiry}><Download size={16} aria-hidden="true" />Download inquiry</button>
              </div>
              {copyError && <p className={styles.copyError}>Copy wasn’t available here. Download the inquiry instead.</p>}
              <button type="button" className={styles.editButton} onClick={() => { setInquiry(null); setCopied(false); setCopyError(false); }}>Edit your details</button>
            </div>
          ) : (
            <>
              <div className={styles.formIntro}>
                <p className={styles.eyebrow}>A few details to get started</p>
                <h2 id="form-title">Tell us what you have in mind</h2>
                <p>Fields marked required help us prepare a useful reply.</p>
              </div>
              <form className={styles.form} onSubmit={handleSubmit}>
                <fieldset className={styles.fieldset}>
                  <legend><span>01</span> Your details</legend>
                  <label className={styles.field}>Name <span className={styles.required}>Required</span><input name="name" autoComplete="name" required maxLength={100} defaultValue={defaults.name} placeholder="Your name" /></label>
                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>Email address <span className={styles.required}>Required</span><input name="email" type="email" autoComplete="email" required maxLength={254} defaultValue={defaults.email} placeholder="you@example.com" /></label>
                    <label className={styles.field}>Phone <span className={styles.optional}>Optional</span><input name="phone" type="tel" autoComplete="tel" maxLength={30} defaultValue={defaults.phone} placeholder="(555) 000-0000" /></label>
                  </div>
                </fieldset>

                <fieldset className={styles.fieldset}>
                  <legend><span>02</span> Your occasion</legend>
                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>What can we help with?<select name="occasion" defaultValue={defaults.occasion ?? "Celebration"}><option>Celebration</option><option>Custom treat or packaging</option><option>Product or pricing question</option><option>Something else</option></select></label>
                    <label className={styles.field}>Event date <span className={styles.optional}>Optional</span><input name="eventDate" type="date" min={minimumDate} defaultValue={defaults.eventDate} /><small>Please allow at least {orderLeadTimeDays} days’ notice.</small></label>
                  </div>
                  <div className={styles.fieldGrid}>
                    <label className={styles.field}>City or area <span className={styles.optional}>Optional</span><input name="city" autoComplete="address-level2" maxLength={100} defaultValue={defaults.city} placeholder="Minneapolis area" /></label>
                    <label className={styles.field}>Treats you’re interested in <span className={styles.optional}>Optional</span><input name="treatInterest" maxLength={160} defaultValue={defaults.treatInterest} placeholder="Cake pops, sweet boxes…" /></label>
                  </div>
                  <label className={styles.field}>Your message <span className={styles.required}>Required</span><textarea name="details" required minLength={8} maxLength={1200} rows={5} defaultValue={defaults.details} placeholder="Share the occasion, approximate quantity, color ideas, or any questions you have." /><small>Up to 1,200 characters.</small></label>
                </fieldset>
                <p className={styles.formNote}><Sparkles size={15} aria-hidden="true" />Preparing an inquiry does not reserve a date or collect payment.</p>
                <Button className={styles.submit} buttonText="Prepare my inquiry" type="submit" fullWidth />
              </form>
            </>
          )}
        </section>

        <aside className={styles.sidebar} aria-label="Helpful ordering information" data-reveal>
          <div className={styles.visualCard}>
            <img src={`${import.meta.env.BASE_URL}products/homepage-scroll-assortment.webp`} alt="A selection of hand-decorated Goldie Ann treats" loading="lazy" />
            <p>Hand-decorated with care in {businessProfile.location}.</p>
          </div>
          <section className={styles.detailsCard} aria-labelledby="helpful-details-title">
            <SectionTags variant="Left" tag="Before you reach out" />
            <h2 id="helpful-details-title">A few helpful details</h2>
            <ul className={styles.facts}>
              <li><Clock3 size={18} aria-hidden="true" /><span><strong>{orderLeadTimeDays} days’ notice</strong><small>Order requests are best sent at least a week ahead.</small></span></li>
              <li><MapPin size={18} aria-hidden="true" /><span><strong>{businessProfile.location} &amp; nearby</strong><small>Serving {businessProfile.serviceArea.toLowerCase()}.</small></span></li>
              <li><CalendarDays size={18} aria-hidden="true" /><span><strong>Availability comes first</strong><small>We confirm your date and order details before accepting.</small></span></li>
            </ul>
            <p className={styles.minimum}>Current order minimum: <strong>{currency(orderMinimumCents)}</strong></p>
            <Link className="template-shop-link" to="/treats">Browse current treats <ArrowRight size={16} aria-hidden="true" /></Link>
          </section>
          <p className={styles.asideNote}>Already have treats in your bag? <Link to="/cart">Continue with your order request</Link>.</p>
        </aside>
      </div>
    </main>
  );
}
