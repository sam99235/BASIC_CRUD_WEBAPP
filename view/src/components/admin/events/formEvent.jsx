import { useRef } from "react";

export default function EventsForm() {
  const nameRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const eventData = {
      name: nameRef.current.value,
      date: dateRef.current.value,
      description: descriptionRef.current.value,
    };

    try {
      const response = await fetch(
        "http://localhost:8000/controller/adminController",
        {
          method: "POST",
          credentials: "include",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(eventData),
        }
      );

      if (response.ok) {
        const result = await response.json();
        alert("Event added successfully!");
        console.log(result);
        nameRef.current.value = "";
        dateRef.current.value = "";
        descriptionRef.current.value = "";
      } else {
        alert("Failed to add event. Please try again.");
        console.error(await response.text());
      }
    } catch (error) {
      console.error("Error submitting the form:", error);
      alert("Something went wrong!");
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6 text-center">Add New Event</h2>
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label htmlFor="name" className="block text-sm font-medium mb-2">
            Event Name
          </label>
          <input
            type="text"
            id="name"
            name="name"
            ref={nameRef}
            placeholder="Enter the event name"
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="event_date"
            className="block text-sm font-medium mb-2"
          >
            Event Date
          </label>
          <input
            type="date"
            id="event_date"
            name="event_date"
            ref={dateRef}
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          />
        </div>
        <div className="mb-4">
          <label
            htmlFor="description"
            className="block text-sm font-medium mb-2"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            ref={descriptionRef}
            rows="4"
            placeholder="Enter a brief description of the event"
            className="w-full p-3 bg-gray-700 text-white rounded-lg border border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          ></textarea>
        </div>
        <div className="text-center">
          <button
            type="submit"
            className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-lg shadow-md"
          >
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
