import { Link } from "react-router-dom";

export default function TeachersManagement() {
  const teachers = [
    { id: 1, name: "John Doe", email: "john.doe@example.com", subject: "Math" },
    {
      id: 2,
      name: "Jane Smith",
      email: "jane.smith@example.com",
      subject: "Science",
    },
    {
      id: 3,
      name: "David Johnson",
      email: "david.johnson@example.com",
      subject: "English",
    },
  ];
  return (
    <>
      <Link to="/admin/createAccount" state={{ defaultAccountType: "teacher" }}>
        <button className="bg-green-500 rounded-md p-2">Add new</button>
      </Link>
      <div className="overflow-x-auto bg-black p-4 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Teacher ID
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Teacher Name
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Teacher Email
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {teachers.map((teacher) => (
              <tr key={teacher.id} className="hover:bg-gray-700">
                <td className="px-6 py-3 text-center">{teacher.id}</td>
                <td className="px-6 py-3 text-center">{teacher.name}</td>
                <td className="px-6 py-3 text-center">{teacher.email}</td>
                <td className="px-6 py-3 text-center">
                  <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2">
                    Modify
                  </button>
                  <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </>
  );
}
