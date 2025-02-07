'use client'

import { SignedIn, SignedOut, SignInButton, UserButton, useUser } from "@clerk/nextjs";
import BreadCrumbs from "./BreadCrumbs";

export default function Header() {
    const {user} = useUser();
  return (
    <div className="flex justify-between items-center py-4 px-8">
        {user && (
            <h1>
            {user?.firstName}{`'s`} Space
            </h1>
        )}

        {/* breadcrumbs */}
        <BreadCrumbs />

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
