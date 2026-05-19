import { nanoid } from "nanoid"
import { useEffect, useState } from "react"
import { t } from "@/i18n/translation"

const STORAGE_KEY = "chat_username"

const generateUsername = () => {
  const { prefix, animals } = t.current.username
  const word = animals[Math.floor(Math.random() * animals.length)]
  return `${prefix}-${word}-${nanoid(5)}`
}

export const useUsername = () => {
  const [username, setUsername] = useState("")

  useEffect(() => {
    const main = () => {
      const stored = localStorage.getItem(STORAGE_KEY)

      if (stored) {
        setUsername(stored)
        return
      }

      const generated = generateUsername()
      localStorage.setItem(STORAGE_KEY, generated)
      setUsername(generated)
    }

    main()
  }, [])

  return { username }
}
