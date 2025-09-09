import { NextRequest } from "next/server";

export interface IContext {
  req?: NextRequest;
  resHeaders?: Headers;
}
