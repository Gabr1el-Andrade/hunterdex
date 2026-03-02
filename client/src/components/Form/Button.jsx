import styles from './Button.module.css'

export default function Button({ 
  children, 
  loading = false, 
  disabled = false, 
  variant = 'primary',
  ...props 
}) {
  return (
    <button
      className={`${styles.button} ${styles[variant]}`}
      disabled={loading || disabled}
      {...props}
    >
      {loading ? '⏳' : children}
    </button>
  )
}
