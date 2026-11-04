import Header from "./components/layout/header";
import "./App.css"
import { MovieListPage } from "./pages/movies/movie-list-page";

export default function App() {

  return (
    <>
      <Header />
      <MovieListPage />
    </>
  );
}
