import dotenv from "dotenv";
dotenv.config();

export interface Config {
  port: number;
  telegram: {
    botToken: string;
    chatId: string;
  };
  cors: {
    origin: string;
  };
}

export const config: Config = {
  port: Number(process.env.PORT) || 3001,
  telegram: {
    botToken: process.env.TELEGRAM_BOT_TOKEN || "",
    chatId: process.env.TELEGRAM_CHAT_ID || "",
  },
  cors: {
    origin: process.env.CORS_ORIGIN || "*",
  },
};
