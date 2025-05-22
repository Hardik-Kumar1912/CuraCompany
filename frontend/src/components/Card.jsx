import { FaLocationDot } from "react-icons/fa6";
import { BsCardText } from "react-icons/bs";
import { MdOutlinePayments } from "react-icons/md";
import { FaSackDollar } from "react-icons/fa6";
import { FaTrash } from "react-icons/fa";
import { HiPencilAlt } from "react-icons/hi";
import { Link } from "react-router-dom";
import toast from "react-hot-toast";

const categoryColorMap = {
	fullbody: "from-green-700 to-green-400",
	teeth: "from-pink-800 to-pink-600",
	kidney: "from-blue-700 to-blue-400",
	// Add more categories and corresponding color classes as needed
};

const Card = ({ id, cardType , noOfTests , price ,tests , name , onUpdate }) => {

	const cardClass = categoryColorMap[cardType];

	const handleDelete = async () => {
		try {
			const response = await fetch(`/api/tests/test/${id}`, {
				method: "DELETE",
			});
			if (response.ok) {
				onUpdate();
				toast.success("Test deleted successfully");
			} else {
				console.error("Failed to delete test");
			}
		} catch (error) {
			console.error("Error deleting test", error);
		}
	};

	return (
		<div className={`rounded-md p-4 bg-gradient-to-br ${cardClass}`}>
			<div className='flex flex-col gap-3'>
				<div className='flex flex-row items-center justify-between'>
					<h2 className='text-lg font-bold text-white'>{name}</h2>
					<div className='flex items-center gap-2'>
						<FaTrash className={"cursor-pointer text-white"} onClick={handleDelete}/>
						<Link to={`/transaction/${id}`}>
							<HiPencilAlt className='cursor-pointer text-white' size={20} />
						</Link>
					</div>
				</div>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Category: {cardType[0].toUpperCase() + cardType.slice(1)}
				</p>
				<p className='text-white flex items-center gap-1'>
					<BsCardText />
					Number of tests : {noOfTests}
				</p>
                <p className='text-white flex items-center gap-1'>
					<BsCardText />
					Tests Included : {tests}
				</p>
				<p className='text-white flex items-center gap-1'>
					<FaSackDollar />
					price: ₹{price}
				</p>
				<div className='flex justify-between items-center mt-2'>
					<img
						src={"https://tecdn.b-cdn.net/img/new/avatars/2.webp"}
						className='h-8 w-8 border rounded-full'
						alt=''
					/>
				</div>
			</div>
		</div>
	);
};
export default Card;