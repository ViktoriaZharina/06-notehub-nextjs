import axios from 'axios';
import type { Note } from '@/types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api/notes';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export async function fetchNotes(search = '', page = 1): Promise<Note[]> {
  console.log('TOKEN:', TOKEN);
  const response = await axios.get(BASE_URL, {
    headers,
    params: {
      search: search.trim(),
      page,
      perPage: 12,
    },
  });

  return response.data.notes;
}

export async function fetchNoteById(id: number): Promise<Note> {
  const response = await axios.get(`${BASE_URL}/${id}`, { headers });
  return response.data;
}

export async function removeNote(id: number): Promise<Note> {
  const response = await axios.delete(`${BASE_URL}/${id}`, { headers });
  return response.data;
}

export async function createNote(
  title: string,
  content: string
): Promise<Note> {
  const response = await axios.post(BASE_URL, { title, content }, { headers });
  return response.data;
}
