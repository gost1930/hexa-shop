import { Card } from "../components";
import { useState, useEffect } from "react";
import useFetch from "../hooks/useFetch";
import { Spiner, ErrorPage, NoDataPage } from "../containers";
// icon
import { IoIosSearch } from "react-icons/io";
import { useLocation } from "react-router-dom";

interface Product {
  id: string;
  name: string;
  price: number;
  img: string;
}

const CategoryPro = () => {
  const { pathname } = useLocation();
  const path = pathname.toLowerCase().split("/")[2];
  console.log(path);
  const [pro, setPro] = useState<Product[]>([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const pageSize = 20;
  const [proName, setProName] = useState("");
  const searchProduct = (e: any) => {
    setProName(e.target.value);
  };
  console.log(proName);
  const url = `product/getByCategoryName/${path}?page=${currentPage}&limit=${pageSize}${
    proName ? `&name=${proName}` : ""
  }`;
  const { data, loading, error } = useFetch(url, "GET");

  useEffect(() => {
    if (data) {
      setPro(data.products);
      setTotalPages(data.totalPages);
    }
  }, [data, proName]);
  console.log("pro :", pro);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <main className="container md:mx-auto w-full md:min-h-screen">
      <div className="flex flex-col items-center justify-center w-full h-fit gap-y-1 my-10">
        <h1 className="text-black/95 dark:text-gray-100 text-4xl font-bold">
          Our Latest Products
        </h1>
        <p className="italic text-base text-gray-400">
          Check out all of our products.
        </p>
        <div className="relative w-96 h-fit my-5">
          <input
            type="text"
            name=""
            id=""
            className="w-full h-10 px-10 border border-gray-400 outline-none focus:outline-none text-base rounded-full dark:bg-gray-800 dark:placeholder:text-gray-200 dark:text-gray-100"
            placeholder="Search for products"
            onChange={searchProduct}
          />
          <div className="absolute top-0 left-3 h-full flex items-center justify-center border-r border-gray-400 pr-1 dark:text-gray-100">
            <IoIosSearch />
          </div>
        </div>
      </div>

      {loading ? (
        <Spiner />
      ) : error || pro?.length === 0 ? (
        <NoDataPage />
      ) : (
        <section className="px-5 md:px-20 grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-5">
          {pro?.map((p, index) => (
            <Card
              key={index}
              id={p.id}
              name={p.name}
              price={p.price}
              img={JSON.parse(p.img)?.[0]}
            />
          ))}
        </section>
      )}
      {/* Pagination Controls */}

      <div className="flex items-center justify-center gap-x-2 w-full h-fit my-5">
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-5 py-2 w-10 grid place-content-center text-lg border cursor-pointer hover:text-white hover:bg-black duration-300 active:scale-95 ${
            currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &#10094;
        </div>

        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-5 py-2 w-10 grid place-content-center text-lg border cursor-pointer hover:text-white hover:bg-black duration-300 active:scale-95 ${
              currentPage === index + 1 ? "bg-black text-white" : ""
            }`}
          >
            {index + 1}
          </div>
        ))}

        <div
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-5 py-2 w-10 grid place-content-center text-lg border cursor-pointer hover:text-white hover:bg-black duration-300 active:scale-95 ${
            currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""
          }`}
        >
          &#10095;
        </div>
      </div>
    </main>
  );
};

export default CategoryPro;
