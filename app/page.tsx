import Bar from "./components/bar";
import Box from "./components/box";
import { cookies } from "next/headers";
import Profile from './components/profile';

export default async function Home() {
  const res = await fetch('http://localhost:3000/api/messages', { next: { revalidate: 0 } });
  const data = await res.json(), raw: any = cookies().get('_user_')?.value;
  const { username } = raw && JSON.parse(atob(raw));

  return (
    <>
      <Profile sender={username} />
      <main className="flex flex-col justify-start h-[90vh] overflow-y-scroll p-5">
        <section className='flex flex-col gap-y-6 w-[min(95%,800px)] mx-auto '>
          {data.map((item: any, index: number) => {
            const me = item.sender === username && 'me ' || '';
            return <Box
              key={index}
              _id={item._id}
              active={username}
              text={item.text}
              sender={item.sender}
              time={item.at?.time.slice(0, -3)}
            />;
          })}
        </section>
        <Bar sender={username} />
      </main>
    </>
  )
}
