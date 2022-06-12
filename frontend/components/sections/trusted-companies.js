import NextImage from "@/components/elements/image"

import styles from "@/styles/components/sections/_TrustedCompanies.module.scss"

const TrustedCompanies = ({ data }) => {
  return (
    <section className={styles.trusted}>
      <h2 className={styles.title}>{data.title}</h2>
      <div className={styles.companies}>
        {data.companies.map((company, index) => {
          return (
            <div className={styles.company} key={index}>
              <NextImage
                width={company.logo.data.attributes.width}
                height={company.logo.data.attributes.height}
                media={company.logo}
              />
            </div>
          )
        })}
      </div>
    </section>
  )
}

export default TrustedCompanies
