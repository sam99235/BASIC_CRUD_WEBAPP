import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
export default function StudentsManagement() {
  const [students, setStudents] = useState([]);

  const fetchStudents = async () => {
    const request = await fetch(
      `http://localhost:8000/controller/adminController.php?action=display_accounts`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          accountType: "Student",
        }),
      }
    );
    const response = await request.json();
    setStudents(response);
  };

  const deleteTeacher = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete ? ");
    if (confirmed) {
      const request = await fetch(
        `http://localhost:8000/controller/adminController.php?action=delete_account`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            accountID: id,
          }),
        }
      );
    }
  };

  useEffect(() => {
    fetchStudents();
  }, [students]);
  return (
    <>
      <Link to="/admin/accountsForm" state={{ defaultAccount: "Student" }}>
        <button className="bg-green-500 rounded-md p-2">Add new</button>
      </Link>
      <div className="overflow-x-auto bg-black p-4 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Student ID
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Student Name
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Student Email
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {students.map((user) => (
              <tr key={user.userID} className="hover:bg-gray-700">
                <td className="px-6 py-3 text-center">{user.userID}</td>
                <td className="px-6 py-3 text-center">{user.name}</td>
                <td className="px-6 py-3 text-center">{user.email}</td>
                <td className="px-6 py-3 text-center">
                  <Link to="/admin/accountsForm" state={user}>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2">
                      Modify
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteTeacher(user.userID)}
                    className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded"
                  >
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
