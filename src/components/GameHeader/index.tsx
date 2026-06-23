import classes from "./gameHeader.module.css";

import { Button } from "../Button";

interface IGameHeaderProps {
  bestScore: number;
  time: number;
}

export const GameHeader: React.FC<IGameHeaderProps> = (props) => {
  const { bestScore, time } = props;

  return (
    <div className={classes.header}>
      <div>Time: {time}s</div>
      <div>Best Time: {bestScore}s</div>
      <div>
        <Button>Go back</Button>
      </div>
    </div>
  );
};
