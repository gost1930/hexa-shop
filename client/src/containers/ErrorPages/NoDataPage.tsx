import { Link } from "react-router-dom";
import img from "../../assets/no-data.png";
const NoDataPage = () => {
  return (
    <section className="h-full flex flex-col items-center justify-center">
      <img src={img} alt="" className="w-52 h-52" />
      <p className="text-zinc-500 dark:text-gray-200 italic flex">
        No Data{" "}
        <div
          onClick={() => window.location.reload()}
          className="text-black/95 dark:text-gray-200 underline cursor-pointer mx-1"
        >
          Refresh
        </div>
        or
        <Link
          to="/"
          className="text-black/95 dark:text-gray-200 underline  mx-1"
        >
          Go Home
        </Link>
      </p>
    </section>
  );
};

export default NoDataPage;
