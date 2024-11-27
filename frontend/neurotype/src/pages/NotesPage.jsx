// src/pages/NotesPage.jsx
import React, { useEffect, useState, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { AuthContext } from "../context/AuthContext";
import { Link, useNavigate } from "react-router-dom";

export const NotesPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const [notes, setNotes] = useState([]);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else {
      fetchNotes();
    }
  }, [token]);

  const fetchNotes = async () => {
    try {
      const response = await axiosInstance.get("/notes/");
      setNotes(response.data);
    } catch (error) {
      console.error("Error fetching notes:", error);
      alert("Error fetching notes");
    }
  };

  return (
    <div className="p-6">
      <h1 className="text-2xl mb-4">Your Notes</h1>
      <Link to="/notes/new" className="text-blue-500 mb-4 inline-block">
        Create New Note
      </Link>
      <ul>
        {notes.map((note) => (
          <li key={note.id} className="border p-4 mb-2">
            <Link to={`/notes/${note.id}`} className="text-xl">
              {note.title || "Untitled Note"}
            </Link>
            <p>{note.text}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};
