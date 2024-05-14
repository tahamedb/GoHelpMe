import apiRequest from "./apiRequest";
import { defer } from "react-router-dom";

// const profilePageLoader = async () => {
//   const chatPromise = apiReqest("/chats");
//   return defer({
//     chatResponse: chatPromise,
//   });
// };

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};
export const listPageLoader = async ({ request, params }) => {
  console.log(request);
  const query = request.url.split("?")[1];
  const res = await apiRequest("/posts?" + query);
  return res.data;
};

export const profilePageLoader = async ({ request, params }) => {
  const postPromise = apiRequest("/users/" + params.id);
  const chatPromise = apiRequest("/chats");
  return defer({
    postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
