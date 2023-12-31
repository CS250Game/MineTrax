import { signIn, signOut, useSession } from "next-auth/react";
import Head from "next/head";
import Link from "next/link";
import styles from "./Home.module.css";
import { useRouter } from 'next/router';
import { api } from "~/utils/api";
import { useNavigate } from "react-router-dom";
export default function Home() {
  const router = useRouter();

  return (
    <>
    <Head>
      <title>MineTrax</title>
      <meta name="description" content="Generated by create-t3-app" />
      <link rel="icon" href="/favicon.ico" /> 
    </Head>
    <div className={styles["bg-image2"]}></div>
    <main className={`flex min-h-screen flex-col items-center justify-center ${styles["bg-image"]}`}>
    <div className={styles["bg-image3"]}></div>
    <div className={styles["bg-image4"]}></div>
      <div className="container flex flex-col items-center justify-center gap-12 px-7 py-16 text-centered ">
        <h1 className="text-5xl font-extrabold tracking-tight text-white sm:text-[5rem]">
          <span className="text-[hsl(120,100%,70%)]">Mine</span>
          <span className="text-[hsl(50,100%,0%)]">Trax</span>
        </h1>

        <div className="justify-centergrid grid-cols-1 gap-4 sm:grid-cols-2 md:gap-8">
        <Link
   className="flex max-w-xs flex-col gap-2 rounded-xl bg-white/10 p-4 text-white hover:bg-white/20"
   href="/main" // Replace with the actual login URL if applicable
   style={{ backgroundColor: "black" }}
   onClick={async (e) => {
    e.preventDefault();
    // Previous URL if needed http://localhost:3000/main
    signIn('google', { callbackUrl: 'http://localhost:3000/main'})
    signIn('discord',{ callbackUrl: 'mine-trax-one.vercel.app/main'})
}}
>
   <h3 className="text-2xl font-bold text-[hsl(120,100%,70%)]"> Login/Sign-Up →</h3>
   <div className="text-lg">(Click Here To Join)</div>
</Link>
          </div>
          <div className="flex flex-col items-center gap-2">
            <p className="text-2xl text-[hsl(120,100%,70%)]">
              Begin Tracking...
            </p>
            <Link 
            href = "about">
            <button
          className="fixed bottom-4 left-4 rounded-full text-[hsl(120,100%,70%)] px-6 py-3 font-semibold text-green bg-black no-underline transition hover:bg-black hover:text-white"
          onClick={() => {
            // Handle button click logic here
          }}
        >
          About Us 
        </button>
            </Link>
            <Link href="contact">
                <button
                  className="fixed bottom-4 right-5 rounded-full text-[hsl(120,100%,70%)] px-6 py-3 font-semibold text-green bg-black no-underline transition hover:bg-black hover:text-white"
                            onClick={() => {
            // Handle button click logic here
          }}
                >
                  Contact Us
                  </button>
              </Link>
            <AuthShowcase />
          </div>
        </div>
      </main> 
    </>
  );
}

function AuthShowcase() {
  const { data: sessionData } = useSession();

  const { data: secretMessage } = api.example.getSecretMessage.useQuery(
    undefined, // no input
    { enabled: sessionData?.user !== undefined }
  );

  return (
    <div className="flex flex-col items-center justify-center gap-4">
      <p className="text-center text-2xl text-black ">
      </p>
      {sessionData && (
        <button
          className="rounded-full text-[hsl(120,100%,70%)] px-10 py-3 font-semibold text-green bg-black no-underline transition hover:bg-black hover:text-white"
          onClick={() => void signOut()}
        >
          Sign out
        </button>
      )}
    </div>
  );
}

