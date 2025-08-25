import css from './CreateNote.module.css';
import NoteForm from '@/components/NoteForm/NoteForm';
import { Metadata } from 'next';


const CreateNote = () => {

    return (
        <main className={css.main}>
            <div className={css.container}>
                <h1 className={css.title}>Create note</h1>
                <NoteForm />
            </div>
        </main>
    );
}

export default CreateNote;


export const metadata: Metadata = {
  title: 'Create note',
  description: 'Create your note on NoteHub',
  openGraph: {
    title: 'Create note',
    description: 'Create your note on NoteHub',
    url: '/notes/action/create',
    siteName: 'NoteHub',
    images: [{
      url: 'https://ac.goit.global/fullstack/react/notehub-og-meta.jpg',
      width: 1200,
      height: 630,
      alt: 'NoteHub app',
    }],
    type: 'article',
  }
};