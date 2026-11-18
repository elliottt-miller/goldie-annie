import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import SectionTags from "../SectionTags"
import TreatCards from "../TreatCards"
import { getProduct, productCollections } from "../../content/products"
import { shopUrl } from "../../content/brand"

export default function HomeTreats() {
  return (
    <section className={styles["treats-container"]} data-reveal="" aria-labelledby="home-treats-heading">
        <div className={styles["baby-flowers-illustration"]} />
        <div className={styles["baby-flowers-illustration2"]} />
        <div className={styles["content3"]}>
          <div className={styles["tag-title-description2"]}>
            <SectionTags variant="Mid" tag={"Signature treats"} />
            <div className={styles["title3"]}>
              <h2 id="home-treats-heading" className={cx(tokens["text-n-36-r"], styles["elegant-treats"])}>{"Elegant treats"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["for-everyone"])}>{"for everyone"}</h2>
            </div>
          </div>
          <div className={styles["treat-cards-wrapper"]}>
            {productCollections.map((collection) => {
              const [first] = collection.productIds.map(getProduct);
              return <TreatCards
                key={collection.id}
                productImage1={`${import.meta.env.BASE_URL}products/${first.image}`}
                title={collection.title}
                subtext={collection.description}
                link={shopUrl}
                buttonText={`Shop ${collection.title.toLowerCase()}`}
              />;
            })}
          </div>
        </div>
    </section>
  )
}
