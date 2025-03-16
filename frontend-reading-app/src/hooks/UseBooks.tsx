import { useEffect, useState } from "react";
import axios from "axios";
import { Book, NewBook } from "../types/Types"

export function useBooks() {
  const [books, setBooks] = useState<Book[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchBooks = async () => {
      try {
        const token = localStorage.getItem("token");
        const response = await axios.get("http://127.0.0.1:8000/books", {
          headers: { Authorization: `Bearer ${token}` },
        });
        console.log("Response data:", response.data)
        setBooks(response.data);

    } catch (err) {
        setError("Error fetching books." + err );
      } finally {
        setLoading(false);
      }
    };

    fetchBooks();
  }, []);

  const addBook = async (newBook: NewBook) => {
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/books",
        newBook,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prevBooks) => [...prevBooks, response.data]);
    } catch (err) {
      setError("Error adding book.");
      console.error(err);
    }
  };

  const updateBook = async (id: string, field: keyof Book, value: string | number) => {
    try {
      const token = localStorage.getItem("token");
      await axios.put(
        `http://127.0.0.1:8000/books/${id}`,
        { [field]: value },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setBooks((prevBooks) =>
        prevBooks.map((book) =>
          book._id === id ? { ...book, [field]: value } : book
        )
      );
    } catch (err) {
      console.error("Error updating book:", err);
    }
  };

  const deleteBook = async (id: string) => {
    try {
      const token = localStorage.getItem("token");
      await axios.delete(`http://127.0.0.1:8000/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setBooks((prevBooks) => prevBooks.filter((book) => book._id !== id));
    } catch (err) {
      console.error("Error deleting book:", err);
    }
  };

  return { books, loading, error, addBook, updateBook, deleteBook };
}
