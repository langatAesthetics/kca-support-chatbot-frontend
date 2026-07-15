import type { Message } from "../types/chat";

interface Props {
    message: Message;
}

export default function MessageBubble({
    message,
}: Props) {
    const isUser = message.sender === "user";

    return (
        <div
            className={`flex ${isUser
                    ? "justify-end"
                    : "justify-start"
                }`}
        >
            <div
                className={`
          max-w-[75%]
          rounded-2xl
          px-4
          py-3
          text-sm
          ${isUser
                        ? "bg-blue-600 text-white"
                        : "bg-gray-100 text-gray-800"
                    }
        `}
            >
                {message.text}
            </div>
        </div>
    );
}