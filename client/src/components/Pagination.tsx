import React, { FC } from 'react'
import styles from '../styles/Pagination.module.css'

interface Props {
  postsPerPage: number
  totalPosts: number
  currentPage: number
  paginate: (pageNumber: number) => void
}

const Pagination: FC<Props> = ({ postsPerPage, totalPosts, paginate, currentPage }) => {
  const pageNumbers = []

  for (let i = 1; i <= Math.ceil(totalPosts / postsPerPage); i++) {
    pageNumbers.push(i)
  }

  return (
    <nav className={styles.container}>
      <ul>
        {pageNumbers.map((number) => (
          <li key={number}>
            <button
              onClick={() => paginate(number)}
              className={`${number === currentPage ? styles.active : ''}`}
            >
              {number}
            </button>
          </li>
        ))}
      </ul>
    </nav>
  )
}

export default Pagination
