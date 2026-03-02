import MonsterCard from './MonsterCard'
import styles from './MonsterGrid.module.css'

export default function MonsterGrid({ monsters, loading, error }) {
  if (loading) {
    return <div className={styles.loading}>Carregando monstros...</div>
  }

  if (error) {
    return <div className={styles.error}>Erro ao carregar: {error}</div>
  }

  if (!monsters || monsters.length === 0) {
    return <div className={styles.empty}>Nenhum monstro encontrado</div>
  }

  return (
    <div className={styles.grid}>
      {monsters.map((monster) => (
        <MonsterCard key={monster.id} monster={monster} />
      ))}
    </div>
  )
}
