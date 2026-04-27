import classes from "./icon.module.css";

interface IIconProps {
  src: string;
  alt: string;
}

export const Icon: React.FC<IIconProps> = (props) => {
  const { src, alt } = props;

  return (
    <>
      <img className={classes.icon} src={src} alt={alt} />
    </>
  );
};
