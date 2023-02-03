import { Children, ReactElement } from "react"

type layoutProps = {
    pageName: string
    children: any
    buttons?: ReactElement
}

export const Layout = ({ pageName, children, buttons }: layoutProps) => {
    return (
        <div className='container-fluid'>
            <div className='row my-10'>
                <div className='col'>
                    <h4 className='text-white'>{pageName}</h4>
                </div>
            </div>

            <div className='row'>
                <div className='col'>
                    <div
                        className='card card-flush shadow-sm'
                        style={{ height: '75vh' }}
                    >
                        <div className='card-header bg-white'>
                            <h3 className='card-title'>
                                {pageName}
                            </h3>
                            <div className="toolbar">
                                {buttons}
                            </div>

                        </div>

                        <div className='card-body overflow-hidden'>
                            {children}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}