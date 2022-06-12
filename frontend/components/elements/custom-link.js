import Link from "next/link"
import PropTypes from "prop-types"
import { linkPropTypes } from "utils/types"

import styles from "@/styles/components/elements/_CustomLink.module.scss"

const CustomLink = ({ link, appearance, children }) => {
  const isInternalLink = link.url.startsWith("/")
  const className = appearance === "light" ? styles["link--light"] : styles.link

  // For internal links, use the Next.js Link component
  if (isInternalLink) {
    return (
      <Link href={link.url}>
        <a className={className}>{children}</a>
      </Link>
    )
  }

  // Plain <a> tags for external links
  if (link.newTab) {
    return (
      <a
        className={className}
        href={link.url}
        target="_blank"
        rel="noopener noreferrer"
      >
        {children}
      </a>
    )
  }

  return (
    <a className={className} href={link.url} target="_self">
      {children}
    </a>
  )
}

CustomLink.propTypes = {
  link: linkPropTypes,
  appearance: PropTypes.string,
  children: PropTypes.oneOfType([
    PropTypes.arrayOf(PropTypes.node),
    PropTypes.node,
  ]).isRequired,
}

export default CustomLink
