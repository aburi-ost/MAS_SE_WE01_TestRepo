//import { ReactNode } from "react";
import { Fragment } from "react";
import { TaskEntry } from "./Interfaces";
import { DisplayOption } from "./Interfaces";
import "./TableHeader.css";

interface Props {
  //children: ReactNode; // children: alles was zwischen ">" bzw. "<" des html codes in der übergeordneten funktion ist
  // hier wäre das z.B. "<Content>{children}</Content>" in App.tsx. Mit { } wird children von typscript als variable interpretiert und der in app.tsx aktuelle wert übergeben.
  displayOptions: DisplayOption;
  onClickDelete: (id: string) => void;
  onClickSortByImportance: () => void;
  onClickSortByTask: () => void;
  filteredTaskEntries: TaskEntry[];
}

export const TableHeader = (props: Props) => (
  <Fragment>
    <div className="contentTableCell contentTableCell_Header"></div>
    <div
      onClick={(e) => props.onClickSortByImportance()}
      className="contentTableCell contentTableCell_Header"
    >
      {props.displayOptions.headerTextImportance}
    </div>
    <div
      onClick={(e) => props.onClickSortByTask()}
      className="contentTableCell contentTableCell_Header"
    >
      {props.displayOptions.headerTextTask}
    </div>
    <div className="contentTableCell contentTableCell_Header"></div>
  </Fragment>
);
