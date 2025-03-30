import { Table, LineChart, PieChart } from "../../components";
import { fakeData, columns } from "../../utils/constant";
import { StaticCard } from '../components';
// img
import { GiMoneyStack } from "react-icons/gi";

import { AiOutlineProduct } from "react-icons/ai";
import { PiSealPercentLight } from "react-icons/pi";

type ids = {
  id: string | number;
}
const AdminHome = () => {
  return (
    <div className="flex flex-col gap-4 p-3 bg-zinc-50 dark:bg-gray-800 h-fit">
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-5">
        <StaticCard title="Total Sale" icon={<PiSealPercentLight />} money="131313" />
        <StaticCard title="Total Order" icon={<AiOutlineProduct />} money="131313" />
        <StaticCard title="Total Profit" icon={<GiMoneyStack />} money="131313" />
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
        <div className=" bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md grid place-content-center max-h-full">
          <h1 className="text-2xl font-semibold self-start text-black/95 dark:text-gray-200">Profit</h1>
          <LineChart />
        </div>
        <div className="bg-white dark:bg-gray-900 p-4 rounded-lg shadow-md max-h-full flex flex-col items-center justify-around">
          <h1 className="text-2xl font-semibold self-start text-black/95 dark:text-gray-200">Order Statistics</h1>
          <div className="flex items-center justify-around gap-7">
            <div className="flex flex-col gap-2">
              <div className="flex"><p className="text-5xl text-green-500 -translate-y-7 -translate-x-1">.</p><p className="text-zinc-600 dark:text-zinc-300 text-base font-semibold">Valide: <span className="text-black/95 dark:text-gray-200">131313 da</span></p></div>
              <div className="flex"><p className="text-5xl text-red-500 -translate-y-7 -translate-x-1">.</p><p className="text-zinc-600 dark:text-zinc-300 text-base font-semibold">Invalide: <span className="text-black/95 dark:text-gray-200">131313 da</span></p></div>
              <div className="flex"><p className="text-5xl text-yellow-500 -translate-y-7 -translate-x-1">.</p><p className="text-zinc-600 dark:text-zinc-300 text-base font-semibold">En attente: <span className="text-black/95 dark:text-gray-200">131313 da</span></p></div>
              <div className="flex"><p className="text-5xl text-red-500 -translate-y-7 -translate-x-1">.</p><p className="text-zinc-600 dark:text-zinc-300 text-base font-semibold">Refuse: <span className="text-black/95 dark:text-gray-200">131313 da</span></p></div>
            </div>
            <div className="max-h-">
              <PieChart />
            </div>
          </div>
        </div>
      </div>
      <Table
        title="Top Selling Products"
        data={fakeData}
        columns={columns}
        headerBtn={false}
        getRowId={(id: string | number) => console.log("Row clicked:", id)}
        rowId={null}
        onEdit={(id: ids) => console.log("Edit:", id)}
        onDelete={(id: ids) => console.log("Delete:", id)}
        path="/users"
      />

    </div>
  )
}

export default AdminHome;