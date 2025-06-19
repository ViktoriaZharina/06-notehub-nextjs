'use client';

import { useQuery } from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import { useState } from 'react';
import type { Note } from '@/types/note';

export default function NotesClient() {
  const [search, setSearch] = useState('');
  const [page, setPage] = useState(1);

  const {
    data: notes,
    isLoading,
    isError,
    error,
  } = useQuery<Note[]>({
    queryKey: ['notes', search, page],
    queryFn: () => fetchNotes(search, page),
  });

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const input = form.elements.namedItem('query') as HTMLInputElement;
    setSearch(input.value);
    setPage(1);
  };

  return (
    <div>
      <h1>Notes</h1>

      <form onSubmit={handleSearch}>
        <input type="text" name="query" placeholder="Search notes..." />
        <button type="submit">Search</button>
      </form>

      {isLoading && <p>Loading...</p>}
      {isError && <p>Error: {error.message}</p>}
      {notes?.length === 0 && <p>No notes found.</p>}

      <ul>
        {notes?.map((note) => (
          <li key={note.id}>
            <h2>{note.title}</h2>
            <p>{note.content}</p>
            <p>{new Date(note.createdAt).toLocaleDateString()}</p>
            <a href={`/notes/${note.id}`}>View details</a>
          </li>
        ))}
      </ul>
    </div>
  );
}
