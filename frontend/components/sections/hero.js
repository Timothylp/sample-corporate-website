import ButtonLink from "../elements/button-link"
import NextImage from "../elements/image"

import styles from "@/styles/components/sections/_Hero.module.scss"

const Hero = ({ data }) => {
  return (
    <section className={styles.hero}>
      {/* Left column for content */}
      <div className={styles.left}>
        {/* Big title */}
        <h1 className={styles.title}>
          {data.title}
          <span className={styles.label}>
            <span className={styles["circle--top-left"]} />
            <span className={styles["circle--bottom-left"]} />
            <span className={styles["circle--top-right"]} />
            <span className={styles["circle--bottom-right"]} />
            {data.label}
          </span>
        </h1>
        {/* Description paragraph */}
        <p className={styles.desc}>{data.description}</p>
        {/* Buttons row */}
        <div className={styles.buttons}>
          {data.buttons.map((button) => (
            <ButtonLink
              button={button}
              appearance={button.type}
              key={button.id}
            />
          ))}
        </div>
      </div>
      {/* Right column for the image */}
      <div className={styles.right}>
        <NextImage media={data.picture} />
      </div>
    </section>
  )
}

export default Hero
