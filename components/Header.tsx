'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";

export default function Header() {
    const {user} = useUser();
  return (
    <div className="flex justify-between items-center py-4 px-8">
        {user && (
            <h1>
            {user?.firstName}{`'s`} Space
            </h1>
        )}

        <div>
            <SignedOut>
                <SignInButton />
            </SignedOut>

            <SignedIn>
                <UserButton />
            </SignedIn>
        </div>
    </div>
  )
}
