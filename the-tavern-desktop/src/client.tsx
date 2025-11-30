import {
  initClient,
  initClientNavigation,
  navigate,
  fetchTransport,
} from "rwsdk/client";

const { handleResponse } = initClientNavigation();

const redirectTransport = (
  transportContext: Parameters<typeof fetchTransport>[0]
) => {
  const callServer = fetchTransport(transportContext);

  return async (id: string, args: unknown) => {
    const result = await callServer(id, args);

    if (result?.redirectTo) {
      navigate(result.redirectTo);
      return undefined;
    }

    return result;
  };
};

initClient({ transport: redirectTransport, handleResponse });