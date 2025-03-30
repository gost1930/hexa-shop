import { set } from "react-hook-form";
import { Table } from "../../components";
import useFetch from "../../hooks/useFetch";
import { AddProduct, ModalDelete } from "../components";
import { useEffect, useState } from "react";
import { Spiner } from "../../containers";

const columns = [
  { key: "img", label: "  Image", isImage: true },
  { key: "name", label: "Name" },
  { key: "categoryName", label: "Category" },
  { key: "oldPrice", label: "Old Price" },
  { key: "price", label: "Price" },
  { key: "quantity", label: "Quantity" },
  { key: "rate", label: "rate" },
  { key: "createdAt", label: "Created At" },
];


const AdminProducts = () => {
  const [pro, setPro] = useState<Product[]>([]);
  const [rowId, setRowId] = useState<string | number | null>(null);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [isSuccess, setIsSuccess] = useState(false);
  const pageSize = 20;


  const openAddProduct = () => setIsOpenAdd(true);

  const onDelete = (id: number | string) => {
    setRowId(id);
    setIsOpenDelete(true);
  };

  const onClose = () => {
    setIsOpenAdd(false);
    setIsOpenDelete(false);
    setIsOpenUpdate(false);
  };

  const onEdit = (id: string | number) => {
    setRowId(id);
    setIsOpenUpdate(true);
  };

  const { data: rowData, loading } = useFetch(`product?page=${currentPage}&limit=${pageSize}`, 'GET')
  useEffect(() => {
    if (rowData) {
      const formatedData = rowData?.products.map((product: any) => ({
        ...product,
        img: JSON.parse(product.img)?.[0],
        categoryName: product.category.name,
        createdAt: new Date(product.createdAt).toLocaleDateString()
      }))
      setPro(formatedData);
      setTotalPages(rowData.pagination.totalPages);
    }
  }, [rowData]);

  const handlePageChange = (page: number) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };
  console.log("success", isSuccess);

  if (loading) return <Spiner />
  return (
    <main className='min-h-screen'>
      <Table
        addBtnFunc={openAddProduct}
        deleteBtnFunc={() => rowId !== null && onDelete(rowId)}
        title="Products List"
        columns={columns}
        data={pro}
        actions={true}
        rowId={rowId}
        getRowId={(id: string | number) => setRowId(id)}
        onEdit={onEdit}
        onDelete={onDelete}
        path="/product"
      />
      {
        isOpenAdd && <AddProduct onClose={onClose} isOpen={isOpenAdd} type="add" setIsSuccess={setIsSuccess} isSuccess={isSuccess} />
      }
      {
        isOpenUpdate && <AddProduct onClose={onClose} isOpen={isOpenUpdate} type="update" id={rowId} setIsSuccess={setIsSuccess} isSuccess={isSuccess} />
      }
      {
        isOpenDelete && <ModalDelete onClose={onClose} isOpen={isOpenDelete} id={rowId} category="product" setIsSuccess={setIsSuccess} isSuccess={isSuccess} />
      }
      <div className="flex items-center justify-center gap-x-2 w-full h-fit my-5">
        <div
          onClick={() => handlePageChange(currentPage - 1)}
          className={`px-5 py-2 w-10 grid place-content-center text-lg border rounded-md dark:border-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-100 cursor-pointer hover:text-white hover:bg-black duration-300 active:scale-95 ${currentPage === 1 ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          &#10094;
        </div>


        {Array.from({ length: totalPages }).map((_, index) => (
          <div
            key={index}
            onClick={() => handlePageChange(index + 1)}
            className={`px-5 py-2 w-10 grid place-content-center text-lg border rounded-md dark:border-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-100 cursor-pointer hover:text-white hover:bg-black duration-300 active:scale-95 ${currentPage === index + 1 ? "bg-black text-white" : ""}`}
          >
            {index + 1}
          </div>
        ))}


        <div
          onClick={() => handlePageChange(currentPage + 1)}
          className={`px-5 py-2 w-10 grid place-content-center text-lg border rounded-md dark:border-white dark:bg-gray-900 dark:text-white dark:hover:bg-gray-100 cursor-pointer hover:text-white hover:bg-black duration-300 active:scale-95 ${currentPage === totalPages ? "opacity-50 cursor-not-allowed" : ""}`}
        >
          &#10095;
        </div>
      </div>
    </main>
  );
};

export default AdminProducts;
