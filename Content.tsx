import { taskEntry } from "./App";
import { displayOption } from "./App";
import "./Content.css";

interface Props {
  //children: ReactNode; // children: alles was zwischen ">" bzw. "<" des html codes in der übergeordneten funktion ist
  // hier wäre das z.B. "<Content>{children}</Content>" in App.tsx. Mit { } wird children von typscript als variable interpretiert und der in app.tsx aktuelle wert übergeben.
  inputTextQuery: string;
  displayOptions: displayOption;
  taskEntries: taskEntry[];
  onClickDelete: (id: string) => void;
  onClickSortByImportance: () => void;
  onClickSortByTask: () => void;
  onChangeCheckbox: (id: string) => void;
  onClickImportance: (id: string, newImportance: 1 | 2 | 3) => void;
}

/*------ filter task entries ------*/
const filterTaskEntries = ({
  inputTextQuery,
  displayOptions,
  taskEntries
}: Props) => {
  // filter table by isChecked
  let filteredTaskEntries = taskEntries;
  if (displayOptions.showAll === false) {
    filteredTaskEntries = taskEntries.filter(
      (entry) => entry.isChecked === false
    );
  }

  // filter table by input Text Query - convert to lower case to ignore capitalization
  if (inputTextQuery) {
    //truthy check
    filteredTaskEntries = taskEntries.filter((entry) =>
      entry.name.toLowerCase().startsWith(inputTextQuery.toLowerCase())
    );
  }

  // sort table
  switch (displayOptions.sortingOrder) {
    case "ByNameAscending":
      filteredTaskEntries = filteredTaskEntries.sort((a, b) => {
        if (a.name > b.name) return 1;
        if (a.name === b.name) return 0;
        return -1;
      });
      break;

    case "ByNameDescending":
      filteredTaskEntries = filteredTaskEntries.sort((a, b) => {
        if (a.name < b.name) return 1;
        if (a.name === b.name) return 0;
        return -1;
      });
      break;

    case "ByImportanceAscending":
      filteredTaskEntries = filteredTaskEntries.sort((a, b) => {
        if (a.importance > b.importance) return 1;
        if (a.importance < b.importance) return 0;
        return -1;
      });

      break;

    case "ByImportanceDescending":
      filteredTaskEntries = filteredTaskEntries.sort((a, b) => {
        if (a.importance < b.importance) return 1;
        if (a.importance > b.importance) return 0;
        return -1;
      });
      break;

    default:
      break;
  }

  return filteredTaskEntries;
};

/*------ create header for table ------*/
const createTableHeader = (
  { displayOptions, onClickSortByImportance, onClickSortByTask }: Props,
  filteredTaskEntries: taskEntry[]
) => {
  if (filteredTaskEntries.length === 0) {
    return (
      <div className="contTable_NoEntries" key={0}>
        Keine Todos gefunden.
      </div>
    );
  }
  return (
    <div className="contentTableRow" key={0}>
      <div className="contentTableCell contentTableCell_Header"></div>
      <div
        onClick={(e) => onClickSortByImportance()}
        className="contentTableCell contentTableCell_Header"
      >
        {displayOptions.headerTextImportance}
      </div>
      <div
        onClick={(e) => onClickSortByTask()}
        className="contentTableCell contentTableCell_Header"
      >
        {displayOptions.headerTextTask}
      </div>
      <div className="contentTableCell contentTableCell_Header"></div>
    </div>
  );
};

/*------ create contents for table ------*/
const createTableContent = (
  { onClickDelete, onChangeCheckbox, onClickImportance }: Props,
  filteredTaskEntries: taskEntry[]
) => {
  const divTableContent = filteredTaskEntries.map((itr) => (
    <div className="contentTableRow" key={itr.id}>
      <div className="contentTableCell contentTableCell_Checkbox">
        <input
          type="checkbox"
          checked={itr.isChecked}
          onChange={(e) => onChangeCheckbox(itr.id)}
        ></input>
      </div>
      <div className="contentTableCell contentTableCell_Priority">
        <a
          className={
            itr.importance > 0
              ? "contentTableIcon_Priority_Checked"
              : "contentTableIcon_Priority"
          }
          onClick={(e) => onClickImportance(itr.id, 1)}
        >
          🗲
        </a>
        <a
          className={
            itr.importance > 1
              ? "contentTableIcon_Priority_Checked"
              : "contentTableIcon_Priority"
          }
          onClick={(e) => onClickImportance(itr.id, 2)}
        >
          🗲
        </a>
        <a
          className={
            itr.importance > 2
              ? "contentTableIcon_Priority_Checked"
              : "contentTableIcon_Priority"
          }
          onClick={(e) => onClickImportance(itr.id, 3)}
        >
          🗲
        </a>
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
          onClick={(e) => onClickDelete(itr.id)}
          className="contentTableButton_Delete "
        >
          Löschen
        </button>
      </div>
    </div>
  ));

  return divTableContent;
};

/*------ build total content ------*/
const buildTotalContent = (props: Props) => {
  let filteredTaskEntries = filterTaskEntries(props);
  let tableContents = [];
  tableContents.push(createTableHeader(props, filteredTaskEntries));
  tableContents.push(createTableContent(props, filteredTaskEntries));

  return tableContents;
};

/*------ export function ------*/
export const Content = (props: Props) => (
  <div className="gridContent">{buildTotalContent(props)}</div>
);
