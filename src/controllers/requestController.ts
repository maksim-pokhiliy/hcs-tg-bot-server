import type { Request, Response } from "express";

import { sendTelegramMessage } from "../services/telegramService.js";
import { validateEmail } from "../utils/validators.js";

export const handlePlaceRequest = async (req: Request, res: Response) => {
  try {
    const { name, email, request } = req.body;

    if (!name || !email || !request) {
      res.status(400).send({
        status: "error",
        message: "Name, email and request are required",
      });

      return;
    }

    if (!validateEmail(email)) {
      res.status(400).send({
        status: "error",
        message: "Invalid email format",
      });

      return;
    }

    const message = `👤 *Name:* ${name}\n📧 *Email:* ${email}\n💬 *Request:* ${request}`;

    await sendTelegramMessage(message);

    res.status(200).send({ status: "success" });
  } catch (error) {
    res.status(500).send({
      status: "error",
      message: error instanceof Error ? error.message : "Unknown error",
    });
  }
};
