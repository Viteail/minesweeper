import classes from "./button.module.css";

import { cn } from "../../utils/cn";

interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
  hasIcon?: boolean;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { onClick, children, hasIcon } = props;

  return (
    <>
      <button
        className={cn(classes, [classes.button, `${hasIcon && classes.icon}`])}
        onClick={onClick}
      >
        {children}
      </button>
    </>
  );
};
