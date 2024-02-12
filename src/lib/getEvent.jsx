import HttpService from "@/services/http.service";

export default async function getEvent(id) {
  const response = await HttpService.get(`/events/${id}`);
  const event = await response.data.event;

  return event;
}
