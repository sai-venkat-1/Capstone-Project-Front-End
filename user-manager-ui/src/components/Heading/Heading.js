import React from 'react'
import styles from "./Heading.module.css"

function Heading({title}) {
  return (
    <div className={styles.headingContainer}><h1>{title}</h1></div>
  )
}

export default Heading