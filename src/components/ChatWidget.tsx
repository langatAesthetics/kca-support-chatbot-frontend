import { useState } from "react";
import { api } from "../services/api";
import type { Message } from "../types/chat";
import MessageBubble from "./MessageBubble";

interface ChatWidgetProps {
    onClose: () => void;
}

export default function ChatWidget({
    onClose,
}: ChatWidgetProps) {
    const [messages, setMessages] = useState<Message[]>([
        {
            id: 1,
            sender: "bot",
            text: "Hello, Welcome to KCA University Student Services. How can I assist you today?",
        },
    ]);

    const [input, setInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const sendMessage = async () => {
        if (!input.trim() || isLoading) {
            return;
        }

        const userMessage: Message = {
            id: Date.now(),
            sender: "user",
            text: input,
        };

        setMessages((previous) => [
            ...previous,
            userMessage,
        ]);

        const currentMessage = input;

        setInput("");
        setIsLoading(true);

        try {
            const response = await api.post("/chat", {
                message: currentMessage,
            });

            const botMessage: Message = {
                id: Date.now() + 1,
                sender: "bot",
                text: response.data.response,
            };

            setMessages((previous) => [
                ...previous,
                botMessage,
            ]);
        } catch {
            const errorMessage: Message = {
                id: Date.now() + 2,
                sender: "bot",
                text: "Unable to connect to the chatbot service.",
            };

            setMessages((previous) => [
                ...previous,
                errorMessage,
            ]);
        }

        setIsLoading(false);
    };

    return (
        <div
            className=" fixed bottom-6 right-6 z-50 flex h-162.5 w-105 flex-col overflow-hidden rounded-3xl bg-white shadow-2xl  " >

            {/* Header */}
            <div className="flex items-center justify-between border-b bg-blue-700 px-6 py-5 text-white">
                <div>
                    <h1 className="text-lg font-semibold">
                        KCA Student Assistant
                    </h1>

                    <p className="mt-1 text-sm text-blue-100">
                        Online • Student Services Support
                    </p>
                </div>

                <button
                    onClick={onClose}
                    className=" rounded-full p-2 transition hover:bg-blue-800 "> ✕
                </button>
            </div>

            {/* Messages */}
            <div className="flex-1 space-y-4 overflow-y-auto bg-gray-50 p-5">
                {messages.map((message) => (
                    <MessageBubble
                        key={message.id}
                        message={message}
                    />
                ))}

                {isLoading && (
                    <div className="text-sm text-gray-500">
                        Assistant is typing...
                    </div>
                )}
            </div>

            {/* Input Area */}
            <div className="border-t bg-white p-4">
                <div className="flex gap-3">
                    <input
                        type="text"
                        placeholder="Ask a question..."
                        value={input}
                        onChange={(event) =>
                            setInput(event.target.value)
                        }
                        onKeyDown={(event) => {
                            if (event.key === "Enter") {
                                sendMessage();
                            }
                        }}
                        className="
              flex-1
              rounded-2xl
              border
              border-gray-300
              px-4
              py-3
              outline-none
              transition
              focus:border-blue-500
            "
                    />

                    <button
                        onClick={sendMessage}
                        disabled={isLoading}
                        className="
              rounded-2xl
              bg-blue-600
              px-6
              py-3
              font-medium
              text-white
              transition
              hover:bg-blue-700
              disabled:opacity-50
            "
                    >
                        Send
                    </button>
                </div>
            </div>
        </div>
    );
}