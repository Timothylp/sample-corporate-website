import PropTypes from "prop-types"
import { buttonLinkPropTypes } from "utils/types"
import CustomLink from "./custom-link"

import styles from "@/styles/components/elements/_Button.module.scss"

const ButtonContent = ({ button, appearance }) => {
  return <div className={styles["button--" + appearance]}>{button.text}</div>
}

const ButtonLink = ({ button, appearance }) => {
  return (
    <CustomLink link={button}>
      <ButtonContent button={button} appearance={appearance} />
    </CustomLink>
  )
}

ButtonLink.propTypes = {
  button: buttonLinkPropTypes,
  appearance: PropTypes.oneOf(["primary", "secondary", "video"]),
  compact: PropTypes.bool,
}

export default ButtonLink
