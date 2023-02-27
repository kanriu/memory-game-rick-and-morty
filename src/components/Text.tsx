import { TextProps } from "../interface/text";

export const Text = ({ children, className }: TextProps) => {
  return <label className={className}>{children}</label>;
};
