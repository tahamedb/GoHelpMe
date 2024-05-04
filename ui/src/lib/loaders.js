const profilePageLoader = async () => {
  const chatPromise = apiReqest("/chats");
  return defer({
    chatResponse: chatPromise,
  });
};
