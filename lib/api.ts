import axios from 'axios';
import type { Note } from '../types/note';
import type { CreateNote } from '../types/createNote'
import { Tag } from '@/types/tag';

axios.defaults.baseURL = 'https://notehub-public.goit.study/api';
const NOTEHUB_TOKEN = process.env.NEXT_PUBLIC_NOTEHUB_TOKEN;

interface NoteServiceProps {
    notes: Note[];
    totalPages: number;
}

interface FetchNotesParams {
    page: number;
    perPage: number;
    search?: string ;
    sortBy: Sort;
    tag?: string;
}
  
type Sort = 'created' | 'updated';


export async function fetchNotes({ search, page, perPage, sortBy }: FetchNotesParams, tag?: Tag): Promise<{ notes: Note[]; totalPages: number }> {
    
    const params = {
        page,
        perPage,
        sortBy,
    } as { page: number; perPage: number; sortBy: string; search?: string; tag?: Tag};

    if (search?.trim() !== '') {
        params.search = search?.trim();
    }
    
    if (tag) {
        params.tag = tag;
    }

    try {
        const response = await axios.get<NoteServiceProps>(`/notes`,
            {
                params ,
                headers: {
                    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
                },
            }
        );
        const { notes, totalPages } = response.data;

        return { notes, totalPages };

    } catch {
        throw new Error('Failed to load notes. Please ensure your connection and try again')
    }

}

export async function createNote(newNote: CreateNote): Promise<Note> {
    
    try {
        const response = await axios.post<Note>(`/notes`, newNote, 
            {
                headers: {
                    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
                }
            }
        )
        return response.data;

    } catch {
        throw new Error('Failed to create note. Please ensure your connection and try again')
    }
}

export async function deleteNote(noteId: string): Promise<Note> {

    try {
        const response = await axios.delete<Note>(`/notes/${noteId}`,
            {
                headers: {
                    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
                }
            }
        );
        return response.data;

    } catch {
        throw new Error("Failed to delete note. Please ensure your connection and try again");
    }
}

export async function fetchNoteById(id: string): Promise<Note> {

    try {
        const response = await axios.get<Note>(`/notes/${id}`,
            {
                headers: {
                    Authorization: `Bearer ${NOTEHUB_TOKEN}`,
                },
            }
        );
        return response.data;

    } catch {
        throw new Error("Failed to load this note. Please ensure your connection and try again");
    }
}