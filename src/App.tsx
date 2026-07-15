import { useState } from "react";
import ChatWidget from "./components/ChatWidget";

function App() {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100">

      {/* Demo page content */}
      <div className="mx-auto max-w-6xl p-10">
        <h1 className="mb-4 text-5xl font-bold text-blue-700">
          KCA University
        </h1>

        <p className="text-lg text-gray-600">
          Student Services Portal
        </p>
      </div>

      {/* Floating Chat Button */}
      {!isOpen && (
        <button
          onClick={() => setIsOpen(true)}
          className="
            fixed
            bottom-6
            right-6
            z-50
            flex
            items-center
            gap-3
            rounded-full
            bg-blue-700
            px-5
            py-4
            text-white
            shadow-xl
            transition-all
            duration-300
            hover:scale-105
            hover:bg-blue-800
          "
        >
          <span className="text-xl">💬</span>

          <span className="font-medium">
            Chat Assistant
          </span>
        </button>
      )}

      {/* Chat Window */}
      {isOpen && (
        <ChatWidget
          onClose={() => setIsOpen(false)}
        />
      )}
    </div>
  );
}

export default App;