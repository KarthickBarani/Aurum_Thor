import React, { RefObject, useCallback, useEffect, useMemo, useRef, useState } from 'react';
import { AddField } from '../components/Settings/AddField';
import { SettingsGrid } from '../components/Settings/SettingsGrid';
import axios from 'axios';
import { useHydrate, useQuery } from 'react-query';
import { arrayBuffer } from 'stream/consumers';
import { axiosGet, axiosPost } from '../helpers/Axios';
import { NavLink } from 'react-router-dom';
import { TestGrid, columnProps } from '../components/components/TableComponent';
import { AddSvg, RemoveSvg, ViewSvg } from '../components/Svg/Svg';
import { ListProps, Tab } from '../components/components/Tab';
import { Modal } from 'react-bootstrap';
import { InputSelectField, InputTextField } from '../components/components/InputField';
import { Layout } from '../components/Layout/Layout';
import { toastAlert } from '../Function/toast';
import { Loading } from '../components/components/Loading';


type SettingProps = {
  Id: number | null,
  Type: string,
  Value: SettingValueProps[]
  Operation: OperationProps
}

type SettingValueProps = {
  Id: number | null,
  Field: string,
  Type: string,
  Label: string[],
  Operation: OperationProps
}

type OperationProps = {
  Create: boolean,
  Read: boolean,
  Update: boolean,
  Delete: boolean
}

