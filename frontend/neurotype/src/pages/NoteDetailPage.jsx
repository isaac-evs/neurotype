// src/pages/NoteDetailPage.jsx
import React, { useState, useEffect, useContext } from "react";
import axiosInstance from "../api/axiosInstance";
import { useParams, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

export const NoteDetailPage = () => {
  const { token } = useContext(AuthContext);
  const navigate = useNavigate();
  const { noteId } = useParams();
  const [note, setNote] = useState({ text: "" });
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    if (!token) {
      navigate("/login");
    } else if (noteId === "new") {
      setIsEditing(true);
    } else {
      fetchNote();
    }
  }, [token, noteId]);

  const fetchNote = async () => {
    try {
      const response = await axiosInstance.get(`/notes/`);
      const noteData = response.data.find((n) => n.id === parseInt(noteId));
      setNote(noteData || { text: "" });
    } catch (error) {
      console.error("Error fetching note:", error);
      alert("Error fetching note");
    }
  };

  const handleSave = async () => {
    try {
      if (noteId === "new") {
        await axiosInstance.post("/notes/", {
          text: note.text,
        });
      } else {
        await axiosInstance.put(`/notes/${noteId}`, {
          text: note.text,
        });
      }
      alert("Note saved");
      navigate("/notes");
    } catch (error) {
      console.error("Error saving note:", error);
      alert("Error saving note");
    }
  };

  const handleDelete = async () => {
    try {
      await axiosInstance.delete(`/notes/${noteId}`);
      alert("Note deleted");
      navigate("/notes");
    } catch (error) {
      console.error("Error deleting note:", error);
      alert("Error deleting note");
    }
  };

  return (
    <div className="p-6">
      <button onClick={() => navigate("/notes")} className="text-blue-500 mb-4">
        Back to Notes
      </button>
      {isEditing || noteId === "new" ? (
        <>
          <textarea
            className="border p-2 w-full h-64 mb-4"
            value={note.text}
            onChange={(e) => setNote({ ...note, text: e.target.value })}
          ></textarea>
          <button
            onClick={handleSave}
            className="bg-green-500 text-white p-2 rounded mr-2"
          >
            Save
          </button>
          {noteId !== "new" && (
            <button
              onClick={handleDelete}
              className="bg-red-500 text-white p-2 rounded"
            >
              Delete
            </button>
          )}
        </>
      ) : (
        <>
          <p>{note.text}</p>
          <button
            onClick={() => setIsEditing(true)}
            className="bg-yellow-500 text-white p-2 rounded mt-4"
          >
            Edit
          </button>
        </>
      )}
    </div>
  );
};
