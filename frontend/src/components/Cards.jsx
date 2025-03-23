import { useState, useEffect } from "react";
import Card from "./Card";

const Cards = () => {
	const [tests, setTests] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);
	const [refreshTrigger, setRefreshTrigger] = useState(false); // Track changes

	const fetchTests = async () => {
		try {
			const response = await fetch("/api/tests/allTests");
			const data = await response.json();
			setTests(data);
		} catch (err) {
			setError("Failed to fetch tests");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		fetchTests();
	}, [refreshTrigger]);

	const handleCardUpdate = () => {
		setRefreshTrigger((prev) => !prev); 
	};

	if (loading) return <p className="text-center text-xl">Loading...</p>;
	if (error) return <p className="text-center text-xl text-red-500">{error}</p>;

	return (
		<div className="w-full px-10 min-h-[40vh]">
			<p className="text-5xl font-bold text-center my-10">{tests.length>0 && "All Tests & Packages"}</p>
			<div className="w-full grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 justify-start mb-20">
				{tests.map((test) => (
					<Card 
						key={test._id} 
						cardType={test.category} 
						noOfTests={test.noOfTests} 
						price={test.price} 
						tests={test.tests} 
						name={test.name} 
						id={test._id}
						onUpdate={handleCardUpdate} // Pass function to trigger refresh
					/>
				))}
			</div>
		</div>
	);
};

export default Cards;
