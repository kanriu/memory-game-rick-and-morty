# Juego de Memoria - Rick y Morty

## Ejecutar el proyecto

Luego de clonar el repositorio, primeramente se tiene que instalar las dependencias, se debe ejecutar este comando.

    npm install

Ahora para ejecutar el proyecto que por defecto se abre en [http://localhost:3000](http://localhost:3000), se debe ejecutar este comando.

    npm start

Si quiere verificar que las pruebas unitarias esten correctas, se debe ejecutar este comando.

    npm test

Para generar la build, se debe ejecutar este comando.

    npm run build

---

## Librerías

- Axios
- SASS
- TypeScript
- Jest
- React Testing Library

---

## Explicación del Proyecto

Este proyecto contiene 3 paginas: `Home`,`Game`,`Result`.

### Home

Es la pagina principal del proyecto, inicialmente se consume un hook personalizado llamado `useCharacters`, lo que hace este hook es consumir una api que es llamado de la url [https://rickandmortyapi.com/api/character](https://rickandmortyapi.com/api/character) para obtener y modelar la data, se tiene que añadir a un estado global(`CharacterContext`) esa data, para así pueda ser utilizado en la otra page.

Luego de que se obtiene la data de ese hook, se renderiza en el componente `Card`, este componente tiene 2 hijos llamados `CardBack` y `CardFront`, la idea es mostrar las cartas boca abajo(`CardBack`) y luego pasado 1 segundo, se muestra boca arriba(`CardFront`), todo eso gracias a la propiedad `flip:boolean`. Es por eso que el componente `Card` necesita varias props para así repartirlo a sus hijos.

### Game

Inicialmente se consume otro hook personalizado llamado `useMatchCard` que necesita la data de las cartas, eso se obtiene gracias a `CharacterContext`, ya que se pudo añadir en la page `Home` la data de la api como estado global, lo que hace este hook es para que todas las cartas se muestren boca arriba y luego pasado 3 segundos, se muestran boca abajo, también tiene 2 funciones `onFlip` y `matchCards`.

En la interfaz se logra ver los aciertos y turnos, esa data se puede obtener del hook `useMatchCard` de un estado local, también se logra ver las cartas boca abajo, el usuario al escoger una carta y que es se pueda voltear se hace uso de la función `onFlip`.

Se queda boca arriba hasta que el usuario pueda escoger otra carta, cuando eso pase, se hace uso de la función `matchCards`, entonces se comparan las cartas con la propiedad `unique:number`, si son iguales las cartas desaparecen, se aumenta en 1 tanto en aciertos como en turnos, caso contrario luego pasado de 2 segundos las cartas se voltean boca abajo y solo se aumenta en 1 a turnos.

Finalmente si el usuario logra acertar todas las parejas de cartas, se añade los turnos que se hizo a un estado global y luego se redirige a la pagina `Result`

### Result

Inicialmente se muestra en la interfaz cuantos turnos hizo, eso se obtiene gracias a `CharacterContext` que estuvo guardado en un estado global, si el usuario hace click al botón `Repetir`, se va a redirigir a la pagina `Game`, con la misma posición de las cartas, pero si hace click al botón `Inicio` se redirige a la pagina `Home` con otras cartas y diferente posición.

### Extra

- Para lograr la animación se tuvo como referencia a [https://animista.net/play](https://animista.net/play).
- Si se quiere saber más detalles, puede ver cada archivo de la carpeta src del repositorio, ya que cada uno tiene su comentario.
