import React, { useEffect, useState } from "react";
<<<<<<< HEAD
import { Pagination } from "antd"; 


=======
import { IMAGE_URL } from "@/public";
>>>>>>> 992ac901633c5323920797d5ee01ba827b0067a8

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
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [editIndex, setEditIndex] = useState<number | null>(null);
  const [currentPageReviews, setCurrentPageReviews] = useState<Review[]>([]);

  // Pagination state
  const [page, setPage] = useState(1);
  const limit = 4; // Số lượng comment trên mỗi trang
  const totalPages = Math.ceil(reviews.length / limit);


  useEffect(() => {
    getInfoUser();
    fetchReviews();
  }, [roomId]);

  useEffect(() => {
    // Cập nhật danh sách comment cho trang hiện tại
    const startIndex = (page - 1) * limit;
    const endIndex = startIndex + limit;
    setCurrentPageReviews(reviews.slice(startIndex, endIndex));
  }, [page, reviews]);

  
  

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
    } catch (error) {}
  };

  useEffect(() => {
    fetchReviews();
  }, [roomId]);

  const fetchReviews = async () => {
    try {
      const numericRoomId = Number(roomId);
      if (isNaN(numericRoomId)) {
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
        setPage(1); 
      } 
    } catch (error) {} finally {
      setLoading(false);
    }
  };

<<<<<<< HEAD
  

  const openModal = (index: number | null = null) => {
    if (index !== null) {
      setEditIndex(index);
      setNewComment(reviews[index].comment);
      
    } else {
      setEditIndex(null);
      setNewComment("");
   
    }
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setEditIndex(null);
    setNewComment("");
   
  };
  return (
    <div className="mt-8 pt-6 ">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-gray-800">Reviews</h2>
        <button
          className="bg-pink-600 text-white px-4 py-2 rounded-lg hover:bg-pink-500 text-sm"
          onClick={() => openModal()}
        >
          Write a Review
        </button>
=======
      {/* Review List */}
      <div className="space-y-4">
        {Array.isArray(reviews) && reviews.length > 0 ? (
          reviews.map((review: Review) =>
            review && review._id ? (
              <div key={review._id} className="border-b pb-4 flex items-start space-x-4 gap-4">
                {/* Avatar */}
                <img
                  src={review.user_avatar || IMAGE_URL.USER}
                  alt={`${review.user_name}'s avatar`}
                  className="w-10 h-10 rounded-full"
                />
                <div>
                  {/* User Info */}
                  <p className="text-sm text-gray-500">{review.user_email.split("@")[0]}</p>
                  {/* Comment */}
                  <p className="mt-2">{review.comment}</p>
                  <p className="text-sm text-gray-500">
                    Posted on {new Date(review.createdAt).toLocaleDateString()}
                  </p>
                </div>
              </div>
            ) : null
          )
        ) : (
          <p className="text-gray-500">No reviews yet.</p>
        )}
>>>>>>> 992ac901633c5323920797d5ee01ba827b0067a8
      </div>

      {/* Review List */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-6 pt-6">
  {currentPageReviews.length > 0 ? (
     currentPageReviews.map((review, index) => {
      if (!review) return null; // Bỏ qua nếu review là null hoặc undefined
      return (
        <div
          key={review._id || index} // Sử dụng index làm fallback nếu _id không tồn tại
          className="border border-gray-200 rounded-lg p-4 shadow-sm hover:shadow-md transition"
        >
          <div className="flex gap-4 mb-3">
            <div className="w-12 h-12 rounded-full overflow-hidden bg-gray-200">
              <img
                src={review.user_avatar || "default_avatar.png"} // Sử dụng avatar mặc định nếu không có user_avatar
                alt={review.user_name || "Anonymous"} // Sử dụng tên mặc định nếu không có user_name
                className="object-cover w-full h-full"
              />
            </div>
            <div>
              <p className="font-semibold text-gray-800">{review.user_name || "Anonymous"}</p>
              <p className="text-sm text-gray-500">
                {review.createdAt
                  ? new Date(review.createdAt).toLocaleDateString()
                  : "Unknown Date"}
              </p>
            </div>
          </div>

          <p className="text-gray-700">{review.comment || "No comment provided."}</p>

          
        </div>
      );
    })
  ) : (
    <p className="text-gray-500">No reviews yet. Be the first to leave a review!</p>
  )}
</div>


   {/* Pagination */}
   <div className="flex justify-center !mb-4 pt-6">
        <Pagination
          current={page}
          total={totalPages * limit}
          pageSize={limit}
          onChange={(newPage) => setPage(newPage)}
          showSizeChanger={false}
        />
      </div>

      {/* Modal */}
      {isModalOpen && (
  <div className="fixed inset-0  bg-opacity-50 flex justify-center items-center z-50">
    <div className="border-t bg-white w-full max-w-md p-6 rounded-lg shadow-lg">
      <h3 className="text-xl font-semibold mb-4 text-gray-800">
        {editIndex !== null ? "Edit Review" : "Write a Review"}
      </h3>

     
      {/* Comment Input */}
      <textarea
        id="comment"
        value={newComment}
        onChange={(e) => setNewComment(e.target.value)}
        rows={4}
        className="w-full border border-gray-300 rounded-md p-2 focus:ring-indigo-500 focus:border-indigo-500"
        placeholder="Write your review here..."
      ></textarea>

      {/* Buttons */}
      <div className="flex justify-end gap-2 mt-4">
        <button
          onClick={closeModal}
          className="px-4 py-2 bg-gray-300 text-gray-700 rounded-md hover:bg-gray-400"
        >
          Cancel
        </button>
        <button
          onClick={handleSubmit}
          disabled={loading}
          className="px-4 py-2 bg-pink-600  text-white rounded-md hover:bg-pink-700 disabled:opacity-50"
        >
         Submit
        </button>
      </div>
    </div>
  </div>
)}
    </div>
  );
};



export default CommentSection;