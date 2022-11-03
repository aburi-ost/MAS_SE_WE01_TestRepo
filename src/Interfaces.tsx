/*------ interface for task entries ------*/
export interface TaskEntry {
  id: string;
  isChecked: boolean;
  importance: 1 | 2 | 3;
  name: string;
}

/*------ interface to keep track of display option settings ------*/
export interface DisplayOption {
  sortingOrder:
    | "ByNameAscending"
    | "ByNameDescending"
    | "ByImportanceAscending"
    | "ByImportanceDescending";
  showAll: boolean;
  headerTextImportance: string;
  headerTextTask: string;
}
