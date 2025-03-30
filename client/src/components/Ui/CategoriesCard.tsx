// img import
// ui comp
import Button from "./Button";

const CategoriesCard = ({ name , img }: { name: string , img: string }) => {
    return (
        <div className="grid place-content-center bg-cover bg-no-repeat group relative"
            style={{ backgroundImage: `url(${img})` }}
        >

            <div className="flex flex-col items-center">
                <h1 className="text-white text-3xl font-bold">{name}</h1>
                <h1 className="text-white text-lg italic">Best Clothis for Women</h1>
            </div>

            <div className="group-hover:flex hidden 
            absolute translate-x-5 translate-y-5 w-[90%] h-[90%] flex-col items-center 
            justify-center bg-[#2a2a2a]/90 duration-300 gap-y-6">
                <h1 className="text-white text-3xl font-bold">Women</h1>
                <p className="text-center text-white">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Sit, quas.</p>
                <Button title="Discover More" />
            </div>

        </div>
    )
}

export default CategoriesCard;
