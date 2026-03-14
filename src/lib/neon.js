import { neon } from '@neondatabase/serverless'

const databaseUrl = import.meta.env.VITE_NEON_DATABASE_URL || ''

const sql = databaseUrl ? neon(databaseUrl) : null

export const db = sql

export async function fetchLeaderboard() {
  if (!sql) return []
  try {
    const rows = await sql`
      SELECT name, time_ms, created_at
      FROM leaderboard
      ORDER BY time_ms ASC
      LIMIT 50
    `
    return rows.map(row => ({
      name: row.name,
      time_ms: row.time_ms,
      date: row.created_at?.split('T')[0] || ''
    }))
  } catch (err) {
    console.error('Leaderboard fetch error:', err)
    return []
  }
}

export async function saveScore(name, time_ms) {
  if (!sql) return false
  try {
    await sql`
      INSERT INTO leaderboard (name, time_ms)
      VALUES (${name}, ${time_ms})
    `
    return true
  } catch (err) {
    console.error('Save score error:', err)
    return false
  }
}
