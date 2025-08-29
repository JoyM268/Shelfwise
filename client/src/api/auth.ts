import axiosInstance from "./config";

const auth = {
	loginUser: async (username: string, password: string) => {
		const response = await axiosInstance.post("/api/token/", {
			username,
			password,
		});

		return response.data;
	},

	registerUser: async (name: string, username: string, password: string) => {
		const response = await axiosInstance.post("/api/register/", {
			name,
			username,
			password,
		});

		return response.data;
	},
};

export default auth;
