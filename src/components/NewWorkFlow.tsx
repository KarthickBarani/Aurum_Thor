import React, { useState } from "react"
import { vendors, departments, locations } from "../components/Interface"
import { LevelElement } from "./LevelElement"
import { v4 as uuidv4 } from 'uuid';
import { useFormik } from "formik";

export const NewWorkFlow = (props: {
    vendors: vendors
    departments: departments
    locations: locations
}) => {

    const [levelElements, setLevelElements] = useState<number[]>([])

    const addLevel = () => {
        let arr = [...levelElements]
        arr.push(uuidv4())
        console.log('Add', arr)
        setLevelElements(arr)
    }
    const initialValues = {
        account: '',
        department: '',
        location: '',
        approver: '',
        amount: 20,
        percentage: 20
    }

    const onSubmit = values => {
        console.log(values)
    }

    const formik = useFormik({
        initialValues,
        onSubmit
    })


    return (
        <form>
            <div className="container-fluid">
                <div className="row">
                    <div className="col-3">
                        <label htmlFor="account" className="form-label">Account</label>
                        <select name="account" id="account" className="form-select form-select-sm">
                            {

                            }
                        </select>
                    </div>
                    <div className="col-3">
                        <label htmlFor="department" className="form-label">Department</label>
                        <select name="department" id="department" className="form-select form-select-sm">
                            {
                                props.departments.map(dept => (
                                    <option key={dept.DepartmentId} value={dept.DepartmentId} >{dept.DepartmentName}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-3">
                        <label htmlFor="location" className="form-label">Location</label>
                        <select name="location" id="location" className="form-select form-select-sm">
                            {
                                props.locations.map(location => (
                                    <option key={location.LocationId} value={location.LocationId} >{location.Location}</option>
                                ))
                            }
                        </select>
                    </div>
                    <div className="col-3  align-self-end">
                        <button onClick={addLevel} className="btn btn-sm btn-light-primary">Add Level</button>
                    </div>
                </div>
                <div className="row justify-content-end my-2">
                </div>

                {
                    levelElements.map((elements, index) => (
                        <LevelElement key={elements} index={index} levelElements={levelElements} setLevelElements={setLevelElements} />
                    )
                    )
                }

            </div>
        </form>
    )
}
