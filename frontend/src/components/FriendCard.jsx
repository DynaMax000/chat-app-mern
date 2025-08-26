import { Link } from "react-router";
import { LANGUAGE_TO_FLAG } from "../constants";

/*
Props:
- friend: { _id, fullName, profilePic, nativeLanguage, learningLanguage }
- onAdd: () => void
- isPending: boolean
*/
const FriendCard = ({ friend, onAdd, isPending }) => {
  if (!friend) return null;
  return (
    <div className="card bg-base-200 hover:shadow-md transition-shadow">
      <div className="card-body p-4">
        {/* User info */}
        <div className="flex items-center gap-3 mb-3">
          <div className="avatar size-12">
            <img src={friend.profilePic} alt={friend.fullName} />
          </div>
          <div>
            <h3 className="font-semibold truncate">{friend.fullName}</h3>
          </div>
        </div>

        <div className="flex flex-wrap gap-1.5 mb-3">
          <span className="badge badge-secondary text-xs">
            {getLanguageFlag(friend.nativeLanguage)}
            Native: {friend.nativeLanguage}
          </span>
          <span className="badge badge-outline text-xs">
            {getLanguageFlag(friend.learningLanguage)}
            Learning: {friend.learningLanguage}
          </span>
        </div>
        <Link to={`/chat/${friend._id}`} className="btn btn-sm btn-secondary">
          Message
        </Link>
      </div>
    </div>
  );
};

export default FriendCard;

function getLanguageFlag(language) {
  if (!language) return null;

  const langLower = language.toLowerCase();
  const countryCode = LANGUAGE_TO_FLAG[langLower];

  if (countryCode) {
    return (
      <img
        src={`https://flagcdn.com/24x18/${countryCode}.png`}
        alt={`${langLower} flag`}
        className="inline-block h-3 mr-1" />
    );
  }

  return null;
}