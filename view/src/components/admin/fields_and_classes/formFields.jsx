import { useRef } from "react";
import { useLocation } from "react-router-dom";
export default function SubjectsForm() {
  const class_name = useRef();
  const location = useLocation();
  const field = location.state || {};

  const updateClass = async () => {
    const response = await fetch(
      `http://localhost:8000/controller/adminController.php?action=updateSubject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectID: field.subjectID,
          subjectName: class_name.current.value,
        }),
      }
    );
    const data = await response.json();
    if (data.success === true) {
      alert(data.message);
      class_name.current.value = "";
    } else {
      alert(data.message);
    }
  };

  const createClass = async () => {
    const response = await fetch(
      `http://localhost:8000/controller/adminController.php?action=createSubject`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          subjectName: class_name.current.value,
        }),
      }
    );
    const data = await response.json();
    if (data.success === true) {
      class_name.current.value = "";
      alert(data.message);
    } else {
      alert(data.message);
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!field.subjectID) {
      createClass();
    } else {
      updateClass();
    }
  };
  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Subject</label>
          <input
            placeholder="example : information Security"
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            ref={class_name}
            defaultValue={field.subjectName}
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
