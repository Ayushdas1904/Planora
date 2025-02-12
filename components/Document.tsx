'use client'

import { db } from "@/firebase";
import { doc, updateDoc } from "firebase/firestore";
import { FormEvent, useEffect, useState, useTransition } from "react";
import { useDocumentData } from "react-firebase-hooks/firestore"
import { Button } from "./ui/button";
import Editor from "./Editor";
import useOwner from "@/lib/useOwner";
import DeleteDocument from "./DeleteDocument";
import InviteUser from "./InviteUser";

export default function Document({ id }: { id: string }) {

  const [data, loading, error] = useDocumentData(doc(db, "documents", id));
  const [input, setInput] = useState("");
  const [isUpdating, startTransition] = useTransition();
  const isOwner = useOwner();

  useEffect(() => {
    if (data) {
      setInput(data.title);
    }
  }, [data]);

  const updateTitle = (e: FormEvent) => {
    e.preventDefault();

    if (input.trim()) {
      startTransition(async () => {
        await updateDoc(doc(db, "documents", id), { title: input });
      })
    };
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen">
      <div className="flex w-full max-w-6xl justify-center pb-5">
        <form className="flex flex-1 max-w-4xl space-x-2 items-center" onSubmit={updateTitle}>
          <input
            className="p-2 w-full border rounded-md"
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <Button disabled={isUpdating} type="submit">
            {isUpdating ? "Updating..." : "Update"}
          </Button>

          {isOwner && (
            <>
            {/* inviteuser */}
            <InviteUser/>
            {/* {delete doc} */}
            <DeleteDocument/>
            </>
          )}
        </form>
      </div>

      <hr className="w-full max-w-4xl pb-10" />

      <Editor />

    </div>
  );

}
