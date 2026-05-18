import { Link } from "react-router-dom";
import {
  BookOpen,
  Target,
  Users,
  Mic,
  Brain,
  Laptop,
  DollarSign,
  ExternalLink,
  Quote,
  CheckCircle,
  MapPin,
  Calendar,
  Clock,
  Mail,
  Phone,
  Download,
} from "lucide-react";
import Navigation from "@/components/Navigation";
import Footer from "@/components/Footer";
import AnimatedSection from "@/components/AnimatedSection";

const goals = [
  {
    icon: Users,
    title: "Foster Connection",
    description:
      "Create meaningful interactions that bring people together across backgrounds and experiences.",
  },
  {
    icon: Mic,
    title: "Amplify Voices",
    description:
      "Provide a platform for underrepresented and unheard voices to be seen and heard.",
  },
  {
    icon: BookOpen,
    title: "Spark Dialogue",
    description:
      "Encourage open conversations around social issues like identity, inclusion, mental health, and justice.",
  },
  {
    icon: Target,
    title: "Inspire Creativity",
    description:
      "Use art, storytelling, and performance as tools for expression and transformation.",
  },
  {
    icon: Users,
    title: "Promote Collaboration",
    description:
      "Connect creatives, leaders, and communities to build partnerships and shared impact.",
  },
  {
    icon: CheckCircle,
    title: "Drive Social Impact",
    description:
      "Turn conversations into action by inspiring solutions and community-driven change.",
  },
];

const thematicAreas = [
  {
    number: "01",
    icon: DollarSign,
    title: "Leadership & Financial Literacy",
    description:
      "Exploring the connection between effective leadership and financial literacy in building sustainable success. This theme focuses on developing decision-making skills, accountability, and vision, while equipping individuals with practical knowledge in money management, wealth creation, and financial independence. It encourages responsible leadership, economic empowerment, and the ability to create impact both personally and within communities.",
    color: "from-charity-orange-500 to-charity-orange-600",
    bg: "bg-charity-orange-50",
    border: "border-charity-orange-200",
  },
  {
    number: "02",
    icon: Brain,
    title: "Mental Health & Identity Crisis",
    description:
      "Exploring the intersection between mental well-being and the search for identity in a rapidly changing world. This theme creates space for honest conversations around self-doubt, societal pressure, belonging, and personal struggles, while encouraging self-awareness, healing, and acceptance. Through storytelling, dialogue, and shared experiences, it aims to break stigma, affirm individuality, and empower people to embrace who they are.",
    color: "from-red-500 to-red-600",
    bg: "bg-red-50",
    border: "border-red-200",
  },
  {
    number: "03",
    icon: Laptop,
    title: "Digital Influence, AI & Future Skills",
    description:
      "Exploring how digital platforms and artificial intelligence are shaping identity, opportunities, and communication in today's world. This theme focuses on building practical digital skills, responsible online influence, and understanding AI as a tool for creativity, productivity, and growth. It encourages critical thinking, ethical use of technology, and equips individuals — especially young people — with the skills needed to thrive in an increasingly digital future.",
    color: "from-charity-green-600 to-charity-green-700",
    bg: "bg-charity-green-50",
    border: "border-charity-green-200",
  },
];

const scheduleItems = [
  { time: "10:00 AM – 10:30 AM", activity: "Registration & Ushering", facilitator: null },
  { time: "10:30 AM – 10:45 AM", activity: "Opening Ceremony // CEO", facilitator: "June Wekesa · Head of Comms. & Corporate affairs" },
  { time: "10:45 AM – 11:05 AM", activity: "Featured Artists & Tech. team", facilitator: "June Wekesa · Head of Comms. & Corporate affairs" },
  { time: "11:05 AM – 11:15 AM", activity: "MCs sets the tone for the conversations", facilitator: null },
  { time: "10:45 AM – 11:05 AM", activity: "Keynote Addresses: Dr Joe Njagi", facilitator: null },
  { time: "11:05 AM – 11:30 AM", activity: "Health Break", facilitator: null },
  { time: "11:30 AM – 11:45 AM", activity: "MC sets the tone for the panel", facilitator: null },
  { time: "11:45 AM – 12:15 PM", activity: "Panel: Digital Influence & Future of work", facilitator: "Job Adams · Moderator" },
  { time: "12:15 PM – 1:00 PM", activity: "Creative Interlude: storytelling session (Audience)", facilitator: "Sean & Maureen" },
  { time: "1:00 PM – 1:45 PM", activity: "Afternoon Break / Networking", facilitator: "MCs & DJ" },
  { time: "1:45 PM – 2:00 PM", activity: "Mind games / fun", facilitator: "MCs & DJ" },
  { time: "2:00 PM – 2:40 PM", activity: "Keynote: ........", facilitator: null },
  { time: "2:40 PM – 3:10 PM", activity: "Creative Interlude", facilitator: "MCs" },
  { time: "3:10 PM – 4:10 PM", activity: "Panel 2: Mental Health & Identity Crisis", facilitator: "Agnes Orora · Moderator" },
  { time: "4:10 PM – 5:00 PM", activity: "Human Stories Segment", facilitator: "Panelists & Audience" },
  { time: "5:00 PM – 5:30 PM", activity: "Partners/sponsors recognition & Closing remarks", facilitator: "MCs & CEO" },
];

