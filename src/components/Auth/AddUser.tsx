import React from 'react';

export const AddUser = () => {

     const formInput = 'form-control form-control-solid mt-1'
    const formSelect = 'form-select form-select-solid'
    const formLabel = 'form-label fw-bolder fs-6 gray-700 mt-2'
    let roles = ["Finance Team", "Admin"];
    return (
        <>
             <div className="d-flex flex-column-fluid mx-20 mt-30 mt-lg-0">
                                     <div className="login-form login-signin" style={{width:"100%", maxWidth:"400px"}}>
                                        
                                        <div className="container-fluid">
                <div className="row">
                    <div className="col-12">
                        <div className="form-group text-start">
                            <label htmlFor="FirstName" className={formLabel}>FirstName</label>
                            <input className={formInput} id="FirstName" name="FirstName" type="text"></input>
                        </div>
                    </div>
                    <div className="col-12">
                            <div className="form-group text-start">
                            <label htmlFor="LastName" className={formLabel}>LastName</label>
                            <input className={formInput} id="LastName" name="LastName" type="text"></input>
                        </div>
                            </div>
                        <div className="col-12">
                            <div className="form-group text-start">
                            <label htmlFor="Email" className={formLabel}>Email</label>
                            <input className={formInput} id="Email" name="Email" type="text"></input>
                          </div>
                            </div>
                        <div className="col-12">
                        <div className="form-group text-start">
                            <label htmlFor="role" className={formLabel}>Role</label>
                            <select id="role" name="role" className={formSelect}   >
                                {roles.map((role,index) => (
                                    <option key={index}>{ role }</option>
                                ))}
                            </select>
                        </div>
                    </div>
                           
                           
                    <div className="col-12">
                       <div className="form-group d-flex flex-wrap justify-content-between align-items-center">
							
                                    <button type="button" className="btn btn-primary font-weight-bold px-9 py-4 my-7">Add User</button>
                                    <button type="button"  className="btn btn-secondary font-weight-bold px-9 py-4 my-7">Close</button>
                        </div>
                        <div>
                            
                        </div>
                        
                    </div>
                    
                </div>
        </div>
        </div>
    </div>
        </>
    )
}