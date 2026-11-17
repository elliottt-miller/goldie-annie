import { useState } from "react"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./TreatCards.module.css"
import Button from "./Button"
import { Heart, ShoppingBasket } from "lucide-react"
import { shopUrl } from "../content/brand"

interface Props {
  productImage1?: string
  productImage2?: string
  productImage3?: string
  productLabels?: string[]
  title?: string
  subtext?: string
  link?: string
  buttonText?: string
}

export default function TreatCards({
  productImage1 = `${import.meta.env.BASE_URL}products/funfetti-pops-transparent.webp`,
  productImage2 = `${import.meta.env.BASE_URL}products/lemon-blueberry-pops-transparent.webp`,
  productImage3 = `${import.meta.env.BASE_URL}products/apple-pie-on-a-stick-transparent.webp`,
  productLabels = [],
  title = "Cake pops",
  subtext = "Hand-decorated cake pops for gifting, parties and everyday joy.",
  link = shopUrl,
  buttonText = "Shop cake pops",
}: Props) {
  const images = [productImage1, productImage2, productImage3].flatMap((src, index) => src ? [{
    src,
    label: productLabels[index] ?? `${title} selection ${index + 1}`,
  }] : [])
  const [selectedIndex, setSelectedIndex] = useState(0)
  const selectedImage = images[selectedIndex] ?? images[0]

  return (
    <div className={styles["desktop-1"]}>
      <div className={styles["product-image"]}>
        {selectedImage && <img key={selectedImage.src} className={styles["featured-product"]} src={selectedImage.src} alt={`${title}: ${selectedImage.label}`} loading="lazy" decoding="async" />}
        <div className={styles["product-label"]}>
          <ShoppingBasket className="decorative-icon" aria-hidden="true" />
          <p className={cx(tokens["text-n-16-r"], styles["title"])}>{title}</p>
        </div>
      </div>
      <div className={styles["content"]}>
        <div className={styles["wrapper"]}>
          <div className={styles["title-description"]}>
            <h3 className={cx(tokens["text-n-48-r"], styles["subtext"])}>{subtext}</h3>
            <div className={styles["pattern"]}>
              <div className={styles["line"]} />
              <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
              <div className={styles["line2"]} />
            </div>
            <p className={cx(tokens["text-n-18-r"], styles["buttontext"])}>Browse the collection and current menu.</p>
          </div>
          <div className={styles["productimage1"]} style={productImage1 ? { backgroundImage: `url(${productImage1})`, backgroundSize: "contain", backgroundPosition: "center" } : undefined} />
        </div>
        <div className={styles["others"]}>
          {images.map((image, index) => <button
            key={image.src}
            type="button"
            className={styles["product-thumb"]}
            style={{ backgroundImage: `url(${image.src})` }}
            aria-label={`Show ${image.label}`}
            aria-pressed={selectedIndex === index}
            onClick={() => setSelectedIndex(index)}
          />)}
        </div>
        <Button variant="Primary Desktop" buttonText={buttonText} link={link} />
      </div>
    </div>
  )
}
