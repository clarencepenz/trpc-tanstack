import { NextRequest } from 'next/server';

export interface IContext {
  req?: NextRequest;
  resHeaders?: Headers;
}

export interface Todo{
  id: number;
  title: string;
  completed: boolean;
}