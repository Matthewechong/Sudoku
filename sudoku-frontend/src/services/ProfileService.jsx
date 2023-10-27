import axios from 'axios';
import { useProfileContext } from "../contexts/CurrentGridContext"
let baseUrl = import.meta.env.VITE_BASEURL
let userUrl = baseUrl + import.meta.env.VITE_USERURL

export async function GetUser() {
    try {
      const response = await axios.get("https://localhost:8443/api/user");
      console.log(response.data);
      return response;
  
    } catch (err) {
      console.error(err);
    }

  }