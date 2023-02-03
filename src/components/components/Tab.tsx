import { useState } from "react"

export type ListProps = {
    id: number,
    header: string | HTMLElement,
    tabContent: Function,
    clickEvent?: Function
}


export const Tab = ({ lists }: { lists: ListProps[] }) => {

    const [active, setActive] = useState<number>(1)

    const TabLists = ({ children }) => {
        return (
            <ul className="nav nav-tabs nav-line-tabs nav-line-tabs-2x mb-5 fs-6">
                {children}
            </ul>
        )
    }
    const TabList = ({ tabName, activeKey, clickEvent }) => {
        return (
            <li className="nav-item">
                <span
                    role={'button'}
                    className={`nav-link ${active === activeKey ? 'active' : ''}`}
                    onClick={() => {
                        setActive(activeKey)
                        clickEvent(activeKey)
                    }}
                >
                    {tabName}
                </span>
            </li>
        )
    }
    const TabContents = ({ children }) => {
        return (
            <div className="tab-content h-100 p-3 overflow-scroll" >
                {children}
            </div>
        )
    }
    const TabPanel = ({ children, activeKey }) => {
        return (
            <div
                className={`tab-pane ${active === activeKey ? 'fade active show' : ''}`}
                role="tabpanel"
            >
                {children}

            </div>
        )
    }

    return (
        <>
            <TabLists>
                {
                    lists.map(list => (<TabList key={list.id} activeKey={list.id} clickEvent={list.clickEvent} tabName={list.header} />))
                }
            </TabLists>
            <TabContents>
                {
                    lists.map((list) => (<TabPanel key={list.id} activeKey={list.id} >{list.tabContent(list)}</TabPanel>))
                }
            </TabContents>
        </>

    )
}