import request from "supertest";

import { app } from "../index.js";
import { sendTelegramMessage } from "../services/telegramService.js";

jest.mock("../services/telegramService.js");

describe("API Tests", () => {
  beforeEach(() => {
    jest.mocked(sendTelegramMessage).mockClear();
  });

  test("POST /api/place-request - success", async () => {
    jest.mocked(sendTelegramMessage).mockResolvedValueOnce();

    const response = await request(app).post("/api/place-request").send({
      name: "Test User",
      email: "test@example.com",
      request: "Test request",
    });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("success");
    expect(sendTelegramMessage).toHaveBeenCalled();
  });
});
