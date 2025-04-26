import { HeartIcon, SpinnerIcon } from "./icons";
import { useState } from "react";

export default function App() {
  const [liked, setLiked] = useState(false);
  const handleClick = () => {
    setLiked((liked) => !liked);
  };
  return (
    <div>
      <button
        className={`likeBtn ${liked ? "liked" : ""}`}
        onClick={handleClick}
      >
        <HeartIcon /> {liked ? "Liked" : "Like"}
      </button>
    </div>
  );
}
