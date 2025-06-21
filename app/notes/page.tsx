// app/notes/page.tsx

import {
  HydrationBoundary,
  dehydrate,
  QueryClient,
} from '@tanstack/react-query';
import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';

export default async function NotesPage() {
  const initialQuery = '';
  const initialPage = 1;

  const queryClient = new QueryClient();
  await queryClient.prefetchQuery({
    queryKey: ['Notes', initialQuery, initialPage],
    queryFn: () => fetchNotes(initialQuery, initialPage),
  });

  return (
    <HydrationBoundary state={dehydrate(queryClient)}>
      <NotesClient initialQuery={initialQuery} initialPage={initialPage} />
    </HydrationBoundary>
  );
}
