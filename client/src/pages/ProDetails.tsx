import { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useForm } from "react-hook-form";
import { motion } from "framer-motion";
// icons
import { FaRegStar, FaStar } from "react-icons/fa6";
import { FaQuoteLeft } from "react-icons/fa";
import { FaRegUser } from "react-icons/fa";
// Ui comp
import { Divider, Button, Inputs, StarRating } from "../components";
// containers
import { Spiner, ErrorPage, OrderForm, Comments } from "../containers";
// custom hooks
import useFetch from "../hooks/useFetch";
import { successAlert } from "../utils/toast";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
  rate?: number;
  desc?: string;
}

const ProDetails = () => {
  const { pathname } = useLocation();
  const proName = pathname.split("/").pop();
  const [pro, setPro] = useState<Product | undefined>();

  const [rating, setRating] = useState(0);
  const {
    data: products,
    loading,
    error,
  } = useFetch(`product/getByProductName/${proName}`, "GET");

  const {
    register: register2,
    handleSubmit: handleSubmit2,
    formState: { errors: errors2 },
    reset: reset2,
  } = useForm();

  useEffect(() => {
    if (products) {
      setPro(products.product);
    }
  }, [products]);

  const title: string | undefined = pro?.name
    ? pro.name
        .split(" ")
        .map(
          (word) => word.charAt(0).toUpperCase() + word.slice(1).toLowerCase()
        )
        .join(" ")
    : undefined;

  const [quantity, setQuantity] = useState(1);
  const [total, setTotal] = useState(pro?.price);

  const increment = () => setQuantity((prev) => prev + 1);
  const decrement = () => setQuantity((prev) => (prev === 1 ? 1 : prev - 1));

  useEffect(() => {
    if (pro?.price) {
      setTotal(quantity * pro.price);
    }
  }, [quantity, pro?.price]);

  const url = "http://localhost:3001/";
  const img = JSON.parse(pro?.img || "[]")[0];
  const img2 = JSON.parse(pro?.img || "[]")[1];

  const addRate = async (data: any) => {
    const rate = {
      productId: pro?.id,
      username: data.username,
      rate: rating,
      review: data.review,
    };
    try {
      const response = await fetch(`http://localhost:3001/api/v1/rate`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(rate),
      });
      const result = await response.json();
      if (response.ok) {
        successAlert("Rate added successfully");
        reset2();
        window.location.reload();
      } else {
        successAlert(result.message);
      }
    } catch (err) {
      console.error("Error adding rate:", err);
    }
  };

  if (loading) return <Spiner />;
  if (error) return <ErrorPage text={error} />;

  return (
    <motion.main
      className="mx-5 md:mx-32 flex flex-col md:flex-row items-center md:items-start gap-3 my-10"
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
    >
      <motion.div
        className="md:w-1/2 flex flex-col gap-y-5"
        initial={{ opacity: 0, x: -50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.2 }}
      >
        <img src={url + img} alt="Product 1" />
        {img2 && <img src={url + img2} alt="Product 2" />}
      </motion.div>

      <motion.div
        className="md:w-1/2"
        initial={{ opacity: 0, x: 50 }}
        animate={{ opacity: 1, x: 0 }}
        transition={{ delay: 0.3 }}
      >
        <div className="flex items-center justify-between">
          <h1 className="text-xl font-bold text-black/95 dark:text-gray-100">
            {title}
          </h1>
          <div className="flex text-black/95 dark:text-gray-200 text-base">
            {Array.from({ length: 5 }).map((_, index) => (
              <span key={index}>
                {index < (pro?.rate || 0) ? (
                  <FaStar className="text-yellow-700" />
                ) : (
                  <FaRegStar className="text-yellow-700" />
                )}
              </span>
            ))}
          </div>
        </div>

        <h1 className="text-lg text-gray-400 dark:text-gray-200 mt-4 mb-5">
          {pro?.price} dzd
        </h1>

        <Divider />
        <h1 className="text-lg text-gray-400 mt-4">{pro?.desc}</h1>
        <Divider className="my-5" />

        {pro?.desc && (
          <>
            <div className="flex items-center gap-2 text-black/95 dark:text-gray-200">
              <FaQuoteLeft className="text-3xl" />
              <h1 className="italic">{pro?.desc}</h1>
            </div>
            <Divider className="my-5" />
          </>
        )}

        <div className="flex items-center justify-between">
          <h1 className="text-gray-400 text-xl">No.Of Orders</h1>
          <div className="flex items-center">
            <button
              onClick={increment}
              type="button"
              className="text-lg border rounded-tl rounded-bl p-2 w-8 cursor-pointer hover:bg-black hover:text-white duration-300 dark:bg-gray-100 dark:text-gray-900"
            >
              +
            </button>
            <p className="text-lg border p-2 w-12 grid place-content-center dark:bg-gray-100">
              {quantity}
            </p>
            <button
              onClick={decrement}
              type="button"
              className="text-lg border rounded-tr rounded-br p-2 w-8 cursor-pointer hover:bg-black hover:text-white duration-300 dark:bg-gray-100 dark:text-gray-900"
            >
              -
            </button>
          </div>
        </div>

        <Divider className="my-5" />
        <div className="flex items-center justify-between">
          <h1 className="text-gray-400 text-xl">Total: {total} DzD</h1>
          <Button
            title="Order Now"
            className="hover:text-white hover:bg-black/95 duration-300 dark:bg-gray-100 dark:text-gray-900"
          />
        </div>

        <Divider className="my-5" />

        <motion.div
          className="w-full h-full border-dashed border-gray-500 border-2 px-5 pb-3 rounded-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
        >
          <div className="w-full flex flex-col items-center justify-center gap-y-1 my-4">
            <h1 className="text-xl font-semibold text-gray-800 dark:text-gray-200">
              Order Now
            </h1>
            <p className="text-gray-600 dark:text-gray-300 italic text-xs">
              please fill the form below
            </p>
          </div>
          <OrderForm
            pro={pro}
            increment={increment}
            decrement={decrement}
            quantity={quantity}
            total={total ?? 0}
          />
        </motion.div>

        <Divider className="my-5" />

        <motion.section
          className="border-dashed border-2 border-gray-500 p-3 rounded-md"
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
        >
          <h1 className="text-gray-400 text-xl mb-5">
            Please Rate This Product😊:
          </h1>
          <form onSubmit={handleSubmit2(addRate)}>
            <div className="flex flex-col gap-y-3">
              <div className="grid grid-cols-2 place-content-center gap-x-10">
                <div>
                  <Inputs
                    type="text"
                    placeholder="Name"
                    icon={<FaRegUser />}
                    {...register2("username", { required: true })}
                  />
                  {errors2.username && (
                    <p className="text-red-500 text-sm">name is required</p>
                  )}
                </div>
                <div className="flex gap-3">
                  <StarRating rating={rating} setRating={setRating} />
                  <p className="text-gray-400 text-sm">
                    Rating: {rating}{" "}
                    {rating == 1
                      ? "😡"
                      : rating == 2
                      ? "😐"
                      : rating == 3
                      ? "🙄"
                      : rating == 4
                      ? "😊"
                      : "🤩"}
                  </p>
                </div>
              </div>
              <div>
                <Inputs
                  type="textarea"
                  placeholder="Write your review"
                  {...register2("review", { required: true })}
                />
                {errors2.review && (
                  <p className="text-red-500 text-sm">review is required</p>
                )}
              </div>
            </div>
            <Button
              title="Submit"
              className="hover:text-white hover:bg-black/95 duration-300 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-900 w-full rounded-full my-5"
            />
          </form>
        </motion.section>

        <Comments id={pro?.id ?? ""} />
      </motion.div>
    </motion.main>
  );
};

export default ProDetails;
