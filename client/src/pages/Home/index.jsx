import { useState } from 'react'
import Layout from '@/components/Layout'
import { MonsterGrid } from '@/components/Card'
import { useMonsters } from '@/hooks'
import styles from './Home.module.css'

export default function Home() {
  const [search, setSearch] = useState('')
  
  const { data = { monsters: [] }, isLoading, error } = useMonsters({
    search,
  })

  const handleSearch = (e) => {
    setSearch(e.target.value)
  }

  return (
    <Layout>
      <div className={styles.container}>
        <h1>HunterDex</h1>
        <p className={styles.subtitle}>Explore a ecologia de mhw</p>

        <div className={styles.searchBar}>
          <input
            type="text"
            placeholder="Procurar monstro..."
            value={search}
            onChange={handleSearch}
            className={styles.input}
          />
        </div>

        <MonsterGrid
          monsters={data.monsters}
          loading={isLoading}
          error={error?.message}
        />
      </div>
    </Layout>
  )
}
