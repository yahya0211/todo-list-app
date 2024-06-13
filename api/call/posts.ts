import api from "..";

export const Auth = async (token: string) => {
  const response = await api.get("auth", {
    headers: { Authorization: `Bearer ${token}` },
  });

  return response.data;
};
