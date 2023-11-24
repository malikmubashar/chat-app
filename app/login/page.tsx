"use client";
import { useEffect } from "react";
import { login } from "./action";
import { useFormState } from "react-dom";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";

const response: any = {
    isActionEnd: false,
};

export default function Page() {
    const [state, formAction] = useFormState(login, response);
    useEffect(() => {
        state.isActionEnd && (state.error && toast.error(state.error) || toast.success(state.success));
        // redirect to home page if login success
        state.success && redirect("/");
        // reseting the state otherwise it will show wrong toast on next action 
        state.isActionEnd = false;
        delete state.error;
        delete state.success;
    }, [state]);

    return (
        <main className="w-full h-full flex flex-col justify-center items-center gap-y-2">
            <h1 className="text-[calc(20px+4vw)] font-extrabold text-[--third]">Chat ON</h1>
            <p className="w-1/2 text-center opacity-50">Want to become a member? Contact with the boss.</p>

            <form
                action={formAction}
                className="flex flex-col items-center gap-y-4 mt-20 min-w-[300px]"
            >
                <input type="text" name="username" placeholder="Username" required />
                <input type="password" name="password" placeholder="Password" minLength={8} required />
                <button className="p-2 w-1/3 bg-[--secondry] rounded-xl shadow-inner drop-shadow mt-6 hover:drop-shadow-lg active:drop-shadow">Enter</button>
            </form>

        </main>
    )
}
