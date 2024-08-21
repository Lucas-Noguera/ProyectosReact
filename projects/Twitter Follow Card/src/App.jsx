import './App.css';
import { TwitterFollowCard } from './TwitterFollowCard.jsx';

const users = [
{
    userName: 'Lucas-Noguera',
    name: 'Luba26',
    isFollowing: true
},
{
    userName: 'pheralb',
    name: 'Pablo H.',
    isFollowing: false,
     
},

{
    userName: 'PacoHdez',
    name: 'Paco Hdez',
    isFollowing: true,
},
{
    userName: 'TMChein',
    name: 'Tomas',
    isFollowing: false,
}


]

export function App () {
    return(
        <section className='App'>
            {
                users.map(user => {
                    const {userName, name, isFollowing} = user
                    return(
                        <TwitterFollowCard
                        key={userName}
                        userName={userName}
                        initialisFollowing={isFollowing}>
                            {name}
                        </TwitterFollowCard>
                    )
                })
            }
        </section>
       
)
}