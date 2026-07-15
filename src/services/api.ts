import axios from "axios";

export const api = axios.create({
    baseURL: "https://kca-support-chatbot.onrender.com",
    headers: {
        "Content-Type": "application/json",
    },
});