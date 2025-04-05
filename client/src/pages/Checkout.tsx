import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../store/cartSlice";
// icon
import { IoIosAdd } from "react-icons/io";
import { CiTrash } from "react-icons/ci";
import { RiResetLeftFill } from "react-icons/ri";
import { Divider, Inputs } from "../components";
import { MdOutlineProductionQuantityLimits } from "react-icons/md";
import { OrderForm } from "../containers";
import { useState } from "react";


const Checkout = () => {
    const dispatch = useDispatch();
    const { cartItems, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);
    console.log(cartItems.map((item: any) => item.id))

    return (
        <section className='w-full h-full min-h-screen flex md:flex-row flex-col gap-4 p-5'>
            <div className="w-1/2 ml-10 mt-5 border-2 border-dashed border-gray-400 rounded-lg p-2 px-5 flex flex-col min-h-[80vh] max-h-[100vh] ">
                {cartItems.length === 0 ? (
                    <div className="flex flex-col items-center justify-center min-h-[70vh] w-full ">
                        <MdOutlineProductionQuantityLimits className="text-6xl text-gray-400" />
                        <p className="text-gray-500 text-center my-4">The cart is empty</p>
                    </div>
                ) : (
                    <div className="flex flex-col gap-y-4">
                        <ul className="flex flex-col gap-y-4 max-h-[70vh] min-h-[70vh] overflow-y-auto p-2 rounded-lg">
                            <h1 className="text-2xl font-bold text-gray-900 dark:text-gray-200">Your Cart</h1>
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
                                            <div className="flex  gap-4">
                                                <IoIosAdd className="text-2xl cursor-pointer bg-green-200 text-green-600 rounded-lg border border-green-600"
                                                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))} />
                                                <CiTrash className="text-2xl cursor-pointer text-red-500 bg-red-100 rounded-lg border p-1 border-red-600"
                                                    onClick={() => dispatch(removeFromCart(item.id))} />
                                            </div>
                                        </div>
                                    </li>
                                    <Divider />
                                </>
                            ))}
                        </ul>
                        <div className="flex flex-col gap-y-4 mt-5">
                            <div className="flex justify-evenly mt-5">
                                <p className="text-base dark:text-gray-300">Total quantity: {totalQuantity}</p>
                                <h3 className="text-base dark:text-gray-300 mb-2">Total price: {totalPrice} DZD</h3>
                            </div>
                            <button className="w-20 text-gray-900 bg-gray-100 cursor-pointer rounded-lg self-end border p-1 border-gray-600 flex items-center justify-center"
                                onClick={() => dispatch(clearCart())}>
                                Reset
                                <RiResetLeftFill
                                />
                            </button>
                        </div>
                    </div>
                )}
            </div>

            <div className="w-1/2 h-fit  flex flex-col border-2 border-dashed border-gray-400 rounded-lg ml-10 mt-5 gap-4 p-5">
                <h1 className="text-3xl font-bold text-gray-900 dark:text-gray-200">Checkout</h1>

                <OrderForm
                    pro={cartItems}
                    quantity={totalQuantity}
                    total={totalQuantity * totalPrice}
                    handleQuantity={false}
                />

            </div>

        </section>
    )
}

export default Checkout;
