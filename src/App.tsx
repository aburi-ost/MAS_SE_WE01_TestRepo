import { ChangeEvent, useState } from "react";
import { v4 } from "uuid";

import { TaskEntry, DisplayOption } from "./Interfaces";
import { filterTaskEntries } from "./MiscFunctions";
import { AppBar } from "./AppBar";
import { InputBar } from "./InputBar";
import { TableEmpty } from "./TableEmpty";
import { Table } from "./Table";
import { TableHeader } from "./TableHeader";
import { TableContent } from "./TableContent";
import { Footer } from "./Footer";
import "./App.css";

/*------ initial values for task entries ------*/
const initialTaskEntries: TaskEntry[] = [
  {
    id: v4(), // uinque ID via v4() of uuid (dependency)
    isChecked: false,
    importance: 1,
    name: "C Task: lorem"
  },
  {
    id: v4(),
    isChecked: true,
    importance: 2,
    name: "A Task: lorem ipsum"
  },
  {
    id: v4(),
    isChecked: false,
    importance: 3,
    name: "B Task: lorem ipsum dolor"
  }
];

/*------ initial values for display options ------*/
const initialDisplayOptions: DisplayOption = {
  sortingOrder: "ByImportanceAscending",
  showAll: true,
  headerTextImportance: "Wichtigkeit \u25B2",
  headerTextTask: "Aufgabe \u2003"
};

/*------ main app ------*/
export const App = () => {
  const [inputText, setInputText] = useState("");
  const [displayOptions, setDisplayOptions] = useState(initialDisplayOptions);
  const [taskEntries, setTaskEntries] = useState<TaskEntry[]>(
    initialTaskEntries
  );

  /* Funktionen die innerhalb von "export const App = () => {}" definiert haben müssen eine Abhängigkeit zu einem State haben /*
  /* alles ohne Abhängigkeit zum state ist ausserhalb von "export const App = () => {}" bzw in einem eigenem file zu definieren*/

  /*---- Update text -----*/
  /*Es könnte auch direkt die setInputText funktion übergeben werden */
  const updateTextInput = (event: ChangeEvent<HTMLInputElement>) => {
    setInputText(String(event.target.value));
  };

  /*---- Update ShowAll -----*/
  const updateShowAll = () => {
    const newappState = { ...displayOptions, showAll: !displayOptions.showAll };
    setDisplayOptions(newappState);
  };

  /*---- Update checkbox -----*/
  const updateCheckbox = (id: string) => {
    const newTaskEntries = taskEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, isChecked: !entry.isChecked };
      }
      return entry;
    });
    setTaskEntries(newTaskEntries);
  };

  /*---- Update Importance -----*/
  const updateImportance = (id: string, newImportance: 1 | 2 | 3) => {
    const newTaskEntries = taskEntries.map((entry) => {
      if (entry.id === id) {
        return { ...entry, importance: newImportance };
      }
      return entry;
    });
    setTaskEntries(newTaskEntries);
  };

  /*---- Add task to list -----*/
  const updateTaskList = () => {
    if (!inputText) return; // falsy check
    const newTaskEntry: TaskEntry = {
      id: v4(),
      isChecked: false,
      importance: 1,
      name: inputText
    };
    const newEntries = [...taskEntries, newTaskEntry];
    setTaskEntries(newEntries);
    // clear text input
    setInputText("");
  };

  /*---- Delete task from list -----*/
  const deleteItem = (id: String) => {
    const newTaskEntries = taskEntries.filter((entry) => entry.id !== id);
    setTaskEntries(newTaskEntries);
  };

  /*---- Sort by name -----*/
  const updateSortByName = () => {
    if (displayOptions.sortingOrder === "ByNameAscending") {
      setDisplayOptions({
        ...displayOptions,
        sortingOrder: "ByNameDescending",
        headerTextImportance: "Wichtigkeit \u2003",
        headerTextTask: "Aufgabe \u25BC"
      });
    } else {
      setDisplayOptions({
        ...displayOptions,
        sortingOrder: "ByNameAscending",
        headerTextImportance: "Wichtigkeit \u2003",
        headerTextTask: "Aufgabe \u25B2"
      });
    }
  };

  /*---- Sort by Importance -----*/
  const updateSortByImportance = () => {
    if (displayOptions.sortingOrder === "ByImportanceAscending") {
      setDisplayOptions({
        ...displayOptions,
        sortingOrder: "ByImportanceDescending",
        headerTextImportance: "Wichtigkeit \u25BC",
        headerTextTask: "Aufgabe \u2003"
      });
    } else {
      setDisplayOptions({
        ...displayOptions,
        sortingOrder: "ByImportanceAscending",
        headerTextImportance: "Wichtigkeit \u25B2",
        headerTextTask: "Aufgabe \u2003"
      });
    }
  };

  const filteredTaskEntries = filterTaskEntries(
    inputText,
    displayOptions,
    taskEntries
  );

  /*---- return -----*/
  return (
    <div className="gridContainer">
      <AppBar></AppBar>

      <InputBar
        inputTextValue={inputText}
        showAllState={displayOptions.showAll}
        onChangeTextInput={updateTextInput}
        onClickAddItem={updateTaskList}
        onChangeShowAll={updateShowAll}
      ></InputBar>

      {filteredTaskEntries.length > 0 ? (
        <Table>
          <TableHeader
            filteredTaskEntries={filteredTaskEntries}
            displayOptions={displayOptions}
            onClickDelete={deleteItem}
            onClickSortByImportance={updateSortByImportance}
            onClickSortByTask={updateSortByName}
          ></TableHeader>
          <TableContent
            filteredTaskEntries={filteredTaskEntries}
            onClickDelete={deleteItem}
            displayOptions={displayOptions}
            onChangeCheckbox={updateCheckbox}
            onClickImportance={updateImportance}
          ></TableContent>
        </Table>
      ) : (
        <TableEmpty></TableEmpty>
      )}

      <Footer></Footer>
    </div>
  );
};
