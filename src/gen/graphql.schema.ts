/*
 * -------------------------------------------------------
 * THIS FILE WAS AUTOMATICALLY GENERATED (DO NOT MODIFY)
 * -------------------------------------------------------
 */

/* tslint:disable */
/* eslint-disable */
export interface IQuery {
  fakeuser(id: string): Nullable<UserAuth> | Promise<Nullable<UserAuth>>;
  posts(): Nullable<Nullable<Post>[]> | Promise<Nullable<Nullable<Post>[]>>;
  post(id: string): Nullable<Post> | Promise<Nullable<Post>>;
  users(): Nullable<Nullable<User>[]> | Promise<Nullable<Nullable<User>[]>>;
  user(id: string): Nullable<User> | Promise<Nullable<User>>;
}

export interface UserAuth {
  id: string;
  username: string;
  password: string;
}

export interface Post {
  id: string;
  owner: string;
  content: string;
}

export interface User {
  id: number;
  username: string;
  posts?: Nullable<Nullable<Post>[]>;
}

type Nullable<T> = T | null;
