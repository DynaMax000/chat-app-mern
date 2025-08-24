/*
Props:
- friend: { _id, fullName, profilePic, nativeLanguage, learningLanguage }
- onAdd: () => void
- isPending: boolean
*/
const FriendCard = ({ friend, onAdd, isPending }) => {
  if (!friend) return null;
  const { _id, fullName, profilePic, nativeLanguage, learningLanguage } = friend;
  return (
    <div className="card bg-base-100 shadow border">
      <div className="card-body">
        <div className="flex items-center gap-3">
          <img
            src={profilePic || "/vite.svg"}
            alt={fullName}
            className="w-12 h-12 rounded-full object-cover"
          />
          <div>
            <h3 className="font-semibold">{fullName}</h3>
            <p className="text-sm opacity-70">
              {nativeLanguage || ""}
              {learningLanguage ? ` → ${learningLanguage}` : ""}
            </p>
          </div>
        </div>
        {onAdd && (
          <div className="card-actions justify-end mt-3">
            <button
              className="btn btn-sm btn-primary"
              disabled={isPending}
              onClick={onAdd}
            >
              {isPending ? "Sending…" : "Add Friend"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendCard;