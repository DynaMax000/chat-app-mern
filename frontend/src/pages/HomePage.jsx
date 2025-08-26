import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { MapPinIcon, UsersIcon } from 'lucide-react';
import { useEffect, useState } from 'react';
import { Link } from 'react-router';
import FriendCard from '../components/FriendCard';
import { getOutgoingFriendRequests, getRecommendedUsers, getUserFriends, sendFriendRequest } from '../lib/api';
import NoFriendFound from '../components/NoFriendFound';

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
          <NoFriendFound />
        ) : (
          <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
            {(friends || []).map((friend) => {
              return <FriendCard key={friend._id} friend={friend} onAdd={() => handleSendRequest(friend._id)} isPending={isPending} />
            })}
          </div>
        )}

        <section>
          <div className='mb-6 sm:mb-8'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4'>
              <div>
                <h2 className='text-2xl sm:text-3xl font-bold tracking-tight'>Meet New Friends</h2>
                <p className='opacity-70'>Connect with people around the world!</p>
              </div>
            </div>
          </div>

          {loadingUsers ? (
            <div className='flex justify-center py-12'>
              <span className='loading loading-spinner loading-lg' />
            </div>
          ) : recommendedUsers.length === 0 ? (
            <div className='card bg-base-200 p-6 text-center'>
              <h3 className='font-semibold text-lg mb-2'>No Users Found</h3>
              <p className='text-base-content opacity-70'>Try refreshing the page or check back later!</p>
            </div>
          ) : (
            <div className='grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4'>
              {recommendedUsers.map((user) => {
                const hasRequestBeenSent = outgoingRequestsIds.has(user._id);
                return (
                  <div key={user._id} className='card bg-base-200 hover:shadow-lg transition-all duration-300'>
                    <div className='card-body p-5 space-y-4'>
                      <div className='flex items-center gap-3'>
                        <div className='avatar size-16 rounded-full'>
                          <img src={user.profilePic} alt={user.fullName} />

                          <div>
                            <h3 className='font-semibold text-lg'>{user.fullName}</h3>
                            {user.location && (
                              <div className='flex items-center text-xs opacity-70 mt-1'>
                                <MapPinIcon className='size-3 mr-1' />
                                {user.location}
                              </div>
                            )}
                          </div>
                        </div>


                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
          )}
        </section>
      </div>
    </div>
  )
}

export default HomePage