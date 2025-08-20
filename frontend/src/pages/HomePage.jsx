import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useState } from 'react'
import { getOutgoingFriendRequests, getRecommendedUsers, getUserFriends } from '../lib/api';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState();

  const { data:friends=[], isLoading:loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  const { data:recommendedUsers=[], isLoading:loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getRecommendedUsers,
  });

  const { data:outgoingFriendRequests=[] } = useQuery({
    queryKey: ['outgoingFriendRequests'],
    queryFn: getOutgoingFriendRequests,
  });

  const { mutate:sendRequestMutation, isPending } = useMutation({
    mutationFn: sendFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries(['outgoingFriendRequests']);
    }
  });

  return (
    <div>HomePage</div>
  )
}

export default HomePage