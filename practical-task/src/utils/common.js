import { toast } from "react-toastify";

const TOAST_SUCCESS = (message) => {
    return toast.success(message);
};

const TOAST_INFO = (message) => {
    return toast.info(message);
};

const TOAST_ERROR = (message) => {
    return toast.error(message);
};

const TOAST_WARNING = (message) => {
    return toast.warning(message);
};

export {
    TOAST_SUCCESS,
    TOAST_INFO,
    TOAST_ERROR,
    TOAST_WARNING
};

