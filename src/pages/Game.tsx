import { useContext, useEffect } from "react";
import { Card, Text } from "../components";
import { CharacterContext } from "../context/CharacterContext";
import { useMatchCard } from "../hooks/useMatchCard";
import { useNavigate } from "react-router-dom";

export const Game = () => {
  const navigate = useNavigate();
  // La función "addTurns" es para que se pueda añadir al estado global (turns)
  const { characters, addTurns } = useContext(CharacterContext);
  /*
    charactersFlip: Es una copia de characters(estado global) solo que esta ahora en un estado local
    onFlip: Para que la carta se pueda voltear
    puntuation: Es un objeto que sirve para mostrar los aciertos y turnos
    loading: Sirve para que cuando el usuario escoja 2 cartas, ya no pueda escoger una tercera mientras
    que las 2 se estan comparando.
  */
  const { charactersFlip, onFlip, puntuation, loading } =
    useMatchCard(characters);

  useEffect(() => {
    //En el caso de que el usuario quiera ingresar directamente a "game" esta validación le hara redirigir a la pagina "home"
    if (charactersFlip.length === 0) navigate("/home");
    /*Se hace una comparacion de los aciertos con la cantidad de parejas en total de las cartas, en el caso que sea igual,
    se va añadir los turnos al estado global(turns), y redirigir a la pagina "result"
    */ else if (puntuation.hits === charactersFlip.length / 2) {
      addTurns(puntuation.turns);
      navigate("/result");
    }
  }, [puntuation.hits]);

  return (
    <>
      <section className="game_texts_container">
        <Text className="text_bold size_2">{`Aciertos: ${puntuation.hits}`}</Text>
        <Text className="text_bold size_2">{`Turnos: ${puntuation.turns}`}</Text>
      </section>
      <section className="game_card_container">
        {charactersFlip.map((item, index) => {
          return (
            <Card
              key={item.unique}
              {...item}
              onClick={loading ? () => {} : onFlip}
              unique={item.unique}
              index={index}
            />
          );
        })}
      </section>
    </>
  );
};
