import { useQuery } from "@tanstack/react-query";
import { getAuthUser } from "../lib/api";

const useAuthUser = () => {
  const { data, isLoading, error } = useQuery({
    queryKey: ['authUser'],
    queryFn: getAuthUser,
    retry: false, // auth check => one time only
  });

  return { 
    isLoading, 
    authUser: data?.user, // Extract user from the response
    error 
  };
};

export default useAuthUser;