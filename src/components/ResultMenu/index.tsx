import { Button } from "../Button";

interface IResultMenu {
  children: React.ReactNode;
  handleClickRestart: () => void;
}

export const ResultMenu: React.FC<IResultMenu> = (props) => {
  const { children, handleClickRestart } = props;
  return (
    <div>
      {children}
      <Button onClick={() => handleClickRestart()}>Retry</Button>
    </div>
  );
};
