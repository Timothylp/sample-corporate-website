import PropTypes from "prop-types"
import { MdClose, MdChevronRight } from "react-icons/md"
import { mediaPropTypes, linkPropTypes, buttonLinkPropTypes } from "utils/types"
import { useLockBodyScroll } from "utils/hooks"
import NextImage from "./image"
import CustomLink from "./custom-link"

import styles from "@/styles/components/elements/_MobileNavMenu.module.scss"

const MobileNavMenu = ({ navbar, closeSelf }) => {
  // Prevent window scroll while mobile nav menu is open
  useLockBodyScroll()
  return (
    <div className={styles.menu}>
      <div className={styles.container}>
        {/* Top section */}
        <div className={styles.top}>
          {/* Company logo */}
          <NextImage width="94" height="38" media={navbar.logo} />
          {/* Close button */}
          <button onClick={closeSelf} className={styles.cross}>
            <MdClose className={styles.icon} />
          </button>
        </div>
        {/* Bottom section */}
        <div className={styles.bottom}>
          <ul className={styles.list}>
            {navbar.links.map((navLink) => (
              <li key={navLink.id} className={styles.item}>
                <CustomLink link={navLink}>
                  <div onClick={closeSelf} className={styles.link}>
                    <span>{navLink.text}</span>
                    <MdChevronRight className={styles.icon} />
                  </div>
                </CustomLink>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  )
}

MobileNavMenu.propTypes = {
  navbar: PropTypes.shape({
    logo: mediaPropTypes,
    links: PropTypes.arrayOf(linkPropTypes),
    button: buttonLinkPropTypes,
  }),
  closeSelf: PropTypes.func,
}

export default MobileNavMenu
