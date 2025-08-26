import { dehydrate, HydrationBoundary, QueryClient } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import NoteDetailsClient from './NoteDetails.client';
import { Metadata } from 'next';

interface PageProps {
	params: Promise<{ id: string }>
}


export default async function NoteDetails({ params }: PageProps) {

	const queryClient = new QueryClient();
	const { id } = await params;

	await queryClient.prefetchQuery({
		queryKey: ['note', id],
		queryFn: () => fetchNoteById(id),
	});

	return (
		<HydrationBoundary state={dehydrate(queryClient)}>
			<NoteDetailsClient />
		</HydrationBoundary>
	)

}

export const generateMetadata = async ({ params }: PageProps
): Promise<Metadata> => {
	const { id } = await params;

const note = await fetchNoteById(id);
	
	return {
		title: note.title,
		description: note.content.slice(0, 30),
		openGraph: {
			title: note.title,
			description: note.content.slice(0, 30),
			url: `/notes/${id}`,
			siteName: 'NoteHub',
			images: [{
				url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
				width: 1200,
				height: 630,
				alt: 'NoteHub app',
			}],
			type: 'article',
		}
	}
}