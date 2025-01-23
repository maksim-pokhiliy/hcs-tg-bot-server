import axios from "axios";

import { config } from "../config/config.js";

export const sendTelegramMessage = async (message: string): Promise<void> => {
  const { botToken, chatId } = config.telegram;

  await axios.post(`https://api.telegram.org/bot${botToken}/sendMessage`, {
    chat_id: chatId,
    text: message,
    parse_mode: "Markdown",
  });
};
