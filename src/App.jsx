import { HeartIcon, SpinnerIcon } from "./icons";
import { useState } from "react";

export default function App() {
  const [liked, setLiked] = useState(false);
  const [isFetching, setIsFetching] = useState(false);
  const [error, setError] = useState(null);
  const handleClick = async () => {
    setIsFetching(true);
    setError(null);

    try {
      const resp = await fetch(
        "https://questions.greatfrontend.com/api/questions/like-button",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ action: liked ? "unlike" : "like" }),
        }
      );

      if (resp.status == 200) {
        setLiked((liked) => !liked);
      } else {
        const res = await resp.json();
        setError(res?.error || "Error while likeing/unliking");
      }
      // console.info("fetched data:", await resp.json());
    } catch (error) {
      setError(error || "An error occurred");
    }

    setTimeout(() => {
      // Simulate a delay for the sake of the example
      setIsFetching(false);
      console.info("Simulated delay complete");
    }, 2000);
  };
  return (
    <div>
      <button
        disabled={isFetching}
        className={`likeBtn ${liked ? "liked" : ""}`}
        onClick={handleClick}
      >
        {isFetching ? <SpinnerIcon /> : <HeartIcon />}{" "}
        {liked ? "Liked" : "Like"}
      </button>
      {error && <div className="error">{error}</div>}
    </div>
  );
}
