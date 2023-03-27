import { Header } from "../components";
import { Navigate, Route, Routes } from "react-router-dom";
import { Game, Home, Result } from "../pages";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="memory-game-rick-and-morty/" element={<Home />} />
          <Route path="memory-game-rick-and-morty/game" element={<Game />} />
          <Route
            path="memory-game-rick-and-morty/result"
            element={<Result />}
          />
          <Route
            path="/*"
            element={<Navigate to="/memory-game-rick-and-morty/" />}
          />
        </Routes>
      </div>
    </>
  );
};
