import { MinCharactersProps } from "./characters";

export interface CardProps extends CardFaceDownProps, CardFlip {}

export interface CardMatch {
  id: number;
  unique?: number;
}

export interface CardFaceDownProps extends CardMatch {
  onClick?: (id: number, unique: number) => void;
  index?: number;
}

export interface CardOpacity extends MinCharactersProps {
  opacity?: boolean;
}

export interface CardFlip extends MinCharactersProps {
  flip: boolean;
  unique?: number;
  opacity?: boolean;
}
