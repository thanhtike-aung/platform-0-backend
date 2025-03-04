export interface Post {
    id: number;
    content: string;
    published: boolean;
    author_id: number;
    created_at?: Date;
    updated_at?: Date;
}