import { useState } from "react"

export const SearchMovie = () => {

  const [busqueda, setBusqueda] = useState('')
  const [peliculas, setPeliculas] = useState([])
  const urlBase = 'https://api.themoviedb.org/3/search/movie'
  const API_KEY = 'e9ce270a3a704d9192cea3aab7a57ee6'

  const handleChange = (e) => {
    setBusqueda(e.target.value)
  }
  const hanldeOnSubmit= (e) => {
    e.preventDefault()
    fetchPelicula()
  }
  const fetchPelicula = async () => {
    try{
      const response = await fetch(`${urlBase}?query=${busqueda}&api_key=${API_KEY}`)
      const data = await response.json()
      console.log(data.results)
      setPeliculas(data.results)
    }catch(err){
      console.error("Ocurrio lo siguiente: ",err)
    }
  }
  return (
    <div className="container">
      <h1>Busqueda de peliculas</h1>
        <form onSubmit={hanldeOnSubmit}>
          <input 
            type="text"
            placeholder="Digite su pelicula"
            name="pelicula"
            value={busqueda}
            onChange={handleChange}
            />
            <button type="submit" className="search-button">Buscar</button>
        </form>

        <div className="movie-list">
          {peliculas.map( (pelicula) => (
            <div key={pelicula.id} className="movie-card">
              <img src={`https://image.tmdb.org/t/p/w500${pelicula.poster_path}`} alt={pelicula.title} />
              <h2>{pelicula.title}</h2>
              <p>{pelicula.overview}</p>
            </div>
          ))}
        </div>
      </div>
  )
}
