import { RelationshipStatus } from "@prisma/client";
import { Relationship } from "./userType";

export interface LoginDataFormat {
  email: string;
  password: string;
}

export interface RegisterDataFormat {
  name: string;
  email: string;
  password: string;
  address?: string;
  avatar?: string;
  relationship?: RelationshipStatus;
  work?: string;
}

export interface ProfileFormat {
  avatar: string;
  address: string;
  work: string;
  relationship: Relationship;
}