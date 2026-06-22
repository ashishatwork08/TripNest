import { useState, useEffect } from "react";
import { Star } from "lucide-react"
import api from "../../lib/api"
import { useAuth } from "../../context/AuthContext"

export default function ReviewSection({ propertyId }) {
    const { user } = useAuth()
    const [reviews, setReviews] = useState([])
    const [loading, setLoading] = useState(true)
    const [rating, setRating] = useState(5)
    const [comment, setComment] = useState("")
    const [submitting, setSubmitting] = useState(false)
    const [error, setError] = useState("")

    useEffect(() => {
        loadReviews()
    }, [propertyId])

    const loadReviews = async () => {
        try {
            const res = await api.get(`/reviews/${propertyId}`)
            setReviews(res.data.reviews)
        }
        catch (err) {
            console.error("Failed to load reviews:", err)
        } finally {
            setLoading(false)
        }
    }
    const handleSubmit = async (e) => {
        e.preventDefault()
        if (!comment.trim()) {
            setError("Please write a comment")
            return
        }
        setSubmitting(true)
        setError("")
        try {
            const res = await api.post(`/reviews/${propertyId}`, { rating, comment })
            setReviews((prev) => [res.data.review, ...prev])
            setComment("")
            setRating(5)
        }
        catch (err) {
            setError(err.response?.data?.message || "Failed to submit review")
        }
        finally {
            setSubmitting(false)
        }
    }
    const alreadyReviewed = reviews.some((r) => r.user?._id === user?._id)
    return (
        <div className="mt-8 border-t border-white/10 pt-6">
            <h3 className="text-xl font-semibold text-white mb-5">
                Reviews {reviews.length > 0 && `(${reviews.length})`}
            </h3>

            {user && !alreadyReviewed && (
                <form onSubmit={handleSubmit} className="bg-white/5 border border-white/10 rounded-xl p-5 mb-6">
                    <div className="flex items-center gap-2 mb-4">
                        <label className="text-sm text-gray-400">Your Rating</label>
                        <div className="flex gap-1">
                            {[1, 2, 3, 4, 5].map((star)=>(
                            <button
                                key={star}
                                type="button"
                                onClick={() => setRating(star)}>
                              <Star size={20} className={star <= rating ?"fill-rose-500 text-rose-500": "text-white/20"}
                                />

                            </button>
                               ) )}
                        </div>
                    </div>
                    <textarea value={comment} onChange={(e)=> setComment(e.target.value)}
                    placeholder="share your experiance..." rows={3}
                    className="w-full bg-white/5 border border-white/10 rounded-xl px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-rose-500 mb-3"/>
                    {error && <p className="text-rose-400 text-sm mb-3">{error}</p>}
                    <button type="submit" disabled={submitting} className="br-rose-500 hover:bg-rose-600 disabled:opacity-50 text-white text-sm font-semibold px-5 py-2 rounded-xl transition">
                        {submitting ? "Submitting..." : "Submit Review"}
                    </button>
                </form>
            )}
            {alreadyReviewed && (
                <p className="text-gray-400 text-sm mb-6">You have already reviewed this property.</p>
            )}

            {loading ? (
               <p className="text-gray-500 text-sm">Loading reviews...</p>
      ) : reviews.length === 0 ? (
        <p className="text-gray-500 text-sm">No reviews yet. Be the first to review!</p>
      ) : (
        <div className="space-y-4">
          {reviews.map((review) => (
            <div key={review._id} className="bg-white/5 border border-white/10 rounded-xl p-4">
              <div className="flex items-center justify-between mb-2">
                <p className="text-white font-medium text-sm">{review.user?.name || "Anonymous"}</p>
                <div className="flex gap-0.5">
                  {[1, 2, 3, 4, 5].map((star) => (
                    <Star
                      key={star}
                      size={14}
                      className={star <= review.rating ? "fill-rose-500 text-rose-500" : "text-white/20"}
                    />
                  ))}
                </div>
              </div>
              <p className="text-gray-300 text-sm">{review.comment}</p>  
              </div>
            ))}
        </div>
      )}
      </div>
    )
}