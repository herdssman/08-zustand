import { fetchNotes } from '@/lib/api';
import NotesClient from './Notes.client';
import { Tag } from '@/types/tag';
import { tags } from '../@sidebar/default';
import { Metadata } from 'next';

interface SlugProps {
    params: Promise<{ slug?: string[] }>;
}

export default async function NotesPage({ params }: SlugProps) {
    const { slug } = await params;
    const search = '';
    const page = 1;
    const perPage = 15;
    const sortBy = 'created';
    const rawTag = slug?.[0];
    const tag = rawTag === 'all' || !tags.includes(rawTag as Tag) ? undefined: (rawTag as Tag);

    const { notes, totalPages } = await fetchNotes({
        search,
        page, 
        perPage,
        sortBy,
    }, tag)

    return (
        <div>
            <NotesClient notes={notes} totalPages={totalPages} tag={tag} />
        </div>
    );
}

export const generateMetadata = async ({ params }: SlugProps
): Promise<Metadata> => {
    const { slug } = await params;
    const rawTag = slug?.[0];
    const tag = rawTag === 'all' || !tags.includes(rawTag as Tag) ? undefined : (rawTag as Tag);

    const title = !tag ? 'All notes' : `${tag} notes`;

    const description = !tag ? 'Take a look at all notes' : `Take a look at ${tag.toLowerCase()} notes`;

    const url = !tag ? `/notes/filter/All` : `/notes/filter/${tag.toLowerCase()}`
    
    return {
        title,
        description,
        openGraph: {
            title,
            description,
            url,
            siteName: 'NoteHub',
            images: [{
                url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
                width: 1200,
                height: 630,
                alt: 'NoteHub app',
            }],
            type: 'website',
        }
    }
}







