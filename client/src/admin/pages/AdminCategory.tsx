import { Table } from "../../components";
import { useEffect, useState } from "react";
import AddCategory from "../components/CategoryActions/AddCategory";
import ModalDelete from "../components/ProductAactions/ModalDelete";
import useFetch from "../../hooks/useFetch";
import { Spiner } from "../../containers";

const columns = [
  { key: "img", label: "Image", isImage: true },
  { key: "name", label: "Name" },
  { key: "createdAt", label: "Created At" },
];

const AdminCategory = () => {
  const [rowId, setRowId] = useState<string | number | null>(null);
  const [category, setCategory] = useState([]);
  const [isOpenAdd, setIsOpenAdd] = useState(false);
  const [isOpenDelete, setIsOpenDelete] = useState(false);
  const openAddProduct = () => setIsOpenAdd(true);
  const [isOpenUpdate, setIsOpenUpdate] = useState(false);
  const openDeleteProduct = () => setIsOpenDelete(true);
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

  const { data: rowData, loading: rowLoading } = useFetch(`category`, 'GET')

  useEffect(() => {
    if (rowData) {
      setCategory(rowData?.categories)
    } else {
      setCategory([])
    }
  }, [rowLoading])
  
  return (
    <main className='min-h-screen'>
      {
        rowLoading ? <Spiner /> :
          <Table
            addBtnFunc={openAddProduct}
            deleteBtnFunc={() => openDeleteProduct(1)}
            title="Categories List"
            data={category}
            columns={columns}
            actions={true}
            rowId={rowId}
            getRowId={(id: string | number) => setRowId(id)}
            onEdit={onEdit}
            onDelete={onDelete}
            path="/category"
          />
      }
      {isOpenAdd && <AddCategory onClose={onClose} isOpen={isOpenAdd} type="add" />}
      {isOpenUpdate && <AddCategory onClose={onClose} isOpen={isOpenUpdate} type="update" id={rowId} />}
      {isOpenDelete && <ModalDelete onClose={onClose} isOpen={isOpenDelete} id={rowId} category="category" />}
    </main>
  )
}

export default AdminCategory;