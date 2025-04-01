import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { RootState } from "../../store/store";
import { removeFromCart, updateQuantity, clearCart } from "../../store/cartSlice";

const CartComponent: React.FC = () => {
  const dispatch = useDispatch();
  const { cartItems, totalQuantity, totalPrice } = useSelector((state: RootState) => state.cart);

    
  return (
    <div className="p-5">
      <h2 className="text-2xl font-bold mb-3">🛒 عربة التسوق</h2>

      {cartItems.length === 0 ? (
        <p className="text-gray-500">العربة فارغة.</p>
      ) : (
        <>
        {totalQuantity}
          <ul>
            {cartItems.map((item) => (
              <li key={item.id} className="flex justify-between items-center border-b py-2">
                <div>
                  <h3 className="text-lg font-semibold">{item.name}</h3>
                  <p className="text-gray-600">السعر: {item.price} دج</p>
                  <p className="text-gray-600">الكمية: {item.quantity}</p>
                  <p className="text-gray-600">الإجمالي: {item.totalPrice} دج</p>
                </div>
                <div>
                  <button
                    className="bg-blue-500 text-white px-2 py-1 rounded"
                    onClick={() => dispatch(updateQuantity({ id: item.id, quantity: item.quantity + 1 }))}
                  >
                    ➕
                  </button>
                  <button
                    className="bg-red-500 text-white px-2 py-1 rounded ml-2"
                    onClick={() => dispatch(removeFromCart(item.id))}
                  >
                    ❌
                  </button>
                </div>
              </li>
            ))}
          </ul>

          <h3 className="mt-4 text-xl font-semibold">الإجمالي الكلي: {totalPrice} دج</h3>
          <button className="mt-3 bg-gray-700 text-white px-3 py-2 rounded" onClick={() => dispatch(clearCart())}>
            🗑️ مسح العربة
          </button>
        </>
      )}
    </div>
  );
};

export default CartComponent;
