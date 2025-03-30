import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "..";
import { Inputs } from "../../../components";
// icons
import { AiOutlineShoppingCart, AiOutlineProduct } from "react-icons/ai";
import { FiUpload } from "react-icons/fi";

interface Props {
    isOpen: boolean;
    onClose: () => void;
    type: string;
    id?: string;
}

const AddCategory: React.FC<Props> = ({ isOpen, onClose, type, id }) => {
    const { register, handleSubmit, formState: { errors } } = useForm();
    const [img, setImg] = useState<File | null>(null);
    const [imgUrl, setImgUrl] = useState<string | null>(null);
    const user = window.localStorage.getItem("userId");
    const [dataFetched, setDataFetched] = useState();

    console.log(imgUrl)
    useEffect(() => {
        if (type === "update" && id) {
            fetch(`http://localhost:3001/api/v1/category/${id}`)
                .then(res => res.json())
                .then(data => {
                    setDataFetched(data)
                    setImgUrl(data.img);
                })
                .catch(err => console.error("Error fetching category:", err));
        }
    }, [id, type]);

    const onSubmit = async (data) => {
        const formData = new FormData();
        formData.append("name", data.name);
        if (type === "add") {
            formData.append("user", String(user));
        }


        if (img) {
            formData.append("image", img);
        }
        if (imgUrl) {
            formData.append("image", imgUrl);
        }
        console.log(formData)
        console.log(img)
        try {
            const response = await fetch(
                `http://localhost:3001/api/v1/category/${type === "add" ? "" : id}`,
                {
                    method: type === "add" ? "POST" : type === "update" ? "PUT" : "",
                    body: formData,
                    headers: {
                        Authorization: `Bearer ${localStorage.getItem("token")}`,
                    },
                }
            );
            const result = await response.json();
            console.log(result);
            // window.location.reload();
        } catch (error) {
            console.error("Error adding category:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} insideClick={false} btnClose={true}>
            <h1 className="text-2xl font-semibold mb-10">
                {type === "add" ? "Add " : "Update "}{dataFetched?.name} Category 
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="w-full max-h-full grid grid-cols-1 gap-4 max-w-full min-w-[900px]">
                    <div className="flex flex-col gap-4">
                        <Inputs
                            type="text"
                            placeholder="Name"
                            defaultValue={dataFetched?.name}
                            icon={<AiOutlineShoppingCart />}
                            {...register("name", { required: "Category name is required" })}
                        />
                        {errors.name && <span className="text-red-500">{errors.name.message}</span>}
                    </div>
                    <div className="flex flex-col gap-4">
                        <Inputs
                            type="file"
                            placeholder="Image"
                            icon={<FiUpload />}
                            onChange={(e) => setImg(e.target.files[0])}
                        />
                        {(img || imgUrl) && (
                            <div className="relative h-[150px] w-[150px] rounded-md bg-zinc-100 cursor-pointer">
                                <img
                                    src={img ? URL.createObjectURL(img) : `http://localhost:3001/${imgUrl}`}
                                    alt="Category"
                                    className="w-full h-full object-cover"
                                />
                                <div
                                    className="absolute -top-4 -right-4 bg-black/50 text-white p-1 w-8 h-8 grid place-content-center rounded-full cursor-pointer"
                                    onClick={() => {
                                        setImg(null);
                                        setImgUrl(null);
                                    }}
                                >
                                    X
                                </div>
                            </div>
                        )}
                    </div>
                </div>
                <Button
                    type="submit"
                    className="mt-12 border rounded-full w-full justify-center hover:bg-black/90 hover:text-white"
                    title={type === "add" ? "Add Category" : "Update Category"}
                    icon={<AiOutlineProduct />}
                />
            </form>
        </Modal>
    );
};

export default AddCategory;
