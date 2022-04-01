import { TaskList } from "../screens/ProjectsScreen";
export interface ToDo {
  id: any;
  content: string;
  isCompleted: boolean;
  taskList: TaskList | null;
}
