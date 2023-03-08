import { ToDoList } from './list/types&utils';

export const dateAndTime = (t: any) => {
  const date = new Date();
  const hours = date.getHours();
  const minutes = date.getMinutes();
  let formatedMinutes: string = '';
  minutes.toString().length === 2
    ? (formatedMinutes = minutes.toString())
    : (formatedMinutes = `0${minutes}`);

  return `${date.toLocaleDateString()} ${t('at')} ${hours}:${formatedMinutes} `;
};

export const MonthStringToNumber = (month: string) => {
  switch (month) {
    case 'Jan':
      return '01';
    case 'Feb':
      return '02';
    case 'Mar':
      return '03';
    case 'Apr':
      return '04';
    case 'May':
      return '05';
    case 'Jun':
      return '06';
    case 'Jul':
      return '07';
    case 'Aug':
      return '08';
    case 'Sep':
      return '09';
    case 'Oct':
      return '10';
    case 'Nov':
      return '11';
    case 'Dec':
      return '12';
    default:
      return '01';
  }
};

export const SwitchDaysOfWeek = (day: number) => {
  switch (day) {
    case 0:
      return 'sun';
    case 1:
      return 'mon';
    case 2:
      return 'tue';
    case 3:
      return 'wed';
    case 4:
      return 'thu';
    case 5:
      return 'fri';
    case 6:
      return 'sat';
    default:
      return 'sun';
  }
};

export type LocationToDoList = {
  date: string;
  list: ToDoList[];
}[];

export type LocationToDoListType = {
  date: string;
  list: ToDoList[];
};

export const UseDate = (date: Date) => {
  let formatedDate: any = date.toString().split(' ');
  formatedDate =
    formatedDate[0] +
    ' ' +
    formatedDate[1] +
    ' ' +
    formatedDate[2] +
    ' ' +
    formatedDate[3];

  return formatedDate;
};
