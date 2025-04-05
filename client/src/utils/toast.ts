import { Bounce, toast } from "react-toastify";

const options: any = {
    position: "top-center",
    autoClose: 3000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    theme: "colored",
    transition: Bounce,
};


export const successAlert = (message: string) => {
    toast.success(message, options);
};

export const errorAlert = (message: string) => {
    toast.error(message, options);
};

