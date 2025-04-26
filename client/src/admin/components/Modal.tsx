import React from "react";
import { IoMdClose } from "react-icons/io";
import clsx from "clsx";
import { useTheme } from "../../context/ThemeProvider";

interface ModalProps {
    isOpen: boolean;
    onClose: () => void;
    insideClick?: boolean;
    btnClose?: boolean;
    children: React.ReactNode;
}

const Modal: React.FC<ModalProps> = ({ isOpen, onClose, insideClick, children, btnClose }) => {
    if (!isOpen) return null;

    const { isDarkMode } = useTheme();

    const handleBackdropClick = (e: React.MouseEvent) => {
        if (insideClick && e.target === e.currentTarget) {
            onClose();
        }
    };

    return (
        <div
            className="fixed top-0 left-0 bg-gray-500/50 grid place-items-center w-full h-screen z-50"
            onClick={handleBackdropClick}
        >
            <div
                className={clsx(
                    "pt-10 px-4 pb-3 w-fit md:max-w-[80%] rounded relative shadow-md transition-colors duration-300",
                    isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
                )}
            >
                {btnClose && (
                    <button
                        onClick={onClose}
                        className={clsx(
                            "absolute w-fit -top-4 -right-4 cursor-pointer aspect-square px-3 rounded-full duration-200",
                            isDarkMode
                                ? "bg-gray-700 text-white hover:bg-gray-600"
                                : "bg-white text-black hover:bg-black hover:text-white"
                        )}
                    >
                        <IoMdClose />
                    </button>
                )}
                {children}
            </div>
        </div>
    );
};

export default Modal;
