import axios from 'axios';
import type { Note } from '@/types/note';

const TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;
const BASE_URL = 'https://notehub-public.goit.study/api/notes';

const headers = {
  Authorization: `Bearer ${TOKEN}`,
};

export async function fetchNotes(search = '', page = 1): Promise<Note[]> {
  const cleanSearch = typeof search === 'string' ? search.trim() : '';
  const cleanPage = Number.isInteger(page) && page > 0 ? page : 1;

  console.log('Fetching notes with:', {
    search: cleanSearch,
    page: cleanPage,
    headers,
  });

  const response = await axios.get(BASE_URL, {
    headers,
    params: {
      search: cleanSearch,
      page: cleanPage,
      perPage: 12,
    },
  });

  return response.data.notes;
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
