import { getServerSession } from 'next-auth';
import { notFound } from 'next/navigation';
import { FC } from 'react';
import FriendRequests from '~/components/FriendRequests';
import { fetchRedis } from '~/helpers/redis';
import { authOptions } from '~/lib/auth';

const page = async () => {
    const session = await getServerSession(authOptions);
    if(!session) notFound()

    const incomingSenderIds = (await fetchRedis('smembers', `user:${session.user.id}:incoming_friend_request`)) as string[];

  //   export async function fetchRedis (
  //     command: smemebers,
  //     ...args: [`user:${session.user.id}:incoming_friend_request`]
  // ) {
  //     const commandUrl = `${upstashRedisRestUrl}/${command}/${args.join('/')}`
  
  //     const response = await fetch(commandUrl, {
  //         headers: {
  //             Authorization: `Bearer ${authToken}`
  //         },
  //         cache: 'no-store'
  //     });
  
  //     if(!response.ok){
  //         throw new Error(`Error executing Redis command: ${response.statusText}`)
  //     }
  
  //     const data = await response.json()
  //     return data.result
  // }

    const incomingFriendRequests = await Promise.all(
        incomingSenderIds.map(async (senderId) => {
            const sender = (await fetchRedis('get', `user:${senderId}`)) as string;
            const senderParsed = JSON.parse(sender) as User;

            return {
                senderId,
                senderEmail: senderParsed.email,
            }
        })
    )

 return (
    <main className='pt-8'>
      <h1 className='font-bold text-5xl mb-8'>Add a friend</h1>
      <div className='flex flex-col gap-4'>
        <FriendRequests incomingFriendRequests={incomingFriendRequests} sessionId={session.user.id}/>
      </div>
   </main>
 )
}

export default page