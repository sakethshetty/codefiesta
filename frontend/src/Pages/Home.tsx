import {trpc} from '../lib/trpc'

function Home() {

    const  response = trpc.userById.useQuery('1')

    console.log(response)
    console.log(response.data)

    return (
        <div>Home</div>
    )
}

export default Home