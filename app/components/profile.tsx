"use client";
import { useState } from "react";
import { logout } from "../lib/logout";
import { useRouter } from "next/navigation";

export default function Profile({ sender }: { sender: string }) {
    const router = useRouter();
    const [toggle, setToggle] = useState(false);

    return (
        <div className="flex justify-center bg-[--secondry] p-1 profile">
            <svg className="w-8 cursor-pointer ring-1 rounded-full bg-[--primary]" focusable="false" fill="var(--third)" viewBox="0 0 24 24" onClick={() => setToggle(!toggle)}>
                <path d="M12 4c-4.42 0-8 3.58-8 8 0 1.95.7 3.73 1.86 5.12C7.55 15.8 9.68 15 12 15s4.45.8 6.14 2.12C19.3 15.73 20 13.95 20 12c0-4.42-3.58-8-8-8zm0 9c-1.93 0-3.5-1.57-3.5-3.5S10.07 6 12 6s3.5 1.57 3.5 3.5S13.93 13 12 13z" opacity=".2" ></path><path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm0 18c-1.74 0-3.34-.56-4.65-1.5C8.66 17.56 10.26 17 12 17s3.34.56 4.65 1.5c-1.31.94-2.91 1.5-4.65 1.5zm6.14-2.88C16.45 15.8 14.32 15 12 15s-4.45.8-6.14 2.12C4.7 15.73 4 13.95 4 12c0-4.42 3.58-8 8-8s8 3.58 8 8c0 1.95-.7 3.73-1.86 5.12z"></path><path d="M12 5.93c-1.93 0-3.5 1.57-3.5 3.5s1.57 3.5 3.5 3.5 3.5-1.57 3.5-3.5-1.57-3.5-3.5-3.5zm0 5c-.83 0-1.5-.67-1.5-1.5s.67-1.5 1.5-1.5 1.5.67 1.5 1.5-.67 1.5-1.5 1.5z"></path>
            </svg>
            <ul className={"absolute bg-[--secondry] backdrop-blur-xl rounded-lg p-2 translate-y-14 z-30 shadow-sm scale-0 " + (toggle && "scale-100")}>
                <h1 className="opacity-50 font-bold">{sender}</h1>
                <li data-text="Log Out" onClick={() => {
                    logout();
                    router.refresh();
                }}>Log Out</li>
            </ul>
        </div>
    )
}
