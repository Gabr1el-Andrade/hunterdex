import { Link } from 'react-router-dom'
import { useFavoritesStore } from '@/app/store'
import styles from './MonsterCard.module.css'

export default function MonsterCard({ monster }) {
  const { isFavorited, toggleFavorite } = useFavoritesStore()
  const favorited = isFavorited(monster.id)

  return (
    <div className={styles.card}>
      <div className={styles.imageContainer}>
        <img
          src={monster.image || 'https://via.placeholder.com/200'}
          alt={monster.name}
          className={styles.image}
        />
      </div>

      <div className={styles.content}>
        <h3 className={styles.name}>{monster.name}</h3>
        
        <div className={styles.stats}>
          <div className={styles.stat}>
            <span className={styles.label}>HP</span>
            <span className={styles.value}>{monster.hp || '--'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>ATK</span>
            <span className={styles.value}>{monster.attack || '--'}</span>
          </div>
          <div className={styles.stat}>
            <span className={styles.label}>DEF</span>
            <span className={styles.value}>{monster.defense || '--'}</span>
          </div>
        </div>

        <div className={styles.actions}>
          <Link to={`/monster/${monster.id}`} className={styles.button}>
            Ver Detalhes
          </Link>
          <button
            className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
            onClick={() => toggleFavorite(monster)}
            title={favorited ? 'Remover dos favoritos' : 'Adicionar aos favoritos'}
          >
            {favorited ? '❤️' : '🤍'}
          </button>
        </div>
      </div>
    </div>
  )
}
