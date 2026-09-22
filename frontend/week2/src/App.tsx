import { useState } from "react";
import "./App.css";
import Header, { MENU_ITEMS } from "./component/header";
import MovieGrid from "./component/movie-grid";

export default function App() {
  const [activeMenu, setActiveMenu] = useState(MENU_ITEMS[0]);

  return (
    <>
      <Header activeMenu={activeMenu} onMenuChange={setActiveMenu} />
      <main className="main">
        {activeMenu === "영화" && <MovieGrid />}
      </main>
    </>
  );
}