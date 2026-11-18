import HomeHero from "./home/HomeHero"
import HomeAbout from "./home/HomeAbout"
import HomeTreats from "./home/HomeTreats"
import HomeOffers from "./home/HomeOffers"
import HomeFAQ from "./home/HomeFAQ"
import styles from "./Page.module.css"

export default function Page() {
  return (
    <div className={styles.desktop}>
      <HomeHero />
      <HomeAbout />
      <HomeTreats />
      <HomeOffers />
      <HomeFAQ />
    </div>
  )
}
