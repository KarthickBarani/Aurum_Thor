export const Alert = (props: { errors: any }) => {
  return (
    <div className='alert alert-dismissible bg-light-primary d-flex flex-column flex-sm-row p-5 mb-10'>
      <span className='svg-icon svg-icon-2hx svg-icon-primary me-4 mb-5 mb-sm-0'>
        ...
      </span>
      <div className='d-flex flex-column pe-0 pe-sm-10'>
        <h4 className='fw-bold'>This is an alert</h4>
        <span>
          The alert component can be used to highlight certain parts of your
          page for higher content visibility.
        </span>
      </div>
      <button
        type='button'
        className='position-absolute position-sm-relative m-2 m-sm-0 top-0 end-0 btn btn-icon ms-sm-auto'
        data-bs-dismiss='alert'
      >
        <span className='svg-icon svg-icon-1 svg-icon-primary'>...</span>
      </button>
    </div>
  );
};
