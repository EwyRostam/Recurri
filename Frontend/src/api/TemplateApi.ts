import { Week } from "../components/createTemplate/CreateTemplate";

export type Template = {
    name: string;
    weeks: Week[];
}

const BASE_URL = "http://localhost:5236/api/Templates";

export async function saveCalendarTemplate(eventTemplate: Template) {
     {
      const response = await fetch(
        BASE_URL,
        {
          method: "POST",
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
          body: JSON.stringify(eventTemplate),
        }
      );
      const data = await response.json();
      console.log(data);
      return data;
    }
  
  }

  export async function getAllTemplates(): Promise<Template[]>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    console.log(data);
    return data as Template[];
  }