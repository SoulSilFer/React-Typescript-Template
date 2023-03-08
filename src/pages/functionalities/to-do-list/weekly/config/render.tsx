import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';

import {
  Box,
  FormControlLabel,
  Checkbox,
  Stack,
  styled,
  Slider
} from '@mui/material';

import { PageHolder } from 'components/PageHolder';
import { Calendar } from 'components/fields';
import { BaseButton } from 'components/buttons';
import { ToDoList, ToDoListObj } from '../../list/types&utils';
import { LocalStorage } from 'core/infra';
import ToDoListRender from '../../list/render';
import {
  getDaysOfWeekFromDate,
  getRemainingDaysOfMonth,
  getDaysOfWeekForDateInNextMonths,
  ToDoListConfigChecks,
  ToDoListConfigChecksObj,
  getSameDateNumber,
  getRemainDaysOfTheWeek,
  MarksMonth
} from './types&utils';
import { dateAndTime, LocationToDoList, SwitchDaysOfWeek } from '../../utils';
import { BaseModal } from 'components/modals';

const Container = styled(Box)(({ theme }) => ({
  '& .MuiPickersLayout-contentWrapper': {
    backgroundColor: theme.palette.background.neutral
  },

  '& .MuiDateCalendar-root': {
    backgroundColor: theme.palette.background.paper,
    borderRadius: theme.shape.borderRadius
  },

  '& .MuiPickersDay-root': {
    color: theme.palette.primary.main,

    '&:hover': {
      backgroundColor: theme.palette.primary.dark,
      color: theme.palette.primary.contrastText
    },

    '& .Mui-selected': {
      backgroundColor: theme.palette.primary.dark
    }
  },

  '& .Mui-selected': {
    backgroundColor: theme.palette.primary.dark,
    color: theme.palette.primary.contrastText
  },

  '& .MuiFormControlLabel-root': {
    width: 'fit-content'
  }
}));

