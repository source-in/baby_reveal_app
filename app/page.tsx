import { Story } from "@/components/Story";

export default function Home() {
  return (
    <main className="flex h-dvh items-center justify-center">
      <div className="relative h-dvh w-full max-w-[430px] overflow-hidden sm:h-[min(900px,calc(100dvh-2rem))] sm:rounded-[2.5rem] sm:shadow-[0_30px_80px_-20px_rgba(60,40,70,0.45)]">
        <Story />
      </div>
    </main>
  );
}
