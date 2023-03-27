import { Text, Card, Button, Loading } from "../components";
import { useNavigate } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";
import { CharacterContext } from "../context/CharacterContext";
import { useContext } from "react";
import { apiUrl } from "../config/url";

export const Home = () => {
  // Esta función va a lograr añadir la data al estado global(characters)
  const { addCharacters } = useContext(CharacterContext);
  /*
    loading: es un booleano para que en la interfaz pueda aparecer el componente Loading
    characters: es la data consumidad por la api, se pueda recorrer y mostrar en la interfaz
  */
  const { loading, characters } = useCharacters(addCharacters, apiUrl, false);
  const navigate = useNavigate();

  const onNavigate = () => {
    // Navega a la pagina game
    navigate("/memory-game-rick-and-morty/game");
  };

  return (
    <>
      <section className="home_text_container">
        <Text className="text_bold size_2">Personajes</Text>
      </section>
      <section
        role={"article"}
        className={`${
          loading ? "home_loading_container" : "home_characters_container"
        }`}
        aria-label="section_container"
      >
        {loading ? (
          <Loading />
        ) : (
          characters && (
            <>
              {characters.map((item) => (
                <Card key={item.unique} {...item} />
              ))}
            </>
          )
        )}
      </section>
      <section className="home_button_container">
        <Button title="Jugar" onClick={onNavigate} />
      </section>
    </>
  );
};
