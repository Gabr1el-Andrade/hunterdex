import Layout from '@/components/Layout'
import { MonsterGrid } from '@/components/Card'
import { useFavoritesStore } from '@/app/store'
import styles from './Favorites.module.css'

export default function Favorites() {
  const favorites = useFavoritesStore((state) => state.favorites)

  return (
    <Layout>
      <div className={styles.container}>
        <h1>Meus Favoritos</h1>
        <p className={styles.subtitle}>
          {favorites.length} monstro(s) nos favoritos
        </p>

        {favorites.length === 0 ? (
          <div className={styles.empty}>
            <p>Você ainda não tem favoritos</p>
            <a href="/">Explorar monstros</a>
          </div>
        ) : (
          <MonsterGrid monsters={favorites} />
        )}
      </div>
    </Layout>
  )
}
