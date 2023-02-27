import img from "../../assets/ricky_morty_img.svg";
import { CardFaceDownProps } from "../../interface/card";

export const CardBack = ({
  onClick = () => {},
  unique = 0,
  id,
  index,
}: CardFaceDownProps) => {
  return (
    <article
      aria-label={`card_back ${index}`}
      className="card_back_container"
      onClick={() => onClick(id, unique)}
    >
      <img src={img} alt={"card_face_down"} />
    </article>
  );
};
