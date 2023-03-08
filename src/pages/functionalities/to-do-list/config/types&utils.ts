export type ToDoListConfigChecks = {
  dayToWeek: boolean;
  dayToMonth: boolean;
  dayToDay: boolean;
  dayToWeekToMonth: boolean;
  dayToWeekToYear: boolean;
};

export const ToDoListConfigChecksObj: ToDoListConfigChecks = {
  dayToWeek: false,
  dayToMonth: false,
  dayToDay: false,
  dayToWeekToMonth: false,
  dayToWeekToYear: false
};

export const getRemainDaysOfTheWeek = (selectdDate: Date): Date[] => {
  const todayIndex = selectdDate.getDay();

  return Array.from({ length: 7 - todayIndex }, (_, i) => {
    const date = new Date(selectdDate);
    date.setDate(selectdDate.getDate() + i);
    return date;
  });
};

export const getRemainingDaysOfMonth = (): Date[] => {
  const today = new Date();
  const endOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
  const daysRemaining = endOfMonth.getDate() - today.getDate() + 1;
  const remainingDays = Array.from({ length: daysRemaining }, (_, i) => {
    const date = new Date(
      today.getFullYear(),
      today.getMonth(),
      today.getDate() + i
    );
    return date;
  });
  return [today, ...remainingDays];
};

export const getDaysOfWeekFromDate = (selectedDate: Date): Date[] => {
  const dayOfWeek = selectedDate.getDay();
  const year = selectedDate.getFullYear();
  const month = selectedDate.getMonth();

  const daysOfMonth = new Array(31)
    .fill(null)
    .map((_, i) => new Date(year, month, i + 1));

  let daysOfTheWeek = daysOfMonth.filter((day) => day.getDay() === dayOfWeek);

  daysOfTheWeek = daysOfTheWeek.filter((day) => day >= selectedDate);

  return daysOfTheWeek;
};

export const getDaysOfWeekForDateInNextMonths = (
  date: Date,
  numMonths: number
): Date[] => {
  const daysOfWeek = [
    'Sunday',
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday'
  ];

  const result = [];

  for (let i = 0; i < numMonths; i++) {
    const month = date.getMonth() + i;
    const year = date.getFullYear();
    const daysInMonth = new Date(year, month + 1, 0).getDate();

    for (let j = 1; j <= daysInMonth; j++) {
      const dayOfWeek = daysOfWeek[new Date(year, month, j).getDay()];

      if (dayOfWeek === daysOfWeek[new Date(date).getDay()]) {
        result.push(new Date(year, month, j));
      }
    }
  }

  return result;
};

export const getSameDateNumber = (selectedDate: Date): Date[] => {
  const dateNumber = selectedDate.getDate();
  const currentYear = selectedDate.getFullYear();
  const lastDateOfYear = new Date(currentYear, 11, 31);
  const dates = [];

  while (selectedDate <= lastDateOfYear) {
    if (selectedDate.getDate() === dateNumber) {
      dates.push(new Date(selectedDate.getTime()));
    }

    selectedDate.setDate(selectedDate.getDate() + 1);
  }

  return dates;
};

export const MarksMonth = [
  {
    value: 1,
    label: '1'
  },
  {
    value: 2,
    label: '2'
  },
  {
    value: 3,
    label: '3'
  },
  {
    value: 4,
    label: '4'
  },
  {
    value: 6,
    label: '6'
  },
  {
    value: 12,
    label: '12'
  },
  {
    value: 24,
    label: '24'
  }
];
