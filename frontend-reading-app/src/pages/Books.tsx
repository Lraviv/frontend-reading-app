import { useState } from "react";
import { useBooks } from "../hooks/UseBooks";
import Navbar from "../components/navbar";
import { ColumnDef, useReactTable, getCoreRowModel, flexRender } from "@tanstack/react-table";

// Books Component
export default function Books() {
  const [showAddBookForm, setShowAddBookForm] = useState(false);
  const [newBook, setNewBook] = useState({
    name: "",
    author: "",
    chapters: "",
    status: "reading",
    rating: 0,
  });

  const { books, loading, error, addBook, deleteBook, updateBook } = useBooks();

  // Table columns configuration
  const columns: ColumnDef<any>[] = [
    {
      accessorKey: "name",
      header: "Book Name",
      cell: ({ row }) => (
        <EditableCell row={row} field="name" updateBook={updateBook} />
      ),
    },
    {
      accessorKey: "author",
      header: "Author",
      cell: ({ row }) => (
        <EditableCell row={row} field="author" updateBook={updateBook} />
      ),
    },
    {
      accessorKey: "chapters",
      header: "Chapters",
      cell: ({ row }) => (
        <EditableCell row={row} field="chapters" updateBook={updateBook} />
      ),
    },
    {
      accessorKey: "status",
      header: "Status",
      cell: ({ row }) => (
        <EditableCell row={row} field="status" updateBook={updateBook} />
      ),
    },
    {
      accessorKey: "rating",
      header: "Rating",
      cell: ({ row }) => (
        <EditableCell row={row} field="rating" updateBook={updateBook} />
      ),
    },
    {
      id: "actions",
      header: "",
      cell: ({ row }) => (
        <button
          className="text-red-500 hover:text-red-700"
          onClick={() => deleteBook(row.original._id)}>
          <svg
            width="25px"
            height="25px"
            viewBox="0 0 24 24"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M10 12V17"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M14 12V17"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M4 7H20"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M6 10V18C6 19.6569 7.34315 21 9 21H15C16.6569 21 18 19.6569 18 18V10"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
            <path
              d="M9 5C9 3.89543 9.89543 3 11 3H13C14.1046 3 15 3.89543 15 5V7H9V5Z"
              stroke="#000000"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
        </button>
      ),
    },
  ];

  const table = useReactTable({
    data: books,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  // Handle Add Book Form submission
  const handleAddBook = (e: React.FormEvent) => {
    e.preventDefault();
    addBook(newBook);
    setNewBook({
      name: "",
      author: "",
      chapters: "",
      status: "reading",
      rating: 0,
    });
    setShowAddBookForm(false);
  };

  return (
    <div>
      <Navbar />
      <div className="p-6 max-w-5xl mx-auto">

        {loading && <p>Loading books...</p>}
        {error && <p className="text-red-500">{error}</p>}

        {/* Add Book Button */}
        <button
          className="bg-blue-500 text-white px-4 py-2 rounded mb-4"
          onClick={() => setShowAddBookForm(!showAddBookForm)}>
          {showAddBookForm ? "Cancel" : "Add Book"}
        </button>

        {/* Add Book Form */}
        {showAddBookForm && (
          <form onSubmit={handleAddBook} className="mb-4 p-4 bg-white shadow-md rounded">
            <div className="mb-4">
              <label htmlFor="name" className="block font-bold mb-2">
                Name
              </label>
              <input
                type="text"
                id="name"
                className="w-full px-3 py-2 border rounded"
                value={newBook.name}
                onChange={(e) => setNewBook({ ...newBook, name: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="author" className="block font-bold mb-2">
                Author
              </label>
              <input
                type="text"
                id="author"
                className="w-full px-3 py-2 border rounded"
                value={newBook.author}
                onChange={(e) => setNewBook({ ...newBook, author: e.target.value })}
                required
              />
            </div>
            <div className="mb-4">
              <label htmlFor="chapters" className="block font-bold mb-2">
                Chapters
              </label>
              <input
                type="text"
                id="chapters"
                className="w-full px-3 py-2 border rounded"
                value={newBook.chapters}
                onChange={(e) => setNewBook({ ...newBook, chapters: e.target.value })}
              />
            </div>
            <div className="mb-4">
              <label htmlFor="status" className="block font-bold mb-2">
                Status
              </label>
              <select
                id="status"
                className="w-full px-3 py-2 border rounded"
                value={newBook.status}
                onChange={(e) => setNewBook({ ...newBook, status: e.target.value })}>
                <option value="reading">Reading</option>
                <option value="completed">Completed</option>
                <option value="wishlist">Wishlist</option>
              </select>
            </div>
            <div className="mb-4">
              <label htmlFor="rating" className="block font-bold mb-2">
                Rating
              </label>
              <input
                type="number"
                id="rating"
                className="w-full px-3 py-2 border rounded"
                value={newBook.rating}
                onChange={(e) => setNewBook({ ...newBook, rating: +e.target.value })}
                min="0"
                max="5"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded">
              Add Book
            </button>
          </form>
        )}

        {/* Book Table */}
        {!loading && !error && (
          <div className="overflow-x-auto bg-white shadow-md rounded-lg p-4">
            <table className="w-full border-collapse">
              <thead className="bg-gray-800 text-white">
                {table.getHeaderGroups().map((headerGroup) => (
                  <tr key={headerGroup.id}>
                    {headerGroup.headers.map((header) => (
                      <th key={header.id} className="px-4 py-2 text-left">
                        {flexRender(header.column.columnDef.header, header.getContext())}
                      </th>
                    ))}
                  </tr>
                ))}
              </thead>
              <tbody>
                {table.getRowModel().rows.map((row) => (
                  <tr key={row.id} className="border-b group">
                    {row.getVisibleCells().map((cell) => (
                      <td key={cell.id} className="px-4 py-2">
                        {flexRender(cell.column.columnDef.cell, cell.getContext())}
                      </td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </div>
  );
}

// Editable Cell Component
function EditableCell({ row, field, updateBook }: any) {
  const [isEditing, setIsEditing] = useState(false);
  const [value, setValue] = useState(row.original[field]);

  const handleBlur = () => {
    if (value !== row.original[field]) {
      updateBook(row.original._id, field, value);
    }
    setIsEditing(false);
  };

  return isEditing ? (
    <input
      className="w-full border p-1 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
      value={value}
      onChange={(e) => setValue(e.target.value)}
      onBlur={handleBlur}
      autoFocus
    />
  ) : (
    <span
      className="cursor-pointer"
      onClick={() => setIsEditing(true)}
    >
      {value}
    </span>
  );
}
