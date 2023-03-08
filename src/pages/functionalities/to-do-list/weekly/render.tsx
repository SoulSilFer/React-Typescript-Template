import React, { useState } from 'react';

import {
  Box,
  Stack,
  styled,
  Typography,
  FormControlLabel,
  Checkbox
} from '@mui/material';

import { PageHolder } from 'components/PageHolder';
import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';
import { ToDoListCard } from 'components/cards';
import dayjs, { Dayjs } from 'dayjs';
import { BaseTextField, Calendar, DatePicker } from 'components/fields';
import { LocalStorage } from 'core/infra';

import {
  dateAndTime,
  LocationToDoList,
  LocationToDoListType,
  UseDate
} from '../utils';
import { ToDoList, ToDoListObj } from '../list/types&utils';
import ToDoListRender from '../list/render';
import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/modals';
import { BaseButton } from 'components/buttons';

const DaysContainer = styled(Box)(({ theme }) => ({
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
  },

  '& .MuiTypography-root': {
    padding: theme.spacing(1),
    cursor: 'pointer',
    borderRadius: theme.spacing(1),

    '&:hover': {
      backgroundColor: theme.palette.primary.dark
    }
  }
}));

const ToDoListContainer = styled(Box)(({ theme }) => ({
  display: 'flex',
  justifyContent: 'center',
  flexDirection: 'column',
  alignItems: 'center',
  borderRadius: theme.spacing(1),
  flexWrap: 'wrap',
  padding: theme.spacing(1),
  border: `1px solid ${theme.palette.primary.main}`,
  width: '100%',
  color: theme.palette.primary.contrastText
}));

const StyledHeader = styled(Box)(({ theme }) => ({
  backgroundColor: theme.palette.primary.light,
  width: '100%',
  display: 'flex',
  justifyContent: 'center',
  alignItems: 'center',
  borderRadius: '0.5rem'
}));

