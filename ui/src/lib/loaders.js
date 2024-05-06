import apiRequest from "./apiRequest";

const profilePageLoader = async () => {
  const chatPromise = apiReqest("/chats");
  return defer({
    chatResponse: chatPromise,
  });
};
export const singlePageLoader = async({request, params}) => {
  const res = await apiRequest("/posts/"+params.id)
  return res.data;
};
