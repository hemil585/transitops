import { eq } from "drizzle-orm";
import { db } from "../../db/index.js";
import { usersTable } from "./schema.js";

export const findUser = async (email: string) => {
    return await db.query.usersTable.findFirst({
        where: eq(usersTable.email, email),
        with: {
            role: true
        }
    });
};