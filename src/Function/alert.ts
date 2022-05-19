
import Swal, { SweetAlertOptions } from "sweetalert2";

export function SweetAlert(option: SweetAlertOptions) {
    return Swal.fire(
        option
    )
}
// export function SweetAlert(title: string | HTMLElement, icon: SweetAlertIcon, timer?: number, showCancelButton?: boolean, confirmButtonColor?: string, cancelButtonColor?: string, confirmButtonText?: string) {
//     return Swal.fire(
//         {
//             title,
//             icon,
//             timer,
//             showCancelButton,
//             confirmButtonColor,
//             cancelButtonColor,
//             confirmButtonText
//         }
//     )
// }