import { useEffect, useState, useRef } from "react"
import { useRouter } from "next/router"
import PropTypes from "prop-types"
import Link from "next/link"

import Cookies from "js-cookie"
import { MdExpandMore } from "react-icons/md"
import WorldIcon from "./icons/world"

import { useOnClickOutside } from "../utils/hooks"

import styles from "@/styles/components/_LocaleSwitch.module.scss"

const LocaleSwitch = ({ pageContext }) => {
  const isMounted = useRef(false)
  const select = useRef()
  const router = useRouter()
  const [locale, setLocale] = useState()
  const [showing, setShowing] = useState(false)

  const handleLocaleChange = async (selectedLocale) => {
    // Persist the user's language preference
    // https://nextjs.org/docs/advanced-features/i18n-routing#leveraging-the-next_locale-cookie
    Cookies.set("NEXT_LOCALE", selectedLocale)
    setLocale(selectedLocale)
  }

  const handleLocaleChangeRef = useRef(handleLocaleChange)
  useOnClickOutside(select, () => setShowing(false))

  useEffect(() => {
    const localeCookie = Cookies.get("NEXT_LOCALE")
    if (!localeCookie) {
      handleLocaleChangeRef.current(router.locale)
    }

    const checkLocaleMismatch = async () => {
      if (
        !isMounted.current &&
        localeCookie &&
        localeCookie !== pageContext.locale
      ) {
        // Redirect to locale page if locale mismatch
        const localePage = getLocalizedPage(localeCookie, pageContext)

        router.push(
          `${localizePath({ ...pageContext, ...localePage })}`,
          `${localizePath({ ...pageContext, ...localePage })}`,
          { locale: localePage.locale }
        )
      }
      setShowing(false)
    }

    setLocale(localeCookie || router.locale)
    checkLocaleMismatch()

    return () => {
      isMounted.current = true
    }
  }, [locale, router, pageContext])

  return (
    <div ref={select} className={styles.switch}>
      <button
        className={styles.button}
        type="button"
        onClick={() => setShowing(!showing)}
      >
        <WorldIcon />
        <span>{locale}</span>
        <MdExpandMore />
      </button>
      <div className={`${styles.list} ${!showing ? styles.hide : ""}`}>
        {pageContext.localizedPaths &&
          pageContext.localizedPaths.map(({ href, locale }) => {
            return (
              <Link
                href={href}
                key={locale}
                locale={locale}
                role="option"
                passHref
              >
                <p
                  className={styles.item}
                  onClick={() => handleLocaleChange(locale)}
                >
                  {locale}
                </p>
              </Link>
            )
          })}
      </div>
    </div>
  )
}

LocaleSwitch.propTypes = {
  initialLocale: PropTypes.string,
}

export default LocaleSwitch
