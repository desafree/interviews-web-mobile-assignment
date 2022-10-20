import { FC } from 'react'
import styles from '../../styles/Loading.module.css'

interface Props {
  value: string
}

const LoadingResponse: FC<Props> = ({ value }) => {
  return <p className={styles.container}>{value}</p>
}

export default LoadingResponse
