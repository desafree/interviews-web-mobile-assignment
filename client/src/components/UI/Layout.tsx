import { FC } from 'react'
import Header from './Header'
import styles from '../../styles/Layout.module.css'

interface Props {
  children: React.ReactNode
}

const Layout: FC<Props> = ({ children }) => {
  return (
    <>
      <Header />
      <main className={styles.container}>{children}</main>
    </>
  )
}

export default Layout
