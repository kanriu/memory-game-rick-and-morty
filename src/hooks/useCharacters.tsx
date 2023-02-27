import axios from "axios";
import { useEffect, useState } from "react";
import { CardFlip } from "../interface/card";
import { CharactersProps } from "../interface/characters";
import { randomMinMax } from "../utils";

export const useCharacters = (
  addCharacters: (characters: CardFlip[]) => void,
  apiUrl: string,
  test: boolean
) => {
  const [characters, setCharacters] = useState<CardFlip[]>();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    generateCharacters();
  }, []);
  useEffect(() => {
    if (characters) setLoading(false);
  }, [characters]);

  useEffect(() => {
    setTimeout(() => {
      if (!loading && characters) {
        setCharacters(characters.map((e) => ({ ...e, flip: true })));
      }
    }, 1000);
  }, [loading]);

  // Esta función es para obtener 6 numeros aleatorios del 1 al 825.
  const getArrayRandom = () => {
    const arrayCharacters = [];
    for (let i = 0; i < 6; i++) {
      arrayCharacters.push(randomMinMax(1, 825));
    }
    return arrayCharacters;
  };
  const generateCharacters = async () => {
    try {
      const { data } = await axios.get<CharactersProps[]>(
        `${apiUrl}/${getArrayRandom()}`
      );
      /*
        name: Si tiene mas de 3 nombres solo se va a capturar 3 nombre.
        flip: Para condicionar si la carta debe estar boca arriba o boca abajo
      */
      const newArray: CardFlip[] = data.map((e) => {
        const n = e.name.split(" ");
        return {
          id: e.id,
          name: n.length > 3 ? `${n[0]} ${n[1]} ${n[2]}` : e.name,
          image: e.image,
          status: e.status,
          species: e.species,
          flip: false,
        };
      });
      // Duplica el array
      const arrayFlatMap = newArray.flatMap((i) => [i, i]);
      // Añade la propiedad unique para que se pueda escoger, ya que el "id" ha sido duplicada
      const payload = arrayFlatMap.map((e, index) => ({
        ...e,
        unique: e.id + index,
      }));
      setCharacters(payload);
      // Se almacena como un estado global (characters)
      addCharacters(payload);
    } catch (error) {
      setLoading(false);
      !test && console.error(error);
    }
  };

  return {
    loading,
    characters,
  };
};
