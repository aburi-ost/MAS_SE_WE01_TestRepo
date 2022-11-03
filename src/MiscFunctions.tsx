import { DisplayOption, TaskEntry } from "./Interfaces";
/*------ filter task entries ------*/
export const filterTaskEntries = (
  inputTextQuery: string,
  displayOptions: DisplayOption,
  taskEntries: TaskEntry[]
) => {
  // filter table by isChecked
  // Todo: Achtung! Hier wird nur die referenz kopiert?
  //let filteredTaskEntries = taskEntries;
  // create copy of taskEntries
  let filteredTaskEntries = [...taskEntries];
  if (displayOptions.showAll === false) {
    filteredTaskEntries = filteredTaskEntries.filter(
      (entry) => entry.isChecked === false
    );
  }

  // filter table by input Text Query - convert to lower case to ignore capitalization
  if (inputTextQuery) {
    //truthy check
    filteredTaskEntries = filteredTaskEntries.filter((entry) =>
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
