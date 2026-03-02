import styles from './Spinner.module.css'

export default function Spinner({ size = 'md', text = 'Carregando...' }) {
  return (
    <div className={styles.container}>
      <div className={`${styles.spinner} ${styles[size]}`}></div>
      {text && <p>{text}</p>}
    </div>
  )
}
