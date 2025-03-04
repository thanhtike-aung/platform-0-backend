export interface User {
    id: number;
    name: string;
    email: string;
    profile?: any;
    created_at: Date;
    updated_at: Date;
}

export interface Profile {
    id: number;
    user_id: number;
    avatar?: string;
    address?: string;
    work?: string;
    relationship?: Relationship;
    created_at: Date;
    updated_at: Date;
}

export type Relationship = "single" | "in_relationship" | "married" | "complicated"; 