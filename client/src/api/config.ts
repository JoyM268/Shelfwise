import axios from "axios";
import { jwtDecode } from "jwt-decode";
import dayjs from "dayjs";

const baseURL = "http://127.0.0.1:8000";

let authTokens = localStorage.getItem("authTokens")
	? JSON.parse(localStorage.getItem("authTokens") as string)
	: null;

const axiosInstance = axios.create({
	baseURL,
	headers: {
		Authorization: `Bearer ${authTokens?.access}`,
	},
});

axiosInstance.interceptors.request.use(async (req) => {
	authTokens = localStorage.getItem("authTokens")
		? JSON.parse(localStorage.getItem("authTokens") as string)
		: null;

	if (!authTokens) {
		req.headers.Authorization = null;
		return req;
	}

	const user = jwtDecode(authTokens.access);

	let isExpired = null;
	if (user.exp) isExpired = dayjs.unix(user.exp).diff(dayjs()) < 1;

	if (!isExpired) {
		req.headers.Authorization = `Bearer ${authTokens.access}`;
		return req;
	}

	const response = await axios.post(`${baseURL}/api/token/refresh/`, {
		refresh: authTokens.refresh,
	});

	const newAuthTokens = { ...authTokens, access: response.data.access };

	localStorage.setItem("authTokens", JSON.stringify(newAuthTokens));

	req.headers.Authorization = `Bearer ${response.data.access}`;

	return req;
});

export default axiosInstance;
