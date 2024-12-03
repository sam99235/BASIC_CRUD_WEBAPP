export default function FieldsManagement() {
  return (
    <>
      <Link to="/fields/createFields">
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
                Subject Class
              </th>
              <th className="px-6 py-3 text-center border-b-2 border-gray-700">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td className="px-6 py-3 text-center"></td>
              <td className="px-6 py-3 text-center"></td>
              <td className="px-6 py-3 text-center"></td>
              <td className="px-6 py-3 text-center">
                <button className="px-4 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded mr-2">
                  Modify
                </button>
                <button className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded">
                  Delete
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </>
  );
}
