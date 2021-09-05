import { rest } from "msw";

import { REQUEST_URL } from "@/constants";

import mockData from "./_data.json";

export const handlers = [
  rest.get(REQUEST_URL, (req, res, ctx) => {
    return res(ctx.json(mockData));
  }),
];
