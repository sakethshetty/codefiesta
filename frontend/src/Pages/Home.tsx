import Header from '../components/Header';
import LeaderBoard from '../components/LeaderBoard';
import { trpc } from '../lib/trpc'

function Home() {
    const resp = trpc.getLeaderBoard.useQuery();
    console.log(resp);

    return (
        <>
            <Header/>
            <LeaderBoard leaderboard={resp.data} />
        </>
    )
}

export default Home