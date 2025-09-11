export interface BlogPost {
  id: string;
  title: string;
  excerpt: string;
  content: string[];
  image: string;
  category: string;
  author: string;
  date: string;
  readTime: string;
  slug: string;
  likes?: number;
  tags?: string[];
}

export const featuredPost: BlogPost = {
  id: "charity-fueling-dreams",
  title: "Charity: Fueling the Dreams of Children",
  excerpt:
    "Every child is born with a dream. Some imagine themselves as doctors saving lives, others see classrooms where they will one day stand as teachers. Discover how charity unlocks possibilities and builds futures.",
  content: [
    "Every child is born with a dream. Some imagine themselves as doctors saving lives, others see classrooms where they will one day stand as teachers, and many envision flying planes, painting canvases, or leading communities. Children dream without fear, without limits. Yet, for millions, these bright hopes are dimmed by realities beyond their control: poverty, lack of access to education, hunger, and limited opportunities.",

    "This is where charity becomes powerful. Charity is more than giving money or material things. It is about believing in potential and unlocking possibilities. When you pay school fees for a child, you are not just covering costs: you are giving that child a chance to sit in a classroom and imagine a better tomorrow. When you donate a pair of shoes, you are not just covering tiny feet: you are enabling those feet to walk boldly into the future.",

    "Every act of kindness is a push forward. That book you donate may inspire the next author, that scholarship may raise the next leader, that meal may keep a child in school one more day, long enough to discover their hidden talents. The truth is, children need us. They cannot reach their dreams alone. They require our hands, our hearts, and our willingness to believe in them.",

    "And the beauty of charity is this: no effort is ever too small. A coin, a smile, a visit to encourage a child—all of these become seeds of hope. Seeds that, when nurtured, grow into towering trees of success and change.",

    "When we give, we don't just transform one life, we touch generations. A child whose dream comes true goes on to impact their family, their community, and even the world. That is the power of charity.",

    "At the end of the day, charity is not just about what we give away; it is about what we build together. When we invest in children's dreams, we invest in the future of humanity itself.",
  ],
  image:
    "https://cdn.builder.io/api/v1/image/assets%2Fb84e9a4b35c7429a9cad0d14a2532c7b%2F8d3b260b1280420d84ed09e849db9b9b?format=webp&width=1600",
  category: "Inspiration",
  author: "A.O.Suleiman Kagwe",
  date: "January 15, 2025",
  readTime: "6 min read",
  slug: "charity-fueling-dreams-of-children",
  likes: 42,
  tags: ["charity", "children", "dreams", "education", "hope", "community"],
};

// For homepage - recent blogs (showing the main featured post)
export const recentBlogs = [
  {
    id: featuredPost.id,
    image: featuredPost.image,
    category: featuredPost.category,
    date: featuredPost.date,
    title: featuredPost.title,
    snippet: featuredPost.excerpt,
    author: featuredPost.author,
    slug: featuredPost.slug,
  },
];
