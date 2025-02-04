"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";

import { ModeToggle } from "@/components/mode-toggle";
import Image from "next/image";
import { useAuth } from "@/lib/authProvider";

export default function Navbar() {
  const { user, signOut } = useAuth();

  // Debug user object
  console.log("User object:", user);

  // Helper function to extract initials
  const getInitials = (name: string) => {
    if (!name) return "U"; // "U" for unknown
    const parts = name.split(" ");
    return parts.length > 1
      ? `${parts[0][0]}${parts[1][0]}`.toUpperCase()
      : name[0]?.toUpperCase() || "U";
  };

  return (
    <nav className="auto-0 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 items-center justify-between">
        {/* Logo */}
        <Link href="/" className="flex items-center space-x-2">
  
          <span className="font-bold">CodeCollab AI</span>
        </Link>

        {/* Right Side */}
        <div className="flex items-center space-x-4">
          <ModeToggle />

          {user ? (
            <>
              {/* Profile Avatar or Initials */}
              {user.user_metadata?.avatar_url ? (
                <Image
                  src={user.user_metadata.avatar_url}
                  alt="Profile"
                  width={32}
                  height={32}
                  className="rounded-full"
                />
              ) : (
                <div className="flex items-center justify-center w-8 h-8 bg-gray-400 rounded-full text-white font-bold">
                  {getInitials(user.user_metadata?.full_name || user.email)}
                </div>
              )}
              {/* Sign Out Button */}
              <Button
                onClick={signOut}
                className="bg-[#FF073A] font-semibold text-white hover:bg-[#D00630] h-9 rounded-full px-3 text-sm"
              >
                Sign Out
              </Button>
            </>
          ) : (
            <>
              {/* Sign In */}
              <Link href="/signin">
                <Button variant="ghost" className="rounded-full font-semibold">
                  Sign In
                </Button>
              </Link>
              {/* Get Started */}
              <Link href="/signup">
                <button className="inline-flex items-center justify-center whitespace-nowrap text-sm font-semibold ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 bg-[#FF073A] text-white hover:bg-[#D00630] h-9 rounded-full px-3">
                  Get Started
                </button>
              </Link>
            </>
          )}
        </div>
      </div>
    </nav>
  );
}
