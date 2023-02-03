import React, { useEffect, useMemo, useRef, useState } from 'react';
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


type SettingProps = {
  Id: number,
  Type: string,
  Value: SettingValueProps[]
  Operation: OperationProps
}

type SettingValueProps = {
  Id: number,
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
  const [currentvalue, setCurrentValue] = useState<SettingValueProps>({} as SettingValueProps)

  useEffect(() => {
    axiosGet('/Settings')
      .then(res => setSettings(res.data))
      .catch(err => console.log(err))
  }, []);


  let currentTabIndex: number = 0
  let label: string[] = []

  const formInput = 'form-control form-control-sm form-control-solid'
  const formSelect = 'form-select form-select-sm form-select-solid'
  const fieldType = ['Text', 'Number', 'Date', 'Currency']



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
      clickEvent: (key) => {
        currentTabIndex = key
      }
    },
    {
      id: 2,
      header: 'Lineitem',
      tabContent: () => (settings.length > 0 && <TestGrid data={settings[1].Value} columns={columns} setData={() => { }} />),
      clickEvent: (key) => {
        currentTabIndex = key
      }
    },
    {
      id: 3,
      header: 'Expense',
      tabContent: () => (settings.length > 0 && <TestGrid data={settings[2].Value} columns={columns} setData={() => { }} />),
      clickEvent: (key) => {
        currentTabIndex = key
      }
    }
  ], [settings])



  const Lists = ({ lists }: { lists: string[] }) => {

    const inputRef = useRef<HTMLInputElement>(null)
    const [list, setList] = useState<string[]>(lists)

    const addHandler = () => {
      const array: string[] = [...list]
      if (inputRef.current) {
        array.push(inputRef.current?.value)
        inputRef.current.value = ''
        label = array
      }
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
          </div>
          <div>
            <button
              type='button'
              className='btn btn-light-primary font-weight-bold my-10 btn-sm'
              onClick={addHandler}
            >
              Add
            </button>
          </div>
        </div>
        <ul className="list-group h-150px scroll p-2">
          {
            list.length > 0 ?
              list.map(li => (<li className="list-group-item d-flex justify-content-between align-items-center">
                {li}
                <RemoveSvg clsName='svg-icon svg-icon-danger svg-icon-2' />
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
    label = currentValue.Label

    const onSubmit = () => {
      console.log({ ...currentValue, Label: label, Field: fieldRef.current?.value, Type: typeRef.current?.value })
      axiosPost(`/Settings/${currentValue.Type}`, { ...currentValue, Label: label, Field: fieldRef.current?.value, Type: typeRef.current?.value })
        .then(res => toastAlert('success', res.statusText))
        .catch(err => toastAlert('error', err.toString()))
        .finally(() => setModalIsOpen(prev => !prev))
    }

    return (
      <div className='container-fluid'>
        <div className='row'>
          <div className='col-12'>
            <div className='form-group'>
              <label className='form-label fw-bolder fs-6 gray-700' >
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
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
            <Lists lists={currentValue.Label} />
          </div>
        </div>
        <div className='row'>
          <div className='col-12'>
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
            <div className='form-group d-flex flex-wrap justify-content-end align-items-center'>
              <button
                className='btn btn-light-primary font-weight-bold px-9 py-3 mx-6 my-6 btn-sm'
                onClick={onSubmit}
              >
                Save
              </button>

              <button
                type='button'
                className='btn btn-light font-weight-bold px-9 py-3 my-6 btn-sm'
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
            setModalIsOpen(prev => !prev)
          }}
        >
          <AddSvg clsName='svg-icon svg-icon-primary svg-icon-3' /> Add Field
        </button></>}>
        {settings.length > 0 && <Tab lists={lists} />}
      </Layout>
      <Modal show={modalIsOpen} onHide={() => setModalIsOpen(prev => !prev)} size={'lg'} scrollable={true} centered={true} >
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
