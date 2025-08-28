import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import {
  Calendar,
  User,
  Heart,
  MessageCircle,
  Share2,
  ThumbsUp,
  Reply,
  Send,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";
import { redirectToPayment, CAMPAIGN_SOURCES } from "@/lib/payment";
import { featuredPost } from "@shared/blog-data";

const Blog = () => {
  const [isLiked, setIsLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(156);
  const [newComment, setNewComment] = useState("");
  const [userName, setUserName] = useState("");
  const [showNameForm, setShowNameForm] = useState(false);
  const [replyingTo, setReplyingTo] = useState<number | null>(null);
  const [newReply, setNewReply] = useState("");
  const [readTime, setReadTime] = useState("5 min read");
  const [startTime] = useState(Date.now());
  const [maxReadTime, setMaxReadTime] = useState(5);
  const [comments, setComments] = useState([
    {
      id: 1,
      author: "Sarah M.",
      content:
        "This is so inspiring! Every child truly deserves a chance to achieve their dreams.",
      date: "2 hours ago",
      likes: 12,
      isLiked: false,
      replies: [
        {
          id: 1,
          author: "James K.",
          content:
            "Couldn't agree more! Education is the key to breaking the cycle of poverty.",
          date: "1 hour ago",
          likes: 5,
          isLiked: false,
        },
      ],
    },
    {
      id: 2,
      author: "Michael T.",
      content:
        "Beautiful article! I've seen firsthand how small acts of kindness can transform lives.",
      date: "5 hours ago",
      likes: 8,
      isLiked: false,
      replies: [],
    },
    {
      id: 3,
      author: "Grace N.",
      content:
        "This reminds me why I started volunteering. Thank you for sharing this message.",
      date: "1 day ago",
      likes: 15,
      isLiked: false,
      replies: [
        {
          id: 1,
          author: "Emma W.",
          content:
            "Grace, your volunteer work is amazing! Keep making a difference.",
          date: "18 hours ago",
          likes: 3,
          isLiked: false,
        },
      ],
    },
  ]);

  // Real-time read tracking
  useEffect(() => {
    const interval = setInterval(() => {
      const currentTime = (Date.now() - startTime) / 1000 / 60; // minutes
      const roundedTime = Math.ceil(currentTime);
      if (roundedTime > maxReadTime) {
        setMaxReadTime(roundedTime);
        setReadTime(`${roundedTime} min read`);
      }
    }, 10000); // Update every 10 seconds

    return () => clearInterval(interval);
  }, [startTime, maxReadTime]);

  const handleLike = () => {
    setIsLiked(!isLiked);
    setLikeCount((prev) => (isLiked ? prev - 1 : prev + 1));
  };

  const handleCommentLike = (commentId: number, replyId?: number) => {
    setComments(prev => prev.map(comment => {
      if (comment.id === commentId) {
        if (replyId) {
          // Like a reply
          return {
            ...comment,
            replies: comment.replies.map(reply =>
              reply.id === replyId
                ? {
                    ...reply,
                    likes: reply.isLiked ? reply.likes - 1 : reply.likes + 1,
                    isLiked: !reply.isLiked
                  }
                : reply
            )
          };
        } else {
          // Like a comment
          return {
            ...comment,
            likes: comment.isLiked ? comment.likes - 1 : comment.likes + 1,
            isLiked: !comment.isLiked
          };
        }
      }
      return comment;
    }));
  };

  const handleShare = (platform: string) => {
    const url = window.location.href;
    const text = featuredPost.title;

    switch (platform) {
      case "facebook":
        window.open(
          `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "twitter":
        window.open(
          `https://twitter.com/intent/tweet?text=${encodeURIComponent(text)}&url=${encodeURIComponent(url)}`,
          "_blank",
        );
        break;
      case "whatsapp":
        window.open(
          `https://wa.me/?text=${encodeURIComponent(text + " " + url)}`,
          "_blank",
        );
        break;
      default:
        navigator.clipboard.writeText(url);
        alert("Link copied to clipboard!");
    }
  };

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!userName.trim()) {
      setShowNameForm(true);
      return;
    }
    if (newComment.trim()) {
      const comment = {
        id: Date.now(),
        author: userName,
        content: newComment,
        date: "Just now",
        likes: 0,
        isLiked: false,
        replies: [],
      };
      setComments([comment, ...comments]);
      setNewComment("");
    }
  };

  const handleReplySubmit = (commentId: number) => {
    if (!userName.trim()) {
      setShowNameForm(true);
      return;
    }
    if (newReply.trim()) {
      const reply = {
        id: Date.now(),
        author: userName,
        content: newReply,
        date: "Just now",
        likes: 0,
        isLiked: false,
      };
      setComments(prev => prev.map(comment =>
        comment.id === commentId
          ? { ...comment, replies: [...comment.replies, reply] }
          : comment
      ));
      setNewReply("");
      setReplyingTo(null);
    }
  };

  const handleNameSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (userName.trim()) {
      setShowNameForm(false);
    }
  };

  return (
    <>
      {/* Hero Section */}
      <section className="pt-0 relative overflow-hidden bg-gradient-to-br from-charity-orange-50 to-charity-green-50">
        <Navigation />
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          <AnimatedSection animation="slideUp">
            <div className="text-center">
              <h1 className="text-5xl md:text-6xl font-bold text-charity-neutral-800 mb-6">
                Our Blog
              </h1>
              <p className="text-xl md:text-2xl max-w-3xl mx-auto text-charity-neutral-600">
                Stories of hope, impact, and transformation from our community
              </p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Featured Article */}
      <section className="py-20 bg-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <article className="bg-white rounded-2xl shadow-2xl overflow-hidden">
              {/* Hero Image */}
              <div className="relative h-96 overflow-hidden">
                <img
                  src={featuredPost.image}
                  alt={featuredPost.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute inset-0 bg-black bg-opacity-40"></div>
                <div className="absolute bottom-6 left-6 right-6">
                  <span className="inline-block bg-charity-orange-600 text-white px-3 py-1 rounded-full text-sm font-medium mb-4">
                    {featuredPost.category}
                  </span>
                  <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
                    {featuredPost.title}
                  </h1>
                </div>
              </div>

              {/* Article Meta */}
              <div className="p-8 border-b border-charity-neutral-200">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div className="flex items-center space-x-6 text-charity-neutral-600">
                    <div className="flex items-center space-x-2">
                      <User className="h-4 w-4" />
                      <span>{featuredPost.author}</span>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Calendar className="h-4 w-4" />
                      <span>{featuredPost.date}</span>
                    </div>
                    <span>{readTime}</span>
                  </div>

                  {/* Engagement Actions */}
                  <div className="flex items-center space-x-4">
                    <button
                      onClick={handleLike}
                      className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-200 ${
                        isLiked
                          ? "bg-red-50 text-red-600 border border-red-200"
                          : "bg-charity-neutral-100 text-charity-neutral-600 hover:bg-charity-neutral-200"
                      }`}
                    >
                      <Heart
                        className={`h-4 w-4 ${isLiked ? "fill-current" : ""}`}
                      />
                      <span>{likeCount}</span>
                    </button>

                    <div className="relative group">
                      <button className="flex items-center space-x-2 px-4 py-2 rounded-lg bg-charity-neutral-100 text-charity-neutral-600 hover:bg-charity-neutral-200 transition-colors duration-200">
                        <Share2 className="h-4 w-4" />
                        <span>Share</span>
                      </button>
                      <div className="absolute top-full right-0 mt-2 bg-white rounded-lg shadow-xl border border-charity-neutral-200 py-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 z-10">
                        <button
                          onClick={() => handleShare("facebook")}
                          className="block w-full text-left px-4 py-2 hover:bg-charity-neutral-50 text-charity-neutral-700"
                        >
                          Facebook
                        </button>
                        <button
                          onClick={() => handleShare("twitter")}
                          className="block w-full text-left px-4 py-2 hover:bg-charity-neutral-50 text-charity-neutral-700"
                        >
                          Twitter
                        </button>
                        <button
                          onClick={() => handleShare("whatsapp")}
                          className="block w-full text-left px-4 py-2 hover:bg-charity-neutral-50 text-charity-neutral-700"
                        >
                          WhatsApp
                        </button>
                        <button
                          onClick={() => handleShare("copy")}
                          className="block w-full text-left px-4 py-2 hover:bg-charity-neutral-50 text-charity-neutral-700"
                        >
                          Copy Link
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Article Content */}
              <div className="p-8">
                <div className="prose prose-lg max-w-none">
                  <p className="text-xl text-charity-neutral-700 mb-8 font-medium italic">
                    {featuredPost.excerpt}
                  </p>

                  {featuredPost.content.map((paragraph, index) => (
                    <p
                      key={index}
                      className="text-charity-neutral-700 leading-relaxed mb-6"
                    >
                      {paragraph}
                    </p>
                  ))}
                </div>

                {/* Call to Action */}
                <div className="mt-12 bg-charity-orange-50 p-8 rounded-xl border-l-4 border-charity-orange-500">
                  <h3 className="text-2xl font-bold text-charity-neutral-800 mb-4">
                    Ready to Make a Difference?
                  </h3>
                  <p className="text-charity-neutral-600 mb-6">
                    Join us in fueling children's dreams. Every contribution, no
                    matter how small, creates ripples of positive change.
                  </p>
                  <div className="flex flex-col sm:flex-row gap-4">
                    <button
                      onClick={() =>
                        redirectToPayment("donationUrl", {
                          source: CAMPAIGN_SOURCES.blog,
                          campaign: "blog-cta",
                        })
                      }
                      className="inline-flex items-center justify-center px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Donate Now
                    </button>
                    <Link
                      to="/get-involved"
                      className="inline-flex items-center justify-center px-6 py-3 border-2 border-charity-orange-600 text-charity-orange-600 hover:bg-charity-orange-600 hover:text-white rounded-lg font-medium transition-colors duration-200"
                    >
                      Get Involved
                    </Link>
                  </div>
                </div>
              </div>
            </article>
          </AnimatedSection>

          {/* Comments Section */}
          <AnimatedSection animation="slideUp" delay={200}>
            <div className="mt-12 bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-charity-neutral-800 mb-6 flex items-center">
                <MessageCircle className="h-6 w-6 mr-3 text-charity-orange-600" />
                Comments ({comments.length})
              </h3>

              {/* Name Form Modal */}
              {showNameForm && (
                <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
                  <div className="bg-white p-6 rounded-lg max-w-md w-full mx-4">
                    <h3 className="text-lg font-semibold text-charity-neutral-800 mb-4">
                      Please enter your name to comment
                    </h3>
                    <form onSubmit={handleNameSubmit}>
                      <input
                        type="text"
                        value={userName}
                        onChange={(e) => setUserName(e.target.value)}
                        placeholder="Your name"
                        className="w-full p-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent mb-4"
                        autoFocus
                      />
                      <div className="flex gap-3">
                        <button
                          type="submit"
                          className="flex-1 px-4 py-2 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200"
                        >
                          Save Name
                        </button>
                        <button
                          type="button"
                          onClick={() => setShowNameForm(false)}
                          className="flex-1 px-4 py-2 bg-charity-neutral-200 hover:bg-charity-neutral-300 text-charity-neutral-700 rounded-lg transition-colors duration-200"
                        >
                          Cancel
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
              )}

              {/* User Name Display */}
              {userName && (
                <div className="mb-4 p-3 bg-charity-green-50 rounded-lg border border-charity-green-200">
                  <p className="text-charity-green-700">
                    <strong>Commenting as:</strong> {userName}
                    <button
                      onClick={() => setShowNameForm(true)}
                      className="ml-2 text-charity-green-600 hover:text-charity-green-800 text-sm underline"
                    >
                      Change name
                    </button>
                  </p>
                </div>
              )}

              {/* Comment Form */}
              <form onSubmit={handleCommentSubmit} className="mb-8">
                <div className="flex gap-4">
                  <div className="flex-1">
                    <textarea
                      value={newComment}
                      onChange={(e) => setNewComment(e.target.value)}
                      placeholder={userName ? "Share your thoughts..." : "Please enter your name first to comment"}
                      className="w-full p-4 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent resize-none"
                      rows={3}
                    />
                  </div>
                  <button
                    type="submit"
                    className="self-end px-6 py-4 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg transition-colors duration-200 flex items-center"
                  >
                    <Send className="h-4 w-4" />
                  </button>
                </div>
              </form>

              {/* Comments List */}
              <div className="space-y-6">
                {comments.map((comment) => (
                  <div
                    key={comment.id}
                    className="border-b border-charity-neutral-200 pb-6 last:border-b-0"
                  >
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <h4 className="font-semibold text-charity-neutral-800">
                          {comment.author}
                        </h4>
                        <p className="text-sm text-charity-neutral-500">
                          {comment.date}
                        </p>
                      </div>
                      <button
                        onClick={() => handleCommentLike(comment.id)}
                        className={`flex items-center space-x-1 transition-colors duration-200 ${
                          comment.isLiked
                            ? "text-charity-orange-600"
                            : "text-charity-neutral-500 hover:text-charity-orange-600"
                        }`}
                      >
                        <ThumbsUp className={`h-4 w-4 ${comment.isLiked ? "fill-current" : ""}`} />
                        <span>{comment.likes}</span>
                      </button>
                    </div>
                    <p className="text-charity-neutral-700 mb-4">
                      {comment.content}
                    </p>

                    {/* Replies */}
                    {comment.replies.length > 0 && (
                      <div className="ml-8 space-y-4 border-l-2 border-charity-neutral-200 pl-4">
                        {comment.replies.map((reply) => (
                          <div
                            key={reply.id}
                            className="bg-charity-neutral-50 p-4 rounded-lg"
                          >
                            <div className="flex items-start justify-between mb-2">
                              <div>
                                <h5 className="font-medium text-charity-neutral-800">
                                  {reply.author}
                                </h5>
                                <p className="text-xs text-charity-neutral-500">
                                  {reply.date}
                                </p>
                              </div>
                              <button
                                onClick={() => handleCommentLike(comment.id, reply.id)}
                                className={`flex items-center space-x-1 transition-colors duration-200 ${
                                  reply.isLiked
                                    ? "text-charity-orange-600"
                                    : "text-charity-neutral-500 hover:text-charity-orange-600"
                                }`}
                              >
                                <ThumbsUp className={`h-3 w-3 ${reply.isLiked ? "fill-current" : ""}`} />
                                <span className="text-sm">{reply.likes}</span>
                              </button>
                            </div>
                            <p className="text-charity-neutral-700">
                              {reply.content}
                            </p>
                          </div>
                        ))}
                      </div>
                    )}

                    <div className="mt-3 flex gap-4">
                      <button
                        onClick={() => setReplyingTo(replyingTo === comment.id ? null : comment.id)}
                        className="text-charity-orange-600 hover:text-charity-orange-700 text-sm font-medium flex items-center"
                      >
                        <Reply className="h-4 w-4 mr-1" />
                        Reply
                      </button>
                    </div>

                    {/* Reply Form */}
                    {replyingTo === comment.id && (
                      <div className="mt-4 p-4 bg-charity-neutral-50 rounded-lg">
                        <textarea
                          value={newReply}
                          onChange={(e) => setNewReply(e.target.value)}
                          placeholder={userName ? "Write a reply..." : "Please enter your name first to reply"}
                          className="w-full p-3 border border-charity-neutral-300 rounded-lg focus:ring-2 focus:ring-charity-orange-500 focus:border-transparent resize-none"
                          rows={3}
                        />
                        <div className="flex gap-2 mt-3">
                          <button
                            onClick={() => handleReplySubmit(comment.id)}
                            className="px-4 py-2 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-lg text-sm transition-colors duration-200"
                          >
                            Reply
                          </button>
                          <button
                            onClick={() => setReplyingTo(null)}
                            className="px-4 py-2 bg-charity-neutral-200 hover:bg-charity-neutral-300 text-charity-neutral-700 rounded-lg text-sm transition-colors duration-200"
                          >
                            Cancel
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Blog;
