import React, { useEffect, useState } from "react";
import { fetchTweets, likeTweet, retweet } from "../api/api";

function Home() {
  const [tweets, setTweets] = useState([]);

  useEffect(() => {
    loadTweets();
  }, []);

  const loadTweets = async () => {
    try {
      const response = await fetchTweets();
      setTweets(response.data);
    } catch (error) {
      console.error("Error fetching tweets", error);
    }
  };

  return (
    <div>
      <h2>Home</h2>
      {tweets.map((tweet) => (
        <div key={tweet._id}>
          <h4>@{tweet.user.username}</h4>
          <p>{tweet.content}</p>
          <button onClick={() => likeTweet(tweet._id)}>Like</button>
          <button onClick={() => retweet(tweet._id)}>Retweet</button>
        </div>
      ))}
    </div>
  );
}

export default Home;
