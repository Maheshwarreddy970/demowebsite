'use server';

import { db } from "@/lib/firebase";
import { collection, addDoc, serverTimestamp } from "firebase/firestore";

export async function saveChatMessage(message: string, isBot: boolean) {
  try {
    await addDoc(collection(db, "chatMessages"), {
      text: message,
      isBot,
      createdAt: serverTimestamp(),
    });

    return { success: true };
  } catch (error) {
    console.error("Error saving message:", error);
    return { success: false };
  }
}
