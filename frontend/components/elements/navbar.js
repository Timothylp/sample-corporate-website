import { useState } from "react"
import PropTypes from "prop-types"
import Link from "next/link"
import { useRouter } from "next/router"

import { getButtonAppearance } from "utils/button"
import { buttonLinkPropTypes, linkPropTypes, mediaPropTypes } from "utils/types"
import { MdMenu } from "react-icons/md"
import MobileNavMenu from "./mobile-nav-menu"
import ButtonLink from "./button-link"
import NextImage from "./image"
import CustomLink from "./custom-link"
import LocaleSwitch from "../locale-switch"

import styles from "@/styles/components/_Navbar.module.scss"

const Navbar = ({ navbar, pageContext }) => {
  const router = useRouter()
  const [mobileMenuIsShown, setMobileMenuIsShown] = useState(false)

  return (
    <>
      {/* The actual navbar */}
      <nav className={styles.nav}>
        {/* Content aligned to the left */}
        <Link href="/">
          <a>
            <NextImage width="94" height="38" media={navbar.logo} />
          </a>
        </Link>
        {/* List of links on desktop */}
        <ul className={styles.menu}>
          {navbar.links.map((navLink) => (
            <li key={navLink.id}>
              <CustomLink
                className={styles.link}
                link={navLink}
                locale={router.locale}
              >
                {navLink.text}
              </CustomLink>
            </li>
          ))}
        </ul>
        <div className={styles.local}>
          {/* Locale Switch Mobile */}
          {pageContext.localizedPaths && (
            <div className="">
              <LocaleSwitch pageContext={pageContext} />
            </div>
          )}
          {/* Hamburger menu on mobile */}
          <button onClick={() => setMobileMenuIsShown(true)} className="">
            <MdMenu className="" />
          </button>
          {/* CTA button on desktop */}
          {navbar.button && (
            <div className="">
              <ButtonLink
                button={navbar.button}
                appearance={getButtonAppearance(navbar.button.type, "light")}
                compact
              />
            </div>
          )}
          {/* Locale Switch Desktop */}
          {pageContext.localizedPaths && (
            <div className="">
              <LocaleSwitch pageContext={pageContext} />
            </div>
          )}
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
