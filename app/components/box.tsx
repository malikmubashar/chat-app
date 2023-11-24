"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { API } from "secrets"

export default function Box({ className, _id, text, sender, time }: any) {
  const router = useRouter();

  const remove = async () => {
    const req = await fetch(API, {
      method: 'DELETE',
      body: JSON.stringify({ _id }),
      headers: {
        'Content-Type': 'application/json'
      }
    }), res = await req.json();
    res.error && toast.error(res.error);
    res.success && toast.success(`${sender} successfully deleted a message!`);
    router.refresh();
  };

  return (
    <div className={"flex " + className}>
      {/* ------- */}
      <div className="bg-[--third] p-1 rounded-xl relative max-w-[min(95%,500px)] [&:hover>div:nth-child(2)>div]:scale-100">
        <div className="absolute top-0 left-0 right-0 -translate-x-2 w-0 h-0 border-8 border-transparent border-t-[--third]"></div>
        <div className="absolute w-full h-0 right-1 flex justify-between">
          <span className="text-[10px] -translate-y-5 -translate-x-4 text-[--third] opacity-50">{sender}</span>
          <div className="cursor-pointer opacity-80 z-10 w-12 h-9 p-1 origin-top-right bg-[--third] scale-0"
            style={{
              clipPath: "ellipse(50px 28px at 110% 20%)"
            }}
            onClick={(e: any) => {
              e.target?.nextElementSibling?.classList.toggle('scale-[.8]');
            }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="float-right" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
              <path d="M7.247 11.14 2.451 5.658C1.885 5.013 2.345 4 3.204 4h9.592a1 1 0 0 1 .753 1.659l-4.796 5.48a1 1 0 0 1-1.506 0z" />
            </svg>
          </div>
          <ul className="absolute -right-0 bg-[--primary] text-[--third] py-2 rounded shadow translate-y-9 scale-0">
            <li onClick={remove}>Delete</li>
          </ul>
        </div>
        {/* message entry */}
        <div>
          <p className="min-w-[85px] pl-1 pr-8 h-auto" style={{
            wordWrap: 'break-word'
          }}>
            {text}
          </p>
        </div>
        <span className="text-[10px] text-[--text] opacity-50 float-right clear-both">{time}</span>
      </div>
      {/* ----- */}
    </div>
  )
}