const WeeklyToDoList: React.FC = () => {
  const { t } = useTranslation();

  const localStorage = new LocalStorage();
  const toDoListConfigured: LocationToDoList = JSON.parse(
    localStorage.get('ConfiguredToDoList')
  );

  const [newDate, setNewDate] = useState<Date>(new Date());
  const [toDoListLocal, setToDoListLocal] = useState<ToDoList[]>([]);
  const [editModal, setEditModal] = useState<{ open: boolean; item: ToDoList }>(
    {
      open: false,
      item: ToDoListObj
    }
  );
  const [arrayWDate, setArrayWDate] = useState<
    {
      date: string;
      list: ToDoList[];
    }[]
  >([]);
  const [editDate, setEditDate] = useState<Date>(new Date());
  const [editCheck, setEditCheck] = useState<boolean>(false);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setEditModal({
      ...editModal,
      item: {
        ...editModal.item,
        [name]: value
      }
    });
  };

  useEnhancedEffect(() => {
    let formatedDate = UseDate(newDate);

    if (toDoListConfigured) {
      const filteredArray = toDoListConfigured.filter(
        (item) => item.date === formatedDate
      );
      setArrayWDate(filteredArray);

      const onlyList = filteredArray.map((item) => item.list);

      setToDoListLocal(onlyList.flatMap((innerArr) => [...innerArr]));
    }
  }, [newDate]);

  const handleEdit = (id: string) => {
    const dateIsDifferent = UseDate(newDate) !== UseDate(editDate);

    if (arrayWDate.length !== 1) {
      const teste = arrayWDate.map((item) => item.list);
      const onlyList = teste.flatMap((innerArr) => [...innerArr]);

      const restOfArray = onlyList.find((item) => item.id !== id);

      if (restOfArray) {
        const newLocalObj: LocationToDoListType = {
          date: UseDate(newDate),
          list: [restOfArray]
        };

        const newObj: LocationToDoListType = {
          date: dateIsDifferent ? UseDate(editDate) : UseDate(newDate),
          list: [editModal.item]
        };

        const filteredArray = toDoListConfigured.filter(
          (item) => item.date !== UseDate(newDate)
        );

        const formedSaveOBj = filteredArray.concat(newLocalObj, newObj);

        localStorage.set('ConfiguredToDoList', JSON.stringify(formedSaveOBj));

        const newArray = formedSaveOBj.filter(
          (item) => item.date === UseDate(newDate)
        );

        const onlyList = newArray.map((item) => item.list);

        setToDoListLocal(onlyList.flatMap((innerArr) => [...innerArr]));
      }
    } else {
      const newObj: LocationToDoListType = {
        date: dateIsDifferent ? UseDate(editDate) : UseDate(newDate),
        list: [editModal.item]
      };

      const filteredArray = toDoListConfigured.filter(
        (item) => item.date !== UseDate(newDate)
      );

      const formedSaveOBj = filteredArray.concat(newObj);

      localStorage.set('ConfiguredToDoList', JSON.stringify(formedSaveOBj));

      const newArray = formedSaveOBj.filter(
        (item) => item.date === UseDate(newDate)
      );

      const onlyList = newArray.map((item) => item.list);

      setToDoListLocal(onlyList.flatMap((innerArr) => [...innerArr]));
    }

    setEditModal({
      open: false,
      item: ToDoListObj
    });
    setEditDate(newDate);
    setEditCheck(false);
  };

  const handleCheckLocal = (id: string) => {
    const newArray = toDoListLocal.map((item) => {
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

    if (arrayWDate.length !== 1) {
      const teste = arrayWDate.map((item) => item.list);
      const onlyList = teste.flatMap((innerArr) => [...innerArr]);

      const filteredArray = toDoListConfigured.filter(
        (item) => item.date !== UseDate(newDate)
      );

      const newLocalObj: LocationToDoListType = {
        date: UseDate(newDate),
        list: newArray
      };

      const formedSaveOBj = filteredArray.concat(newLocalObj);

      localStorage.set('ConfiguredToDoList', JSON.stringify(formedSaveOBj));
    } else {
      const filteredArray = toDoListConfigured.filter(
        (item) => item.date !== UseDate(newDate)
      );

      const newLocalObj: LocationToDoListType = {
        date: UseDate(newDate),
        list: newArray
      };

      const formedSaveOBj = filteredArray.concat(newLocalObj);

      localStorage.set('ConfiguredToDoList', JSON.stringify(formedSaveOBj));
    }

    setToDoListLocal(newArray);
  };

  return (
    <PageHolder title="Semanal">
      <DaysContainer>
        <Calendar onChange={setNewDate} />
      </DaysContainer>

      <ToDoListContainer className="toDoListContainer" mt={1}>
        <StyledHeader mb={2}>
          <Typography variant="h5">
            {`Tarefas pré programadas do dia ${newDate.toLocaleDateString()}`}
          </Typography>
        </StyledHeader>

        {toDoListLocal.map((item) => (
          <ToDoListCard
            key={item.id}
            title={item.title}
            details={item.description}
            beginDate={item.beginDate}
            endDate={item.endDate}
            checked={item.isCompleted}
            deleteChecked={false}
            disabled={false}
            setChecked={() => handleCheckLocal(item.id)}
            setDelete={() => {}}
            mb={1}
            editable
            setEdit={() => {
              setEditModal({
                open: true,
                item: {
                  title: item.title,
                  description: item.description,
                  beginDate: item.beginDate,
                  endDate: item.endDate,
                  isCompleted: item.isCompleted,
                  disabled: false,
                  id: item.id
                }
              });
            }}
          />
        ))}
      </ToDoListContainer>

      <BaseModal
        open={editModal.open}
        handleClose={() => setEditModal({ open: false, item: ToDoListObj })}
        minSize={{
          width: '50%'
        }}
      >
        <Box
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: 2,
            width: '100%'
          }}
        >
          <BaseTextField
            handleChange={(e) => handleChange(e)}
            label={t('title')}
            name="title"
            fullWidth
            value={editModal.item.title}
          />

          <BaseTextField
            handleChange={(e) => handleChange(e)}
            label={t('description')}
            name="description"
            fullWidth
            value={editModal.item.description}
          />

          <FormControlLabel
            control={
              <Checkbox
                sx={{ mr: 1 }}
                onChange={() => setEditCheck(!editCheck)}
              />
            }
            label="Alterar data"
            checked={editCheck}
          />

          <DatePicker
            onChange={setEditDate}
            label={'Selecionar data'}
            disabled={!editCheck}
          />

          <Stack direction="row" gap={2}>
            <BaseButton
              title={t('confirm')}
              onClick={() => handleEdit(editModal.item.id)}
            />

            <BaseButton
              title={t('cancel')}
              onClick={() => setEditModal({ open: false, item: ToDoListObj })}
            />
          </Stack>
        </Box>
      </BaseModal>
    </PageHolder>
  );
};

export default WeeklyToDoList;
