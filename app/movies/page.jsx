import { getMovies } from "@/actions/movies";
import MovieCard from "@/components/home/movie-card";

export default async function MoviesPage() {
  const movies = await getMovies();
  
  if (!movies || movies.length === 0) {
    return <div className="text-center py-12">No movies found</div>;
  }
  
  return (
    <div className="container px-4 py-8 mx-auto">
      <h1 className="text-3xl font-bold mb-8">All Movies</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
        {movies.map((movie) => (
          <MovieCard key={movie._id} movie={movie} />
        ))}
      </div>
    </div>
  );
}
