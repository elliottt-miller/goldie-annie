import cx from "../cx"
import tokens from "../tokens.module.css"
import styles from "../Page.module.css"
import PricingCard from "../PricingCard"
import SectionTags from "../SectionTags"
import { getProduct } from "../../content/products"

const featuredCakePop = getProduct("apple-pie-on-a-stick")
const featuredLemonCakePop = getProduct("lemon-blueberry")
const featuredDippedTreat = getProduct("chocolate-dipped-oreos")
const featuredRiceKrispy = getProduct("rice-krispy-treats")

export default function HomeOffers() {
  return (
    <section className={styles["shop-container"]} data-reveal="" aria-labelledby="shop-heading">
        <div className={styles["baby-flower-illustration"]} />
        <div className={styles["baby-flower-illustration2"]} />
        <div className={styles["content5"]}>
          <div className={styles["tag-title-description4"]}>
            <SectionTags variant="Mid" tag={"Shop Goldie Ann"} />
            <div className={styles["title5"]}>
              <h2 id="shop-heading" className={cx(tokens["text-n-36-r"], styles["shop-heading-primary"])}>{"Find something"}</h2>
              <h2 className={cx(tokens["text-n-44-r"], styles["shop-heading-accent"])}>{"sweet to share"}</h2>
            </div>
          </div>
          <div className={styles["pricing-cards-wrapper"]}>
            <PricingCard variant="Desktop" image={`${import.meta.env.BASE_URL}products/${featuredCakePop.image}`} title={"Cake pops"} point1={featuredCakePop.name} point2={featuredLemonCakePop.name} point3={"Hand-decorated"} point4={"Made for celebrations"} buttonText={"Shop cake pops"} />
            <PricingCard variant="Desktop Gold" image={`${import.meta.env.BASE_URL}products/${featuredDippedTreat.image}`} title={featuredDippedTreat.name} point1={"Dipped in chocolate"} point2={"Decorated for your occasion"} point3={"A sweet gift or party treat"} point4={"Shop Goldie Ann online"} buttonText={"Shop dipped treats"} />
            <PricingCard variant="Custom Variant" image={`${import.meta.env.BASE_URL}products/${featuredRiceKrispy.image}`} title={featuredRiceKrispy.name} point1={"Dipped and drizzled"} point2={"Finished with sprinkles"} point3={"A colorful sweet treat"} point4={"Made for sharing"} buttonText={"Shop sweet treats"} />
          </div>
        </div>
    </section>
  )
}
