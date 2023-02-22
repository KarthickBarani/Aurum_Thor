import { Outlet } from 'react-router-dom';



export const LoginComp = (props: {
  setPermission: Function
}) => {

  return (
    <>
      <div className='container-fluid' style={{ height: '90vh' }}>
        <div className='row justify-content-center h-100 align-items-center'>
          <div className='col col-sm-8 col-lg-5 align-items-center'>
            <div className='card card-flush shadow-sm h-100'>
              <div className='card-body'>
                {
                  <Outlet />
                }
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  )
}
