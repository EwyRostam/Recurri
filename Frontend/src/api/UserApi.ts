import { getCookie, setCookie } from "../helpers/CookieHelpers";

export type User = {
  emailAddresses: EmailAddresses[];
};

type EmailAddresses = {
  value:string
}

const BASE_URL = 'https://people.googleapis.com/v1/people/me?personFields=emailAddresses,names,photos&sources=READ_SOURCE_TYPE_PROFILE&key=';

export default async function getUser() {
  try {
    const response = await fetch(
      BASE_URL + import.meta.env.VITE_APP_API_KEY,
      {
        headers: {
          Authorization: `Bearer ${getCookie("access_token")}`,
          Accept: "application/json",
        },
      }
    );
    if (!response.ok) {
      throw new Error(`Failed to fetch user info: ${response.status}`);
    }
    let data = await response.json() as User
     setCookie("email", data.emailAddresses[0].value, 1)
    return data;
  } catch (error) {
    console.error(error);
  }
}
