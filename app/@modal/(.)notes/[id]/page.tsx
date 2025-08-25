import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NotePreview from './NotePreview.client';

interface ModalNotePreviewProps {
	params: Promise<{ id: string }>
}

export default async function ModalNotePreview({ params }: ModalNotePreviewProps) {

	const queryClient = new QueryClient();
    const { id } = await params;

    await queryClient.prefetchQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id)
    });

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
            <NotePreview id={id}/>
		</HydrationBoundary>
	)
}