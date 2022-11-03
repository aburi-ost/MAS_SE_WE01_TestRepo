//import { ReactNode } from "react";
import { Fragment } from "react";
import { TaskEntry } from "./Interfaces";
import { DisplayOption } from "./Interfaces";
import "./TableContent.css";

interface Props {
  //children: ReactNode; // children: alles was zwischen ">" bzw. "<" des html codes in der übergeordneten funktion ist
  // hier wäre das z.B. "<Content>{children}</Content>" in App.tsx. Mit { } wird children von typscript als variable interpretiert und der in app.tsx aktuelle wert übergeben.
  filteredTaskEntries: TaskEntry[];
  displayOptions: DisplayOption;
  onClickDelete: (id: string) => void;
  onChangeCheckbox: (id: string) => void;
  onClickImportance: (id: string, newImportance: 1 | 2 | 3) => void;
}

const createContent = (props: Props) => {
  const divTableContent = props.filteredTaskEntries.map((itr) => (
    //<div className="contentTableRow" key={itr.id}>
    <Fragment key={itr.id}>
      <div className="contentTableCell contentTableCell_Checkbox">
        <input
          type="checkbox"
          checked={itr.isChecked}
          onChange={(e) => props.onChangeCheckbox(itr.id)}
        ></input>
      </div>
      <div className="contentTableCell contentTableCell_Priority">
        <span
          className={
            itr.importance > 0
              ? "contentTableIcon_Priority_Checked"
              : "contentTableIcon_Priority"
          }
          onClick={(e) => props.onClickImportance(itr.id, 1)}
        >
          🗲
        </span>
        <span
          className={
            itr.importance > 1
              ? "contentTableIcon_Priority_Checked"
              : "contentTableIcon_Priority"
          }
          onClick={(e) => props.onClickImportance(itr.id, 2)}
        >
          🗲
        </span>
        <span
          className={
            itr.importance > 2
              ? "contentTableIcon_Priority_Checked"
              : "contentTableIcon_Priority"
          }
          onClick={(e) => props.onClickImportance(itr.id, 3)}
        >
          🗲
        </span>
      </div>
      <div
        className={
          itr.isChecked
            ? "contentTableCell contentTableCell_Text_Scratched"
            : "contentTableCell contentTableCell_Text"
        }
      >
        {itr.name}
      </div>
      <div className="contentTableCell contentTableCell_Button">
        <button
          //onClick={(e) => deleteThis(itr.id)}
          onClick={(e) => props.onClickDelete(itr.id)}
          className="contentTableButton_Delete "
        >
          Löschen
        </button>
      </div>
    </Fragment>
  ));

  return divTableContent;
};

export const TableContent = (props: Props) => (
  <Fragment>{createContent(props)}</Fragment>
);
