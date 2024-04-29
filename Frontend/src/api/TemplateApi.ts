import { Week } from "../components/createTemplate/CreateTemplate";
import { EventRequest } from "../components/event/CalendarEvent";
import { getCookie } from "../helpers/CookieHelpers";

export type TemplateResponse = {
  id: number;
  name: string;
  userEmail: string;
  weeks: Week[];
}

export type Template = {
  userEmail: string;
  name: string;
  weeks: Week[];
};

export type TemplateRequest = {
  id?: number;
  name: string;
  userEmail: string;
  events: EventRequest[];
}

export type PutReq = {
  template: TemplateResponse;
  id: number;
}

const BASE_URL = "http://localhost:5236/api/Templates";

export async function saveCalendarTemplate(eventTemplate: TemplateRequest) {
  {
    console.log("Event to add", eventTemplate);
    const response = await fetch(BASE_URL, {
      method: "POST",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
        Authorization: `Bearer ${getCookie("google_login_key")}`,
      },
      body: JSON.stringify(eventTemplate),
    });
    const data = await response.json();
    console.log(data);
    return data;
  }
}

export async function getAllTemplates(): Promise<TemplateResponse[]> {
  const response = await fetch(BASE_URL, {
    headers: {
      Authorization: `Bearer ${getCookie("google_login_key")}`,
    },
  });
  const data = await response.json();
  console.log(data);
  return data as TemplateResponse[];
}

export async function editTemplate(putRequest: PutReq) {
  const response = await fetch(BASE_URL, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${getCookie("google_login_key")}`,
    },
    body: JSON.stringify(putRequest),
  });
  const data = await response.json();
  console.log(data);
  return data;
}