const ConfigToDoList: React.FC = () => {
  const { t } = useTranslation();
  const navigate = useNavigate();
  const localStorage = new LocalStorage();

  const [openTotalMonths, setOpenTotalMonths] = useState<boolean>(false);
  const [totalMonths, setTotalMonths] = useState<number>(0);
  const [tDate, setTDate] = useState<Date>(new Date());
  const [checks, setChecks] = useState<ToDoListConfigChecks>(
    ToDoListConfigChecksObj
  );

  const [toDoListArray, setToDoListArray] = useState<ToDoList[]>([]);
  const [deleteArray, setDeleteArray] = useState<string[]>([]);
  const [obj, setObj] = useState<ToDoList>(ToDoListObj);
  const [modal, setModal] = useState<boolean>(false);
  const [deleteTitle, setDeleteTitle] = useState<'delete' | 'confirm'>(
    'delete'
  );

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setObj({
      ...obj,
      [name]: value
    });
  };

  const handleAddTask = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    obj.id = randomId;
    obj.beginDate = dateAndTime(t);

    setToDoListArray([...toDoListArray, obj]);
    setModal(false);
    setObj(ToDoListObj);
  };

  const handleCancel = () => {
    setModal(false);
    setObj(ToDoListObj);
  };

  const handleCheckBox = (id: string) => {
    const newArray = toDoListArray.map((item) => {
      const itemIsCompleted = item.isCompleted;

      if (item.id === id) {
        return {
          ...item,
          isCompleted: !item.isCompleted,
          endDate: itemIsCompleted ? '' : dateAndTime(t)
        };
      }

      return item;
    });

    setToDoListArray(newArray);
  };

  const handleSelectDelete = (id: string) => {
    if (deleteArray.includes(id)) {
      const newArray = deleteArray.filter((item) => item !== id);
      setDeleteArray(newArray);
    } else {
      setDeleteArray([...deleteArray, id]);
    }
  };

  const handleDelete = () => {
    if (toDoListArray.length === 0) return;

    if (deleteTitle === 'delete') {
      setDeleteTitle('confirm');
      toDoListArray.forEach((item) => (item.disabled = true));
    } else {
      const newArray = toDoListArray.filter(
        (item) => !deleteArray.includes(item.id)
      );

      setToDoListArray(newArray);
      setDeleteArray([]);
      toDoListArray.forEach((item) => (item.disabled = false));
      setDeleteTitle('delete');
    }
  };

  const handleConfirm = () => {
    let daysToAdd: string | string[] = '';
    let formatedArray = toDoListArray;
    let objs: LocationToDoList = [];

    if (checks.dayToWeek) {
      const remainingDaysWeek = getRemainDaysOfTheWeek(tDate);

      remainingDaysWeek.forEach((day) => {
        daysToAdd = day.toString().split(' ');
        daysToAdd =
          daysToAdd[0] +
          ' ' +
          daysToAdd[1] +
          ' ' +
          daysToAdd[2] +
          ' ' +
          daysToAdd[3];

        formatedArray = toDoListArray.map((item) => {
          const randomId = Math.random().toString(36).substr(2, 9);

          return {
            ...item,
            id: randomId
          };
        });

        objs.push({
          date: daysToAdd,
          list: formatedArray
        });
      });
    }

    if (checks.dayToMonth) {
      const daysOfMonth = getRemainingDaysOfMonth();

      daysOfMonth.forEach((day: Date) => {
        daysToAdd = day.toString().split(' ');
        daysToAdd =
          daysToAdd[0] +
          ' ' +
          daysToAdd[1] +
          ' ' +
          daysToAdd[2] +
          ' ' +
          daysToAdd[3];

        formatedArray = toDoListArray.map((item) => {
          const randomId = Math.random().toString(36).substr(2, 9);

          return {
            ...item,
            id: randomId
          };
        });

        objs.push({
          date: daysToAdd,
          list: formatedArray
        });
      });
    }

    if (checks.dayToDay) {
      const daysOfTheWeek = getDaysOfWeekFromDate(tDate);

      daysOfTheWeek.forEach((day: Date) => {
        daysToAdd = day.toString().split(' ');
        daysToAdd =
          daysToAdd[0] +
          ' ' +
          daysToAdd[1] +
          ' ' +
          daysToAdd[2] +
          ' ' +
          daysToAdd[3];

        formatedArray = toDoListArray.map((item) => {
          const randomId = Math.random().toString(36).substr(2, 9);

          return {
            ...item,
            id: randomId
          };
        });

        objs.push({
          date: daysToAdd,
          list: formatedArray
        });
      });
    }

    if (checks.dayToWeekToMonth) {
      const days = getDaysOfWeekForDateInNextMonths(tDate, totalMonths);

      days.forEach((day: Date) => {
        daysToAdd = day.toString().split(' ');
        daysToAdd =
          daysToAdd[0] +
          ' ' +
          daysToAdd[1] +
          ' ' +
          daysToAdd[2] +
          ' ' +
          daysToAdd[3];

        formatedArray = toDoListArray.map((item) => {
          const randomId = Math.random().toString(36).substr(2, 9);

          return {
            ...item,
            id: randomId
          };
        });

        objs.push({
          date: daysToAdd,
          list: formatedArray
        });
      });
    }

    if (checks.dayToWeekToYear) {
      const days = getSameDateNumber(tDate);

      days.forEach((day: Date) => {
        daysToAdd = day.toString().split(' ');
        daysToAdd =
          daysToAdd[0] +
          ' ' +
          daysToAdd[1] +
          ' ' +
          daysToAdd[2] +
          ' ' +
          daysToAdd[3];

        formatedArray = toDoListArray.map((item) => {
          const randomId = Math.random().toString(36).substr(2, 9);

          return {
            ...item,
            id: randomId
          };
        });

        objs.push({
          date: daysToAdd,
          list: formatedArray
        });
      });
    }

    objs = objs.filter((obj, index, self) => {
      return (
        index ===
        self.findIndex((t) => {
          return t.date === obj.date;
        })
      );
    });

    const getLocalStorage = localStorage.get('ConfiguredToDoList');

    if (getLocalStorage) {
      const parsedArray = JSON.parse(getLocalStorage);
      const newArray = parsedArray.concat(objs);

      localStorage.set('ConfiguredToDoList', JSON.stringify(newArray));
    } else {
      localStorage.set('ConfiguredToDoList', JSON.stringify(objs));
    }

    navigate('/tools');
  };

  return (
    <PageHolder title="ConfigToDoList">
      <Container>
        <Calendar onChange={setTDate} />

        <ToDoListRender
          toDoListArray={toDoListArray}
          modal={modal}
          setModal={setModal}
          deleteTitle={deleteTitle}
          deleteArray={deleteArray}
          handleChange={handleChange}
          handleAdd={handleAddTask}
          handleCancel={handleCancel}
          handleDelete={handleDelete}
          handleCheckBox={handleCheckBox}
          handleSelectDelete={handleSelectDelete}
        />

        <Box mt={3} ml={3} display="flex" flexDirection="column">
          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 1 }}
                onChange={() =>
                  setChecks({ ...checks, dayToWeek: !checks.dayToWeek })
                }
              />
            }
            label="Aplicar para todos os dias restante da semana"
            checked={checks.dayToWeek}
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 1 }}
                onChange={() =>
                  setChecks({ ...checks, dayToMonth: !checks.dayToMonth })
                }
              />
            }
            checked={checks.dayToMonth}
            label="Aplicar para todos os dias restante do mês"
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 1 }}
                onChange={() =>
                  setChecks({ ...checks, dayToDay: !checks.dayToDay })
                }
              />
            }
            checked={checks.dayToDay}
            label={
              <>
                Aplicar para todas <b>{t(SwitchDaysOfWeek(tDate.getDay()))}</b>{' '}
                do mês
              </>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 1 }}
                onChange={() =>
                  setChecks({
                    ...checks,
                    dayToWeekToMonth: !checks.dayToWeekToMonth
                  })
                }
              />
            }
            checked={checks.dayToWeekToMonth}
            label={
              <>
                Aplicar para todas <b>{t(SwitchDaysOfWeek(tDate.getDay()))}</b>{' '}
                dos próximos{' '}
                <b onClick={() => setOpenTotalMonths(true)}>{totalMonths}</b>{' '}
                meses
              </>
            }
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 1 }}
                onChange={() =>
                  setChecks({
                    ...checks,
                    dayToWeekToYear: !checks.dayToWeekToYear
                  })
                }
              />
            }
            checked={checks.dayToWeekToYear}
            label={
              <>
                Aplicar para todos os dias <b>{tDate.getDate()}</b> do ano
              </>
            }
          />
        </Box>

        <Stack mt={3} ml={2} direction="row" gap={2}>
          <BaseButton
            title={t('confirm')}
            onClick={handleConfirm}
            disabled={toDoListArray.length === 0}
          />

          <BaseButton title={t('cancel')} />
        </Stack>
      </Container>

      <BaseModal
        open={openTotalMonths}
        handleClose={() => setOpenTotalMonths(false)}
        minSize={{
          width: '40%'
        }}
      >
        <Slider
          aria-label="Temperature"
          valueLabelDisplay="auto"
          marks={MarksMonth}
          min={1}
          max={24}
          step={null}
          size="small"
          onChange={(_, value) => setTotalMonths(value as number)}
        />
      </BaseModal>
    </PageHolder>
  );
};

export default ConfigToDoList;
