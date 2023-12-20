import { publicProcedure, router } from './trpc';
import z from 'zod'
import { pool } from './database'

export const appRouter = router({
    // ...
    getUser: publicProcedure
        .query(
            async () => {
                const user = await pool.query("select user_name from  users");
            }
        ),
    userById: publicProcedure
        .input(z.string())
        .query(async (opts) => {
            const { input } = opts;
            // Retrieve the user with the given ID
            const user = await pool.query("select * from users")
            console.log(user)
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