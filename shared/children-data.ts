export interface Child {
  id: string;
  name: string;
  age: number;
  location: string;
  school: string;
  grade: string;
  story: string;
  needs: string[];
  image: string;
  monthlyNeed: number;
  sponsored: boolean;
  interests: string[];
  family: string;
  achievements?: string[];
  dreamJob: string;
}

export const allChildren: Child[] = [
  {
    id: "maria-001",
    name: "Kevin Gitonga",
    age: 8,
    location: "Nyanza County, Kenya",
    school: "Mwanza Primary School",
    grade: "Standard 3",
    story:
      "Maria loves mathematics and dreams of becoming a teacher. She walks 5km to school daily and helps her mother with farming after classes. Despite the long journey, she never misses a day and always has a bright smile.",
    needs: ["School fees", "Uniforms", "Books", "Lunch program"],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2Fb8b21871733e41299357e2253b20e98f?format=webp&width=800",
    monthlyNeed: 6075, // 45 USD converted to KES (45 * 135)
    sponsored: false,
    interests: ["Mathematics", "Reading", "Farming"],
    family: "Lives with mother and 2 siblings",
    achievements: [
      "Top in class mathematics",
      "Perfect attendance",
      "School prefect",
    ],
    dreamJob: "Teacher",
  },
  {
    id: "david-002",
    name: "David Kimaro",
    age: 12,
    location: "Rift Valley, Kenya",
    school: "Arusha Community Secondary",
    grade: "Form 1",
    story:
      "David is passionate about science and wants to become a doctor. His father is a subsistence farmer and struggles to pay school fees. David studies by candlelight and helps with farming before school.",
    needs: [
      "School fees",
      "Science books",
      "Laboratory equipment",
      "Transport",
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F950583433afd4f3aa883c9d1cc87031d?format=webp&width=800",
    monthlyNeed: 8775, // 65 USD converted to KES (65 * 135)
    sponsored: false,
    interests: ["Biology", "Chemistry", "Football"],
    family: "Lives with father and 3 siblings",
    achievements: [
      "Science fair winner",
      "Football team captain",
      "Community volunteer",
    ],
    dreamJob: "Doctor",
  },
  {
    id: "grace-003",
    name: "Grace Mtema",
    age: 15,
    location: "Central Kenya",
    school: "Dodoma Girls Education Center",
    grade: "Form 3",
    story:
      "Grace excels in her studies and wants to become an engineer. She comes from a single-parent household and needs support to continue her education. She tutors younger students in her free time.",
    needs: ["School fees", "Textbooks", "Computer training", "Mentorship"],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F4938be7564894703871587a39102255b?format=webp&width=800",
    monthlyNeed: 10125, // 75 USD converted to KES (75 * 135)
    sponsored: false,
    interests: ["Mathematics", "Physics", "Technology"],
    family: "Lives with grandmother and 1 sibling",
    achievements: [
      "Regional math champion",
      "Peer tutor",
      "Technology club leader",
    ],
    dreamJob: "Engineer",
  },
  {
    id: "john-004",
    name: "John Massawe",
    age: 10,
    location: "Eastern Kenya",
    school: "Kilimanjaro Primary School",
    grade: "Standard 5",
    story:
      "John is a bright student who loves to read. His parents work as casual laborers and cannot afford his educational expenses consistently. He has read every book in his small school library twice.",
    needs: [
      "School fees",
      "Reading materials",
      "Uniform",
      "Nutritional support",
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F5de7bd1782db4332a9ee345b7cc61f01?format=webp&width=800",
    monthlyNeed: 6750, // 50 USD converted to KES (50 * 135)
    sponsored: false,
    interests: ["Reading", "Writing", "History"],
    family: "Lives with both parents and 4 siblings",
    achievements: [
      "Reading champion",
      "Story writing contest winner",
      "Library assistant",
    ],
    dreamJob: "Writer",
  },
  {
    id: "amina-005",
    name: "George Kang'ethe",
    age: 9,
    location: "Coastal Kenya",
    school: "Malindi Primary School",
    grade: "Standard 4",
    story:
      "Amina dreams of becoming a marine biologist to protect the ocean around her coastal home. She collects shells and studies sea creatures in her spare time. Her family depends on fishing for income.",
    needs: ["School fees", "Science materials", "Transport", "Lunch program"],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2Fe0e42988cde841cf86827b0fb3413e04?format=webp&width=800",
    monthlyNeed: 5400, // 40 USD converted to KES (40 * 135)
    sponsored: false,
    interests: ["Marine Biology", "Swimming", "Environmental Science"],
    family: "Lives with parents and 1 sibling",
    achievements: [
      "Environmental club member",
      "Swimming champion",
      "Shell collection expert",
    ],
    dreamJob: "Marine Biologist",
  },
  {
    id: "peter-006",
    name: "Peter Ngozi",
    age: 14,
    location: "Western Kenya",
    school: "Mbeya Secondary School",
    grade: "Form 2",
    story:
      "Peter wants to become a pilot and explore the world. He builds model airplanes from recycled materials and dreams of flying. His mother is a single parent working as a seamstress.",
    needs: [
      "School fees",
      "Technical books",
      "Transport",
      "Materials for projects",
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2Fe698096ec6de4661bd3eb56e4eb84bdf?format=webp&width=800",
    monthlyNeed: 8100, // 60 USD converted to KES (60 * 135)
    sponsored: false,
    interests: ["Aviation", "Engineering", "Art"],
    family: "Lives with mother and 2 siblings",
    achievements: [
      "Model building champion",
      "Art competition winner",
      "Science project leader",
    ],
    dreamJob: "Pilot",
  },
  {
    id: "fatuma-007",
    name: "Fatuma Ali",
    age: 11,
    location: "Nairobi County, Kenya",
    school: "Nairobi Community School",
    grade: "Standard 6",
    story:
      "Fatuma loves music and wants to become a music teacher. She sings in the church choir and has taught herself to play several traditional instruments. Her family lives in a crowded neighborhood.",
    needs: ["School fees", "Music lessons", "Instruments", "Uniform"],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F96502dc2997a4f8aa1b83f8fbd627103?format=webp&width=800",
    monthlyNeed: 7425, // 55 USD converted to KES (55 * 135)
    sponsored: false,
    interests: ["Music", "Singing", "Traditional Dance"],
    family: "Lives with parents and 3 siblings",
    achievements: [
      "Choir leader",
      "Traditional dance champion",
      "Music composition winner",
    ],
    dreamJob: "Music Teacher",
  },
  {
    id: "emmanuel-008",
    name: "Emmanuel Mushi",
    age: 13,
    location: "Mount Kenya Region, Kenya",
    school: "Moshi High School",
    grade: "Form 1",
    story:
      "Emmanuel dreams of becoming a veterinarian to help animals in his community. He has rescued and cared for many stray animals. His father works as a tour guide near Mount Kilimanjaro.",
    needs: [
      "School fees",
      "Veterinary books",
      "Science equipment",
      "Transport",
    ],
    image:
      "https://cdn.builder.io/api/v1/image/assets%2F12495c24e4264caea932f0480ae45edc%2F8fac22e1b48547ebb3029d955ecdf4b1?format=webp&width=800",
    monthlyNeed: 9450, // 70 USD converted to KES (70 * 135)
    sponsored: false,
    interests: ["Animal Care", "Biology", "Conservation"],
    family: "Lives with father and grandmother",
    achievements: [
      "Animal rescue volunteer",
      "Biology excellence",
      "Conservation project leader",
    ],
    dreamJob: "Veterinarian",
  },
];
