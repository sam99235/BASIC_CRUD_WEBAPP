export default function ClassesForm() {
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <form action="">
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">class name</label>
          <input
            placeholder="example : cstc"
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>

        <div className="mb-4">
          <input
            type="submit"
            className="w-full p-3 bg-blue-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>
      </form>
    </div>
  );
}
