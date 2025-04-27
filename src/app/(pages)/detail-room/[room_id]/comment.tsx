import React, { useEffect, useState } from "react";

interface Review {
  _id: string;
  user_email: string;
  user_name: string;
  user_avatar: string;
  comment: string;
  createdAt: string;
}

const CommentSection = ({ roomId }: { roomId: string }) => {
  const [reviews, setReviews] = useState<Review[]>([]);
  const [newComment, setNewComment] = useState("");
  const [loading, setLoading] = useState(false);
  const [user, setUser] = useState<any>(null);

  useEffect(() => {
    getInfoUser();
  }, []);

  const getInfoUser = async () => {
    const token = localStorage.getItem("token");
    if (!token) return;

    try {
      const res = await fetch("/api/profile", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      const data = await res.json();

      if (res.ok) {
        setUser(data.user);
      } 
    } catch (error) {
      console.error("API call error:", error);
    }
  };

  useEffect(() => {
    fetchReviews();
  }, [roomId]);

  const fetchReviews = async () => {
    try {
      const numericRoomId = Number(roomId);
      if (isNaN(numericRoomId)) {
        console.error("Invalid roomId:", roomId);
        return;
      }

      const res = await fetch(`/api/comment/${numericRoomId}`);
      const data = await res.json();
      if (data.success) {
        setReviews(data.comments);
      } 
    } catch (error) {}
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    const token = localStorage.getItem("token");
    try {
      const numericRoomId = Number(roomId);
      if (isNaN(numericRoomId)) {
        console.error("Invalid roomId:", roomId);
        setLoading(false);
        return;
      }

      const email = localStorage.getItem("email") || "anonymous_user";
      const res = await fetch(`/api/comment/?room_id=${numericRoomId}`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          room_id: numericRoomId,
          user_email: email,
          comment: newComment,
          user_name: user?.name || "Anonymous",
          user_avatar: user?.avatar || "default_avatar.png",
        }),
      });

      const data = await res.json();
      if (data.success) {
        setReviews((prevReviews) =>
          Array.isArray(prevReviews) ? [data.data, ...prevReviews] : [data.data]
        );
        setNewComment("");
        await fetchReviews();

      } 
    } catch (error) {} finally {
      setLoading(false);
    }
  };
  return (
    <div className="mt-8">
      <h2 className="text-xl font-semibold mb-4">Reviews</h2>

      <div className="space-y-4">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review: Review) =>
            review && review._id ? (
              <div key={review._id} className="border-b pb-4">
                <p>
                  stars
                </p>
                <p>{review.comment}</p>
                <p className="text-sm text-gray-500">
                  Posted on {new Date(review.createdAt).toLocaleDateString()}
                </p>
              </div>
            ) : null
          )
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
      </div>

      {/* Add New Review */}
      <form onSubmit={handleSubmit} className="mt-6">
        <h3 className="text-lg font-medium mb-2">Add a Review</h3>
    
        <div className="mb-4">
          <label
            htmlFor="comment"
            className="block text-sm font-medium text-gray-700"
          >
            Comment
          </label>
          <textarea
            id="comment"
            value={newComment}
            onChange={(e) => setNewComment(e.target.value)}
            rows={4}
            className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            placeholder="Write your review here..."
          ></textarea>
        </div>
        <button
          type="submit"
          disabled={loading}
          className="px-4 py-2 bg-indigo-600 text-white rounded-md hover:bg-indigo-700 disabled:opacity-50"
        >
          {loading ? "Submitting..." : "Submit Review"}
        </button>
      </form>
    </div>
  );
};

export default CommentSection;
