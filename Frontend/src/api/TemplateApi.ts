import { Template} from "../components/Home/CreateTemplate/CreateTemplate";
import { getCookie } from "../helpers/CookieHelpers";


const BASE_URL = "https://recurri.azurewebsites.net/api/Templates";


export async function editTemplate(template: Template) {

  const response = await fetch(BASE_URL+"/"+template.id, {
    method: "PUT",
    headers: {
      "Content-type": "application/json; charset=UTF-8",
      Authorization: `Bearer ${getCookie("google_login_key")}`,
    },
    body: JSON.stringify(template),
  });
  if (!response.ok) {
    throw new Error("Failed to edit template");
  }

}

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
      return data;
    }
  
  }

  export async function getAllTemplates(): Promise<Template[]>{
    const response = await fetch(BASE_URL);
    const data = await response.json();
    return data as Template[];
  }

  export async function getTemplateById(id: string): Promise<Template>{
    const response = await fetch(`${BASE_URL}/${id}`);
    const data = await response.json();
    return data as Template;
  }

  export async function deleteTemplate(id: string) {
  await fetch(`${BASE_URL}/${id}`,
    {
      method: "DELETE",
      headers: {
        "Content-type": "application/json; charset=UTF-8",
      }
    }
    );
  }