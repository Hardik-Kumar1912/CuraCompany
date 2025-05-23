import { useState, useEffect } from "react";
import { useAuthContext } from "../context/AuthContext";
import toast from "react-hot-toast";

const TestForm = () => {
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [success, setSuccess] = useState(false);

	const { authUser } = useAuthContext();

	const handleSubmit = async (e) => {
	e.preventDefault();
	setLoading(true);
	setError(null); // Reset error state

	const form = e.target;
	const formData = new FormData(form);

	const type = formData.get("type"); // Get type early

	const testData = {
		companyId: authUser._id,
		noOfTests: formData.get("testsIncluded")
			? formData.get("testsIncluded").split(",").length.toString()
			: "0",
		price: formData.get("price").toString(),
		tests: formData.get("testsIncluded").toString(),
		name: formData.get("testName").toString(),
		category: formData.get("category").toString(),
		type: type,
	};

	try {

		if(type === "test") {
			const response = await fetch("/api/tests/test", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({companyId: testData.companyId, name: testData.name, category: testData.category, noOfTests: testData.noOfTests, tests: testData.tests, price: testData.price , type: testData.type}),
			});

			if (!response.ok) {
				throw new Error("Failed to create test");
			}

			const result = await response.json();
			console.log("Created:", result);
			setSuccess(true);
			form.reset();
			toast.success("Test added successfully");
		}

		else if(type === "package") {
			const response = await fetch("/api/packages/package", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({companyId: testData.companyId, name: testData.name, packageCategory: testData.category, noOfTests: testData.noOfTests, tests: testData.tests, bestPrice: testData.price , type: testData.type}),
			});

			if (!response.ok) {
				throw new Error("Failed to create test");
			}

			const result = await response.json();
			console.log("Created:", result);
			setSuccess(true);
			form.reset();
			toast.success("Test added successfully");
		}

		// console.log("Test type:", testData.type);
		// const response = await fetch(endpoint, {
		// 	method: "POST",
		// 	headers: { "Content-Type": "application/json" },
		// 	body: JSON.stringify(),
		// });

		// if (!response.ok) {
		// 	throw new Error("Failed to create " + type);
		// }

		// const result = await response.json();
		// console.log("Created:", result);
		// setSuccess(true);
		// form.reset();
		// toast.success(`${type === "test" ? "Test" : "Package"} added successfully`);
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
			{/* TEST NAME */}
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

				{/* TESTS INCLUDED */}
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

				{/* TYPE: TEST OR PACKAGE */}
				<div className='w-full mt-4'>
					<label className='block uppercase tracking-wide text-black text-xs font-bold mb-2'>
						Type
					</label>
					<div className='flex gap-6'>
						<label className='inline-flex items-center'>
							<input
								type='radio'
								className='form-radio text-pink-500'
								name='type'
								value='test'
								required
							/>
							<span className='ml-2'>Test</span>
						</label>
						<label className='inline-flex items-center'>
							<input
								type='radio'
								className='form-radio text-pink-500'
								name='type'
								value='package'
							/>
							<span className='ml-2'>Package</span>
						</label>
					</div>
				</div>
			</div>

			{/* CATEGORY & PRICE */}
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

				{/* PRICE */}
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
				disabled={loading}
			>
				{loading ? "Adding..." : "Add Test/Package"}
			</button>

			{/* ERROR MESSAGE */}
			{error && <p className='text-red-600 text-sm'>{error}</p>}
		</form>
	);
};

export default TestForm;
