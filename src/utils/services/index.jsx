const ApiKey = '?api_key=e308966c5ea18213912b8a786712b64c&language=fr-FR'
const TmdbLink = 'https://api.themoviedb.org/3/tv/'

export function getRequestDataSerie(idSerie) {
  const apiRequest = `${TmdbLink}${idSerie} ${ApiKey}`
  console.log(apiRequest)
  return apiRequest
}
