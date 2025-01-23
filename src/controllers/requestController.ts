import { RequestHandler } from "express";

import { sendTelegramMessage } from "../services/telegramService.js";
import { validateEmail } from "../utils/validators.js";

interface RequestBody {
  name: string;
  email: string;
  request: string;
}

export const handlePlaceRequest: RequestHandler<unknown, unknown, RequestBody> = async (
  req,
  res,
) => {
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
