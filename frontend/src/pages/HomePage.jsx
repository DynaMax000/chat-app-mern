import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { useEffect, useState } from 'react'
import { getOutgoingFriendRequests, getRecommendedUsers, getUserFriends, sendFriendRequests } from '../lib/api';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

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
    mutationFn: sendFriendRequests(),
    onSuccess: () => {
      queryClient.invalidateQueries(['outgoingFriendRequests']);
    }
  });

  useEffect(() => {
    const outgoingIds = new Set();
    if(outgoingFriendRequests && outgoingFriendRequests.length >0) {
      outgoingFriendRequests.forEach(req => outgoingIds.add(req.id));
      setOutgoingRequestsIds(outgoingIds);
    }

  }, [outgoingFriendRequests])

  return (
    <div>HomePage</div>
  )
}

export default HomePage