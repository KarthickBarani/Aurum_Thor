import React, { useState } from "react"
import { vendors, departments, locations, userProfileType } from "../components/Interface"
import { LevelElement } from "./LevelElement"
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from "formik";

export const NewWorkFlow = (props: {
    vendors?: vendors
    departments?: departments
    locations?: locations
    users?: userProfileType
    setWorkFlows?: Function
    formik?: any
}) => {

    const [levelElements, setLevelElements] = useState<number[]>([uuidv4()])


    const addLevel = () => {
        let arr = [...levelElements]
        arr.push(uuidv4())
        console.log('Add', arr)
        setLevelElements(arr)
    }


    return (
        <div className="container-fluid">
            <div className="row">
                <div className="col-3">
                    <label htmlFor="account" className="form-label">Account</label>
                    <select name="account" value={props.formik.values.account} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} id="account" className="form-select form-select-sm">
                        <option key={0} value={0} ></option>
                        {

                        }
                    </select>
                </div>
                <div className="col-3">
                    <label htmlFor="department" className="form-label">Department</label>
                    <select name="department" value={props.formik.values.department} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} id="department" className="form-select form-select-sm">
                        <option key={0} value={0} ></option>
                        {
                            props.departments?.map(dept => (
                                <option key={dept.DepartmentId} value={dept.DepartmentId} >{dept.DepartmentName}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-3">
                    <label htmlFor="location" className="form-label">Location</label>
                    <select name="location" value={props.formik.values.location} onChange={props.formik.handleChange} onBlur={props.formik.handleBlur} id="location" className="form-select form-select-sm">
                        <option key={0} value={0} ></option>
                        {
                            props.locations?.map(location => (
                                <option key={location.LocationId} value={location.LocationId} >{location.Location}</option>
                            ))
                        }
                    </select>
                </div>
                <div className="col-3 align-self-end">

                    <button onClick={addLevel} title="Add Level" className="btn btn-light-primary btn-sm m-1 btn-hover-rise">
                        <span className="svg-icon svg-icon-3 svg-icon-primary">
                            <svg
                                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                                viewBox="0 0 24 24" fill="none">
                                <path opacity="0.3"
                                    d="M3 13V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14H4C3.4 14 3 13.6 3 13Z"
                                    fill="black" />
                                <path
                                    d="M13 21H11C10.4 21 10 20.6 10 20V4C10 3.4 10.4 3 11 3H13C13.6 3 14 3.4 14 4V20C14 20.6 13.6 21 13 21Z"
                                    fill="black" />
                            </svg> Add Level
                        </span>
                    </button>
                </div>
                <div className="separator separator-content border-5 border-gray my-5"><span className="min-w-50px text-gray-800 fw-bolder">Level</span></div>
            </div>
            <div className="row justify-content-end my-2">
            </div>
            {
                levelElements.map((elements, index) => (
                    <LevelElement key={elements} index={index} levelElements={levelElements} setLevelElements={setLevelElements} formik={props.formik} users={props?.users} />
                )
                )
            }

        </div>
    )
}
