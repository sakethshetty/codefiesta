import { publicProcedure, router } from './trpc';
import z from 'zod'
import { pool } from './database'
import { TRPCError } from '@trpc/server'
import axios from 'axios'
import { sha512 } from 'js-sha512';
import { constants } from 'buffer';
import fs from 'fs'

export const appRouter = router({
    // ...
    addContest: publicProcedure
        .input(z.object({
            contestid: z.string(),
            secretkey: z.string()
        }))
        .mutation(async (opts) => {

            const { input } = opts;
            if (input.secretkey != 'gdscisthebest') {

                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            await pool.query("insert into contest values (?,?,?,?,?) on duplicate key update contest_name=?, contest_date=?, contesturl=?, soln_link=?", [input.contestid, "contest name", "2023-12-15", "myurl", "solnurl", "contestname", "2023-12-15", "contesturl", "solnurl"])
            // console.log(res)

            const randomCode = Math.floor(Math.random() * (999999 - 100000) + 100000)

            const apiKey = '6a349e2b9ccc6a43d79a2e4018411c457731eb02'

            const miltime = Math.floor(Date.now() / 1000);

            const shaCode = sha512(`${randomCode}/contest.standings?apiKey=${apiKey}&contestId=${input.contestid}&time=${miltime}#7fb590fbb06cbae644e0c9d7afcc10612c23bb4d`)

            const standings = await axios.get(`https://codeforces.com/api/contest.standings?contestId=${input.contestid}&apiKey=${apiKey}&time=${miltime}&apiSig=${randomCode}${shaCode}`, { timeout: 10000 })

            console.log(standings);

            const rankList = standings.data.result.rows
            console.log(rankList);
            let pos = 0;
            rankList.forEach(async (element: { party: { members: { handle: string; }[]; }; rank: number; }) => {

                await pool.execute("INSERT INTO user_contest (username, contest_id, points) VALUES (?, ?, ?) ON DUPLICATE KEY UPDATE points = ?;", [element.party.members[0].handle, input.contestid, rankList.length + 1 - element.rank, rankList.length + 1 - pos]);
                pos++;
            });

            return { status: 'success' }
        }
        ),
    deleteContest: publicProcedure
        .input(z.object({
            contestid: z.string(),
            secretkey: z.string()
        }))
        .mutation(async (opts) => {

            const { input } = opts
            console.log(input)
            if (input.secretkey != 'gdscisthebest') {

                throw new TRPCError({ code: "UNAUTHORIZED" });
            }

            if (input.contestid == '-1') {

                const res = await pool.execute("delete from contest")
            } else {
                console.log("called")
                const resq = await pool.query("select * from contest")
                console.log(resq)
                try {
                    const res = await pool.query("delete from contest where contest_id=?", [input.contestid])
                    console.log(res)
                } catch (error) {
                    console.log(error)
                }
            }

            return { status: 'success' };
        }),
    getLeaderBoard: publicProcedure
        .query(async () => {
            console.log("CAlled");
            const sql = "select username, sum(points) as points, count(*) as contestCnt from user_contest group by username order by points desc;"

            const filePath = 'leaderBoard.json';
            let obj = {leaderBoard : {}};
            if (fs.existsSync(filePath)) {
                const json = fs.readFileSync(filePath, 'utf-8');
                obj = JSON.parse(json);
            }

            try {
                console.log("Trying");
                const leaderBoard = await pool.query(sql);

                console.log(leaderBoard);
                obj.leaderBoard = leaderBoard[0];

                const newJson = JSON.stringify(obj);
                fs.writeFileSync('leaderBoard.json', newJson);
                return leaderBoard[0];
            }
            catch {
                return obj.leaderBoard;
            }
        }),
});

export type appRouter = typeof appRouter