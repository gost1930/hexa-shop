// icons
import { FaStar } from "react-icons/fa6";
import { FaCartShopping } from "react-icons/fa6";
import { FaRegEye } from "react-icons/fa";
// router
import { Link } from "react-router-dom"
// img
import noImage from "../../assets/no-image.png";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "../../store/cartSlice";
import { useEffect } from "react";

interface Props {
    name: string
    price: number
    id: string,
    img: string
}
const Card: React.FC<Props> = ({ name, price, id, img }) => {
    const dispatch = useDispatch();
    const addToCartFunc = () => {
        dispatch(addToCart({
            id
            , name
            , img: `http://localhost:3001/${img}`
            , price
        }))
    }
    const btns = [
        { icon: <FaStar />, path: "/product/1", func: () => { } },
        { icon: <FaCartShopping />, path: "/product/1", func: addToCartFunc },
        { icon: <FaRegEye />, path: `/product/${name?.replace(/ /g, "-") || 1}` },
    ];

    const cartItems = useSelector((state: any) => state.cart?.cartItems || []);
    useEffect(() => {
        console.log("Updated cartItems:", cartItems);
    }, [cartItems]); // سيتم الطباعة كلما تغيرت قيمة cartItems

    


    return (
        <div className="flex flex-col group  min-h-[450px] h-[550px] m-1 overflow-hidden">
            <div className="relative w-full min-h-[80%] h-[80%] bg-gray-100 dark:bg-gray-800 overflow-hidden">
                <img
                    src={img ? `http://localhost:3001/${img}` : noImage}
                    alt={name}
                    className="w-full min-h-full object-cover"
                />
                <div className="absolute left-1 top-1 md:top-auto  md:-bottom-20 md:left-[50%] 
                md:group-hover:bottom-3  md:-translate-x-[50%] duration-300
                flex flex-col md:flex-row items-center gap-y-1 gap-x-4
                ">
                    {
                        btns.map(({ icon, path, func }, index) => (
                            index !== 2 ? (
                                <button onClick={func} key={index} className="grid text-xs palace-content-center rounded-full duration-500 bg-gray-100 p-2 md:p-4 cursor-pointer dark:bg-gray-900 dark:text-gray-100">{icon}</button>
                            ) : <Link to={path} key={index} className="grid text-xs palace-content-center rounded-full duration-500 bg-gray-100 p-2 md:p-4 cursor-pointer dark:bg-gray-900 dark:text-gray-100">{icon}</Link>
                        ))
                    }
                </div>
            </div>

            <div className="flex flex-grow p-4 justify-between min-h-[10%]">
                <h1 className="text-lg md:text-xl font-bold text-gray-900 dark:text-gray-100 text-center">{name}</h1>
                <div className="flex justify-center mt-2 text-yellow-500">
                    {Array(5).fill(null).map((_, index) => (
                        <FaStar key={index} />
                    ))}
                </div>
            </div>
            <h1 className="text-xl text-center text-gray-500 dark:text-gray-300 mt-4">{price} DZD</h1>
        </div>
    );
};


export default Card;