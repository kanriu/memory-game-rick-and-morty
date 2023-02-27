import { useEffect, useRef, useState } from "react";
import { CardFlip, CardMatch } from "../interface/card";

export const useMatchCard = (characters: CardFlip[] = []) => {
  const [charactersFlip, setCharactersFlip] = useState<CardFlip[]>(characters);
  const [puntuation, setPuntuation] = useState({
    hits: 0,
    turns: 0,
  });
  const [loading, setLoading] = useState(false);
  //Se creo una referencia para acumular el conteo de cartas escogidas
  const acumRef = useRef<CardMatch[]>([]);

  useEffect(() => {
    //Para que las cartas se volteen boca arriba pasado 1 segundo
    setTimeout(() => {
      setCharactersFlip(charactersFlip.map((e) => ({ ...e, flip: true })));
    }, 1000);
  }, []);

  useEffect(() => {
    //Para que las cartas se volteen boca abajo pasado 4 segundo
    setTimeout(() => {
      setCharactersFlip(charactersFlip.map((e) => ({ ...e, flip: false })));
    }, 4000);
  }, []);

  useEffect(() => {
    // Si acumulo 2 veces, se hace el llamado de "matchCards"
    acumRef.current.length === 2 && matchCards();
  }, [charactersFlip]);

  const matchCards = () => {
    setLoading(true);
    setTimeout(() => {
      //Se esta comprando el "id" de las cartas escogidas
      if (acumRef.current[0].id === acumRef.current[1].id) {
        /*
          Si son iguales, entonces:
            - Se aumenta en 1 las propiedades "hits" y "turns"
            - Se cambia la propiedad opacity en true, para asi las cartas
            puedan desaparecer.
        */
        setPuntuation({
          hits: puntuation.hits + 1,
          turns: puntuation.turns + 1,
        });
        setCharactersFlip(
          charactersFlip.map((e) => {
            if (e.unique === acumRef.current[0].unique)
              return { ...e, opacity: true };
            if (e.unique === acumRef.current[1].unique)
              return { ...e, opacity: true };
            return e;
          })
        );
      } else {
        /*
          Caso contrario:
            - Se aumenta en 1 la propiedad "turns"
            - Se cambia la propiedad flip en false, para asi las cartas
            puedan voltearse boca abajo.
        */
        setPuntuation({ ...puntuation, turns: puntuation.turns + 1 });
        setCharactersFlip(
          charactersFlip.map((e) => {
            if (e.unique === acumRef.current[0].unique)
              return { ...e, flip: false };
            if (e.unique === acumRef.current[1].unique)
              return { ...e, flip: false };
            return e;
          })
        );
      }
      //El acumulador debe reiniciarse
      acumRef.current = [];
      setLoading(false);
    }, 1800);
  };

  /*
    Cada vez que se llama esta función se hace una acumulación al "acumRef", obteniendo
    el id y unique, también se esta cambiando la propiedad flip en true de la carta escogida, 
    comparando la propiedad "unique"
  */
  const onFlip = (id: number, unique: number) => {
    acumRef.current = [...acumRef.current, { id, unique }];
    setCharactersFlip(
      charactersFlip.map((e) =>
        e.unique === unique ? { ...e, flip: true } : e
      )
    );
  };
  return { charactersFlip, onFlip, puntuation, loading };
};
