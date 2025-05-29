import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaMoneyBill, FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";
import { useState } from "react";
import ConfirmDelete from "./ConfirmDelete.jsx";

const categoryColorMap = {
  fullbody: "from-green-700 to-green-400",
  teeth: "from-pink-800 to-pink-600",
  kidney: "from-blue-700 to-blue-400",
  others: "from-yellow-700 to-yellow-400"
};

const Card = ({
  id,
  cardType,
  noOfTests,
  price,
  tests,
  name,
  type,
  onUpdate,
}) => {
  // Determine CSS class based on category (use default if missing)
  const cardClass =
    categoryColorMap[
      typeof cardType === "string"
        ? cardType.toLowerCase()
        : cardType?.name?.toLowerCase()
    ] || "from-gray-700 to-gray-400";

    const [showModal, setShowModal] = useState(false);

   const handleConfirmDelete = async () => {
    try {
      const url =
        type === "test"
          ? `/api/tests/test/${id}`
          : `/api/packages/package/${id}`;

      const response = await fetch(url, {
        method: "DELETE",
      });

      if (response.ok) {
        onUpdate();
        toast.success(`${formatType()} deleted successfully`);
      } else {
        toast.error(`Failed to delete ${formatType()}`);
      }
    } catch (error) {
      toast.error("Something went wrong");
      console.error("Error deleting:", error);
    }
  };

  // Format category name safely
  const formatCategory = () => {
    
    if (!cardType) return "Unknown";
    if (typeof cardType === "string") {
      return cardType.charAt(0).toUpperCase() + cardType.slice(1);
    }
    if (typeof cardType === "object" && cardType.name) {
      return cardType.name.charAt(0).toUpperCase() + cardType.name.slice(1);
    }
    return "Unknown";
  };

  const formatType = () => {
    if (!type) return "Unknown";
    if (typeof type === "string") {
      return type.charAt(0).toUpperCase() + type.slice(1);
    }
    if (typeof type === "object" && type.name) {
      return type.name.charAt(0).toUpperCase() + type.name.slice(1);
    }
    return "Unknown";
  };

  return (
    <div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
      <div className="flex flex-col gap-3">
        <div className="flex flex-row items-center justify-between">
          <h2 className="text-lg font-bold text-white">{name}</h2>
          <div className="flex items-center gap-2">
            <FaTrash
  className="cursor-pointer text-white"
  onClick={() => setShowModal(true)}
/>
            <Link
              to={
                type === "package"
                  ? `/packageTransaction/${id}`
                  : `/transaction/${id}`
              }
            >
              <HiPencilAlt className="cursor-pointer text-white" size={20} />
            </Link>
          </div>
        </div>

        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Type: {formatType()}
        </p>

        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Category: {formatCategory()}
        </p>

        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Number of tests: {noOfTests}
        </p>

        <p className="text-white flex items-center gap-1">
          <BsCardText />
          Tests Included: {tests}
        </p>

        <p className="text-white flex items-center gap-1">
          <FaMoneyBill />
          Price: ₹{price}
        </p>

        <div className="flex justify-between items-center mt-2">
          <img
            src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
            className="h-8 w-8 border rounded-full"
            alt="avatar"
          />
        </div>
      </div>

          <ConfirmDelete
  isOpen={showModal}
  onClose={() => setShowModal(false)}
  onConfirm={handleConfirmDelete}
/>

    </div>
  );
};

export default Card;