export const Settings = () => {

  const [settings, setSettings] = useState<SettingProps[]>([]);

  const [modalIsOpen, setModalIsOpen] = useState<boolean>(false)
  const settingValueDefaultValue: SettingValueProps = {
    Id: null,
    Field: '',
    Type: '',
    Label: [],
    Operation: {
      Create: true,
      Read: true,
      Update: true,
      Delete: true
    }
  }
  const [currentvalue, setCurrentValue] = useState<SettingValueProps>(settingValueDefaultValue)
  const [currentType, setCurrentType] = useState<string>('')

  useEffect(() => {
    axiosGet('/Settings')
      .then(res => {
        setSettings(res.data)
        setCurrentType(res.data[0].Type)
      })
      .catch(err => console.log(err))
  }, [modalIsOpen]);



  let label: string[] = []

  const formInput: string = 'form-control form-control-sm form-control-solid'
  const formSelect: string = 'form-select form-select-sm form-select-solid'
  const fieldType: string[] = ['Text', 'Number', 'Date', 'Currency']



  const columns: columnProps = [
    {
      id: 1,
      header: 'Action',
      accessor: 'Action',
      cell: (value) => (<span role={'button'} onClick={() => {
        console.log(value)
        setCurrentValue(value)
        setModalIsOpen(prev => !prev)
      }}><ViewSvg clsName='svg-icon svg-icon-primary svg-icon-3' /></span>)
    },
    {
      id: 2,
      header: 'Field',
      accessor: 'Field',

    },
    {
      id: 3,
      header: 'Label',
      accessor: 'Label',
      cell: (data: SettingValueProps) => {
        return data.Label?.join(' ,')
      },

    },
    {
      id: 4,
      header: 'Field Type',
      accessor: 'Type',
    },
  ]

  const lists: ListProps[] = useMemo(() => [
    {
      id: 1,
      header: 'Header',
      tabContent: () => (settings.length > 0 && <TestGrid data={settings[0].Value} columns={columns} setData={() => { }} />),
      clickEvent: (name) => { setCurrentType(name) }
    },
    {
      id: 2,
      header: 'Lineitem',
      tabContent: () => (settings.length > 0 && <TestGrid data={settings[1].Value} columns={columns} setData={() => { }} />),
      clickEvent: (name) => { setCurrentType(name) }
    },
    {
      id: 3,
      header: 'Expense',
      tabContent: () => (settings.length > 0 && <TestGrid data={settings[2].Value} columns={columns} setData={() => { }} />),
      clickEvent: (name) => { setCurrentType(name) }
    }
  ], [settings])



  const Lists = ({ lists }: { lists: string[] }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [message, setMessage] = useState<string>('')
    const [list, setList] = useState<string[]>(lists)

    const addHandler = () => {
      const array: string[] = [...list]
      if (inputRef.current) {
        if (inputRef.current?.value === '') {
          setMessage('Field Emtpy')
        } else {
          array.push(inputRef.current?.value)
          inputRef.current.value = ''
          label = array
          setMessage('')
          setList(array)
        }
      }
    }

    const removeHandler = (index) => {
      const array: string[] = [...list]
      array.splice(index)
      label = array
      setList(array)
    }


    return (
      <div className='m-2'>
        <div className="d-flex justify-content-between align-items-center">
          <div className="form-input w-75">
            <label className='form-label fw-bolder fs-6 gray-700' >
              Recognition Fields: (from pdf)
            </label>
            <input
              id='Label'
              name='Label'
              className='form-control form-control-sm form-control-solid'
              type='text'
              ref={inputRef}
            />
            <small className='text-danger'>{message}</small>
          </div>
          <div className={'d-flex'}>
            <div className="align-items-end">
              <button
                type='button'
                className='btn btn-light-primary font-weight-bold my-10 btn-sm'
                onClick={addHandler}
              >
                Add
              </button>
            </div>
          </div>
        </div>
        <ul className="list-group h-150px scroll p-2">
          {
            list.length > 0 ?
              list.map((li, index) => (<li key={index + li} className="list-group-item d-flex justify-content-between align-items-center">
                {li}
                <button
                  className='btn btn-sm btn-icon'
                >
                  <RemoveSvg clsName='svg-icon svg-icon-danger svg-icon-2' function={() => removeHandler(index)} />
                </button>
              </li>))
              :
              <li className="list-group-item d-flex justify-content-between align-items-center">
                Click Add Button to create List
              </li>
          }
        </ul>
      </div>
    )
  }

  const EditForm = ({ currentValue }: { currentValue: SettingValueProps }) => {

    const fieldRef = useRef<HTMLInputElement>(null)
    const typeRef = useRef<HTMLSelectElement>(null)
    const buttonRef = useRef<HTMLButtonElement>(null)
    const fieldErrRef = useRef<HTMLElement>(null)
    label = currentValue.Label

    const onSubmit = () => {
      if (buttonRef.current && fieldRef.current && fieldErrRef.current) {
        if (fieldRef.current.value === '') {
          fieldErrRef.current.innerText = 'required !!!'
          return fieldRef.current.focus()
        } else {
          fieldErrRef.current.innerText = ''
          console.log(currentType, { ...currentValue, Label: label, Field: fieldRef.current?.value, Type: typeRef.current?.value })
          axiosPost(`/Settings/${currentType}`, { ...currentValue, Label: label, Field: fieldRef.current?.value, Type: typeRef.current?.value })
            .then(res => toastAlert('success', res.statusText))
            .catch(err => toastAlert('error', err.toString()))
            .finally(() => setModalIsOpen(prev => !prev))
        }
      }
    }

    console.count('render !!')

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-6'>
            <div className='form-group'>
              <label className='form-label fw-bolder fs-6 gray-700 required' >
                Field Name
              </label>
              <input
                id='Field'
                name='Field'
                className='form-control form-control-sm form-control-solid'
                type='text'
                defaultValue={currentValue.Field}
                ref={fieldRef}
              />
            </div>
            <small ref={fieldErrRef} className='text-danger' ></small>
          </div>
          <div className='col-6'>
            <label className='form-label fw-bolder fs-6 gray-700' >
              Field Type
            </label>
            <select defaultValue={''} className="form-select form-select-solid form-select-sm" ref={typeRef}>
              <option key={0} value={''} ></option>
              {fieldType.map((type, index) => {
                return (
                  <option key={index + 1} value={type} >{type}</option>
                )
              })}
            </select>
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Lists lists={currentValue.Label} />
          </div>
        </div>
        <div className='row'>

        </div>
        <div className='row mt-5'>
          <div className='col-12'>
            <div className='form-group d-flex flex-wrap justify-content-end align-items-center'>
              <button
                ref={buttonRef}
                className='btn btn-light-primary font-weight-bold btn-sm mx-2'
                onClick={onSubmit}
              >
                Save
              </button>

              <button
                type='button'
                className='btn btn-light font-weight-bold btn-sm mx-2'
                onClick={() => setModalIsOpen(prev => !prev)}
              >
                Close
              </button>
            </div>
          </div>
        </div>
      </div>
    )
  }


  return (
    <>
      <Layout pageName='Settings' buttons={<>
        <button
          className="btn btn-sm btn-light-primary"
          onClick={() => {
            setCurrentValue(settingValueDefaultValue)
            setModalIsOpen(prev => !prev)
          }}
        >
          <AddSvg clsName='svg-icon svg-icon-primary svg-icon-3' /> Add Field
        </button></>}>
        {settings.length > 0 ? <Tab lists={lists} /> : <Loading />}
      </Layout>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(prev => !prev)} size={'xl'} scrollable={true} centered={true} >
        <Modal.Header closeButton={true}>
          <Modal.Title>Edit Field</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {currentvalue && <EditForm currentValue={currentvalue} />}
        </Modal.Body>
      </Modal >
    </>
  );
};
