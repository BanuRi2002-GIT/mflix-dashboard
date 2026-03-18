import { getMovies } from "@/actions/movies";
import Link from "next/link";
import { Film } from "lucide-react";

export default async function GenresPage() {
  const movies = await getMovies();
  
  // Extract unique genres
  const genreMap = new Map();
  movies?.forEach(movie => {
    if (movie.genres && Array.isArray(movie.genres)) {
      movie.genres.forEach(genre => {
        const count = genreMap.get(genre) || 0;
        genreMap.set(genre, count + 1);
      });
    }
  });
  
  const genres = Array.from(genreMap.entries()).map(([name, count]) => ({
    name,
    count,
  }));

  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-4xl font-bold mb-4 bg-gradient-to-r from-primary to-primary/60 bg-clip-text text-transparent">
        Movie Genres
      </h1>
      <p className="text-muted-foreground mb-8">
        Browse movies by genre. Click on a genre to see all available movies.
      </p>

      {genres.length === 0 ? (
        <div className="text-center py-12">
          <Film className="h-12 w-12 mx-auto text-muted-foreground mb-4" />
          <p className="text-muted-foreground">No genres found.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {genres.map((genre) => (
            <Link
              key={genre.name}
              href={`/genres/${encodeURIComponent(genre.name.toLowerCase())}`}
              className="group relative overflow-hidden rounded-xl border border-primary/20 bg-card p-6 hover:border-primary transition-all hover:shadow-lg hover:-translate-y-1"
            >
              <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <h2 className="text-xl font-semibold mb-2 group-hover:text-primary transition-colors">
                {genre.name}
              </h2>
              <p className="text-sm text-muted-foreground">
                {genre.count} {genre.count === 1 ? 'movie' : 'movies'}
              </p>
            </Link>
          ))}
        </div>
      )}
    </div>
  );
}
