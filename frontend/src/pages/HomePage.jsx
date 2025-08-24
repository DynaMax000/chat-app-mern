import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import FriendCard from '../components/FriendCard';
import { getOutgoingFriendRequests, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';

const HomePage = () => {
  const queryClient = useQueryClient();
  const [outgoingRequestsIds, setOutgoingRequestsIds] = useState(new Set());

  const { data: friends = [], isLoading: loadingFriends } = useQuery({
    queryKey: ['friends'],
    queryFn: getUserFriends,
  });

  const { data: recommendedUsers = [], isLoading: loadingUsers } = useQuery({
    queryKey: ['users'],
    queryFn: getRecommendedUsers,
  });

  const { data: outgoingFriendRequests = [] } = useQuery({
    queryKey: ['outgoingFriendRequests'],
    queryFn: getOutgoingFriendRequests,
  });

  const { mutate: sendRequestMutation, isPending } = useMutation({
    mutationFn: (userId) => sendFriendRequest(userId),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['outgoingFriendRequests'] });
    },
  });

  useEffect(() => {
    const outgoingIds = new Set();
    const list = outgoingFriendRequests || [];
    list.forEach((req) => {
      const rid = req?.recipient?._id || req?.recipient || req?._id;
      if (rid) outgoingIds.add(String(rid));
    });
    setOutgoingRequestsIds(outgoingIds);
  }, [outgoingFriendRequests]);

  const handleSendRequest = (userId) => {
    if (!userId) return;
    sendRequestMutation(userId);
  };

  return (
    <div className='p-4 sm:p-6 lg:p-8'>
      <div className='container mx-auto space-y-10'>
        <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
          <h2 className='text-2xl sm:text-3xl font font-bold tracking-tight'> Your Friends </h2>
          <Link to='/notifications' className='btn btn-outline btn-sm'>
            <UsersIcon className='mr-2 size-4' />
            Friend Requests
          </Link>
        </div>

        {loadingFriends ? (
          <div className='flex justify-center py-12'>
            <span className='loading loading-spinner loading-lg'></span>
          </div>

        ) : (friends || []).length === 0 ? (
          <p>No friends yet.</p>
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {(friends || []).map((friend) => {
              return <FriendCard key={friend._id} friend={friend} onAdd={() => handleSendRequest(friend._id)} isPending={isPending} />
            })}
          </div>
        )}
      </div>
    </div>
  )
}

export default HomePage