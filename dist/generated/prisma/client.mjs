import * as path from 'node:path';
import { fileURLToPath } from 'node:url';
globalThis['__dirname'] = path.dirname(fileURLToPath(import.meta.url));
import * as $Class from "./internal/class.mjs";
import * as Prisma from "./internal/prismaNamespace.mjs";
export * as $Enums from './enums.mjs';
export * from "./enums.mjs";
export const PrismaClient = $Class.getPrismaClientClass(__dirname);
export { Prisma };
//# sourceMappingURL=client.mjs.map