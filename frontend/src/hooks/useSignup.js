import { useState } from "react";
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";

const useSignup = () => {
	const [loading, setLoading] = useState(false);
	const { setAuthUser } = useAuthContext();

	const signup = async ({ companyName, phoneNumber, password, confirmPassword }) => {
		const success = handleInputErrors({ companyName, phoneNumber, password, confirmPassword});
		if (!success) return;

		setLoading(true);
		try {
			const res = await fetch("/api/auth/signup", {
				method: "POST",
				headers: { "Content-Type": "application/json" },
				body: JSON.stringify({ companyName, phoneNumber, password, confirmPassword }),
			});

			const data = await res.json();
			if (data.error) {
				throw new Error(data.error);
			}
			localStorage.setItem("medi-companyUser", JSON.stringify(data));
			setAuthUser(data);
		} catch (error) {
			toast.error(error.message);
		} finally {
			setLoading(false);
		}
	};

	return { loading, signup };
};

export default useSignup;

function handleInputErrors({ companyName, phoneNumber, password, confirmPassword}) {
    if (!companyName || !phoneNumber || !password || !confirmPassword) {
        toast.error("Please fill all fields");
        return false;
    }


    if (!/^\d{10}$/.test(phoneNumber)) {
        toast.error("Phone number must be exactly 10 digits");
        return false;
    }

    if (password !== confirmPassword) {
        toast.error("Passwords do not match");
        return false;
    }

    if (!/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[\W_]).{8,}$/.test(password)) {
        toast.error("Password must be at least 8 characters and include uppercase, lowercase, number, and special character");
        return false;
    }

    return true;
}