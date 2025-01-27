import Image from "next/image";
import Navigation from "./components/navigation";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <Image
          aria-hidden
          src="/profile-1.png"
          alt="profile"
          className="rounded-full"
          width={150}
          height={150}
        />
        <p className="bg-gradient-to-b from-[#fff] from-30%  to-[#fff]/30 text-7xl bg-clip-text text-transparent drop-shadow-[0_20px_35px_rgba(255,255,255,0.6)]">Hizwan Zameri</p>
        <span className="text-sm">I'm a UI/UX Developer at <b>Fulkrum Interactive Technology</b>.<br></br>A Part Time Student at <b>Universiti Teknologi Malaysia</b>.</span>
        {/* <Image
          className="dark:invert"
          src="/next.svg"
          alt="Next.js logo"
          width={180}
          height={38}
          priority
        /> */}
        <ol className="list-inside list-decimal text-sm text-center sm:text-left font-[family-name:var(--font-geist-mono)]">
          <li className="mb-2">
            Welcome to my portfolio{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              <a
                className=""
                href="https://hizwanzameri.github.io"
                target="_blank"
                rel="noopener noreferrer"
              >hizwanzameri.github.io</a>
            </code>
            .
          </li>
          <li>Visit my github profile{" "}
            <code className="bg-black/[.05] dark:bg-white/[.06] px-1 py-0.5 rounded font-semibold">
              <a
                className=""
                href="https://github.com/hizwanzameri"
                target="_blank"
                rel="noopener noreferrer"
              >github.com/hizwanzameri</a>
            </code>
            .
          </li>
        </ol>
        <span>More about me:</span>
        <Navigation />
      </main>

    </div>
  );
}
