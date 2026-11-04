export default function Footer() {
  return (
    <footer className="flex items-baseline gap-1 sm:gap-2 px-4 sm:px-6 md:px-10 lg:px-[88px] pt-3 pb-3 w-full font-bold bg-white fixed bottom-0 z-10">
        <div className="ml-auto self-center flex items-center gap-1">
            <img className="w-4 h-4 sm:w-5 sm:h-5" src="/icons/movie-icons/tmdb-logo.svg" alt="TMDB 아이콘" />
            <p className="text-xs text-gray-500 ml-2 mr-12">This product uses the TMDB API but is not endorsed or certified by <a href="https://www.themoviedb.org/" target="_blank" rel="noopener noreferrer" className="text-gray-500 hover:underline">TMDB</a>.
            </p>
        </div>
    </footer>
    );
}