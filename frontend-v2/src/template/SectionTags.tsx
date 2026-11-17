import { Heart } from "lucide-react"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./SectionTags.module.css"

interface Props {
  variant?: "Mid" | "Left"
  tag?: string
}

export default function SectionTags({
  variant: variantProp,
  tag = "About us",
}: Props) {
  const variant = variantProp ?? "Mid"

  return (
    <div className={styles["mid"]} data-variant={variant}>
      <div className={styles["pattern"]}>
        <div className={styles["line"]} />
        <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
      </div>
      <p className={cx(tokens["text-n-16-r"], styles["tag"])}>{tag}</p>
      <div className={styles["pattern2"]}>
        <Heart className="decorative-icon decorative-icon--small" aria-hidden="true" />
        <div className={styles["line2"]} />
      </div>
    </div>
  )
}
