export default function EventsFrom() {
  return (
    <>
      <div className="max-w-md mx-auto p-6 bg-black text-white rounded-lg shadow-lg">
        <form>
          <div className="mb-4">
            <label htmlFor="name" className="block text-sm font-medium mb-2">
              Event Name
            </label>
            <input
              type="text"
              name="name"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label className="block text-sm font-medium mb-2">Event date</label>
            <input
              type="date"
              name="event_date"
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
              required
            />
          </div>

          <div className="mb-4">
            <label
              htmlFor="password"
              className="block text-sm font-medium mb-2"
            >
              Description
            </label>
            <textarea
              name=""
              className="w-full p-3 bg-gray-800 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ></textarea>
          </div>
        </form>
      </div>
    </>
  );
}
