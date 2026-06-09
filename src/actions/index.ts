import { realServer } from "./handlers";

export const server = (import.meta.env.BASE_URL !== "/" ? {} : realServer) as typeof realServer;
