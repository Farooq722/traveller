"use client";

import { Login, Logout } from "@/lib/auth-actions";
import { Session } from "next-auth";
import Image from "next/image";
import Link from "next/link";

export default function Navbar({ session }: { session: Session | null }) {
  return (
    <nav className="bg-white shadow-md py-4 border-b border-gray-200">
      <div className="container mx-auto flex justify-between items-center px-6 lg:px-8">
        <Link href={"/"} className="flex items-center">
          <Image
            src={"/map-pin.png"}
            alt="Website logo"
            width={40}
            height={40}
          />
          <span className="text-2xl font-bold text-gray-800">
            Travel Planner
          </span>
        </Link>

        <div className="flex items-center space-x-4">
          {session ? (
            <>
              <Link
                href={"/trips"}
                className="text-slate-900 font-semibold hover:text-sky-700"
              >
                My Trips
              </Link>
              <Link
                href={"/globe"}
                className="text-slate-900 font-semibold hover:text-sky-700"
              >
                Globe
              </Link>
              <button
                className="flex items-center justify-center text-white p-2 px-3 rounded-sm cursor-pointer bg-gray-800 hover:bg-gray-900 gap-1 font-medium"
                onClick={Logout}
              >
                Sign Out
              </button>
            </>
          ) : (
            <button
              className="flex items-center justify-center text-white p-2 px-3 rounded-sm cursor-pointer bg-gray-800 hover:bg-gray-900 gap-1 font-medium"
              onClick={Login}
            >
              Sign In
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="22"
                height="22"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="lucide lucide-github-icon lucide-github bg-white rounded-full p-0.5 text-black"
              >
                <path d="M15 22v-4a4.8 4.8 0 0 0-1-3.5c3 0 6-2 6-5.5.08-1.25-.27-2.48-1-3.5.28-1.15.28-2.35 0-3.5 0 0-1 0-3 1.5-2.64-.5-5.36-.5-8 0C6 2 5 2 5 2c-.3 1.15-.3 2.35 0 3.5A5.403 5.403 0 0 0 4 9c0 3.5 3 5.5 6 5.5-.39.49-.68 1.05-.85 1.65-.17.6-.22 1.23-.15 1.85v4" />
                <path d="M9 18c-4.51 2-5-2-7-2" />
              </svg>
            </button>
          )}
        </div>
      </div>
    </nav>
  );
}
