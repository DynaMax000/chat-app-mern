import { useQueryClient } from "@tanstack/react-query";
import { acceptFriendRequest, getFriendRequest } from "../lib/api";
import { UserCheckIcon } from "lucide-react";

const NotificationsPage = () => {
  const queryClient = useQueryClient;
  const { data: friendRequests, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequest,
  })

  const { mutate: acceptRequestMutation, isPending } = useMutation({
    mutationFn: acceptFriendRequest,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["friendRequests"] });
      queryClient.invalidateQueries({ queryKey: ["friends"] });
    }
  });

  const incomingRequests = friendRequests?.incomingRequests || [];
  const acceptedRequests = friendRequests?.acceptedRequests || [];

  return (
    <div className="p-4 sm:p-6 lg:p-8">
      <div className="container mx-auto mx-w-4xl space-y-8">
        <h1 className="text-2xl sm:text-3xl font-bold tracking-tight mb-6"> Notifications</h1>

        {isLoading ? (
          <div className="flex justify-center">
            <span className="loading loading-spinner loading-lg"></span>
          </div>
        ) : (
          <>
            {incomingRequests.length > 0 && (
              <section className="space-y-4">
                <h2 className="text-xl font-semibold flex items-center gap-2">
                  <UserCheckIcon className="size-5 text-primary" />
                  Friend Requests
                  <span className="badge badge-primary ml-2">{incomingRequests.length}</span>
                </h2>

                <div className="space-y-3">
                  {incomingRequests.map((request) => (
                    <div
                      key={request._id}
                      className="card bg-base-200 shadow-sm hover:shadow-md transition-shadow">
                      <div className="card-body p-4">
                        <div className="flex items-center justify-between">
                          <div className="flex items-center gap-3">
                            <div className="avatar size-14 rounded-full bg-base-300">
                              <img src={request.sender.profilePicture} alt={request.sender.fullName} />
                            </div>
                          </div>
                          <h3 className="font-semibold">{request.sender.fullName}</h3>
                          <div className="flex flex-wrap gap-1.5 mt-1">
                            <span className="badge badge-secondary badge-sm">
                              Native: {request.sender.nativeLanguage}
                            </span>
                            <span className="badge badge-secondary badge-sm">Learning: {request.sender.learningLanguage}</span>
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </section>
            )}
          </>
        )}
      </div>
    </div>
  )
}

export default NotificationsPage