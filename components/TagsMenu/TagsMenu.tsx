'use client'

import css from './TagsMenu.module.css';
import Link from 'next/link';
import { useEffect, useRef, useState } from 'react';
import { tags } from '@/app/notes/filter/@sidebar/default';


const TagsMenu = () => {

    const [isActive, setIsActive] = useState(false);
    const ref = useRef<HTMLDivElement>(null);

    useEffect(() => {
        const handleClickOutside = (e: MouseEvent) => {
            if (ref.current && !ref.current.contains(e.target as Node)) {
                setIsActive(false);
            }
        };

        document.addEventListener('mousedown', handleClickOutside);
        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, []);

    const handleClick = () => {
        setIsActive(!isActive);
    }

    return (
        <div ref={ref} className={css.menuContainer}>
          <button className={css.menuButton} onClick={handleClick}>
            Notes ▾
          </button>
            <ul className={`${css.menuList} ${isActive ? css.active : css.inactive}`} onClick={() => setIsActive(false)}>
                    <li className={css.menuItem}>
                        <Link href={`/notes/filter/All`} className={css.menuLink}>All Notes</Link> 
                    </li> 
                {tags.map((tag)=>(
                    <li key={tag} className={css.menuItem}>
                        <Link href={`/notes/filter/${tag}`} className={css.menuLink}>{tag}</Link> 
                    </li> 
                ))}
            </ul>
        </div>
    )
}

export default TagsMenu;