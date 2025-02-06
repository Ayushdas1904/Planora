'use server'

import { adminDb } from "@/firebase-admin";
import { auth } from "@clerk/nextjs/server";

export async function createNewDocument() {
    const session = await auth();

    const userEmail = session.sessionClaims?.email! as string;

    const docCollectionRef = adminDb.collection("documents");
        const docRef = await docCollectionRef.add({
            title: "Untitled Document",
            createdAt: new Date(),
        });

        await adminDb
            .collection("users")
            .doc(userEmail)
            .collection("rooms")
            .doc(docRef.id)
            .set({
                userId: userEmail,
                role: "owner",
                createdAt: new Date(),
                roomId: docRef.id,
            });

        return { success: true, docId: docRef.id };
}