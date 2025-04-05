import { useState } from "react";
import { Table } from "../../components";
import { fakeData, columns } from "../../utils/constant";
import { UpdateOrder } from "../components";
import useFetch from "../../hooks/useFetch";
import { ErrorPage, Spiner } from "../../containers";

const AdminOrders = () => {
    const [rowId, setRowId] = useState<string | number | null>(null);
    const [isOpenUpdate, setIsOpenUpdate] = useState(false);
    const onClose = () => {
        setIsOpenUpdate(false);
    };

    const onEdit = (id: string | number) => {
        setRowId(id);
        setIsOpenUpdate(true);
    };

    const { data: orderData, loading: orderLoading, error: orderError } = useFetch<Array[any]>(`order`, 'GET')
    console.log(orderData);
    const orders = orderData?.orders;

    if (orderLoading || !orders) return <Spiner />;
    if (orderError) return <ErrorPage text={orderError} />;
    return (
        <main className='min-h-screen'>
            <Table
                title="Orders List"
                data={orders}
                columns={columns}
                headerBtn={false}
                actions={true}
                getRowId={(id: string | number) => setRowId(id)}
                rowId={rowId}
                onEdit={onEdit}
            />
            <UpdateOrder isOpen={isOpenUpdate} onClose={onClose} type="update" id={rowId} />
        </main>
    )
}

export default AdminOrders;
