import { Template} from "../components/Home/CreateTemplate/CreateTemplate";


const BASE_URL = "http://localhost:5131/api/Templates";

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

  export async function getTemplateById(id: string): Promise<Template>{
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    console.log(data);
    return data as Template;
  }

  export async function deleteTemplate(id: string) {
    const response = await fetch(`${BASE_URL}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }
    );
    const data = await response.json();
    console.log(data);
    return data as Template;
  }