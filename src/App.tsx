import { CharacterProvider } from "./context/CharacterContext";
import { AppRouter } from "./router/AppRouter";

const AppState = ({ children }: { children: JSX.Element | JSX.Element[] }) => {
  return <CharacterProvider>{children}</CharacterProvider>;
};

export const App = () => {
  return (
    <AppState>
      <AppRouter />
    </AppState>
  );
};
