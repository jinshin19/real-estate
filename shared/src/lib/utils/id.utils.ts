// NestJs Imports
import { ulid } from "ulidx";

export const SYSTEM_ID = (custom: string = "RL") => `${custom}-${ulid()}`;
