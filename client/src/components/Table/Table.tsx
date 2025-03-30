import React, { useState } from "react";
import { Button } from "../../admin/components";
import { CiFilter } from "react-icons/ci";
import { IoMdAdd } from "react-icons/io";
import { MdDeleteOutline } from "react-icons/md";
import { BsThreeDotsVertical } from "react-icons/bs";
import { IoEyeOutline } from "react-icons/io5";
import { CiEdit, CiTrash } from "react-icons/ci";
import { Link } from "react-router-dom";
import noImage from "../../assets/no-image.png";
import { Spiner } from "../../containers";
import { getStatusColor } from "../../utils/func";

interface TableRowProps {
  title: string;
  data: any;
  columns: any;
  actions?: boolean;
  getRowId: any;
  rowId: any;
  onEdit: any;
  onDelete?: any;
  path?: any;
  headerBtn?: boolean;
  filterBtnFunc?: any;
  addBtnFunc?: any;
  deleteBtnFunc?: any;
}

const Table: React.FC<TableRowProps> = ({
  title,
  data,
  columns,
  actions = false,
  getRowId,
  rowId,
  filterBtnFunc,
  addBtnFunc,
  deleteBtnFunc,
  onEdit,
  onDelete,
  path,
  headerBtn = true,
}) => {
  const [activeRowId, setActiveRowId] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [loadingRowId, setLoadingRowId] = useState(null);

  const toggleMenu = (id: string) => {
    setActiveRowId(activeRowId === id ? null : id);
  };



  const handleDelete = (id: any) => {
    setLoadingRowId(id);
    onDelete(id).finally(() => setLoadingRowId(null));
  };


  const insideCLickToClose = (e: React.MouseEvent) => {
    if (e.target !== e.currentTarget) {
      setActiveRowId(null);
    }
  };


  return (
    <section className="p-4 bg-white dark:bg-gray-900 rounded-lg shadow-md max-h-screen" onClick={insideCLickToClose}>
      <div className="flex justify-between items-center mb-4">
        <h1 className="text-2xl font-semibold text-black/95 dark:text-gray-200">{title}</h1>
        {headerBtn && (
          <div className="flex items-center gap-3">
            <Button title="Filter" onClick={filterBtnFunc} icon={<CiFilter />} className="bg-zinc-50  text-black border border-zinc-500 dark:bg-slate-200 dark:text-gray-200 dark:border-gray-600" />
            <Button title="Add New" onClick={addBtnFunc} icon={<IoMdAdd />} className="bg-green-100 text-green-600 border border-green-500 dark:bg-green-900 dark:text-green-300" />
            <Button title="Delete" onClick={deleteBtnFunc} icon={<MdDeleteOutline />} className="bg-red-50 text-red-600 border border-red-500 dark:bg-red-900 dark:text-red-300" />
          </div>
        )}
      </div>
      <div className="overflow-y-scroll max-h-screen min-h-screen table-scroll-bar">
        <table className="min-w-full bg-white dark:bg-gray-800 border border-zinc-200 dark:border-gray-700 rounded-lg">
          <thead className="bg-zinc-50 dark:bg-gray-900 border-b border-zinc-200 dark:border-gray-700 static">
            <tr>
              <th className="p-3 text-center">
                <input type="checkbox" name="select-all" />
              </th>
              {columns.map((column: any) => (
                <th key={column.key} className="p-3 text-left text-zinc-500 dark:text-gray-300">{column.label}</th>
              ))}
              {actions && <th className="p-3 text-left text-zinc-500 dark:text-gray-300">Actions</th>}
            </tr>
          </thead>
          <tbody>
            {loading ? (
              <tr>
                <td colSpan={columns.length + 2} className="text-center py-10">
                  <div className="flex justify-center items-center space-x-2">
                    <div className="spinner-border animate-spin inline-block w-6 h-6 border-4 rounded-full"></div>
                    <Spiner />
                  </div>
                </td>
              </tr>
            ) : (
              data?.map((row: any) => (
                <tr key={row.id} onClick={() => getRowId(row.id)}
                  className={`border-b border-zinc-200 dark:border-gray-700 transition-all cursor-pointer 
                  ${rowId === row.id ? "bg-zinc-300 dark:bg-gray-900" : "hover:bg-gray-200 dark:hover:bg-slate-800"}`}>
                  <td className="p-3 text-center">
                    <input type="checkbox" name={`select-row-${row.id}`} id={`check-${row.id}`} />
                  </td>
                  {columns.map((column: any) => (
                    <td key={column.key} className="p-3 dark:text-gray-100">
                      {column.isImage ? <img src={row[column?.key] ? `http://localhost:3001/${row[column?.key]}` : noImage} alt={row[column.key]} className="w-14 h-14 rounded-xl" /> :
                        column.isStatus ? <span className={`px-3 py-1 rounded-full text-sm font-semibold ${getStatusColor(row[column.key])}`}>{row[column.key]}</span> :
                          row[column.key]}
                    </td>
                  ))}
                  {actions && (
                    <td className="p-3 relative">
                      <BsThreeDotsVertical onClick={(e) => {
                        e.stopPropagation();
                        toggleMenu(row.id);
                      }} className="text-gray-500 dark:text-gray-300 cursor-pointer" />
                      {activeRowId === row.id && (
                        <div className="absolute top-14 -left-5 bg-white dark:bg-slate-900 z-10 rounded border border-zinc-200 dark:border-gray-700 shadow p-2 z-50">
                          <div className="flex flex-col gap-y-2">
                            {path && (
                              <Link to={`${path}/${row.name.split(" ").join("-")}`} className="text-2xl text-blue-500 dark:text-blue-300">
                                <IoEyeOutline />
                              </Link>
                            )}
                            <button className="text-2xl text-green-500 dark:text-green-300 cursor-pointer" onClick={() => onEdit(row.id)}>
                              <CiEdit />
                            </button>
                            {onDelete && (
                              <button onClick={() => handleDelete(row.id)} className="text-2xl text-red-500 dark:text-red-300 cursor-pointer">
                                <CiTrash />
                              </button>
                            )}
                          </div>
                        </div>
                      )}
                    </td>
                  )}
                </tr>
              ))
            )}
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default Table;
