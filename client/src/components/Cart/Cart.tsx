import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../../store/cartSlice";
// icon
import { IoIosAdd } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { RiResetLeftFill } from "react-icons/ri";
import Divider from "../Ui/Divider";
import { Link } from "react-router-dom";


const CartComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);

  return (
    <div className="p-5 absolute top-[85px] right-0 w-80 bg-white dark:bg-gray-900 shadow-md z-10 flex flex-col" >
      <h2 className="text-2xl font-bold mb-3 dark:text-gray-200">Cart</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500 text-center my-4">The cart is empty</p>
      ) : (
        <>
          <ul>
            {cartItems.map((item) => (
              <>
                <li key={item.id} className="flex justify-between items-center py-2">
                  <div className="flex items-center gap-x-2">
                    <img src={item.img} alt="" className="w-20 h-20 rounded-md" />
                    <div>
                      <h3 className="text-lg font-semibold dark:text-gray-200">{item.name}</h3>
                      <p className="text-gray-600 dark:text-gray-300">Price: {item.price} DZD</p>
                      <p className="text-gray-600 dark:text-gray-300">Quantity: {item.quantity}</p>
                      <p className="text-gray-600 dark:text-gray-300">Total: {item.totalPrice} DZD</p>
                    </div>
                  </div>
                  <div>
                    <div className="flex flex-col gap-4">
                      <IoIosAdd className="text-2xl cursor-pointer bg-green-200 text-green-600 rounded-full border border-green-600"
                        onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} />
                      <CiTrash className="text-2xl cursor-pointer text-red-500 bg-red-100 rounded-full border p-1 border-red-600"
                        onClick={() => dispatch(removeFromCart(item.id))} />
                    </div>
                  </div>
                </li>
                <Divider />
              </>
            ))}
          </ul>
          <p className="text-base dark:text-gray-300">Total quantity: {totalQuantity}</p>
          <h3 className="text-base dark:text-gray-300 mb-2">Total price: {totalPrice} DZD</h3>
          <div className="flex w-full">
            <button className="w-1/2 text-gray-900 bg-gray-100 cursor-pointer rounded-l-full border p-1 border-gray-600 flex items-center justify-center"
              onClick={() => dispatch(clearCart())}>
              Reset
              <RiResetLeftFill
              />
            </button>
            <Link to="/checkout" className="w-1/2 text-gray-900 bg-gray-100 cursor-pointer rounded-r-full border p-1 border-gray-600 flex items-center justify-center">
              Order Now
            </Link>
          </div>
        </>
      )}
    </div>
  );
};

export default CartComponent;
;
