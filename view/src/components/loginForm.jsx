import { useRef } from "react";
export default function LoginForm() {
  const email = useRef();
  const password = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (email.current.value !== "" && password.current.value !== "") {
      const response = await fetch(
        "http://localhost:8000/controller/adminController.php?action=checkLogin",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          credentials: "include",
          body: JSON.stringify({
            email: email.current.value,
            password: password.current.value,
          }),
        }
      );
      const resp = await response.json();
      if (resp.result === true) {
        window.location.href = "/admin/";
      } else {
        alert(resp.message || "An error occurred. Please try again.");
      }
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-black">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md">
        <h2 className="text-2xl font-bold mb-6 text-center text-black">
          Login
        </h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="email"
            >
              Email
            </label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
              ref={email}
            />
          </div>
          <div className="mb-6">
            <label
              className="block text-black text-sm font-bold mb-2"
              htmlFor="password"
            >
              Password
            </label>
            <input
              type="password"
              placeholder="Enter your password"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-black"
              required
              ref={password}
            />
          </div>
          <button
            type="submit"
            className="w-full bg-black text-white py-2 rounded-lg font-bold hover:bg-gray-800"
          >
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
