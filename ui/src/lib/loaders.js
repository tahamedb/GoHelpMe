import { defer } from "react-router-dom";
import apiRequest from "./apiRequest";

export const singlePageLoader = async ({ request, params }) => {
  const res = await apiRequest("/posts/" + params.id);
  return res.data;
};

export const profilePageLoader = async () => {
  console.log("object");
  // const postPromise = apiRequest("/users/profilePosts");
  const chatPromise = apiRequest("/chats");
  console.log((await chatPromise).data);
  return defer({
    // postResponse: postPromise,
    chatResponse: chatPromise,
  });
};
