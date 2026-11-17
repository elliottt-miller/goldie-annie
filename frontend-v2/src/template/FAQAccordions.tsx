import { useId, useState } from "react"
import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./FAQAccordions.module.css"

interface Props {
  variant?: "Open" | "Close"
  question?: string
  answer?: string
}

export default function FAQAccordions({
  variant: variantProp,
  question = "Where can I find ordering details?",
  answer = "Visit the online shop to review current ordering details and availability.",
}: Props) {
  const detailsId = useId()
  const [expanded, setExpanded] = useState(variantProp === "Open")
  const variant = expanded ? "Open" : "Close"

  return (
    <div className={styles["open"]} data-variant={variant}>
      <div className={styles["question-answer"]}>
        <h3 className={styles["question"]}>
          <button
            type="button"
            className={styles["question-trigger"]}
            aria-expanded={expanded}
            aria-controls={detailsId}
            onClick={() => setExpanded(value => !value)}
          >
            <span className={cx(tokens["text-n-20-r"], styles["question-text"])}>{question}</span>
            <span className={styles["button"]} aria-hidden="true">
              <span className={styles["button2"]}>
                <span className={styles["toggle-icon"]}>{expanded ? "−" : "+"}</span>
              </span>
            </span>
          </button>
        </h3>
        <div
          id={detailsId}
          className={styles["answer-panel"]}
          data-expanded={expanded}
          aria-hidden={!expanded}
          inert={!expanded}
        >
          <div className={styles["answer-inner"]}>
            <p className={cx(tokens["text-n-18-r"], styles["answer"])}>{answer}</p>
          </div>
        </div>
      </div>
    </div>
  )
}
