import type { Tag } from "./tag";

export interface Note{
    id: string;
    title: string;
    content: string;
    createdAt: string;
    updatedAt: string;
    tag: Tag;
}