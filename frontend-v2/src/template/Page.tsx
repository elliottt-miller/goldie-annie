import HomeHero from "./home/HomeHero"
import HomeAbout from "./home/HomeAbout"
import HomeTreats from "./home/HomeTreats"
import HomeWhy from "./home/HomeWhy"
import HomeOffers from "./home/HomeOffers"
import HomeShowcase from "./home/HomeShowcase"
import HomeSocial from "./home/HomeSocial"
import HomeFAQ from "./home/HomeFAQ"
import styles from "./Page.module.css"

export default function Page() {
  return (
    <div className={styles.desktop}>
      <HomeHero />
      <HomeAbout />
      <HomeTreats />
      <HomeWhy />
      <HomeOffers />
      <HomeShowcase />
      <HomeSocial />
      <HomeFAQ />
    </div>
  )
}
