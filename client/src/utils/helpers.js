export function formatNumber(num) {
  return new Intl.NumberFormat('pt-BR').format(num)
}

export function getMonsterImageUrl(id) {
  return `/monster-images/${id}.png`
}

export function truncateText(text, length = 100) {
  if (!text) return ''
  return text.length > length ? text.substring(0, length) + '...' : text
}

export function capitalizeFirstLetter(string) {
  if (!string) return ''
  return string.charAt(0).toUpperCase() + string.slice(1)
}

export function sleep(ms) {
  return new Promise((resolve) => setTimeout(resolve, ms))
}
