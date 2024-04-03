import AIChatbot from "@/components/AIChatbot";
import CarouselBannerWrapper from "@/components/CarouselBannerWrapper";
import MoviesCarousel from "@/components/MoviesCarousel";
import {
  getPopularMovies,
  getTopRatedMovies,
  getUpcomingMovies,
} from "@/lib/getMovies";

export default async function Home() {
  const [upcomingMovies, topRatedMovies, popularMovies] = await Promise.all([
    getUpcomingMovies(),
    getTopRatedMovies(),
    getPopularMovies(),
  ]);

  return (
    <main className="">
      <CarouselBannerWrapper />
      <div className="flex flex-col space-y-2 xl:-mt-48">
        <MoviesCarousel
          movies={upcomingMovies}
          title="Upcoming"
          source="Home"
        />
        <MoviesCarousel
          movies={topRatedMovies}
          title="Top Rated"
          source="Home"
        />
        <MoviesCarousel movies={popularMovies} title="Popular" source="Home" />
      </div>
    </main>
  );
}
