'use server'

import { adminDb } from "@/firebase-admin";
import liveblocks from "@/lib/liveblocks";
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

export async function deleteDocument(roomId : string) {
    auth.protect();
    
    console.log("deleteDocument", roomId);

    try{
        //delete the document refernce itself
        await adminDb.collection("documents").doc(roomId).delete();

        const query = await adminDb
            .collectionGroup("rooms")
            .where("roomId", "==", roomId)
            .get();

        const batch = adminDb.batch();

        //delete the user room reference for every user in the room
        query.docs.forEach((doc) => {
            batch.delete(doc.ref);
        });

        await batch.commit();

        //delete the room in liveblocks
        await liveblocks.deleteRoom(roomId)

        return {success : true}
    }
    catch (error){
        console.log(error);
        return {success : false}
    }
}

export async function inviteUserToDocument(roomId : string, email : string) {
    auth.protect();
    
    console.log("Invite User to Document ", roomId, email);

    try{
        await adminDb
            .collection("users")
            .doc(email)
            .collection("rooms")
            .doc(roomId)
            .set({
                userId: email,
                role: "editor",
                createdAt: new Date(),
                roomId,
            })

        return {success : true}
    }
    catch (error){
        console.error(error);
        return {success : false}
    }
}