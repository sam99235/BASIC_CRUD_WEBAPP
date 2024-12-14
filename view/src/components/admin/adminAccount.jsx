import { useRef } from "react";

export default function AdminAccount() {
  const password = useRef();
  const newPassword = useRef();
  const confirmPassword = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (
      password.current.value !== "" &&
      newPassword.current.value !== "" &&
      confirmPassword.current.value !== "" &&
      newPassword.current.value === confirmPassword.current.value
    ) {
      const updatePassword = await fetch(
        `http://localhost:8000/controller/adminController.php?action=updateAdminPassword`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            oldPassword: password.current.value,
            newPassword: newPassword.current.value,
          }),
        }
      );
      const response = await updatePassword.json();
      if (response.done === true) {
        alert(response.message);
        password.current.value = "";
        newPassword.current.value = "";
        confirmPassword.current.value = "";
      } else {
        alert(response.message);
      }
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <label className="mt-4 block text-md font-medium mb-1">
          Current Password
        </label>
        <input
          type="password"
          placeholder="insert your current password"
          ref={password}
          required
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="mt-4 block text-md font-medium mb-1">
          New Password
        </label>
        <input
          type="password"
          ref={newPassword}
          placeholder="insert your new password"
          required
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <label className="mt-4 block text-md font-medium mb-1">
          Confirm Password
        </label>
        <input
          type="password"
          placeholder="confirm your new password"
          ref={confirmPassword}
          required
          className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
        <input
          type="submit"
          className="mt-8 w-full py-3 bg-blue-500 hover:bg-blue-600 text-white rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </form>
    </div>
  );
}
