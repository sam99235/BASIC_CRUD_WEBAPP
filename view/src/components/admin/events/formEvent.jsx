import { useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";
import { useState } from "react";
export default function EventsForm() {
  const location = useLocation();
  const event = location.state || "";
  console.log("event id :  " + event.eventID);

  const nameRef = useRef();
  const dateRef = useRef();
  const descriptionRef = useRef();
  const imageRef = useRef();

  useEffect(() => {
    if (event !== "") {
      nameRef.current.value = event.title;
      dateRef.current.value = event.date;
      descriptionRef.current.value = event.description;
      imageRef.current = event.image;
    }
  }, []);

  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result
        .replace("data:", "")
        .replace(/^.+,/, "");
      imageRef.current = base64String; // Store in useRef
    };
    reader.readAsDataURL(file);
  };

  const createEvent = async () => {
    const respone = await fetch(
      "http://localhost:8000/controller/adminController.php?action=create_event",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: nameRef.current.value,
          date: dateRef.current.value,
          description: descriptionRef.current.value,
          image: imageRef.current,
        }),
      }
    );
    const result = await respone.json();
    if (result.done === true) {
      alert(result.message);
      nameRef.current.value = "";
      dateRef.current.value = "";
      descriptionRef.current.value = "";
      imageRef.current = null;
    } else {
      alert(result.message);
    }
  };
  const updateEvent = async () => {
    const respone = await fetch(
      "http://localhost:8000/controller/adminController.php?action=update_event",
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          eventID: event.eventID,
          title: nameRef.current.value,
          date: dateRef.current.value,
          description: descriptionRef.current.value,
          image: imageRef.current,
        }),
      }
    );
    const result = await respone.json();
    if (result.done === true) {
      alert(result.message);
      nameRef.current.value = "";
      dateRef.current.value = "";
      descriptionRef.current.value = "";
      imageRef.current = null;
    } else {
      alert(result.message);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log(dateRef.current.value);
    if (event.eventID !== undefined) {
      updateEvent();
    } else {
      createEvent();
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
            htmlFor="event_date"
            className="block text-sm font-medium mb-2"
          >
            Image
          </label>
          <input
            type="file"
            onChange={handleImageUpload}
            ref={imageRef}
            className="w-full p-3 bg-gray-700 text-white border
             border-gray-600 focus:outline-none focus:ring-2 focus:ring-blue-500 rounded-lg file:rounded-md
             file:border-0 file:text-gray-300 file:bg-gray-500
             "
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
