export type ToDoList = {
  title: string;
  id: string;
  isCompleted: boolean;
  description?: string;
  beginDate: string;
  endDate: string;
  disabled: boolean;
};

export const ToDoListObj: ToDoList = {
  title: '',
  id: '',
  isCompleted: false,
  beginDate: '',
  endDate: '',
  disabled: false
};
