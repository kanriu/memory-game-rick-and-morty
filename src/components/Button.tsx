import { ButtonProps } from "../interface/button";
import { Text } from "./Text";

export const Button = ({ title, onClick, reverse }: ButtonProps) => {
  return (
    <button
      className={`button_container ${reverse ? "reverse" : "normal"}`}
      onClick={onClick}
      tabIndex={0}
    >
      <Text className="text_semi_bold size_2">{title}</Text>
    </button>
  );
};
