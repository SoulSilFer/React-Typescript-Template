import React, { useState } from 'react';

import {
  Box,
  Stack,
  styled,
  Typography,
  FormControlLabel,
  Checkbox,
  IconButton
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
import { ToDoList, ToDoListObj } from './types&utils';
import { useTranslation } from 'react-i18next';
import { BaseModal } from 'components/modals';
import { BaseButton } from 'components/buttons';
import ToDoListRender from '../simpleList/render';
import {
  Delete,
  DoneAllRounded,
  EventRepeatRounded,
  HighlightOffRounded,
  SwapHoriz
} from '@mui/icons-material';
import { useSnackbar } from 'notistack';

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

const ToDoListPage: React.FC = () => {
  const { t } = useTranslation();
  const { enqueueSnackbar } = useSnackbar();

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

    enqueueSnackbar(
      <span id="snack_success">Tarefa editada com sucesso</span>,
      {
        variant: 'success',
        autoHideDuration: 3000
      }
    );
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

  const [selectedId, setSelectedId] = useState<string[]>([]);
  const [selectButton, setSelectButton] = useState<boolean>(false);
  const [moveDate, setMoveDate] = useState<{
    open: boolean;
    date: Date;
  }>({
    open: false,
    date: newDate
  });

  const handleSelectButtonClick = () => {
    setSelectButton(!selectButton);
    setSelectedId([]);
  };

  const handleSelect = (id: string) => {
    const newArray = selectedId.includes(id)
      ? selectedId.filter((item) => item !== id)
      : selectedId.concat(id);

    setSelectedId(newArray);
  };

  const handleConfiguredDelete = () => {
    const dateList = arrayWDate.map((item) => item.list);
    const onlyList = dateList.flatMap((innerArr) => [...innerArr]);

    const filteredArray = onlyList.filter(
      (item) => !selectedId.includes(item.id)
    );

    const newLocalObj: LocationToDoListType = {
      date: UseDate(newDate),
      list: filteredArray
    };

    const filteredConfiguredArray = toDoListConfigured.filter(
      (item) => item.date !== UseDate(newDate)
    );

    const formedSaveOBj = filteredConfiguredArray.concat(newLocalObj);

    localStorage.set('ConfiguredToDoList', JSON.stringify(formedSaveOBj));

    const newArray = formedSaveOBj.filter(
      (item) => item.date === UseDate(newDate)
    );

    const newList = newArray.map((item) => item.list);

    setToDoListLocal(newList.flatMap((innerArr) => [...innerArr]));
    setSelectedId([]);
    setSelectButton(false);

    enqueueSnackbar(
      <span id="snack_success">Tarefa(s) excluída(s) com sucesso</span>,
      {
        variant: 'success',
        autoHideDuration: 3000
      }
    );
  };

  const handleMoveDate = () => {
    const dateList = arrayWDate.map((item) => item.list);
    const onlyList = dateList.flatMap((innerArr) => [...innerArr]);

    const restArray = onlyList.filter((item) => !selectedId.includes(item.id));

    const restObj: LocationToDoListType = {
      date: UseDate(newDate),
      list: restArray
    };

    const filteredConfiguredArray = toDoListConfigured.filter(
      (item) => item.date !== UseDate(newDate)
    );

    const toMoveArray = onlyList.filter((item) => selectedId.includes(item.id));

    const toMoveObj: LocationToDoListType = {
      date: UseDate(moveDate.date),
      list: toMoveArray
    };

    const formedSaveOBj = filteredConfiguredArray.concat(restObj, toMoveObj);

    localStorage.set('ConfiguredToDoList', JSON.stringify(formedSaveOBj));

    const newArray = formedSaveOBj.filter(
      (item) => item.date === UseDate(newDate)
    );

    const newList = newArray.map((item) => item.list);

    enqueueSnackbar(
      <span id="snack_success">
        Tarefas movidas com sucesso para o dia{' '}
        {moveDate.date.toLocaleDateString()}
      </span>,
      {
        variant: 'success',
        autoHideDuration: 3000
      }
    );

    setToDoListLocal(newList.flatMap((innerArr) => [...innerArr]));
    setSelectedId([]);
    setSelectButton(false);
    setMoveDate({
      open: false,
      date: newDate
    });
  };

  const [toDoListArray, setToDoListArray] = useState<ToDoList[]>([]);
  const [obj, setObj] = useState<ToDoList>(ToDoListObj);
  const [modal, setModal] = useState<boolean>(false);
  const [deleteTitle, setDeleteTitle] = useState<'delete' | 'confirm'>(
    'delete'
  );
  const [deleteArray, setDeleteArray] = useState<string[]>([]);

  useEnhancedEffect(() => {
    const getToDoListArray = localStorage.get('toDoListArray');

    if (getToDoListArray) {
      setToDoListArray(JSON.parse(getToDoListArray));
    }
  }, []);

  const handleChangeExtra = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setObj({
      ...obj,
      [name]: value
    });
  };

  const handleAddExtra = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    obj.id = randomId;
    obj.beginDate = dateAndTime(t);

    localStorage.set('toDoListArray', JSON.stringify([...toDoListArray, obj]));

    setToDoListArray([...toDoListArray, obj]);
    setModal(false);
    setObj(ToDoListObj);
  };

  const handleCancelExtra = () => {
    setModal(false);
    setObj(ToDoListObj);
  };

  const handleCheckBoxExtra = (id: string) => {
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
    localStorage.set('toDoListArray', JSON.stringify(newArray));
  };

  const handleSelectDeleteExtra = (id: string) => {
    if (deleteArray.includes(id)) {
      const newArray = deleteArray.filter((item) => item !== id);
      setDeleteArray(newArray);
    } else {
      setDeleteArray([...deleteArray, id]);
    }
  };

  const handleDeleteExtra = () => {
    if (deleteTitle === 'delete') {
      setDeleteTitle('confirm');
      toDoListArray.forEach((item) => (item.disabled = true));
    } else {
      const newArray = toDoListArray.filter(
        (item) => !deleteArray.includes(item.id)
      );

      setToDoListArray(newArray);
      localStorage.set('toDoListArray', JSON.stringify(newArray));
      setDeleteArray([]);
      toDoListArray.forEach((item) => (item.disabled = false));
      setDeleteTitle('delete');
    }
  };

  return (
    <PageHolder title={t('toDoList')}>
      <DaysContainer>
        <Calendar
          onChange={(newValue) => {
            setSelectButton(false);
            setNewDate(newValue);
          }}
        />
      </DaysContainer>

      <ToDoListContainer className="toDoListContainer" mt={1}>
        <StyledHeader mb={2}>
          <Typography variant="h5">
            {`Tarefas pré programadas do dia ${newDate.toLocaleDateString()}`}
          </Typography>
        </StyledHeader>

        <Stack direction="row" gap={1} mb={3}>
          <BaseButton
            title={selectButton ? 'Cancelar seleção' : 'Selecionar vários'}
            startIcon={
              selectButton ? <HighlightOffRounded /> : <DoneAllRounded />
            }
            onClick={handleSelectButtonClick}
            disabled={toDoListLocal.length === 0}
          />

          <BaseButton
            title="Apagar"
            sx={{
              bgcolor: 'error.main',

              '&:hover': {
                bgcolor: 'error.dark'
              }
            }}
            startIcon={<Delete />}
            disabled={!selectButton || selectedId.length === 0}
            onClick={handleConfiguredDelete}
          />

          <BaseButton
            title="Alterar data"
            sx={{
              bgcolor: 'warning.main',

              '&:hover': {
                bgcolor: 'warning.dark'
              }
            }}
            startIcon={<EventRepeatRounded />}
            disabled={!selectButton || selectedId.length === 0}
            onClick={() =>
              setMoveDate({
                ...moveDate,
                open: true
              })
            }
          />
        </Stack>

        {toDoListLocal.map((item) => (
          <ToDoListCard
            key={item.id}
            title={item.title}
            details={item.description}
            beginDate={item.beginDate}
            endDate={item.endDate}
            checked={item.isCompleted}
            deleteChecked={selectedId.includes(item.id)}
            disabled={selectButton}
            setChecked={() => handleCheckLocal(item.id)}
            setDelete={() => handleSelect(item.id)}
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

        <StyledHeader mb={2}>
          <Typography variant="h5">Adicionar tarefas extras</Typography>
        </StyledHeader>

        <Box width="100%">
          <ToDoListRender
            toDoListArray={toDoListArray}
            modal={modal}
            setModal={setModal}
            deleteTitle={deleteTitle}
            deleteArray={deleteArray}
            handleChange={handleChangeExtra}
            handleAdd={handleAddExtra}
            handleCancel={handleCancelExtra}
            handleDelete={handleDeleteExtra}
            handleCheckBox={handleCheckBoxExtra}
            handleSelectDelete={handleSelectDeleteExtra}
          />
        </Box>
      </ToDoListContainer>

      <BaseModal
        open={moveDate.open}
        handleClose={() => setMoveDate({ open: false, date: newDate })}
        minSize={{
          width: '50%'
        }}
        key={'modal1'}
      >
        <Calendar
          onChange={(newValue) =>
            setMoveDate({
              ...moveDate,
              date: newValue
            })
          }
          disablePast
        />

        <Typography variant="h6" mt={2}>
          {`Tarefas selecionadas serão movidas para o dia ${moveDate.date.toLocaleDateString()}`}
        </Typography>

        <Stack direction="row" gap={1} mt={2}>
          <BaseButton title="Confirmar" onClick={handleMoveDate} />

          <BaseButton
            title="Cancelar"
            onClick={() => setMoveDate({ open: false, date: newDate })}
          />
        </Stack>
      </BaseModal>

      <BaseModal
        open={editModal.open}
        handleClose={() => setEditModal({ open: false, item: ToDoListObj })}
        minSize={{
          width: '50%'
        }}
        key={'modal2'}
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

export default ToDoListPage;
