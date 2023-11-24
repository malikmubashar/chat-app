"use client";
import { useRouter } from "next/navigation";
import toast from "react-hot-toast";
import { API } from "secrets"

export default function Bar({ sender }: { sender: string }) {
    const router = useRouter();

    const saveMessage = async (e: any) => {
        e.preventDefault();

        const data = {
            _id: crypto.getRandomValues(new Uint32Array(1))[0],
            sender: sender,
            text: e.target['text'].value,
            at: {
                time: new Date().toLocaleTimeString(),
                date: new Date().toLocaleDateString()
            }
        };

        if (data.text.replaceAll(' ', '').replaceAll('\n', '').length > 0) {
            const req = await fetch(API, {
                method: 'POST',
                body: JSON.stringify({ message: data }),
                headers: {
                    'Content-Type': 'application/json'
                }
            }), res = await req.json();
            res.error && toast.error(res.error);
            router.refresh();
        };

        e.target.reset();
    };

    return (
        <form
            className="bg-[--secondry] p-2 flex items-start shadow-xl gap-x-6 w-[min(90%,900px)] h-16 rounded-xl fixed left-[50%] -translate-x-[50%] bottom-4"
            onSubmit={saveMessage}
        >
            <textarea name="text" className="w-full rounded-xl resize-none text-sm p-2 opacity-70 focus:outline-none focus:opacity-90 bg-transparent transition-opacity caret-[--third]" placeholder="Type a Message..." spellCheck minLength={1} required onKeyDownCapture={(e: any) => {
                if (e.key === 'Enter')
                    e.target.form.querySelector('button[type="submit"]').click();
            }}></textarea>
            <button type="submit" className="bg-[--third] rounded-2xl p-4  text-[--secondry] hover:bg-[--primary] hover:shadow-inner hover:text-[--third] active:scale-105 transition-[background]">
                <svg xmlns="http://www.w3.org/2000/svg" className="scale-150" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                    <path d="M15.964.686a.5.5 0 0 0-.65-.65L.767 5.855H.766l-.452.18a.5.5 0 0 0-.082.887l.41.26.001.002 4.995 3.178 3.178 4.995.002.002.26.41a.5.5 0 0 0 .886-.083l6-15Zm-1.833 1.89L6.637 10.07l-.215-.338a.5.5 0 0 0-.154-.154l-.338-.215 7.494-7.494 1.178-.471-.47 1.178Z" />
                </svg>
            </button>
        </form>
    )
}
