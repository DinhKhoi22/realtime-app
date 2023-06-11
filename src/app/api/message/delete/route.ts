import { db } from "~/lib/db";

export async function POST(req: Request) {
  try {
    const { parseMessages, chatId }: { parseMessages: string[], chatId: string } = await req.json();

    // Delete the chat message
    console.log(parseMessages);
    console.log(chatId);
    
    // Delete the chat messages
    for (const score of parseMessages) {
      // get the score in upstash
      const result = await db.zrem(`chat:${chatId}:messages`, score);
    
      if (result === 0) {
        console.log(`Message ${score} not found in the chat`);
      } else {
        console.log(`Deleted message ${score} from chat ${chatId}`);
      }
    }

    return new Response("OK");
  } catch (error) {
    if (error instanceof Error) {
      return new Response(error.message, { status: 500 });
    }

    return new Response("Internal Server Error", { status: 500 });
  }
}
