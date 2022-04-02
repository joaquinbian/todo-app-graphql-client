import { ToDo } from "./todoInterface";
import { User } from "./userInterface";
export interface TaskList {
  id: any;
  title: string;
  createdAt: string;
  progress: number;
  users?: User[];
  toDos: ToDo[];
}
