import React from "react";
import PositiveChatbot from "../components/PositiveChatbot";

export default function Home() {
  return (
    <div className="min-h-screen bg-white text-black font-serif flex flex-col items-center justify-center p-10">
      <h1 className="text-5xl font-bold tracking-wide text-center">1000 Memories</h1>
      <p className="text-xl text-gray-600 mt-4 text-center">A space where wisdom, poetry, and philosophy guide your journey.</p>
      <div className="w-full max-w-3xl p-8 bg-gray-100 rounded-lg shadow-xl mt-10">
        <PositiveChatbot />
      </div>
    </div>
  );
}
