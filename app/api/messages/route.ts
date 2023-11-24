import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";
import { revalidateTag } from "next/cache";
export const runtime = 'edge';

const data: any = [
    {
        "_id": "996cbb35-5def-4173-a0c4-ebc73488739c",
        "sender": "Malik",
        "text": "Hello I am Mubashar",
        "at": {
            "time": "14:24:29",
            "date": "23/11/2023"
        }
    }
];

export async function GET(req: NextRequest) {
    return NextResponse.json(data);
}

export async function POST(req: NextRequest) {
    try {
        const { message }: any = await req.json();
        if (!message) throw new Error("Message is required");
        data.push(message);
        revalidateTag("messages");

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}

export async function DELETE(req: NextRequest) {
    try {
        const { _id }: { _id: string } = await req.json();
        if (!_id) throw new Error("id not found");
        const index = data.findIndex((item: any) => item._id === _id);
        if (index === -1) throw new Error("Message not found");

        data.splice(index, 1);
        revalidateTag("messages");

        return NextResponse.json({ success: true });
    } catch (error: any) {
        return NextResponse.json({ error: error.message });
    }
}

