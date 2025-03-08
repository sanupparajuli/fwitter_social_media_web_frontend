import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { createTweet, getAllTweets, likeTweet, retweet, deleteTweet } from "../api/api"; // Import API functions
import "./Dashboard.css";
import logo from "../../public/logo.png";
import profile from "../../public/profile.png";

const TwitterClone = () => {
    const [postText, setPostText] = useState("");
    const [tweets, setTweets] = useState([]);
    const navigate = useNavigate();

    // Fetch tweets on component mount
    useEffect(() => {
        const fetchTweets = async () => {
            try {
                const response = await getAllTweets();
                setTweets(response);
            } catch (error) {
                console.error("Error fetching tweets:", error);
            }
        };
        fetchTweets();
    }, []);

    // Handle Logout
    const handleLogout = () => {
        localStorage.removeItem("token");
        navigate("/");
    };

    // Handle Post Tweet
    const handlePostTweet = async () => {
        if (!postText.trim()) return; // Prevent empty tweets

        try {
            const newTweet = await createTweet({ content: postText });
            setTweets([newTweet, ...tweets]); // Add new tweet at the top of the feed
            setPostText(""); // Clear input field
        } catch (error) {
            console.error("Error posting tweet:", error);
        }
    };

    // Handle Like Tweet
    const handleLike = async (tweetId) => {
        try {
            await likeTweet(tweetId);
            setTweets((prevTweets) =>
                prevTweets.map((tweet) =>
                    tweet._id === tweetId ? { ...tweet, likes: (tweet.likes || 0) + 1 } : tweet
                )
            );
        } catch (error) {
            console.error("Error liking tweet:", error);
        }
    };

    // Handle Retweet
    const handleRetweet = async (tweetId) => {
        try {
            await retweet(tweetId);
            setTweets((prevTweets) =>
                prevTweets.map((tweet) =>
                    tweet._id === tweetId ? { ...tweet, retweets: (tweet.retweets || 0) + 1 } : tweet
                )
            );
        } catch (error) {
            console.error("Error retweeting:", error);
        }
    };

    // Handle Delete Tweet
    const handleDeleteTweet = async (tweetId) => {
        try {
            await deleteTweet(tweetId);
            setTweets((prevTweets) => prevTweets.filter((tweet) => tweet._id !== tweetId));
        } catch (error) {
            console.error("Error deleting tweet:", error);
        }
    };

    return (
        <div className="container">
            {/* Sidebar */}
            <div className="sidebar">
                <div className="twitter-logo">
                    <img src={logo} alt="Queet Logo" className="queet-logo" />
                </div>

                <nav className="nav-menu">
                    <ul>
                        <li className="nav-item active">
                            <a href="#"><span className="icon">🏠</span> Home</a>
                        </li>
                        <li className="nav-item">
                            <a href="#"><span className="icon">🔔</span> Notifications</a>
                        </li>
                        <li className="nav-item">
                            <a href="/profile"><span className="icon">👤</span> Profile</a>
                        </li>
                        <li className="nav-item" onClick={handleLogout}>
                            <a href="#"><span className="icon">⚙</span> Logout</a>
                        </li>
                    </ul>
                </nav>
            </div>

            {/* Main Content */}
            <div className="main-content">
                {/* Post Input */}
                <div className="post-input">
                    <div className="input-container">
                        <img src={profile} alt="User" className="avatar" />
                        <textarea
                            placeholder="What is happening?!"
                            value={postText}
                            onChange={(e) => setPostText(e.target.value)}
                        />
                    </div>
                    <div className="post-actions">
                        <button onClick={handlePostTweet}>Post</button>
                    </div>
                </div>

                {/* Tweets Section */}
                <div className="tweet-feed">
                    {tweets.length > 0 ? (
                        tweets.map((tweet) => (
                            <div key={tweet._id} className="tweet">
                                <div className="tweet-header">
                                    <img src={profile} alt={tweet.user?.name || "User"} className="avatar" />
                                    <div className="tweet-user">
                                        <span className="name">{tweet.user?.name || "Unknown User"}</span>
                                        <span className="handle">@{tweet.user?.username || "unknown"}</span>
                                        <span className="time"> · {new Date(tweet.created_at).toLocaleTimeString()}</span>
                                    </div>
                                </div>

                                {/* Tweet Content */}
                                <div className="tweet-content">{tweet.content}</div>

                                {/* Tweet Image (if available) */}
                                {tweet.image && <img src={tweet.image} alt="Tweet" className="tweet-image" />}

                                {/* Tweet Actions */}
                                <div className="tweet-actions">
                                    <span className="emoji-btn" onClick={() => handleLike(tweet._id)}>❤️ {tweet.likes || 0}</span>
                                    <span className="emoji-btn" onClick={() => handleRetweet(tweet._id)}>🔄 {tweet.retweets || 0}</span>
                                    <span className="emoji-btn delete-btn" onClick={() => handleDeleteTweet(tweet._id)}>🗑️</span>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p>No tweets available</p>
                    )}
                </div>
            </div>
        </div>
    );
};

export default TwitterClone;
