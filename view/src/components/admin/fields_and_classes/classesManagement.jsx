import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
export default function ClassesManagement() {
  const [classes, setClasses] = useState([]);

  const fetchClasses = async () => {
    const response = await fetch(
      `http://localhost:8000/controller/adminController.php?action=fetchClasses`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      }
    );
    const data = await response.json();
    setClasses(data);
  };

  const deleteClass = async (id) => {
    const confirmed = window.confirm("Are you sure you want to delete ? ");
    if (confirmed) {
      const request = await fetch(
        `http://localhost:8000/controller/adminController.php?action=deleteSubject`,
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            classID: id,
          }),
        }
      );
    }
  };

  useEffect(() => {
    fetchClasses();
  }, [classes]);

  return (
    <>
      <Link to="/admin/subjectsForm">
        <button className="bg-green-500 rounded-md p-2">Add new</button>
      </Link>
      <div className="overflow-x-auto bg-black p-4 rounded-lg shadow-lg">
        <table className="min-w-full text-white">
          <thead>
            <tr>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                ID
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Subject Name
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {classes.map((cls) => (
              <tr key={cls.classID}>
                <td className="px-6 py-3 text-center">{cls.classID}</td>
                <td className="px-6 py-3 text-center">{cls.className}</td>
                <td className="px-6 py-3 text-center">
                  <Link to="/admin/subjectsForm" state={cls}>
                    <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2">
                      Modify
                    </button>
                  </Link>
                  <button
                    onClick={() => deleteClass(cls.subjectID)}
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
