import { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import { buttonLinkPropTypes, linkPropTypes, mediaPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

import styles from "@/styles/components/elements/_Navbar.module.scss"

const Navbar = ({ navbar, pageContext }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className={styles.nav}>
        {/* Content aligned to the lef t */}
        <Link href="/">
          <a>
            <NextImage
              width={navbar.logo.data.attributes.width}
              height={navbar.logo.data.attributes.height}
              media={navbar.logo}
            />
          </a>
        </Link>
        {/* List of links on desktop */}
        <ul className={styles.menu}>
          {navbar.links.map((navLink) => (
            <li key={navLink.id}>
              <CustomLink link={navLink} locale={router.locale}>
                {navLink.text}
              </CustomLink>
            </li>
          ))}
        </ul>
        <div className={styles.right}>
          {/* Locale Switch Desktop */}
          {pageContext.localizedPaths && (
            <LocaleSwitch pageContext={pageContext} />
          )}
          {/* Hamburger menu on mobile */}
          <button
            onClick={() => setMobileMenuIsShown(true)}
            className={styles.hamburger}
          >
            <MdMenu className={styles.icon} />
          </button>
        </div>
      </nav>

      {/* Mobile navigation menu panel */}
      {mobileMenuIsShown && (
        <MobileNavMenu
          navbar={navbar}
          closeSelf={() => setMobileMenuIsShown(false)}
        />
      )}
    </>
  )
}

Navbar.propTypes = {
  navbar: PropTypes.shape({
    logo: PropTypes.shape({
      image: mediaPropTypes,
      url: PropTypes.string,
    }),
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  initialLocale: PropTypes.string,
}

export default Navbar
