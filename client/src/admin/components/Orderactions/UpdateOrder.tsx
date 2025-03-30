import { Button, Modal } from "..";
import { Inputs } from "../../../components";
// icons
import { AiOutlineShoppingCart } from "react-icons/ai";

const UpdateOrder = ({
  isOpen,
  onClose,
  type,
  id,
}: {
  isOpen: any;
  onClose: any;
  type: string;
  id?: any;
}) => {
  return (
    <Modal isOpen={isOpen} onClose={onClose} insideClick={true} btnClose={true}>
      <div className="w-[30rem]">
        <h1 className="text-2xl font-semibold mb-10">
          {type === "add" ? "Add " : "Update "} Order
        </h1>
        <form action="">
          <Inputs
            type="select"
            placeholder="Status"
            icon={<AiOutlineShoppingCart />}
          />

          <Button
            className="mt-12 border rounded-full w-full justify-center hover:bg-black/90 hover:text-white dark:hover:bg-gray-900"
            title="Add Product"
            icon={<AiOutlineShoppingCart />}
            onClick={onClose}
          />
        </form>
      </div>
    </Modal>
  );
};

export default UpdateOrder;
