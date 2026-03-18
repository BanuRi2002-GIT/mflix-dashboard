import { getMovies } from "@/actions/movies";
import MovieCard from "@/components/home/movie-card";

export default async function GenrePage({ params }) {
  const { genre } = await params;
  const decodedGenre = decodeURIComponent(genre);
  const movies = await getMovies();
  
  // Filter movies by genre (case-insensitive)
  const genreMovies = movies?.filter(movie => 
    movie.genres && movie.genres.some(g => 
      g.toLowerCase() === decodedGenre.toLowerCase()
    )
  ) || [];
  
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-2">{decodedGenre} Movies</h1>
      <p className="text-muted-foreground mb-8">
        Found {genreMovies.length} {genreMovies.length === 1 ? 'movie' : 'movies'}
      </p>
      
      {genreMovies.length === 0 ? (
        <p className="text-muted-foreground">No movies found in this genre.</p>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {genreMovies.map((movie) => (
            <MovieCard key={movie._id} movie={movie} />
          ))}
        </div>
      )}
    </div>
  );
}
