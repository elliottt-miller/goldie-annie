import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./About.module.css"
import PageHeader from "./PageHeader"
import SectionTags from "./SectionTags"
import FeaturedTreatCard from "./FeaturedTreatCard"
import { Heart } from "lucide-react"
import { getProduct } from "../content/products"
import { businessProfile } from "../content/brand"

const featuredProducts = [
  getProduct("funfetti-cake-pops"),
  getProduct("chocolate-dipped-oreos"),
  getProduct("rice-krispy-treats"),
]

export default function Page() {
  return (
    <div className={styles["desktop"]}>
      <PageHeader
        variant="about"
        title="About Goldie Ann’s"
        subtitle={`Welcome to ${businessProfile.name}. I specialize in handcrafted cake pops and dipped treats for birthdays, baby showers, corporate events and more. I use premium ingredients. I’m based in ${businessProfile.location} and serve the surrounding areas. Please place orders at least ${businessProfile.leadTimeDays} days in advance. Let’s make your next event sweet!`}
        actionLabel="Browse my menu and secure your date"
        actionHref="/treats"
        artworkSrc={`${import.meta.env.BASE_URL}products/homepage-assortment.webp`}
      />
      <section className={styles["process-container"]} data-reveal="" aria-labelledby="about-process-heading">
        <div className={styles["content3"]}>
          <div className={styles["tag-title2"]}>
            <SectionTags variant="Mid" tag={"Our process"} />
            <div className={styles["title2"]}>
              <h2 id="about-process-heading" className={cx(tokens["text-n-36-r"], styles["how-sweet"])}>{"How ordering"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["magic-happens"])}>{"stays sweet"}</h2>
            </div>
          </div>
          <div className={styles["wrapper2"]}>
            {[
              { number: "01", title: "Browse the treats", detail: "Explore the current menu and choose your favorites." },
              { number: "02", title: "Make it yours", detail: "Request up to two dipping colors, drizzle and sprinkles." },
              { number: "03", title: "Secure your date", detail: "Order at least one week ahead. A 50% non-refundable deposit is due within 24 hours." },
              { number: "04", title: "Celebrate together", detail: "Enjoy hand-decorated treats made for your special moment." },
            ].map(({ number, title, detail }) => (
              <article className={styles.workflowCard} key={number}>
                <div className={styles.workflowMeta}>
                  <span className={styles.workflowNumber}>{number}</span>
                </div>
                <h3 className={styles.workflowTitle}>{title}</h3>
                <div className={styles.workflowDivider} aria-hidden="true"><Heart /></div>
                <p className={styles.workflowText}>{detail}</p>
              </article>
            ))}
          </div>
        </div>
      </section>
      <section className={styles["team-container"]} data-reveal="" aria-labelledby="about-treats-heading">
        <div className={styles["baby-flowers-illustration2"]} />
        <div className={styles["content4"]}>
          <div className={styles["tag-title3"]}>
            <SectionTags variant="Mid" tag={"Explore the treats"} />
            <div className={styles["title3"]}>
              <h2 id="about-treats-heading" className={cx(tokens["text-n-36-r"], styles["the-passion-behind"])}>{"A little something"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["every-creation"])}>{"for every sweet tooth"}</h2>
            </div>
          </div>
          <div className={styles["team-card-wrappers"]}>
            {featuredProducts.map((product, index) => (
              <FeaturedTreatCard
                key={product.id}
                product={product}
                categoryTitle={index === 0 ? "Cake Pops" : undefined}
                categoryDescription={index === 0 ? "Hand-decorated cake pops made for celebrations, thoughtful gifts and everyday joy." : undefined}
              />
            ))}
          </div>
        </div>
      </section>
    </div>
  )
}
