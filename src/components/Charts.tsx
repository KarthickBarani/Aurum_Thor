import React from 'react'
// import { Chart } from 'react'

export const Charts = () => {
    const data = {
        labels: ['Jun', 'Jul', 'Aug'],
        dataSets: [
            {
                id: 1,
                label: '',
                data: [5, 6, 7],
            },
            {
                id: 2,
                label: '',
                data: [3, 2, 1],
            },
        ],
    }



    return (
        <div
            className='w-100'
            style={{
                height: '200px'
            }}
        >
            {/* <Chart data={data} axes={axes} /> */}
        </div>
    )
}
