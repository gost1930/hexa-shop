import { useForm } from "react-hook-form";
import { Button, Inputs } from "../../components";
// icons
import { FaRegUser } from "react-icons/fa";
import { MdOutlinePhoneInTalk } from "react-icons/md";
import { errorAlert, successAlert } from "../../utils/toast";
import { Modal } from "../../admin/components";
import { useDisCloser } from "../../hooks";
import { useEffect, useState } from "react";
import { clearCart } from "../../store/cartSlice";
import { useDispatch } from "react-redux";
import { getWilayaList } from "@dzcode-io/leblad";
interface OrderFormProps {
  increment?: any;
  decrement?: any;
  quantity?: number;
  total: any;
  pro: any;
  handleQuantity?: boolean;
}

const OrderForm: React.FC<OrderFormProps> = ({
  increment,
  decrement,
  quantity,
  total,
  pro,
  handleQuantity = true,
}) => {
  const { isOpen, setIsOpen, onClose } = useDisCloser();
  const [isHouse, setIsHouse] = useState<boolean>(true);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm();
  const dispatch = useDispatch();
  const [wilaya, setWilaya] = useState([]);
  const [state, setState] = useState([]);
  const proIds =
    typeof pro?.id === "object" ? pro.map((item: any) => item.id) : [pro?.id];

  const onSubmit = async (data: any) => {
    const order = {
      productId: proIds,
      username: data.username,
      phoneNumber: data.phoneNumber,
      quantity: quantity,
      state: "ain defla",
      city: isHouse ? data.city : "",
      delevryType: isHouse ? "House" : "Office",
      deleveryPrice: 500,
      total: total ? total + total * 0.1 : 0,
    };
    console.log("order :", order);
    try {
      const response = await fetch(import.meta.env.VITE_API_URL + "order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
        body: JSON.stringify(order),
      });
      const result = await response.json();
      if (response.status === 400) {
        return errorAlert(result.message);
      }

      if (response.ok) {
        reset();
        dispatch(clearCart());
        setIsOpen(result.success);
        successAlert(result.message);
        console.log("Order :", result);
      } else {
        setIsOpen(false);
      }
    } catch (error) {
      console.error("Error placing order:", error);
    }
  };

  useEffect(() => {
    const allWilayasDetails = getWilayaList(["name", "mattricule", "dairats"]);
    setWilaya(allWilayasDetails);
    console.log(allWilayasDetails);
  }, []);

  const getDairaByMatricule = (mattricule: number) => {
    const selectedWilaya = wilaya.find((item: any) => item.mattricule === mattricule);
    if (selectedWilaya && selectedWilaya.dairats) {
      setState(selectedWilaya.dairats);
    } else {
      setState([]);
    }
  };
  console.log("state", state);
  const toggleHouse = () => setIsHouse(!isHouse);
  return (
    <>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Inputs
              type="text"
              placeholder="Name"
              icon={<FaRegUser />}
              {...register("username", { required: true })}
            />
            {errors.username && (
              <p className="text-red-500 text-sm">name is required</p>
            )}
          </div>

          <div>
            <Inputs
              type="number"
              placeholder="Phone Number"
              icon={<MdOutlinePhoneInTalk />}
              {...register("phoneNumber", { required: true })}
            />
            {errors.phoneNumber && (
              <p className="text-red-500 text-sm">phone is required</p>
            )}
          </div>
        </div>
        <div className="my-5">
          <Inputs
            type="number"
            placeholder="Phone Number"
            icon={<MdOutlinePhoneInTalk />}
            {...register("phoneNumber", { required: false })}
          />
          {errors.phoneNumber && (
            <p className="text-red-500 text-sm">phone is required</p>
          )}
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputs
            type="checkbox"
            placeholder="House"
            icon={<MdOutlinePhoneInTalk />}
            id="house"
            checked={isHouse}
            onClick={toggleHouse}
            {...register("username", {})}
          />
          <Inputs
            type="checkbox"
            placeholder="Office"
            icon={<MdOutlinePhoneInTalk />}
            id="office"
            checked={!isHouse}
            onClick={toggleHouse}
            {...register("username", {})}
          />
        </div>
        <div className="my-5 grid grid-cols-1 md:grid-cols-2 gap-4">
          <Inputs
            type="select"
            onChange={(e: any) => getDairaByMatricule(e.target.value)}
          >
            <option value="">Select State</option>
            {wilaya.map((item: any) => (
              <option key={item.mattricule} value={item.mattricule}>
                {item.name}
              </option>
            ))}
          </Inputs>
          {isHouse && (
            <Inputs type="select">
              <option value="">Select City</option>
              {state?.map((item: any) => (
                <option key={item.mattricule} value={item.mattricule}>
                  {item.name}
                </option>
              ))}
            </Inputs>
          )}
        </div>

        <div className="grid grid-cols-2">
          {handleQuantity && (
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
          )}
          <div>
            <h1 className="text-gray-800 dark:text-gray-200">
              product price: {total}
            </h1>
            <h1 className="text-gray-800 dark:text-gray-200">
              delevery price: {total}
            </h1>
            <h1 className="text-gray-800 dark:text-gray-200">
              Total price: {(total ?? 0) * 5}
            </h1>
          </div>
        </div>

        <Button
          title="Order Now"
          className="hover:text-white hover:bg-black/95 duration-300 dark:bg-gray-100 dark:text-gray-900 dark:hover:bg-gray-900 w-full rounded-full my-5"
        />
      </form>
      {isOpen && (
        <Modal
          isOpen={isOpen}
          onClose={onClose}
          insideClick={true}
          btnClose={true}
        >
          <div className="w-[33rem] md:min-w-[30rem] flex flex-col justify-center items-center p-5 pb-10 gap-4">
            <h1 className="text-2xl font-semibold text-gray-600 dark:text-gray-200 text-center">
              Order Success 🥰🎉
            </h1>
            <p className="dark:text-gray-300 text-gray-700 text-base">
              please rate this product if you like it or want to give feedback
              😉
            </p>
            <p className="dark:text-gray-300 text-gray-700 text-base italic">
              if you have any questions, please{" "}
              <a href="" className="underline">
                contact us
              </a>
            </p>
          </div>
        </Modal>
      )}
    </>
  );
};

export default OrderForm;
