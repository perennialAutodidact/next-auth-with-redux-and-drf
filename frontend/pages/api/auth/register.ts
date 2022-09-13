// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import {httpClient, setHttpClientContext} from 'common/api/httpClient'
import { API_URL } from "common/constants";
import { AxiosResponse } from "axios";

type LoginResponseData = {
  messages?: string[];
  detail?: string;
  errors?: string[];
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<LoginResponseData>
) {

  setHttpClientContext({req, res})

  const { email, password, password2 } = req.body;

  if(req.method === 'POST'){

    try {
      const registerResponse = await httpClient.post(`${API_URL}/register/`, JSON.stringify({email, password, password2}))

      console.log(registerResponse.data)

      return res.status(200).json(registerResponse.data);
    } catch (error:any) {
      if(error.response){

        return res.status(error.response.status).json(error.response.data)
      } else {
        return res.status(500).json({errors:['Something went wrong trying to register.']})
      }
    }

  } else {
    res.setHeader('Allow', ['POST'])
    return res.status(405).json({errors: [`Method ${req.method} not allowed.`]})
  }

}
