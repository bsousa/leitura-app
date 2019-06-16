export function formatDate(timestamp) {
  const d = new Date(0); // The 0 there is the key, which sets the date to the epoch
  d.setUTCSeconds(timestamp);

  const time = d.toLocaleTimeString('pt-BR')
  return d.toLocaleDateString() + ' ' + time.substr(0, 5)
}

export function dateToUnix(date) {
  return date / 1000 | 0 
}