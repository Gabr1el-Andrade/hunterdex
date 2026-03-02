import { Link } from 'react-router-dom'
import { useAuthStore } from '../../app/store'
import styles from './Header.module.css'

export default function Header() {
  const { user, logout } = useAuthStore()

  return (
    <header className={styles.header}>
      <div className={styles.container}>
        <Link to="/" className={styles.logo}>
           HunterDex
        </Link>

        <nav className={styles.nav}>
          <Link to="/">Home</Link>
          <Link to="/favorites">Favoritos</Link>

          {user ? (
            <div className={styles.userMenu}>
              <span>{user.name}</span>
              <button onClick={logout}>Sair</button>
            </div>
          ) : (
            <Link to="/auth/login">Login</Link>
          )}
        </nav>
      </div>
    </header>
  )
}
