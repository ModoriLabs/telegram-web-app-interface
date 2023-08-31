import { TonClient4 } from "ton";

const ton = new TonClient4({
  endpoint: "https://sandbox-v4.tonhubapi.com",
});
export function useTonClient() {
  return ton;
}
