import { Link } from "react-router-dom";

export default function EventsManagement() {
  const events = [
    {
      eventID: 1,
      title: "Tech Conference 2024",
      date: "08/12/2024",
      description: "Technology",
      image:
        "https://www.vdainc.com/wp-content/uploads/2018/09/Emerson-College-Alumni-Weekend-2017_1100x688.jpg",
    },
    {
      eventID: 2,
      title: "Art Workshop",
      date: "11/02/2024",
      description: "Arts & Crafts",
      image:
        "https://campusevents.utoronto.ca/wp-content/uploads/MacandCheese-2022_40.jpg",
    },
  ];

  return (
    <div className="p-4">
      <Link to="/admin/eventsForm">
        <button className="bg-green-500 rounded-md p-4 text-white mb-8 shadow-lg hover:bg-green-600">
          Add New Event
        </button>
      </Link>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {events.map((event) => (
          <div
            key={event.eventID}
            className="bg-gray-800 rounded-lg shadow-lg overflow-hidden group transform transition-transform duration-300 hover:scale-105"
          >
            <div className="relative">
              <img src={event.image} className="w-full h-48 object-cover" />
              <div className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black via-black/70 to-transparent text-white px-4 py-2">
                <h3 className="text-xl font-bold">{event.title}</h3>
              </div>
            </div>
            <div className="p-4 space-y-2">
              <p className="text-white-700">
                <span className="font-semibold">Date :</span> {event.date}
              </p>
              <p className="text-white-700">
                <span className="font-semibold">Description :</span>{" "}
                {event.description}
              </p>
              <div className="flex justify-end space-x-2 mt-4">
                <button className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600">
                  Modify
                </button>
                <button className="bg-red-500 text-white px-4 py-2 rounded-md hover:bg-red-600">
                  Delete
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
