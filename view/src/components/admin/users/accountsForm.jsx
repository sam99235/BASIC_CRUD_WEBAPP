import { useState, useEffect, useRef } from "react";
import { useLocation } from "react-router-dom";

export default function AccountsForm() {
  const location = useLocation();
  const user = location.state || {};
  const { defaultAccount } = location.state || "";

  const [classes, setClasses] = useState([]);
  const [fields, setFields] = useState([]);

  const name = useRef();
  const email = useRef();
  const password = useRef();
  const accountType = useRef();
  const studentClass = useRef();
  const teacherSubject = useRef();

  const classLabel = useRef();
  const subjectLabel = useRef();

  const fetchClasses = async () => {
    const request = await fetch(
      `http://localhost:8000/controller/adminController.php?action=display_classes`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    setClasses(response);
  };

  const fetchFields = async () => {
    const request = await fetch(
      `http://localhost:8000/controller/adminController.php?action=display_fields`,
      {
        method: "GET",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
      }
    );
    const response = await request.json();
    setFields(response);
  };

  const createAccount = async () => {
    const request = await fetch(
      `http://localhost:8000/controller/adminController.php?action=create_account`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          accountType: accountType.current.value,
          studentClass: studentClass.current.value,
          teacherSubject: teacherSubject.current.value,
        }),
      }
    );

    const response = await request.json();
    if (response.done) {
      alert(response.message);
      resetForm();
    } else {
      alert(response.message);
    }
  };

  const modifyAccount = async () => {
    const request = await fetch(
      `http://localhost:8000/controller/adminController.php?action=update_account`,
      {
        method: "POST",
        credentials: "include",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          userID: user.userID,
          name: name.current.value,
          email: email.current.value,
          password: password.current.value,
          accountType: accountType.current.value,
          studentClass: studentClass.current.value,
          teacherSubject: teacherSubject.current.value,
        }),
      }
    );
    const response = await request.json();
    if (response.done === true) {
      alert(response.message);
      resetForm();
    } else {
      alert(response.message);
    }
  };

  const resetForm = () => {
    name.current.value = "";
    email.current.value = "";
    password.current.value = "";
    accountType.current.value = "";
    studentClass.current.value = "";
    teacherSubject.current.value = "";
  };

  const matchAccountType = () => {
    if (accountType.current.value === "Student") {
      subjectLabel.current.classList.add("hidden");
      teacherSubject.current.classList.add("hidden");
      classLabel.current.classList.remove("hidden");
      studentClass.current.classList.remove("hidden");
      fetchClasses();
    } else if (accountType.current.value === "Teacher") {
      classLabel.current.classList.add("hidden");
      studentClass.current.classList.add("hidden");
      subjectLabel.current.classList.remove("hidden");
      teacherSubject.current.classList.remove("hidden");
      fetchFields();
    } else {
      studentClass.current.classList.add("hidden");
      classLabel.current.classList.add("hidden");
      teacherSubject.current.classList.add("hidden");
      subjectLabel.current.classList.add("hidden");
    }
  };

  useEffect(() => {
    if (user && user.userID) {
      name.current.value = user.name || "";
      email.current.value = user.email || "";
      password.current.value = user.password || "";
      accountType.current.value = user.type || "";
      teacherSubject.current.value = user.subjectID || "";
      studentClass.current.value = user.classID || "";
    }
    fetchClasses();
    fetchFields();
  }, [user]);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!user.userID) {
      createAccount();
    } else {
      modifyAccount();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-gray-800 text-white rounded-lg shadow-lg">
      <form onSubmit={handleSubmit} onChange={matchAccountType}>
        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Name</label>
          <input
            placeholder="example : Jhon Doe"
            type="text"
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            ref={name}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Email</label>
          <input
            placeholder="example : Jhondoe@example.com"
            type="email"
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            ref={email}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Password</label>
          <input
            placeholder="insert a password here"
            type="password"
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
            ref={password}
          />
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2">Account Type</label>
          <select
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            onChange={matchAccountType}
            ref={accountType}
            defaultValue={defaultAccount}
          >
            <option value="Student">Student</option>
            <option value="Teacher">Teacher</option>
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" ref={classLabel}>
            Class
          </label>
          <select
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={studentClass}
          >
            <option value="">Select a class</option>
            {classes.map((element) => (
              <option key={element.classID} value={element.classID}>
                {element.className}
              </option>
            ))}
          </select>
        </div>

        <div className="mb-4">
          <label className="block text-sm font-medium mb-2" ref={subjectLabel}>
            Subject
          </label>
          <select
            className="w-full p-3 bg-slate-700 text-white rounded-lg border border-gray-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            ref={teacherSubject}
          >
            <option value="">Select a subject</option>
            {fields.map((element) => (
              <option key={element.subjectID} value={element.subjectID}>
                {element.subjectName}
              </option>
            ))}
          </select>
        </div>

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
  );
}
