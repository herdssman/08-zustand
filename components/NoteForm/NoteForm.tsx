'use client'

import css from './NoteForm.module.css';
import { createNote } from '../../lib/api';
import type { CreateNote } from '../../types/createNote';
import * as Yup from 'yup';
import { useQueryClient, useMutation } from '@tanstack/react-query';
import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';
import { NoteFormValues } from '@/types/NoteFormValues';
import { useNoteDraftStore } from '@/lib/store/noteStore';


const validationSchema = Yup.object({
  title: Yup.string()
    .min(3, 'Minimum 3 characters')
    .max(50, 'Maximum 50 characters')
    .required('Title is required'),

  content: Yup.string()
    .max(500, 'Maximum 500 characters'),

  tag: Yup.string()
    .oneOf(['Todo', 'Work', 'Personal', 'Meeting', 'Shopping'], 'Invalid tag')
    .required('Tag is required'),
});

const initialValues: NoteFormValues = {
    title: '',
    content: '',
    tag: 'Todo'
}

interface NoteFormProps {
  onClose?: () => void;
  onSuccess?: () => void;
}


export default function NoteForm({ onSuccess }: NoteFormProps) {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [values, setValues] = useState<NoteFormValues>(initialValues);
    const [errors, setErrors] = useState<{ [key: string]: string }>({});

    const queryClient = useQueryClient();

    const { draft, setDraft, clearDraft } = useNoteDraftStore();

    const router = useRouter();

    const mutation = useMutation({
        mutationFn: (noteData: CreateNote) => createNote(noteData),
    })

    const handleValidation = async (): Promise<boolean> => {
        try {
            await validationSchema.validate(values, { abortEarly: false });
            setErrors({});
            return true;
        } catch (error: unknown) {
            if (error instanceof Yup.ValidationError) {
                const newErrors: { [key: string]: string } = {};
                error.inner.forEach((err) => {
                    if (err.path) newErrors[err.path] = err.message;
                });
                setErrors(newErrors);
                return false;
            }
            throw error;
        }
    };

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();

        const isValid = await handleValidation();
        if (!isValid) return;

        setIsSubmitting(true);

        mutation.mutate(values, {
            onSuccess: async () => {
                setValues(initialValues)
                setIsSubmitting(false);
                await queryClient.invalidateQueries({ queryKey: ["notes"] });
                if (onSuccess) onSuccess();
                clearDraft();
                router.back()
            },
            onError: () => {
                setIsSubmitting(false);
            }
        });
    };

    useEffect(() => {
        if (draft && values === initialValues) {
            setValues(draft);
        }
    }, [draft, values]);


    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        const { name, value } = e.target;
        setValues(prev => ({ ...prev, [name]: value }));
        setDraft({ ...draft, [e.target.name]: e.target.value, });
    };


    return (
        <form className={css.form} onSubmit={handleSubmit}>

            <div className={css.formGroup}>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    name="title"
                    type="text"
                    className={css.input}
                    value={values.title}
                    onChange={handleChange}
                />
                {errors.title && <span className={css.error}>{errors.title}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="content">Content</label>
                <textarea
                    id="content"
                    name="content"
                    rows={8}
                    className={css.textarea}
                    value={values.content}
                    onChange={handleChange}
                />
                {errors.content && <span className={css.error}>{errors.content}</span>}
            </div>

            <div className={css.formGroup}>
                <label htmlFor="tag">Tag</label>
                <select
                    id="tag"
                    name="tag"
                    className={css.select}
                    value={values.tag}
                    onChange={handleChange}
                >
                    <option value="Todo">Todo</option>
                    <option value="Work">Work</option>
                    <option value="Personal">Personal</option>
                    <option value="Meeting">Meeting</option>
                    <option value="Shopping">Shopping</option>
                </select>
                {errors.tag && <span className={css.error}>{errors.tag}</span>}
            </div>

            <div className={css.actions}>
                <button type="button" className={css.cancelButton} onClick={()=>router.back()}>
                    Cancel
                </button>
                <button type="submit" className={css.submitButton} disabled={isSubmitting}>
                    Create note
                </button>
            </div>

        </form>
    )
}