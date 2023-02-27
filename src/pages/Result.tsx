import { Button, Text } from "../components";
import { useNavigate } from "react-router-dom";
import { useContext, useEffect } from "react";
import { CharacterContext } from "../context/CharacterContext";

export const Result = () => {
  // El estado global "turns" se proyecta en la interfaz
  const { turns } = useContext(CharacterContext);
  const navigate = useNavigate();
  useEffect(() => {
    //Esta validación es si el usuario quiere ingresar directamente a la pagina "result"
    turns === 0 && onNavigateHome();
  }, []);

  const onNavigateBack = () => {
    //Redirige a la pagina "game"
    navigate(-1);
  };
  const onNavigateHome = () => {
    //Redirige a la pagina "home"
    navigate("/home");
  };
  return (
    <section className="result_container">
      <section className="result_texts_container">
        <Text className="text_bold size_1 color_primary mb_16">
          ¡Felicitaciones!
        </Text>
        <Text className="text_medium size_2">
          {`Terminaste el juego con ${turns} turnos`}
        </Text>
      </section>

      <section className="result_section_container">
        <Button title="Repetir" onClick={onNavigateBack} />
        <Button title="Inicio" onClick={onNavigateHome} reverse />
      </section>
    </section>
  );
};