const Resources = () => {
  return (
    <>
      {/* Hero */}
      <section className="pt-0 relative overflow-hidden min-h-[55vh] flex flex-col">
        <div className="absolute inset-0 bg-gradient-to-br from-[#1a3a0f] via-[#2d5a1b] to-[#6b1111]" />
        <div className="absolute inset-0 bg-black/30" />
        <Navigation />
        <div className="relative z-10 flex-1 flex items-center max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20 w-full">
          <AnimatedSection animation="slideUp">
            <div>
              <p className="text-white/60 text-sm font-semibold tracking-[0.3em] uppercase mb-4">
                Tabasamu Charity Presents · 1st Edition
              </p>
              <h1 className="text-6xl md:text-8xl font-extrabold leading-none mb-4">
                <span className="text-[#e53e3e] italic">The </span>
                <span className="text-white">HUMAN</span>
                <br />
                <span className="text-[#e53e3e] italic">Mo</span>
                <span className="text-white">SAIC</span>
              </h1>
              <div className="mt-6 inline-block border border-[#4a7a2a] bg-[#2d5a1b]/60 rounded-lg px-5 py-3">
                <p className="text-white font-bold tracking-widest text-lg">
                  FACES · STORIES · SMILES
                </p>
              </div>
              <div className="mt-8 flex flex-wrap gap-6 text-white/80">
                <div className="flex items-center gap-2">
                  <Calendar className="h-5 w-5 text-charity-orange-400" />
                  <span className="font-semibold">24th May, 2026 · 10AM – 5PM</span>
                </div>
                <div className="flex items-center gap-2">
                  <MapPin className="h-5 w-5 text-charity-orange-400" />
                  <span className="font-semibold">Mageuzi Hub, Kilimani</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="bg-[#2d5a1b] text-white text-sm font-bold px-3 py-1 rounded-full">
                    🎟️ Grab a Slot — 500/=
                  </span>
                </div>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* About the Event */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <AnimatedSection animation="slideRight">
              <div>
                <h2 className="text-4xl font-bold text-charity-neutral-800 mb-6">
                  THE HUMAN MOSAIC
                </h2>
                <div className="space-y-5 text-lg text-charity-neutral-600 leading-relaxed">
                  <p>
                    A creative experience celebrating human diversity and shared
                    connection. Conceptualized by Tabasamu, it brings together
                    creatives, thought leaders, and communities through art,
                    storytelling, and dialogue to inspire empathy and collective
                    action.
                  </p>
                  <p>
                    Blending performances, discussions, and interactive
                    experiences, the event amplifies diverse voices, sparks
                    conversations on social issues, and uses creativity as a
                    tool for transformation.
                  </p>
                  <p>
                    More than an event, The Human Mosaic is a movement fostering
                    inclusion, connection, and a deeper understanding of our
                    shared humanity.
                  </p>
                </div>
                <div className="mt-8 p-4 bg-charity-neutral-50 rounded-xl border-l-4 border-charity-orange-500">
                  <p className="text-sm font-semibold text-charity-neutral-500 uppercase tracking-wide mb-1">
                    Audience
                  </p>
                  <p className="font-bold text-charity-neutral-800 text-lg">
                    Creatives, Thought Leaders, and Communities
                  </p>
                </div>
              </div>
            </AnimatedSection>

            <AnimatedSection animation="slideLeft" delay={200}>
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#2d5a1b] rounded-2xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">🤝</div>
                  <p className="font-bold text-lg">Humanity</p>
                  <p className="text-white/70 text-sm mt-1">
                    Shared connection
                  </p>
                </div>
                <div className="bg-charity-orange-600 rounded-2xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">✊</div>
                  <p className="font-bold text-lg">Inclusion</p>
                  <p className="text-white/70 text-sm mt-1">Every voice heard</p>
                </div>
                <div className="bg-charity-neutral-800 rounded-2xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">🎭</div>
                  <p className="font-bold text-lg">Creativity</p>
                  <p className="text-white/70 text-sm mt-1">
                    Art &amp; storytelling
                  </p>
                </div>
                <div className="bg-red-700 rounded-2xl p-6 text-center text-white">
                  <div className="text-4xl mb-2">💬</div>
                  <p className="font-bold text-lg">Dialogue</p>
                  <p className="text-white/70 text-sm mt-1">
                    Real conversations
                  </p>
                </div>
              </div>
            </AnimatedSection>
          </div>
        </div>
      </section>

      {/* Event Gallery Photo */}
      <section className="py-0">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-16">
          <AnimatedSection animation="scaleIn">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4 rounded-2xl overflow-hidden">
              <img
                src="/gallery/photo_007.jpg"
                alt="Tabasamu community event"
                className="w-full h-64 object-cover object-[center_20%]"
              />
              <img
                src="/gallery/photo_025.jpg"
                alt="Tabasamu community event"
                className="w-full h-64 object-cover object-[center_15%]"
              />
              <img
                src="/gallery/photo_040.jpg"
                alt="Tabasamu community event"
                className="w-full h-64 object-cover object-[center_20%]"
              />
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Goals */}
      <section className="py-20 bg-charity-neutral-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Goals — The Human Mosaic
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Six pillars driving our vision for community transformation
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {goals.map((goal, index) => {
              const IconComponent = goal.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 80}
                >
                  <div className="bg-white rounded-2xl p-6 shadow-md hover:shadow-xl transition-all duration-300 border border-charity-neutral-100 group hover:-translate-y-1">
                    <div className="flex items-start gap-4">
                      <div className="w-12 h-12 bg-gradient-to-br from-[#2d5a1b] to-charity-orange-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:scale-110 transition-transform duration-300">
                        <IconComponent className="h-6 w-6 text-white" />
                      </div>
                      <div>
                        <h3 className="font-bold text-charity-neutral-800 text-lg mb-2">
                          {goal.title}
                        </h3>
                        <p className="text-charity-neutral-600 text-sm leading-relaxed">
                          {goal.description}
                        </p>
                      </div>
                    </div>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Thematic Areas */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-16">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Thematic Areas
              </h2>
              <p className="text-lg text-charity-neutral-600 max-w-2xl mx-auto">
                Three core themes shaping conversations at The Human Mosaic
              </p>
            </div>
          </AnimatedSection>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {thematicAreas.map((area, index) => {
              const IconComponent = area.icon;
              return (
                <AnimatedSection
                  key={index}
                  animation="scaleIn"
                  delay={index * 120}
                >
                  <div
                    className={`${area.bg} border-2 ${area.border} rounded-2xl p-8 h-full`}
                  >
                    <div
                      className={`text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r ${area.color} mb-4`}
                    >
                      {area.number}
                    </div>
                    <div
                      className={`w-12 h-1 bg-gradient-to-r ${area.color} rounded-full mb-6`}
                    />
                    <div className="flex items-center gap-3 mb-4">
                      <IconComponent className="h-6 w-6 text-charity-neutral-700" />
                      <h3 className="text-xl font-bold text-charity-neutral-800">
                        {area.title}
                      </h3>
                    </div>
                    <p className="text-charity-neutral-600 leading-relaxed text-sm">
                      {area.description}
                    </p>
                  </div>
                </AnimatedSection>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quote Section */}
      <section className="py-20 bg-charity-neutral-800 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <img
            src="/gallery/photo_015.jpg"
            alt=""
            className="w-full h-full object-cover"
          />
        </div>
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="slideUp">
            <p className="text-charity-orange-400 font-bold tracking-[0.25em] uppercase text-sm mb-6">
              Influence · Inspire
            </p>
            <Quote className="h-12 w-12 text-charity-orange-400 mx-auto mb-6 opacity-60" />
            <blockquote className="text-2xl md:text-3xl font-bold text-white leading-relaxed mb-8">
              Leadership is the capacity to influence others through{" "}
              <em className="text-charity-orange-400">inspiration</em> motivated
              by a <em className="text-charity-orange-400">passion,</em>{" "}
              generated by a{" "}
              <em className="text-charity-orange-400">vision,</em> produced by{" "}
              <em className="text-charity-orange-400">conviction,</em> ignited
              by a <em className="text-charity-orange-400">purpose.</em>
            </blockquote>
            <div className="border-t border-white/20 pt-6">
              <p className="text-white font-bold text-lg">Myles Munroe</p>
              <p className="text-white/60">Bahamian Teacher & Author</p>
            </div>
          </AnimatedSection>
        </div>
      </section>

      {/* Activities */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-4">
                Activities
              </h2>
            </div>
          </AnimatedSection>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-4xl mx-auto">
            {[
              { emoji: "🎤", label: "Open Mic: Faces & Voices" },
              { emoji: "💬", label: "Connecting Conversations" },
              { emoji: "🤝", label: "Networking & Community Building" },
              { emoji: "🎵", label: "Music & Games" },
            ].map((act, i) => (
              <AnimatedSection key={i} animation="scaleIn" delay={i * 80}>
                <div className="bg-gradient-to-br from-[#1a3a0f] to-[#2d5a1b] rounded-2xl p-6 text-center text-white hover:scale-105 transition-transform duration-300">
                  <div className="text-4xl mb-3">{act.emoji}</div>
                  <p className="font-semibold text-sm leading-tight">
                    {act.label}
                  </p>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Event Schedule */}
      <section className="py-20 bg-charity-neutral-50">
        <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
          <AnimatedSection animation="slideUp">
            <div className="text-center mb-12">
              <p className="text-charity-orange-500 font-semibold tracking-widest uppercase text-sm mb-3">
                Mageuzi Hub Kilimani · May 24, 2026
              </p>
              <h2 className="text-4xl font-bold text-charity-neutral-800 mb-6">
                Event Schedule
              </h2>
              <div className="flex flex-col sm:flex-row gap-3 justify-center">
                <a
                  href="/event-schedule.pdf"
                  download="The-Human-Mosaic-Event-Schedule.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#2d5a1b] hover:bg-[#1a3a0f] text-white rounded-xl font-semibold transition-colors duration-200 shadow-md"
                >
                  <Download className="h-5 w-5" />
                  Download Event Schedule (PDF)
                </a>
                <a
                  href="/concept-note.pdf"
                  download="The-Human-Mosaic-Concept-Note.pdf"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-xl font-semibold transition-colors duration-200 shadow-md"
                >
                  <Download className="h-5 w-5" />
                  Download Concept Note (PDF)
                </a>
              </div>
            </div>
          </AnimatedSection>

          <div className="space-y-3">
            {scheduleItems.map((item, index) => (
              <AnimatedSection key={index} animation="slideRight" delay={index * 40}>
                <div className="bg-white rounded-xl px-5 py-4 shadow-sm border border-charity-neutral-100 flex flex-col sm:flex-row sm:items-center gap-3 hover:shadow-md transition-shadow duration-200">
                  <div className="flex-shrink-0 sm:w-52 bg-charity-neutral-800 text-white text-sm font-bold rounded-lg px-4 py-2 text-center">
                    {item.time}
                  </div>
                  <div className="flex-1">
                    <p className="font-semibold text-charity-neutral-800">{item.activity}</p>
                    {item.facilitator && (
                      <p className="text-sm text-charity-orange-600 mt-0.5">{item.facilitator}</p>
                    )}
                  </div>
                </div>
              </AnimatedSection>
            ))}
          </div>
        </div>
      </section>

      {/* Welcome / CTA */}
      <section className="py-20 bg-gradient-to-br from-[#1a3a0f] via-[#2d5a1b] to-[#6b1111] relative overflow-hidden">
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <AnimatedSection animation="slideUp">
            <p className="text-white/70 font-semibold tracking-widest uppercase text-sm mb-4">
              Welcome on board
            </p>
            <h2 className="text-5xl md:text-6xl font-extrabold text-white mb-2 leading-none">
              <span className="text-[#e53e3e] italic">The </span>HUMAN
              <br />
              <span className="text-[#e53e3e] italic">Mo</span>SAIC
            </h2>
            <p className="text-white/80 text-lg mt-6 mb-10">
              Join us for a day of stories, smiles, and community — 10AM to 5PM
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-10">
              <a
                href="https://keychele.co.ke/ticket.php?id=26"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center px-8 py-4 bg-charity-orange-600 hover:bg-charity-orange-700 text-white rounded-xl font-bold text-lg transition-colors duration-200"
              >
                🎟️ Grab a Slot — 500/=
                <ExternalLink className="ml-2 h-5 w-5" />
              </a>
              <Link
                to="/programs"
                className="inline-flex items-center px-8 py-4 border-2 border-white text-white hover:bg-white hover:text-[#1a3a0f] rounded-xl font-bold text-lg transition-colors duration-200"
              >
                Learn More
              </Link>
            </div>

            <div className="bg-[#2d5a1b]/60 rounded-2xl px-8 py-5 inline-block text-white">
              <div className="flex flex-col sm:flex-row gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-charity-orange-400" />
                  <span>+254 1124 59483</span>
                </div>
                <div className="flex items-center gap-2">
                  <Phone className="h-4 w-4 text-charity-orange-400" />
                  <span>+254 768 718580</span>
                </div>
                <div className="flex items-center gap-2">
                  <Mail className="h-4 w-4 text-charity-orange-400" />
                  <span>tabasamu2026@gmail.com</span>
                </div>
              </div>
              <div className="flex items-center justify-center gap-2 mt-3 text-white/70 text-sm">
                <MapPin className="h-4 w-4" />
                <span>Mageuzi Hub, Kilimani</span>
                <span className="mx-2">·</span>
                <Clock className="h-4 w-4" />
                <span>24th May 2026 · 10AM – 5PM</span>
              </div>
            </div>
          </AnimatedSection>
        </div>
      </section>

      <Footer />
    </>
  );
};

export default Resources;
