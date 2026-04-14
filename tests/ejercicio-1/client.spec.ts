import { describe, test, expect } from "vitest";
import { sendRequest } from "../../src/ejercicio-1/client/client.js";

describe("Client", () => {
  test("sendRequest does not throw", () => {
    expect(() =>
      sendRequest({ type: "list", user: "iker" })
    ).not.toThrow();
  });
});
