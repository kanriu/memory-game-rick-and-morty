import { CardOpacity } from "../../interface/card";
import { Text } from "../Text";

export const CardFront = ({
  image,
  name,
  status,
  species,
  opacity,
}: CardOpacity) => {
  return (
    <article className={`card_front_container ${opacity ? "opacity" : ""}`}>
      <img src={image} alt={name} />
      <Text className="text_bold size_4">{name}</Text>
      <Text className="text_regular size_5">{`${status} - ${species}`}</Text>
    </article>
  );
};
