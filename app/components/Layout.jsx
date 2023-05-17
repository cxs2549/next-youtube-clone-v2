"use client"
import { motion } from "framer-motion"

const Layout = ({ children, classes }) => {
  return (
    <motion.div
      className={classes}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
    >
      {children}
    </motion.div>
  )
}

export default Layout
