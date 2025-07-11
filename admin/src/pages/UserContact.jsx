import React, { useEffect, useState } from "react";
import axios from "axios";
import { backendUrl } from "../App";

const UserContact = ({ token }) => {
	const [messages, setMessages] = useState([]);
	const [loading, setLoading] = useState(true);
	const [error, setError] = useState(null);

	useEffect(() => {
		const fetchMessages = async () => {
			try {
				const res = await axios.get(backendUrl + "/api/contact/get-contacts", {
					headers: { token },
				});
				setMessages(res.data);
			} catch (err) {
				console.log(err);
				setError("Failed to fetch messages (frontend)");
			} finally {
				setLoading(false);
			}
		};
		fetchMessages();
	}, [token]);

	if (loading) return <div className="p-6">Loading...</div>;
	if (error) return <div className="p-6 text-red-500">{error}</div>;

return (
  <div className="p-4 sm:p-6 w-full max-w-5xl mx-auto">
	<h2 className="text-xl sm:text-2xl font-bold mb-4 text-center sm:text-left">User Messages</h2>
	{messages.length === 0 ? (
	  <div className="text-center">No messages found.</div>
	) : (
	  <div className="overflow-x-auto rounded shadow border border-gray-200 bg-white">
		<table className="min-w-full divide-y divide-gray-200 text-sm sm:text-base">
		  <thead className="bg-gray-100">
			<tr>
			  <th className="py-2 px-2 sm:px-4 text-left">Name</th>
			  <th className="py-2 px-2 sm:px-4 text-left">Email</th>
			  <th className="py-2 px-2 sm:px-4 text-left">Message</th>
			</tr>
		  </thead>
		  <tbody>
			{messages.map((msg, idx) => (
			  <tr key={idx} className="hover:bg-gray-50">
				<td className="py-2 px-2 sm:px-4 border-b break-words max-w-[120px] sm:max-w-xs">{msg.name}</td>
				<td className="py-2 px-2 sm:px-4 border-b break-words max-w-[140px] sm:max-w-sm">{msg.email}</td>
				<td className="py-2 px-2 sm:px-4 border-b break-words max-w-[200px] sm:max-w-md">{msg.message}</td>
			  </tr>
			))}
		  </tbody>
		</table>
	  </div>
	)}
  </div>
);
};

export default UserContact;
