'use client'

import Modal from '@/components/Modal/Modal'
import css from './NotePreview.module.css'
import { useRouter } from 'next/navigation';
import { useQuery } from '@tanstack/react-query';
import { fetchNoteById } from '@/lib/api';


interface NotePreviewProps {
    id: string;
}

export const NotePreview = ({ id }: NotePreviewProps) => {
    
    const router = useRouter();

    const handleClose = () => {
        router.back();
    };

    const { data: note, isLoading, error } = useQuery({
        queryKey: ['note', id],
        queryFn: () => fetchNoteById(id),
        refetchOnMount: false,
    })

    if (isLoading) {
        return <p>Loading...</p>
    }
    if (error) {
        return <p>An error ocurred, ensure your connection and try again</p>
    }
    if (!note) {
        return <p>Failed to load notes</p>
    }
    
    

    return (
        <Modal onClose={handleClose}>
            <div className={css.container}>
                <div className={css.item}>
                    <div className={css.header}>
                        <h2>{note.title}</h2>
                        <button className={css.backBtn} onClick={handleClose}>
                            Close
                        </button>
                    </div>
                    <div className={css.content}>
                        {note.content}
                    </div>
                    <div className={css.contDiv}>
                        <div className={css.tag}>
                            {note.tag}
                        </div>
                        <div className={css.date}>
                            {note.createdAt}
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}

export default NotePreview;