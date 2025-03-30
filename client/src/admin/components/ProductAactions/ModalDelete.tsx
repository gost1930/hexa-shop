import React from "react";
import { Modal } from "..";
import { Button } from "../../../components";


interface Props {
    isOpen: boolean;
    onClose: () => void;
    id: string | number | null;
    category: string;
    isSuccess: boolean;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const ModalDelete: React.FC<Props> = ({ isOpen, onClose, id, category, isSuccess, setIsSuccess }) => {


    const onDelete = async () => {
        const deltePro = await fetch(`http://localhost:3001/api/v1/${category}/${id}`, {
            method: "DELETE",
            credentials: "include",
        })
        const result = await deltePro.json();
        console.log(result);
        // window.location.reload();
        setIsSuccess(!isSuccess);
        onClose();
    }


    return (
        <Modal
            isOpen={isOpen}
            onClose={onClose}
            insideClick={false}
            btnClose={false}
        >
            <div className="p-5">
                <h1 className="text-2xl font-semibold">Would you like to permanently delete this {category}!</h1>
                <div className="flex justify-center gap-4 mt-20">
                    <Button title="Yes" className="bg-red-100 hover:bg-red-200 px-20 rounded-full border-red-400 border text-red-500" onClick={onDelete} />
                    <Button title="Cancel" className="bg-gray-200 hover:bg-gray-600 border-gray-500 rounded-full text-black/95 hover:text-white" onClick={onClose} />
                </div>
            </div>
        </Modal>
    )
}

export default ModalDelete;