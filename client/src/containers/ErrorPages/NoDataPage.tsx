import { Link } from "react-router-dom";
import img from "../../assets/no-data.png";
import { LuRows2 } from "react-icons/lu";
const NoDataPage = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center">
        <img src={img} alt="" className="w-52 h-52" />
        <p className="text-zinc-500 dark:text-gray-200 italic">No Data <Link to="/" className="text-black/95 dark:text-gray-200 underline">Go Home <LuRows2/></Link></p>
    </section>
  )
}

export default NoDataPage;
