"use client";

import {
  faCircleCheck,
  faTrash,
  faPhoneAlt,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { useState } from "react";

export default function Home() {
  const [students, setStudents] = useState([
    { name: "John Doe", phone: "123-456-7890", present: true },
    { name: "Jane Smith", phone: "987-654-3210", present: true },
    { name: "Michael Johnson", phone: "555-123-4567", present: true },
  ]);
  const [name, setName] = useState("");
  const [phone, setPhone] = useState("");
  const [total, setTotal] = useState(students.length);
  const [present, setPresent] = useState(
    students.filter((student) => student.present).length
  );
  const [absent, setAbsent] = useState(
    students.filter((student) => !student.present).length
  );

  const handleAddStudent = () => {
    if (name && phone) {
      const newStudent = { name, phone, present: true };
      setStudents([...students, newStudent]);
      setName("");
      setPhone("");
      setTotal(total + 1);
      setPresent(present + 1);
    }
  };

  const togglePresence = (index) => {
    const updatedStudents = [...students];
    updatedStudents[index].present = !updatedStudents[index].present;
    setStudents(updatedStudents);

    const presentCount = updatedStudents.filter(
      (student) => student.present
    ).length;
    const absentCount = updatedStudents.filter(
      (student) => !student.present
    ).length;

    setPresent(presentCount);
    setAbsent(absentCount);
  };

  const handleDelete = (index) => {
    const updatedStudents = [...students];
    updatedStudents.splice(index, 1);
    setStudents(updatedStudents);

    const presentCount = updatedStudents.filter(
      (student) => student.present
    ).length;
    const absentCount = updatedStudents.filter(
      (student) => !student.present
    ).length;

    setPresent(presentCount);
    setAbsent(absentCount);
    setTotal(updatedStudents.length);
  };

  const handlePhoneClick = (phone) => {
    alert(`Dialing ${phone}...`);
  };

  return (
    <div className="bg-gradient-to-r from-indigo-500 to-purple-700 text-white px-6 py-8 min-h-screen">
      <h1 className="text-center text-4xl sm:text-5xl md:text-6xl font-bold mb-10 tracking-widest">
        Student Counter
      </h1>
      <div className="text-center text-lg sm:text-xl font-semibold mb-6">
        <div className="flex sm:flex-row flex-col justify-center items-center space-x-6 sm:space-x-0 sm:space-y-0 space-y-4">
          <div className="flex items-center">
            <span className="text-blue-500">Total:</span>
            <span className="bg-blue-500 text-white px-3 py-1 rounded-lg ml-2">
              {total}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-green-400">Present:</span>
            <span className="bg-green-500 text-white px-3 py-1 rounded-lg ml-2">
              {present}
            </span>
          </div>
          <div className="flex items-center">
            <span className="text-red-400">Absent:</span>
            <span className="bg-red-500 text-white px-3 py-1 rounded-lg ml-2">
              {absent}
            </span>
          </div>
        </div>
      </div>

      <div className="w-full sm:w-9/12 md:w-7/12 mx-auto bg-white p-6 rounded-lg shadow-xl">
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter student name"
          className="border-b-2 w-full py-2 px-4 mb-4 text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          placeholder="Enter student phone number"
          className="border-b-2 w-full py-2 px-4 mb-6 text-gray-800 bg-transparent focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <button
          onClick={handleAddStudent}
          className="w-full py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition ease-in-out duration-300"
        >
          Add Student
        </button>
      </div>

      <div className="mt-10 w-full sm:w-9/12 md:w-7/12 mx-auto">
        <h2 className="text-2xl text-center font-semibold mb-4 text-white">
          Student List
        </h2>
        <ul className="list-none space-y-4">
          {students.map((student, index) => (
            <li
              key={index}
              className="flex justify-between items-center p-4 bg-gray-800 rounded-lg shadow-md"
            >
              <div className="flex items-center">
                <input
                  type="checkbox"
                  checked={student.present}
                  onChange={() => togglePresence(index)}
                  className="mr-4"
                />
                <span
                  className={`text-white ${
                    student.present ? "font-semibold" : "text-red-500"
                  }`}
                >
                  {student.name}
                </span>
              </div>
              <div className="flex items-center space-x-4">
                <FontAwesomeIcon
                  icon={faPhoneAlt}
                  onClick={() => handlePhoneClick(student.phone)}
                  className="text-blue-400 hover:text-blue-500 cursor-pointer"
                />
                <FontAwesomeIcon
                  icon={faTrash}
                  onClick={() => handleDelete(index)}
                  className="text-red-400 hover:text-red-500 cursor-pointer"
                />
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}
