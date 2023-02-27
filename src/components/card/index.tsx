import { CardProps } from "../../interface/card";
import { CardBack } from "./CardBack";
import { CardFront } from "./CardFront";

export const Card = ({
  image,
  name,
  status,
  species,
  opacity,
  onClick,
  unique,
  id,
  flip,
  index,
}: CardProps) => {
  return (
    <article className="card_container">
      <div
        role={"article"}
        aria-label="card"
        className={`${
          flip ? "card_div_front_container" : "card_div_back_container"
        }`}
      >
        <CardFront
          id={id}
          image={image}
          name={name}
          status={status}
          species={species}
          opacity={opacity}
        />
        <CardBack unique={unique} id={id} onClick={onClick} index={index} />
      </div>
    </article>
  );
};
