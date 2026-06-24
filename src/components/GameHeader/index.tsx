import classes from "./gameHeader.module.css";

import { Button } from "../Button";
import { Icon } from "../Icon";

import arrowIcon from "../../assets/arrow-back.svg";

interface IGameHeaderProps {
  bestScore: number;
  time: number;
  handleReturnMenu: () => void;
}

export const GameHeader: React.FC<IGameHeaderProps> = (props) => {
  const { bestScore, time, handleReturnMenu } = props;

  return (
    <div className={classes.header}>
      <div>
        <div>Time: {time}s</div>
        <div>Best Time: {bestScore}s</div>
      </div>
      <div className={classes[`btn-container`]}>
        <Button onClick={() => handleReturnMenu()} hasIcon>
          <Icon src={arrowIcon} alt="Go back"></Icon>
        </Button>
      </div>
    </div>
  );
};
