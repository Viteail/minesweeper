import classes from "./modalMenu.module.css";

import { Button } from "../Button";

import type { TGrid } from "../../App";

interface IModalMenuProps {
  handleClick: (value: TGrid) => void;
}

export const ModalMenu: React.FC<IModalMenuProps> = (props) => {
  const { handleClick } = props;
  return (
    <div className={classes["modal-menu"]}>
      <div className={classes.title}>MineSweeper</div>
      <div className={classes["btns-wrapper"]}>
        <div className={classes["btns-container"]}>
          <Button onClick={() => handleClick({ cols: 8, rows: 8 })}>
            Easy
          </Button>
          <Button onClick={() => handleClick({ cols: 12, rows: 12 })}>
            Medium
          </Button>
          <Button onClick={() => handleClick({ cols: 20, rows: 20 })}>
            Hard
          </Button>
        </div>
        <div className={classes["custom-btn-container"]}>
          <Button>Custom</Button>
        </div>
      </div>
    </div>
  );
};
