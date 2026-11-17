import cx from "./cx"
import tokens from "./tokens.module.css"
import styles from "./P404.module.css"
import Button from "./Button"

export default function Page() {
  return (
    <div className={styles["desktop"]}>
      <div className={styles["n-404-container"]}>
        <div className={styles["content"]}>
          <h1 className={styles["n-404"]} aria-label="404: page not found">404</h1>
          <p className={cx(tokens["text-n-18-r"], styles["text"])}>{"A piece is missing... just like this page."}</p>
          <Button variant="Primary Desktop" buttonText={"Back to home"} link={"/"} />
        </div>
      </div>
    </div>
  )
}
