import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import toast from "react-hot-toast";

const TestPage = () => {
	const { id } = useParams();

	const navigate = useNavigate();

	const [formData, setFormData] = useState({
		name: "",
		tests: "",
		cardType: "",
		price: "",
	});

	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	useEffect(() => {
		const fetchTest = async () => {
			try {
				const response = await fetch(`/api/tests/test/${id}`);
				if (!response.ok) throw new Error("Failed to fetch test");
				const data = await response.json();
				setFormData({
					name: data.name,
					tests: data.tests,
					cardType: data.category,
					price: data.price,
				});
			} catch (err) {
				setError(err.message);
			} finally {
				setLoading(false);
			}
		};

		fetchTest();
	}, [id]);

	const handleInputChange = (e) => {
		const { name, value } = e.target;
		setFormData((prevFormData) => ({
			...prevFormData,
			[name]: value,
		}));
	};

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true);
		setError(null);
		setSuccess(false);
	  
		try {
		  // Create a payload with the correct keys for the backend
		  const payload = {
			name: formData.name,
			tests: formData.tests,
			category: formData.cardType, // Map cardType to category
			price: formData.price,
			// Assuming noOfTests is calculated from tests, adjust if necessary:
			noOfTests: formData.noOfTests || formData.tests.split(',').length
		  };
	  
		  const response = await fetch(`/api/tests/test/${id}`, {
			method: "PUT",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(payload),
		  });
	  
		  if (!response.ok) throw new Error("Failed to update test");
	  
		  setSuccess(true);
		  toast.success("Test updated successfully");
	  
		  setTimeout(() => {
			navigate("/home");
		  }, 1000);
		  
		} catch (err) {
		  setError(err.message);
		} finally {
		  setLoading(false);
		}
	  };
	  
	

	if (loading) return <p className="text-center text-xl">Loading...</p>;
	if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

	return (
		<div className="h-screen max-w-4xl mx-auto flex flex-col items-center">
			<p className="md:text-4xl text-2xl font-bold text-center mb-4 bg-gradient-to-r from-pink-600 to-indigo-500 text-transparent bg-clip-text">
				Update this Test/Package
			</p>
			{success && <p className="text-green-500">Test updated successfully!</p>}
			<form className="w-full max-w-lg flex flex-col gap-5 px-3 mt-4" onSubmit={handleSubmit}>
				<div className="w-full">
					<label className="block text-white text-xs font-bold mb-2" htmlFor="testName">
						Test/Package Name
					</label>
					<input
						className="w-full bg-gray-200 text-black border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white"
						id="testName"
						name="name"
						type="text"
						required
						value={formData.name}
						onChange={handleInputChange}
					/>
				</div>
				<div className="w-full">
					<label className="block text-white text-xs font-bold mb-2" htmlFor="testsIncluded">
						Tests Included
					</label>
					<input
						className="w-full bg-gray-200 text-black border rounded py-3 px-4"
						id="testsIncluded"
						name="tests"
						type="text"
						required
						value={formData.tests}
						onChange={handleInputChange}
					/>
				</div>
				<div className="w-full">
					<label className="block text-white text-xs font-bold mb-2" htmlFor="category">
						Category
					</label>
					<select
						className="w-full bg-gray-200 text-black border rounded py-3 px-4"
						id="category"
						name="cardType"
						value={formData.cardType}
						onChange={handleInputChange}
					>
						<option value="fullbody">Full Body</option>
						<option value="teeth">Teeth</option>
						<option value="kidney">Kidney</option>
					</select>
				</div>
				<div className="w-full">
					<label className="block text-white text-xs font-bold mb-2" htmlFor="price">
						Price (₹)
					</label>
					<input
						className="w-full bg-gray-200 text-black border rounded py-3 px-4"
						id="price"
						name="price"
						type="number"
						required
						value={formData.price}
						onChange={handleInputChange}
					/>
				</div>
				<button
					className="text-white mt-3 font-bold w-full rounded px-4 py-2 bg-gradient-to-br from-pink-500 to-pink-600"
					type="submit"
				>
					Update
				</button>
			</form>
		</div>
	);
};

export default TestPage;
