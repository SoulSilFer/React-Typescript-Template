import React, { useState } from 'react';

import useEnhancedEffect from '@mui/material/utils/useEnhancedEffect';

import { LocalStorage } from 'core/infra';
import ToDoListRender from './render';
import { ToDoList, ToDoListObj } from './types&utils';
import { useTranslation } from 'react-i18next';

const ToDoListContainer: React.FC = () => {
  const { t } = useTranslation();
  const localStorage = new LocalStorage();

  const [toDoListArray, setToDoListArray] = useState<ToDoList[]>([]);
  const [modal, setModal] = useState<boolean>(false);
  const [obj, setObj] = useState<ToDoList>(ToDoListObj);
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

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;

    setObj({
      ...obj,
      [name]: value
    });
  };

  const dateAndTime = () => {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    let formatedMinutes: string = '';
    minutes.toString().length === 2
      ? (formatedMinutes = minutes.toString())
      : (formatedMinutes = `0${minutes}`);

    return `${date.toLocaleDateString()} ${t(
      'at'
    )} ${hours}:${formatedMinutes} `;
  };

  const handleAdd = () => {
    const randomId = Math.random().toString(36).substr(2, 9);
    obj.id = randomId;
    obj.beginDate = dateAndTime();

    localStorage.set('toDoListArray', JSON.stringify([...toDoListArray, obj]));

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
          endDate: itemIsCompleted ? '' : dateAndTime()
        };
      }

      return item;
    });

    setToDoListArray(newArray);
    localStorage.set('toDoListArray', JSON.stringify(newArray));
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
    <>
      <ToDoListRender
        toDoListArray={toDoListArray}
        modal={modal}
        setModal={setModal}
        deleteTitle={deleteTitle}
        deleteArray={deleteArray}
        handleChange={handleChange}
        handleAdd={handleAdd}
        handleCancel={handleCancel}
        handleDelete={handleDelete}
        handleCheckBox={handleCheckBox}
        handleSelectDelete={handleSelectDelete}
      />
    </>
  );
};

export default ToDoListContainer;
