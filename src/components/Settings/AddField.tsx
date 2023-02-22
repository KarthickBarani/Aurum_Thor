import React, { useState, useRef, useEffect } from 'react';
import { useFormik } from 'formik';
import { List } from './List';

type settingFields = {
  Settings: string;
};

export const AddField = (props: {
  setClicked: Function;
  data: any;
  clicked: boolean;
  page: string;
}) => {
  const [label, setLabel] = useState<any>('');
  const [field, setField] = useState<any>('');
  const [vLabel, setVLabel] = useState<any>('');
  const [vField, setVField] = useState<any>('');
  const [vLabels, setVLabels] = useState<any>([]);
  const formInput = 'form-control form-control-solid mb-1';
  const formSelect = 'form-select form-select-solid';
  const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2';
  const [labels, setLabels] = useState<any>([]);
  let fieldTypes = ['text', 'number', 'currency', 'float'];
  let settings = ['Invoice', 'Line Item', 'Expense Item'];

  useEffect(() => {
    console.log(props?.data);
    setVField(props?.data.Field);
    setVLabels(props?.data.Label);
  }, []);

  const addField = (e) => {
    e.preventDefault();
    console.log([...labels, label])
    setLabels([...labels, label]);
  };

  const addVField = (e) => {
    e.preventDefault();
    setVLabels([...vLabels, vLabel]);
  };
  const closeHandler = () => {
    props.setClicked(false);
  };

  const formik = useFormik({
    initialValues: {
      Settings: '',
    },

    onSubmit: (values) => { },
  });
  return (
    <>
      {props?.data && props.clicked ? (
        <form>
          <div className='container-fluid'>
            <div className='card card-flush card-stretch shadow-sm'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label htmlFor='vendorName' className={formLabel}>
                        Field Name
                      </label>
                      <div className='input-group input-group-solid'>
                        <input
                          className={formInput}
                          id='Field'
                          name='Field'
                          type='text'
                          value={vField}
                          onChange={(e) => setVField(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-8'>
                    <div className='form-group text-start'>
                      <label htmlFor='Label' className={formLabel}>
                        Recognition Fields: (from pdf)
                      </label>
                      <div className='input-group input-group-solid'>
                        <input
                          className={formInput}
                          id='Label'
                          name='Label'
                          type='text'
                          value={vLabel}
                          onChange={(e) => setVLabel(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-4'>
                    <button
                      type='button'
                      className='btn btn-light-primary font-weight-bold my-10'
                      onClick={addVField}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-7'>
                    <div className='h-125px scroll'>
                      <List labels={vLabels} setLabels={setVLabels} />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <label htmlFor='vendorName' className={formLabel}>
                      Field Type
                    </label>
                    <div className='input-group input-group-solid'>
                      <select id='Type' name='Type' className={formSelect}>
                        {fieldTypes.map((field, index) => (
                          <option key={index}>{field}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group d-flex flex-wrap justify-content-end align-items-center'>
                      <button
                        type='submit'
                        className='btn btn-light-primary font-weight-bold px-9 py-3 mx-6 my-6'
                      >
                        Update Field
                      </button>

                      <button
                        type='button'
                        className='btn btn-light-dark font-weight-bold px-9 py-3 my-6'
                        onClick={closeHandler}
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      ) : (
        <form>
          <div className='container-fluid'>
            <div className='card card-flush card-stretch shadow-sm'>
              <div className='card-body'>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group'>
                      <label htmlFor='vendorName' className={formLabel}>
                        Field Name
                      </label>
                      <div className='input-group input-group-solid'>
                        <input
                          className={formInput}
                          id='Field'
                          name='Field'
                          type='text'
                          value={field}
                          onChange={(e) => setField(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>
                </div>

                <div className='row'>
                  <div className='col-8'>
                    <div className='form-group text-start'>
                      <label htmlFor='Label' className={formLabel}>
                        Recognition Fields: (from pdf)
                      </label>
                      <div className='input-group input-group-solid'>
                        <input
                          className={formInput}
                          id='Label'
                          name='Label'
                          type='text'
                          value={label}
                          onChange={(e) => setLabel(e.target.value)}
                        />
                      </div>
                    </div>
                  </div>

                  <div className='col-4'>
                    <button
                      type='button'
                      className='btn btn-light-primary font-weight-bold my-10'
                      onClick={addField}
                    >
                      Add
                    </button>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-7'>
                    <div className='h-125px scroll'>
                      <List labels={labels} setLabels={setLabels} />
                    </div>
                  </div>
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <label htmlFor='vendorName' className={formLabel}>
                      Field Type
                    </label>
                    <div className='input-group input-group-solid'>
                      <select id='Type' name='Type' className={formSelect}>
                        {fieldTypes.map((field, index) => (
                          <option key={index}>{field}</option>
                        ))}
                      </select>
                    </div>
                  </div>
                  {/* <div className='col-6'>
                    <label htmlFor='Settings' className={formLabel}>
                      Settings
                    </label>
                    <div className='input-group input-group-solid'>
                      <select
                        id='Settings'
                        name='Settings'
                        className={formSelect}
                      >
                        {settings.map((setting, index) => (
                          <option key={index}>{setting}</option>
                        ))}
                      </select>
                    </div>
                  </div> */}
                </div>
                <div className='row'>
                  <div className='col-12'>
                    <div className='form-group d-flex flex-wrap justify-content-end align-items-center'>
                      <button
                        type='submit'
                        className='btn btn-light-primary font-weight-bold px-9 py-3 mx-6 my-6'
                      >
                        Add Field
                      </button>

                      <button
                        type='button'
                        className='btn btn-light-dark font-weight-bold px-9 py-3 my-6'
                        data-bs-dismiss='modal'
                      >
                        Close
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </form>
      )}
    </>
  );
};
