import { useParams, useNavigate } from 'react-router-dom'
import Layout from '@/components/Layout'
import { useMonsterById } from '@/hooks'
import { useFavoritesStore } from '@/app/store'
import { Spinner } from '@/components/Loading'
import styles from './Monster.module.css'

export default function Monster() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { data: monster, isLoading, error } = useMonsterById(id)
  const { isFavorited, toggleFavorite } = useFavoritesStore()

  if (isLoading) return <Layout><Spinner text="Carregando monstro..." /></Layout>
  if (error) return <Layout><p>Erro ao carregar: {error.message}</p></Layout>
  if (!monster) return <Layout><p>Monstro não encontrado</p></Layout>

  const favorited = isFavorited(monster.id)

  return (
    <Layout>
      <button onClick={() => navigate(-1)} className={styles.backBtn}>
        ← Voltar
      </button>

      <div className={styles.container}>
        <div className={styles.imageSection}>
          <img
            src={monster.image || 'https://via.placeholder.com/300'}
            alt={monster.name}
            className={styles.image}
          />
        </div>

        <div className={styles.content}>
          <h1>{monster.name}</h1>
          <p className={styles.type}>{monster.type || 'Desconhecido'}</p>

          <div className={styles.stats}>
            <div className={styles.statBlock}>
              <span className={styles.statLabel}>HP</span>
              <div className={styles.statBar}>
                <div className={styles.statFill} style={{ width: `${(monster.hp / 255) * 100}%` }}></div>
              </div>
              <span className={styles.statValue}>{monster.hp || '--'}/255</span>
            </div>

            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Ataque</span>
              <div className={styles.statBar}>
                <div className={styles.statFill} style={{ width: `${(monster.attack / 255) * 100}%` }}></div>
              </div>
              <span className={styles.statValue}>{monster.attack || '--'}/255</span>
            </div>

            <div className={styles.statBlock}>
              <span className={styles.statLabel}>Defesa</span>
              <div className={styles.statBar}>
                <div className={styles.statFill} style={{ width: `${(monster.defense / 255) * 100}%` }}></div>
              </div>
              <span className={styles.statValue}>{monster.defense || '--'}/255</span>
            </div>
          </div>

          <div className={styles.description}>
            <h3>Descrição</h3>
            <p>{monster.description || 'Sem descrição disponível'}</p>
          </div>

          <button
            className={`${styles.favoriteBtn} ${favorited ? styles.favorited : ''}`}
            onClick={() => toggleFavorite(monster)}
          >
            {favorited ? '❤️ Remover dos Favoritos' : '🤍 Adicionar aos Favoritos'}
          </button>
        </div>
      </div>
    </Layout>
  )
}
