import PropTypes from "prop-types"
import { buttonLinkPropTypes, linkPropTypes, mediaPropTypes } from "utils/types"
import NextImage from "./image"
import CustomLink from "./custom-link"

import styles from "@/styles/components/elements/_Footer.module.scss"
import ButtonLink from "@/components/elements/button-link"

const Footer = ({ footer }) => {
  console.log(footer)
  return (
    <footer className={styles.footer}>
      <div className={styles.top}>
        <div className={styles.logo}>
          {footer.logo && (
            <NextImage
              width={footer.logo.data.attributes.width}
              height={footer.logo.data.attributes.height}
              media={footer.logo}
            />
          )}
        </div>
        <ul className={styles.socials}>
          {footer.socialLinks.map((socialLink, index) => {
            return (
              <li key={index} className={styles.social}>
                {socialLink.type}
              </li>
            )
          })}
        </ul>
      </div>
      <div className={styles.middle}>
        <h3 className={styles.title}>{footer.title}</h3>
        <nav className={styles.group}>
          <ul className={styles.links}>
            {footer.links.map((link, index) => {
              return (
                <li key={index} className={styles.link}>
                  <CustomLink link={link}>{link.text}</CustomLink>
                </li>
              )
            })}
          </ul>
          <ButtonLink
            button={footer.button}
            appearance={footer.button.type}
            key={footer.button.id}
          />
        </nav>
      </div>
      <div className={styles.bottom}>{footer.smallText}</div>
    </footer>
  )
}

Footer.propTypes = {
  footer: PropTypes.shape({
    logo: mediaPropTypes.isRequired,
    socialLinks: PropTypes.arrayOf(
      PropTypes.shape({
        id: PropTypes.oneOfType([PropTypes.string, PropTypes.number])
          .isRequired,
        type: PropTypes.string.isRequired,
        url: PropTypes.string.isRequired,
      })
    ),
    title: PropTypes.string.isRequired,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
    smallText: PropTypes.string.isRequired,
  }),
}

export default Footer
