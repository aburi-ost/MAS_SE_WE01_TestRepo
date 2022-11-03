import { ChangeEvent } from "react";
import "./InputBar.css";

interface Props {
  inputTextValue: string;
  showAllState: boolean;
  onChangeTextInput: (event: ChangeEvent<HTMLInputElement>) => void;
  onChangeShowAll: () => void;
  onClickAddItem: () => void;
}

/*------ export function ------*/
export const InputBar = (props: Props) => (
  //html code - Erweiterung von
  // <input type="number" className="input"/> etc
  <div className="gridInput">
    <div className="inputTable">
      <div className="inputTableCell"> </div>
      <div className="inputTableCell">
        <input
          className="inputTableField_TaskName"
          type="text"
          placeholder=" Aufgabe..."
          value={props.inputTextValue}
          onChange={props.onChangeTextInput}
        />
        <button
          className="inputTableButton_AddItem"
          onClick={(e) => props.onClickAddItem()}
        >
          Hinzufügen
        </button>
      </div>
      <div className="inputTableCell"> </div>
      <div className="inputTableCell"> </div>
      <div className="inputTableCell inputTableCell_Checkbox">
        <input
          type="checkbox"
          checked={props.showAllState}
          onChange={(e) => props.onChangeShowAll()}
        />
        Alle Anzeigen
      </div>
      <div className="inputTableCell"> </div>
    </div>
  </div>
);
