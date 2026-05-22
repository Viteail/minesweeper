import { useEffect, useState } from "react";

interface IGameHeaderProps {
  isWon: boolean;
  isLost: boolean;
  updateBestScore: (time: number) => void;
  bestScore: number;
}

export const GameHeader: React.FC<IGameHeaderProps> = (props) => {
  const [time, setTime] = useState(0);

  const { isWon, isLost, updateBestScore, bestScore } = props;

  useEffect(() => {
    if (isWon || isLost) {
      updateBestScore(time);
      return;
    }

    const interval = setInterval(() => {
      setTime((prev) => prev + 1);
    }, 1000);

    return () => clearInterval(interval);
  }, [isWon, isLost]);

  return (
    <div>
      <div>Time: {time}s</div>
      <div>Best Time: {bestScore}s</div>
    </div>
  );
};
