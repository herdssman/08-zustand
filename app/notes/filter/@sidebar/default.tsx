import css from './SidebarNotes.module.css';
import Link from 'next/link';
import { Tag } from '@/types/tag';

export const tags: Tag[] = ["Work", "Personal", "Meeting", "Shopping", "Todo"];

export const SidebarNotes = () => {

    return (
        <ul className={css.menuList}>
            <li className={css.menuItem}>
                <Link href={`/notes/filter/All`} className={css.menuLink}>All Notes</Link>
            </li>
            {tags.map((tag) => (
                <li key={tag} className={css.menuItem}>
                    <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link>
                </li>
            ))}
        </ul>
    )
}

export default SidebarNotes;