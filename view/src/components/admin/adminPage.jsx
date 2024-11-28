import { Outlet, Link } from "react-router-dom";

export default function AdminPage() {
  return (
    <div className="flex min-h-screen bg-black text-white">
      <div className="w-1/4 bg-gray-900 p-4">
        <h2 className="text-xl font-semibold mb-4">EST SB</h2>
        <ul className="space-y-2">
          <li>
            <button className="w-full text-left bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600">
              🧑‍🎓 | Manage Students
            </button>
          </li>
          <li>
            <Link to="/admin/teacher">
              <button className="w-full text-left bg-purple-500 text-white px-4 py-2 rounded hover:bg-purple-600">
                🧑‍🏫 | Manage Teachers
              </button>
            </Link>
          </li>
          <li>
            <button className="w-full text-left bg-gray-500 text-white px-4 py-2 rounded hover:bg-gray-600">
              📝 | Manage Account
            </button>
          </li>
          <li>
            <button className="w-full text-left bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
              🌃 | Manage Events
            </button>
          </li>
          <li>
            <button className="w-full text-left bg-yellow-500 text-white px-4 py-2 rounded hover:bg-yellow-600">
              📑 | Manage Fields & classes
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-8">
        <h1 className="text-3xl font-bold mb-6 text-center">Admin Dashboard</h1>
        <Outlet />
      </div>
    </div>
  );
}
