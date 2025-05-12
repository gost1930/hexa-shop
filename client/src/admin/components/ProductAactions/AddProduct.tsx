import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { Button, Modal } from "..";
import { Editor, Inputs } from "../../../components";
import { AiOutlineShoppingCart, AiOutlineProduct } from "react-icons/ai";
import { IoPricetagOutline } from "react-icons/io5";
import { FiUpload } from "react-icons/fi";
import useFetch from "../../../hooks/useFetch";
import { errorAlert, successAlert } from "../../../utils/toast";

interface Props {
    isOpen: any;
    onClose: any;
    type: string;
    id?: any;
    isSuccess: boolean;
    setIsSuccess: React.Dispatch<React.SetStateAction<boolean>>
}

const AddProduct: React.FC<Props> = ({ isOpen, onClose, type, id, isSuccess, setIsSuccess }) => {
    const { register, handleSubmit, reset, setValue } = useForm();
    const [img, setImg] = useState<File[]>([]);
    const [imgUrl, setImgUrl] = useState<string[]>([]);

    const [selectCategory, setSelectCategory] = useState('');

    const { data: categoryData, loading: categoryLoading } = useFetch('category', 'GET');
    const { data: productData } = useFetch(type === "update" && id ? `product/${id}` : null, 'GET');

    const product = productData?.product;

    useEffect(() => {
        if (type === "update" && productData) {
            setValue("name", product?.name);
            setValue("oldPrice", product?.oldPrice);
            setValue("price", product?.price);
            setValue("quantity", product?.quantity);
            setValue("desc", product?.desc);
            setSelectCategory(product?.categoryId);

            let images: string[] = [];

            if (product?.img) {
                try {
                    const parsedImages = JSON.parse(product.img);
                    if (Array.isArray(parsedImages)) {
                        images = parsedImages.map((img: string) => `http://localhost:3001/${img}`);
                        setImgUrl(images);
                    }
                } catch (error) {
                    console.error("خطأ في تحليل الصور:", error);
                }
            }

            // setImgUrl("images" , images);
            console.log(images)
        }
    }, [productData, setValue, type]);
    console.log(imgUrl)
    console.log(img)
    const onSubmit = async (data: any) => {
        try {
            const formData = new FormData();
            formData.append("name", data.name);
            formData.append("oldPrice", String(parseFloat(data.oldPrice)));
            formData.append("price", String(parseFloat(data.price)));
            formData.append("quantity", String(data.quantity));
            formData.append("desc", data.desc || "");

            if (selectCategory) {
                formData.append("categoryId", selectCategory);
            } else {
                console.error("Category ID is missing");
                return;
            }

            const userId = localStorage.getItem("userId");
            if (userId) {
                formData.append("userId", userId);
            } else {
                console.error("User ID is missing");
                return;
            }

            if (img.length > 0) {
                img.forEach((file) => formData.append("images", file));
            }

            if (imgUrl.length > 0) {
                imgUrl.forEach((url) => {
                    const fileName = url.split("/").pop();
                    if (fileName) {
                        formData.append("images", new File([], fileName));
                        console.log(new File([], fileName))
                    }
                });
            }

            const url = type === "add"
                ? "http://localhost:3001/api/v1/product"
                : `http://localhost:3001/api/v1/product/${id}`;

            const method = type === "add" ? "POST" : "PUT";

            const response = await fetch(url, {
                method,
                credentials: "include",
                body: formData,
            });

            const result = await response.json();
            if (response.status === 400) {
                return errorAlert(result.message)
            }
            if (response.ok) {
                console.log(`Product ${type === "add" ? "added" : "updated"} successfully:`, result);
                reset();
                setImg([]);
                setImgUrl([]);
                onClose();
                setIsSuccess(!isSuccess);
                successAlert("Product created successfuly")
                window.location.reload();
            } else {
                errorAlert("something wrong!?")
                console.error(`Error ${type === "add" ? "adding" : "updating"} product:`, result);
            }

        } catch (error) {
            console.error("Request failed:", error);
        }
    };

    return (
        <Modal isOpen={isOpen} onClose={onClose} insideClick={false} btnClose={true}>
            <h1 className="text-2xl font-semibold mb-10">
                {type === "add" ? "Add Product" : `Update ${product?.name} Product `}
            </h1>
            <form onSubmit={handleSubmit(onSubmit)} encType="multipart/form-data">
                <div className="w-full max-h-full grid grid-cols-1 md:grid-cols-2 gap-4 max-w-full min-w-[900px]">
                    <div className="flex flex-col gap-4">
                        <Inputs type="text" placeholder="Name" icon={<AiOutlineShoppingCart />}
                            {...register("name", { required: true })}
                        />
                        <Inputs type="number" placeholder="Old Price" icon={<IoPricetagOutline />}
                            {...register("oldPrice", { required: true })}
                        />
                        <Inputs type="number" placeholder="Quantity" icon={<AiOutlineProduct />}
                            {...register("quantity", { required: true })}
                        />
                        <Inputs type="select" placeholder="Category" className="my-2" icon={<AiOutlineShoppingCart />}
                            onChange={(e: any) => setSelectCategory(e.target.value)}
                        >
                            <option value="">Select Category</option>
                            {categoryLoading ? <option>Loading...</option> :
                                categoryData.categories.map((item: any) => (
                                    <option key={item.id} value={item.id}>{item.name}</option>
                                ))
                            }
                        </Inputs>
                        <Inputs type="textarea" placeholder="Description"
                            {...register("desc")}
                        />
                    </div>
                    <div className="flex flex-col gap-4">
                        <Inputs type="text" placeholder="Price" icon={<IoPricetagOutline />}
                            {...register("price", { required: true })}
                        />
                        <Inputs type="file" placeholder="Image" icon={<FiUpload />}
                            onChange={(e: any) => setImg((prev) => img.length < 2 ? [...prev, ...e.target.files] : prev)}
                        />
                        <div className="flex items-center justify-center gap-x-5 gap-y-3">
                            {imgUrl.length > 0 && imgUrl.map((url, index) => (
                                <div key={index} className="relative h-[150px] w-[150px] rounded-md bg-zinc-100 cursor-pointer">
                                    <img src={url} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute -top-4 -right-4 bg-black/50 text-white p-1 w-8 h-8 grid place-content-center rounded-full cursor-pointer"
                                        onClick={() => setImgUrl(imgUrl.filter((item) => item !== url))}>
                                        X
                                    </div>
                                </div>
                            ))}
                            {img.length > 0 && img.map((file, index) => (
                                <div key={index} className="relative h-[150px] w-[150px] rounded-md bg-zinc-100 cursor-pointer">
                                    <img src={URL.createObjectURL(file)} alt="" className="w-full h-full object-cover" />
                                    <div className="absolute -top-4 -right-4 bg-black/50 text-white p-1 w-8 h-8 grid place-content-center rounded-full cursor-pointer"
                                        onClick={() => setImg(img.filter((item) => item.name !== file.name))}>
                                        X
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
                <Editor />
                <Button className="mt-12 border rounded-full w-full justify-center hover:bg-black/90 hover:text-white" title={type === "add" ? "Add Product" : "Update Product"} icon={<AiOutlineShoppingCart />} type="submit" />
            </form>
        </Modal>
    );
};

export default AddProduct;
