import classes from "./modal.module.css";

interface IModalProps {
  children: React.ReactNode;
}

export const Modal: React.FC<IModalProps> = (props) => {
  const { children } = props;

  return <div className={classes.modal}>{children}</div>;
};
