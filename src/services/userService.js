import { makeApiCall } from "@/helper/httpHelper";

export async function signUp(user) {
  const result = await makeApiCall
    .post("/api/users", user)
    .then((response) => response?.data);
  return result;
}

export async function login(user) {
  const result = await makeApiCall
    .post("/api/login", user)
    .then((response) => response?.data);
  return result;
}
