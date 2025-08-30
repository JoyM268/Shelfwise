import type { BookStatus } from "@/pages/Library";
import axiosInstance from "./config";
import type { BookDataProps } from "@/pages/Library";

const statusCodes = {
	"Plan to Read": "PR",
	Reading: "R",
	Finished: "F",
};

const library = {
	changeStatus: async (id: string, status: BookStatus) => {
		const statusCode = statusCodes[status];
		const response = await axiosInstance.put("/api/library/", {
			id,
			status: statusCode,
		});

		return response.data;
	},

	deleteBook: async (id: string) => {
		const response = await axiosInstance.delete(`/api/library/${id}/`);
		return response.data;
	},

	addBook: async (id: string, status: BookStatus) => {
		const statusCode = statusCodes[status];
		const response = await axiosInstance.post("/api/library/", {
			id,
			status: statusCode,
		});

		return response.data;
	},

	getBooks: async (signal: AbortSignal) => {
		const response = await axiosInstance.get<BookDataProps[]>(
			"/api/library/",
			{
				signal,
			}
		);
		return response.data;
	},
};

export default library;
