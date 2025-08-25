'use client';

import css from './NoteDetails.client.module.css';
import { useQuery, keepPreviousData } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';
import { useParams } from 'next/navigation';


export default function NoteDetailsClient() {

    const id = useParams().id as string;

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        placeholderData: keepPreviousData,
        refetchOnMount: false,
    });

    if (isLoading) return <p>Loading, please wait...</p>
    if (error || !note) return <p>Something went wrong.</p>;

    return (
        <div className={css.container}>
	      <div className={css.item}>
	        <div className={css.header}>
	          <h2>{note.title}</h2>
	        </div>
				<p className={css.content}>{note.content}</p>
	        <p className={css.date}>{note.createdAt}</p>
	      </div>
        </div>
    )
}