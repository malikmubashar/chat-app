"use server";
import { MEMBERS } from "secrets";
import { cookies } from "next/headers";

export async function login(state: any, data: FormData) {
    const { username, password } = Object.fromEntries(data);
    const userCheck = MEMBERS.find((user: any) => user.username === username);
    const passCheck = userCheck && userCheck.password === password;

    state.isActionEnd = true;

    if (userCheck && passCheck) {
        cookies().set({ name: "_user_", value: btoa(JSON.stringify(userCheck)) });

        state.success = username + " Logged in";
        return state;
    }
    else {
        state.error = "Wrong username or password";
        return state;
    }
}