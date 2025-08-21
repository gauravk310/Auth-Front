// utils/error.jsx
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Error Toast Function
export const SuccessToast = (message) => {
  toast.success(message, {
    position: "top-right",
    autoClose: 3000, // 3 seconds
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    theme: "colored",
  });
};
