export const EditSvg = (props: {
    clsName: string
    function?: Function
}) => {
    return (
        <span role='button' onClick={() => props.function ? props.function() : null}
            className={props.clsName}>
            <svg xmlns="http://www.w3.org/2000/svg"
                width="24" height="24" viewBox="0 0 24 24" fill="none">
                <path opacity="0.3"
                    d="M21.4 8.35303L19.241 10.511L13.485 4.755L15.643 2.59595C16.0248 2.21423 16.5426 1.99988 17.0825 1.99988C17.6224 1.99988 18.1402 2.21423 18.522 2.59595L21.4 5.474C21.7817 5.85581 21.9962 6.37355 21.9962 6.91345C21.9962 7.45335 21.7817 7.97122 21.4 8.35303ZM3.68699 21.932L9.88699 19.865L4.13099 14.109L2.06399 20.309C1.98815 20.5354 1.97703 20.7787 2.03189 21.0111C2.08674 21.2436 2.2054 21.4561 2.37449 21.6248C2.54359 21.7934 2.75641 21.9115 2.989 21.9658C3.22158 22.0201 3.4647 22.0084 3.69099 21.932H3.68699Z"
                    fill="black" />
                <path
                    d="M5.574 21.3L3.692 21.928C3.46591 22.0032 3.22334 22.0141 2.99144 21.9594C2.75954 21.9046 2.54744 21.7864 2.3789 21.6179C2.21036 21.4495 2.09202 21.2375 2.03711 21.0056C1.9822 20.7737 1.99289 20.5312 2.06799 20.3051L2.696 18.422L5.574 21.3ZM4.13499 14.105L9.891 19.861L19.245 10.507L13.489 4.75098L4.13499 14.105Z"
                    fill="black" />
            </svg>
        </span>
    )
}

export const RemoveSvg = (props: {
    function?: Function
    clsName: string
}) => {
    return (
        <span role='button' className={props.clsName} onClick={() => props.function ? props.function() : null}>
            <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none">
                <path
                    d="M5 9C5 8.44772 5.44772 8 6 8H18C18.5523 8 19 8.44772 19 9V18C19 19.6569 17.6569 21 16 21H8C6.34315 21 5 19.6569 5 18V9Z"
                    fill="black" />
                <path opacity="0.5"
                    d="M5 5C5 4.44772 5.44772 4 6 4H18C18.5523 4 19 4.44772 19 5V5C19 5.55228 18.5523 6 18 6H6C5.44772 6 5 5.55228 5 5V5Z"
                    fill="black" />
                <path opacity="0.5"
                    d="M9 4C9 3.44772 9.44772 3 10 3H14C14.5523 3 15 3.44772 15 4V4H9V4Z"
                    fill="black" />
            </svg>
        </span>
    )
}

export const CopySvg = (props: {
    function?: Function
    clsName: string
}) => {
    return (
        <span className={props.clsName} onClick={() => props.function ? props.function() : null}><svg
            xmlns="http://www.w3.org/2000/svg" width="24" height="24"
            viewBox="0 0 24 24" fill="none">
            <rect opacity="0.5" x="7" y="2" width="14" height="16" rx="3"
                fill="black" />
            <rect x="3" y="6" width="14" height="16" rx="3" fill="black" />
        </svg></span>
    )
}
export const RecallSvg = (props: {
    function?: Function
    clsName: string
}) => {
    return (
        <span className={props.clsName} onClick={() => props.function ? props.function() : null}>
            <svg xmlns="http://www.w3.org/2000/svg" width="23" height="24" viewBox="0 0 23 24" fill="none">
                <path d="M21 13V13.5C21 16 19 18 16.5 18H5.6V16H16.5C17.9 16 19 14.9 19 13.5V13C19 12.4 19.4 12 20 12C20.6 12 21 12.4 21 13ZM18.4 6H7.5C5 6 3 8 3 10.5V11C3 11.6 3.4 12 4 12C4.6 12 5 11.6 5 11V10.5C5 9.1 6.1 8 7.5 8H18.4V6Z" fill="black" />
                <path opacity="0.3" d="M21.7 6.29999C22.1 6.69999 22.1 7.30001 21.7 7.70001L18.4 11V3L21.7 6.29999ZM2.3 16.3C1.9 16.7 1.9 17.3 2.3 17.7L5.6 21V13L2.3 16.3Z" fill="black" />
            </svg>
        </span>
    )
}
export const AddSvg = (props: {
    function?: Function
    clsName: string
}) => {
    return (
        <span className={props.clsName} onClick={() => props.function ? props.function() : null}>
            <svg
                xmlns="http://www.w3.org/2000/svg" width="24" height="24"
                viewBox="0 0 24 24" fill="none">
                <path opacity="0.3"
                    d="M3 13V11C3 10.4 3.4 10 4 10H20C20.6 10 21 10.4 21 11V13C21 13.6 20.6 14 20 14H4C3.4 14 3 13.6 3 13Z"
                    fill="black" />
                <path
                    d="M13 21H11C10.4 21 10 20.6 10 20V4C10 3.4 10.4 3 11 3H13C13.6 3 14 3.4 14 4V20C14 20.6 13.6 21 13 21Z"
                    fill="black" />
            </svg>
        </span>
    )
}

export const SaveSvg = (props: {
    function?: Function
    clsName: string
}) => {
    return (
        <span className={props.clsName} onClick={() => props.function ? props.function() : null}>
            <svg xmlns="http://www.w3.org/2000/svg"
                xmlnsXlink="http://www.w3.org/1999/xlink" width="24px" height="24px"
                viewBox="0 0 24 24" version="1.1">
                <g stroke="none" strokeWidth="1" fill="none" fillRule="evenodd">
                    <polygon points="0 0 24 0 24 24 0 24" />
                    <path
                        d="M17,4 L6,4 C4.79111111,4 4,4.7 4,6 L4,18 C4,19.3 4.79111111,20 6,20 L18,20 C19.2,20 20,19.3 20,18 L20,7.20710678 C20,7.07449854 19.9473216,6.94732158 19.8535534,6.85355339 L17,4 Z M17,11 L7,11 L7,4 L17,4 L17,11 Z"
                        fill="#000000" fillRule="nonzero" />
                    <rect fill="#000000" opacity="0.3" x="12" y="4" width="3" height="5" rx="0.5" />
                </g>
            </svg>
        </span>
    )
}