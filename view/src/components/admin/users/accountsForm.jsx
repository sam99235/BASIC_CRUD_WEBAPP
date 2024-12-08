import { useState } from "react";
import { useLocation } from "react-router-dom";
export default function AccountsForm() {
  const location = useLocation();
  const { defaultAccountType } = location.state || {}; // Extract the prop
  const [accountType, setAccountType] = useState(defaultAccountType || "");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label htmlFor="email" className="block text-sm font-medium mb-2">
              Email
            </label>
            <input
              type="email"
              name="email"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Password
            </label>
            <input
              type="password"
              name="password"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">
              Account Type
            </label>
            <select
              name="accountType"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={accountType}
              onChange={(e) => setAccountType(e.target.value)}
              required
            >
              <option value="">Select an account type</option>
              <option value="student">Student</option>
              <option value="teacher">Teacher</option>
              <option value="admin">Admin</option>
            </select>
          </div>

          {accountType === "student" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Class</label>
              <select
                name="classField"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">Select a class</option>
                <option value="Class 1">Class 1</option>
                <option value="Class 2">Class 2</option>
                <option value="Class 3">Class 3</option>
              </select>
            </div>
          )}

          {accountType === "teacher" && (
            <div className="mb-4">
              <label className="block text-sm font-medium mb-2">Subject</label>
              <select
                name="subjectField"
                className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
                required
                value={accountType}
                onChange={(e) => setAccountType(e.target.value)}
              >
                <option value="">Select a subject</option>
                <option value="Math">Math</option>
                <option value="Science">Science</option>
                <option value="History">History</option>
              </select>
            </div>
          )}

          <div className="mt-6">
            <button
              type="submit"
              className="w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Send
            </button>
          </div>
        </form>
      </div>
    </>
  );
}
