import { Header } from "../components";
import { Navigate, Route, Routes } from "react-router-dom";
import { Game, Home, Result } from "../pages";

export const AppRouter = () => {
  return (
    <>
      <Header />
      <div className="container">
        <Routes>
          <Route path="home" element={<Home />} />
          <Route path="game" element={<Game />} />
          <Route path="result" element={<Result />} />
          <Route path="/*" element={<Navigate to="/home" />} />
        </Routes>
      </div>
    </>
  );
};
