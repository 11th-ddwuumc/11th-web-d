import { umcineClient } from "../umcine-client";
import type { CheckAvailabilityResponse } from "./model";

async function checkNickname(nickname: string) {
  return umcineClient
    .get(`members/nickname/${encodeURIComponent(nickname)}`)
    .json<CheckAvailabilityResponse>();
}

export { checkNickname };