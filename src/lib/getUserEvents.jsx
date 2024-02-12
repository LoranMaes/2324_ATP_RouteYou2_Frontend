import { cookies } from "next/headers";

export default async function getUserEvents() {
  try {
    const token = cookies().get("token").value;
    const response = await fetch(
      `${process.env.NEXT_PUBLIC_API_URL}/api/user/events`,
      {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "application/json",
          Accept: "application/json",
        },
      }
    );
    const data = await response.json();
    return { data: data.events, ok: true };
  } catch (error) {
    return { data: null, ok: false, message: error.message };
  }
}
