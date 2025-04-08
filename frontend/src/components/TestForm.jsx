import { useState , useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const TestForm = () => {

	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const {authUser} = useAuthContext();

	const handleSubmit = async (e) => {
		e.preventDefault();
		setLoading(true); // Start loading
	
		const form = e.target;
		const formData = new FormData(form);
	
		const testData = {
			companyId: authUser._id,
			noOfTests: formData.get("testsIncluded") ? formData.get("testsIncluded").split(",").length.toString() : "0",
			price: formData.get("price").toString(),
			tests: formData.get("testsIncluded").toString(), 
			name: formData.get("testName").toString(), 
			category: formData.get("category").toString(), 
		};
	
	
		try {
			const response = await fetch("/api/tests/test", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify(testData),
			});
	
			if (!response.ok) {
				throw new Error("Failed to create test");
			}
	
			const result = await response.json();
			console.log("Test created:", result);
			setSuccess(true);
			form.reset();
			toast.success("Test added successfully");
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (success) {
			setTimeout(() => {
				window.location.reload();
			}, 2000); 
		}
	}, [success]);

	return (
		<form className='w-full max-w-lg flex flex-col gap-5 px-3' onSubmit={handleSubmit}>
			{/* TRANSACTION */}
			<div className='flex flex-wrap'>
				<div className='w-full'>
					<label
						className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
						htmlFor='testName'
					>
						Test/Package Name
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='testName'
						name='testName'
						type='text'
						required
						placeholder='Swasth Bharat Test , etc'
					/>
				</div>
                <div className='w-full mt-4'>
					<label
						className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
						htmlFor='testsIncluded'
					>
						Tests Included
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='testsIncluded'
						name='testsIncluded'
						type='text'
						required
						placeholder='RBC count , CFA- 14 , etc'
					/>
				</div>
			</div>
			{/* PAYMENT TYPE */}
			<div className='flex flex-wrap gap-3'>

				{/* CATEGORY */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label
						className='block uppercase tracking-wide text-black text-xs font-bold mb-2'
						htmlFor='category'
					>
						Category
					</label>
					<div className='relative'>
						<select
							className='block appearance-none w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
							id='category'
							name='category'
						>
							<option value={"fullbody"}>Full Body</option>
							<option value={"teeth"}>Teeth</option>
							<option value={"kidney"}>Kidney</option>
						</select>
						<div className='pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700'>
							<svg
								className='fill-current h-4 w-4'
								xmlns='http://www.w3.org/2000/svg'
								viewBox='0 0 20 20'
							>
								<path d='M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z' />
							</svg>
						</div>
					</div>
				</div>

				{/* AMOUNT */}
				<div className='w-full flex-1 mb-6 md:mb-0'>
					<label className='block uppercase text-black text-xs font-bold mb-2' htmlFor='price'>
						Price(₹)
					</label>
					<input
						className='appearance-none block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500'
						id='price'
						name='price'
						type='number'
						placeholder='1500'
					/>
				</div>
			</div>

			{/* SUBMIT BUTTON */}
			<button
				className='text-white mt-3 font-bold w-full rounded px-4 py-2 bg-gradient-to-br
          from-pink-500 to-pink-500 hover:from-pink-600 hover:to-pink-600
						disabled:opacity-70 disabled:cursor-not-allowed'
				type='submit'
			>
				Add Test/Package
			</button>
		</form>
	);
};

export default TestForm;