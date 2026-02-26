interface IButtonProps {
  onClick: () => void;
  children: React.ReactNode;
}

export const Button: React.FC<IButtonProps> = (props) => {
  const { onClick, children } = props;

  return (
    <>
      <button onClick={onClick}>{children}</button>
    </>
  );
};
