import React from 'react';

import { Box, Stack } from '@mui/material';
import { AddCircleOutlineRounded, DeleteRounded } from '@mui/icons-material';

import { ToDoList, ToDoListObj } from './types&utils';
import { BaseButton } from 'components/buttons';
import { BaseModal } from 'components/modals';
import { BaseTextField } from 'components/fields';
import { ToDoListCard } from 'components/cards';
import { PageHolder } from 'components/PageHolder';
import { useTranslation } from 'react-i18next';

type Props = {
  toDoListArray: ToDoList[];
  modal: boolean;
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
  deleteTitle: 'delete' | 'confirm';
  deleteArray: string[];
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
  handleAdd: () => void;
  handleCancel: () => void;
  handleDelete: () => void;
  handleCheckBox: (id: string) => void;
  handleSelectDelete: (id: string) => void;
};

const ToDoListRender: React.FC<Props> = ({
  toDoListArray,
  modal,
  setModal,
  deleteTitle,
  deleteArray,
  handleChange,
  handleAdd,
  handleCancel,
  handleDelete,
  handleCheckBox,
  handleSelectDelete
}) => {
  const { t } = useTranslation();

  return (
    <PageHolder title={t('toDoList')}>
      <Box
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          flexDirection: 'column'
        }}
      >
        <Stack mt={2} direction="row" gap={2}>
          <BaseButton
            title={t('add')}
            onClick={() => setModal(true)}
            endIcon={<AddCircleOutlineRounded />}
            sx={{
              mb: 2
            }}
          />

          <BaseButton
            title={t(deleteTitle)}
            onClick={handleDelete}
            endIcon={<DeleteRounded />}
            sx={{
              mb: 2
            }}
          />
        </Stack>

        {toDoListArray.reverse().map((item, index) => (
          <ToDoListCard
            key={index}
            title={item.title}
            details={item.description}
            checked={item.isCompleted}
            mb={1}
            setChecked={() => handleCheckBox(item.id)}
            beginDate={item.beginDate}
            endDate={item.endDate}
            setDelete={() => handleSelectDelete(item.id)}
            disabled={item.disabled}
            deleteChecked={deleteArray.includes(item.id)}
          />
        ))}

        <BaseModal
          handleClose={() => setModal(false)}
          open={modal}
          minSize={{ width: '50%' }}
        >
          <Box>
            <BaseTextField
              handleChange={handleChange}
              label={t('title')}
              name="title"
              fullWidth
              sx={{ mb: 2 }}
              maxLength={40}
            />

            <BaseTextField
              handleChange={handleChange}
              label={t('description')}
              name="description"
              fullWidth
              multiline
              rows={4}
            />

            <Stack mt={2} direction="row" gap={2}>
              <BaseButton title={t('add')} onClick={handleAdd} />

              <BaseButton title={t('cancel')} onClick={handleCancel} />
            </Stack>
          </Box>
        </BaseModal>
      </Box>
    </PageHolder>
  );
};

export default ToDoListRender;
