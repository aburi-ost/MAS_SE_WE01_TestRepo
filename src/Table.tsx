import { ReactNode } from "react";
import "./Table.css";

interface Props {
  children: ReactNode; // children: alles was zwischen ">" bzw. "<" des html codes in der übergeordneten funktion ist
  // hier wäre das z.B. "<Content>{children}</Content>" in App.tsx. Mit { } wird children von typscript als variable interpretiert und der in app.tsx aktuelle wert übergeben.
}

export const Table = (props: Props) => (
  <div className="gridContent">
    <div className="contentTable">{props.children}</div>
  </div>
);
