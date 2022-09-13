import { API_URL } from "../../../common/constants";
import { httpClient, setHttpClientContext } from "common/api/httpClient";
import cookie from "cookie";
// import { setTokenCookies } from "./utils";
import { NextApiRequest, NextApiResponse } from "next";
import { User } from "ts/interfaces/auth";

interface FetchUserResponseData {
  user?: User;
  errors?: string[];
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<FetchUserResponseData>
) {
  if (req.method === "GET") {
    setHttpClientContext({ req, res });

    try {
      const apiRes = await httpClient.get(`${API_URL}/user/`);
      // console.log('fetchuserresponse', apiRes.headers['set-cookie'])
      // res.setHeader('Set-Cookie', apiRes.headers['set-cookie'])

      // console.log(cookie.parse(apiRes.headers['set-cookie'][0]))
      // cookie.serialize(cookie.parse(apiRes.headers["set-cookie"][0]  ))

      return res.status(200).json(apiRes.data);
    } catch (error: any) {
      if (error.response) {
        return res.status(error.response.status).json({
          errors: error.response.data,
        });
      } else {
        return res.status(500).json({
          errors: ["Something went wrong trying to fetch user data."],
        });
      }
    }
  } else {
    res.setHeader("Allow", ["GET"]);
    return res.status(405).json({
      errors: [`Method ${req.method} now allowed`],
    });
  }
}
