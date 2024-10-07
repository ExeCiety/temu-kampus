import {NextApiRequest} from "next"

export interface ExtendedNextApiRequest extends NextApiRequest {
  user?: {
    _id: string;
  };
}
