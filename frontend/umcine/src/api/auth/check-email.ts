import { umcineClient } from "../umcine-client";
import type { CheckAvailabilityResponse } from "./model";

async function checkEmail(email: string) {
  return umcineClient
    .get(`members/email/${encodeURIComponent(email)}`)
    .json<CheckAvailabilityResponse>();
}

export { checkEmail };