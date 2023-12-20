import { publicProcedure, router } from './trpc';
import z from 'zod'
import {pool} from './database'

export const appRouter = router({
    // ...
    userById: publicProcedure.input((val: unknown) => {

        // If the value is of type string, return it.
        // It will now be inferred as a string.
        if (typeof val === 'string') return val;

        // Uh oh, looks like that input wasn't a string.
        // We will throw an error instead of running the procedure.
        throw new Error(`Invalid input: ${typeof val}`);
    })
        .query(async (opts) => {

            const { input } = opts;
            // Retrieve the user with the given ID
            const user = await pool.query("select * from users");
            return user;
        }),

    userCreate: publicProcedure
        .input(z.object({ name: z.string() }))
        .mutation(async (opts) => {
            const { input } = opts;
            // Create a new user in the database
            const user = await pool.execute("insert into users (user_name) values (?)", [input.name])

            return user;
        }),
});

export type appRouter = typeof appRouter