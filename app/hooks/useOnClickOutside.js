import { useRef, useEffect } from "react"

export const useOnClickOutside = (ref, handler) => {
    const savedHandler = useRef()
  
    useEffect(() => {
      savedHandler.current = handler
    }, [handler])
  
    useEffect(() => {
      const handleClickOutside = (event) => {
        if (ref.current && !ref.current.contains(event.target)) {
          savedHandler.current()
        }
      }
  
      document.addEventListener("click", handleClickOutside)
  
      return () => {
        document.removeEventListener("click", handleClickOutside)
      }
    }, [ref])
  }