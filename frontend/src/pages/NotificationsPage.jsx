import { useQueryClient } from "@tanstack/react-query"

const NotificationsPage = () => {
  const queryClient = useQueryClient;
  const { data, isLoading } = useQuery({
    queryKey: ["friendRequests"],
    queryFn: getFriendRequests,

  })
  return (
    <div>NotificationsPage</div>
  )
}

export default NotificationsPage