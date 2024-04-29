import { getCookie } from "../helpers/CookieHelpers";
import { sprint } from "../templates/Sprint";
import { saltEvent } from "../templates/SaltTemplate";
import { singleEvent } from "../templates/SingleEvent";
import { GoogleEvent } from "../components/event/CalendarEvent";

interface EventData {
  summary: string;
  start: { dateTime: string };
  end: { dateTime: string };
  location: string;
  id: string;
}

interface EventDataArr {
  items: EventData[];
}


const BASE_URL =
  "https://www.googleapis.com/calendar/v3/calendars/primary/events";



export async function createCalendarEvent() {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    body: JSON.stringify(singleEvent),
  }).then((data) => {
    alert("Event created, check your Google Calendar!");
    return data.json();
  });
}

export async function createCalendarTemplate(eventTemplate: GoogleEvent[]) {
  const promises = eventTemplate.map(async (event) => {
    const response = await fetch(
      "https://www.googleapis.com/calendar/v3/calendars/primary/events",
      {
        method: "POST",
        headers: {
          "Content-type": "application/json; charset=UTF-8",
          Authorization: `Bearer ${getCookie("access_token")}`, // Access token for Google
        },
        body: JSON.stringify(event),
      }
    );
    const data = await response.json();
    console.log(data);
    return data;
  });

  try {
    const results = await Promise.all(promises);
    alert("All events created, check your Google Calendar!");
    console.log(results);
  } catch (error) {
    console.error("Error creating events", error);
    alert("Failed to create events");
  }
}

export async function createSprint() {
  await fetch(BASE_URL, {
    method: "POST",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${getCookie("access_token")}`,
    },
    body: JSON.stringify(saltEvent),
  }).then((data) => {
    alert("Event created, check your Google Calendar!");
    return data.json();
  });
}

export const getSingleEvent = async (): Promise<EventData | null> => {
  try {
    const response = await fetch(
      BASE_URL +
        "/vjp0ov2kgqgealhn2aptl9h89o?key=" +
        import.meta.env.VITE_APP_API_KEY,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const eventData: EventData = await response.json();
    console.log("eventData", eventData);
    return eventData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export async function deleteCalendarEvent(eventId: string) {
  await fetch(
    BASE_URL + `/${eventId}?key=${import.meta.env.VITE_APP_API_KEY}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${getCookie("access_token")}`,
      },
    }
  );
  alert("Event deleted, check your Google Calendar!");
}

export const getReocurringEvents = async (
  template: string
): Promise<string[] | null> => {
  try {
    const response = await fetch(
      BASE_URL +
        `?sharedExtendedProperty=template%3D${template}&key=${
          import.meta.env.VITE_APP_API_KEY
        }`,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    const eventDataArr: EventDataArr = await response.json();
    console.log(
      "eventDataArr",
      eventDataArr.items.map((event) => event.id)
    );
    return eventDataArr.items.map((event) => event.id);
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
};

export async function deleteTemplate(template: string) {
  const result = await getReocurringEvents(template);
  if (result) {
    console.log("Deleting events with id: ", result);
    result.map((event) => deleteCalendarEvent(event));
    alert("Event deleted, check your Google Calendar!");
  }
  else{console.log("Could not find any events with template ", template)}
}

export async function changeDate(): Promise<EventData | null> {
  try {
    const response = await fetch(`${BASE_URL}/4d37mthif0j56un9on7se6pbio_20240911T080000Z?key=${import.meta.env.VITE_APP_API_KEY}`, { 
      method: "PATCH",
      headers: {
        Authorization: `Bearer ${getCookie("access_token")}`,
        Accept: "application/json",
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        "start": {
          "dateTime": "2024-09-18T10:00:00+02:00",
          "timeZone": "Europe/Stockholm"
        },
        "end": {
          "dateTime": "2024-09-18T10:15:00+02:00",
          "timeZone": "Europe/Stockholm"
        },
        "status": "confirmed"
      })
    });
    
    if (!response.ok) {
      throw new Error("Network response was not ok");
    }
  
    const eventData: EventData = await response.json();
    console.log("eventData", eventData);
    return eventData;
  } catch (error) {
    console.error("There was a problem with the fetch operation:", error);
    return null;
  }
}

