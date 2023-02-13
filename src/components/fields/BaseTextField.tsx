import { AddCircleOutline, Help, ModeEdit } from '@mui/icons-material'
import {
  FilledInputProps,
  IconButton,
  InputAdornment,
  InputProps,
  OutlinedInputProps,
  TextField
} from '@mui/material'
import React, { Fragment, useState } from 'react'
import BaseTooltip from './BaseTooltip'

type Props = {
  handleChange: (e: React.ChangeEvent<HTMLInputElement>) => void
  required?: boolean
  label: string
  name: string
  type?: string
  autoComplete?: string
  autoFocus?: boolean
  fullWidth?: boolean
  margin?: 'dense' | 'normal' | 'none' | undefined
  borderRadius?: string
  error?: boolean
  helperText?: string
  endAdornment?: React.ReactNode
  startAdornment?: React.ReactNode
  InputPropsRest?:
    | Partial<InputProps>
    | Partial<FilledInputProps>
    | Partial<OutlinedInputProps>
    | undefined
  placeholder?: string
  multiline?: boolean
  rows?: number
  shrink?: boolean
  editabled?: boolean
  maxLength?: number
  tooltipTitle?: string
  tooltipContent?: string
  tooltipContentArray?: string[]
  value?: string
  disabled?: boolean
}

const labelField = (props: any) => {
  const { label, tooltipTitle, tooltipContent, tooltipContentArray } = props
  return (
    <Fragment>
      {label}
      {tooltipTitle && tooltipContent && (
        <BaseTooltip
          title={tooltipTitle}
          tooltipContent={tooltipContent}
          tooltipContentArray={tooltipContentArray}
          placement="right-start"
        >
          <Help className="helpIcon" />
        </BaseTooltip>
      )}
    </Fragment>
  )
}

const BaseTextField: React.FC<Props> = ({
  handleChange,
  required,
  label,
  name,
  type,
  autoComplete,
  autoFocus,
  fullWidth,
  margin,
  borderRadius,
  error,
  helperText,
  endAdornment,
  startAdornment,
  InputPropsRest,
  placeholder,
  multiline,
  rows,
  shrink,
  editabled,
  maxLength,
  tooltipContent,
  tooltipContentArray,
  tooltipTitle,
  value,
  disabled,
  ...rest
}) => {
  const [editCheck, setEditCheck] = useState<boolean>(false)

  const handleClickEdit = () => {
    setEditCheck(!editCheck)
  }

  const editableField = (editabled?: boolean) => {
    return (
      <InputAdornment position="end">
        {editabled && (
          <IconButton onClick={handleClickEdit} edge="end">
            <ModeEdit />
          </IconButton>
        )}
      </InputAdornment>
    )
  }

  return (
    <>
      <TextField
        variant="outlined"
        required={required}
        value={value}
        margin={margin}
        disabled={!editCheck ? editabled : false}
        fullWidth={fullWidth}
        label={labelField({
          label: label,
          tooltipTitle: tooltipTitle,
          tooltipContent: tooltipContent,
          tooltipContentArray: tooltipContentArray
        })}
        name={name}
        autoComplete={autoComplete}
        autoFocus={autoFocus}
        type={type}
        onChange={handleChange}
        error={error}
        helperText={helperText}
        InputProps={{
          endAdornment: !endAdornment ? editableField(editabled) : endAdornment,
          startAdornment: startAdornment,
          ...InputPropsRest
        }}
        placeholder={placeholder}
        InputLabelProps={{ shrink: !tooltipTitle ? shrink : true }}
        multiline={multiline}
        rows={rows}
        sx={{
          '& .MuiOutlinedInput-root': {
            borderRadius: borderRadius ? borderRadius : '0.75rem'
          },
          '& .MuiFormLabel-root': {
            display: 'flex',
            alignItems: 'center',
            '& .helpIcon': {
              paddingLeft: '8px',
              fontSize: 30,
              order: 999,
              maxWidth: 300
            }
          }
        }}
        inputProps={{
          maxLength,
          readOnly: editabled && !editCheck
        }}
        {...rest}
      />
    </>
  )
}

export default BaseTextField
