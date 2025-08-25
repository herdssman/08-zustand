'use client'

import { useState, useEffect } from 'react'
import { useQuery, keepPreviousData } from '@tanstack/react-query'
import { useDebounce } from 'use-debounce';
import css from './Notes.client.module.css'
import NoteList from '@/components/NoteList/NoteList'
import { fetchNotes } from '@/lib/api'
import SearchBox from '@/components/SearchBox/SearchBox'
import Pagination from '@/components/Pagination/Pagination';
import { Note } from '@/types/note';
import { Tag } from '@/types/tag';
import Link from 'next/link';


export interface NotesClientProps {
    notes: Note[];
    totalPages: number;
    tag?: string;
}


export default function NotesClient({notes, totalPages: serverTotalPages, tag}: NotesClientProps) {

  const [search, setSearch] = useState('');
  const [debouncedSearch] = useDebounce(search, 300)
  const [page, setPage] = useState(1);
  

  const perPage = 15;
  const sortBy = 'created'; 
  


  const { data, isSuccess } = useQuery({
    queryKey: ['notes', debouncedSearch, page, perPage, sortBy],
    queryFn: () => fetchNotes({
      search: debouncedSearch,
      page,
      perPage,
      sortBy,
    }, tag as Tag),
      placeholderData: keepPreviousData,
      initialData: {
          notes,
          totalPages: serverTotalPages,
    }
    
  })


  const total = data?.totalPages ?? 0;


  useEffect(() => {
    setPage(1);
  }, [debouncedSearch]);


  return (
    <div className={css.app}>
      <header className={css.toolbar}>

        <SearchBox value={search} onChange={setSearch} />

        {isSuccess && total > 1 && (
          <Pagination currentPage={page} totalPages={total} onPageChange={setPage} />)}
      
        <Link href={'/notes/action/create'} className={css.button}>Create note +</Link>

      </header>

      {isSuccess && data.notes.length > 0 && <NoteList notes={data.notes} />}

    </div>
  )
}

