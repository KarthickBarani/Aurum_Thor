import { toast, ToastOptions, ToastType } from "react-hot-toast";

const toastOption: ToastOptions = {
    position: 'bottom-center',
    duration: 3000
}

export function toastAlert(type: ToastType, message: string, option?: ToastOptions) {
    const currentOption = option ? option : toastOption
    return toast[type](message, currentOption)
}
