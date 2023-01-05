import { useQuery } from "@apollo/client";

import { ME } from "../graphql/queries";

const getMe = () => {
  const { data, loading, error } = useQuery(ME);

  return { me: data?.me, loading, error };
};

export default getMe;
