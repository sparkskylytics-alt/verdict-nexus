import React, { useState, useEffect } from "react";
import {
  Menu,
  X,
  Code2,
  ChevronRight,
  Star,
  Clock,
  Play,
  Github,
  Twitter,
  Linkedin,
  Mail,
  Award,
  Users,
  Rocket,
  Shield,
  BookOpen,
  Zap,
  TrendingUp,
  CheckCircle,
  Heart,
  MessageCircle,
  ExternalLink,
  Layers,
  Sparkles,
  GraduationCap,
  Briefcase,
  Terminal,
  Cpu,
  GitBranch,
  Database,
  Cloud,
  Lock,
  Globe,
  Command,
  Hash,
  Braces,
  Brackets,
  Infinity
} from "lucide-react";

export default function HomePage() {
  const [menu, setMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [activeTab, setActiveTab] = useState("beginner");
  const [hoveredLine, setHoveredLine] = useState(null);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="bg-[#0a0c10] text-gray-300 min-h-screen poppins-regular">
      {/* Matrix Rain Effect (Simplified) */}
      <div className="fixed inset-0 pointer-events-none opacity-5">
        <div className="absolute top-0 left-0 w-full h-full bg-[url('data:image/svg+xml;base64,PHN2ZyB4bWxucz0iaHR0cDovL3d3dy53My5vcmcvMjAwMC9zdmciIHdpZHRoPSI1IiBoZWlnaHQ9IjUiPjxwYXRoIGQ9Ik0wIDVoNU0wIDBoNU0wIDVoNU0wIDBoNU0wIDVoNSIgc3Ryb2tlPSIjMDBmZjAwIiBmaWxsPSJub25lIiBzdHJva2Utd2lkdGg9IjAuMiIvPjwvc3ZnPg==')]"></div>
      </div>

      {/* NAVBAR - Terminal Style */}
      <nav
        className={`fixed w-full z-50 transition-all duration-300 ${
          scrolled 
            ? "bg-[#0a0c10]/95 backdrop-blur-md border-b border-green-500/30 shadow-lg shadow-green-500/10" 
            : "bg-transparent"
        }`}
      >
        <div className="max-w-7xl mx-auto poppins-regular px-6 flex justify-between items-center h-16">
          <div className="flex items-center gap-2 group cursor-pointer">
            <div className="relative">
              <div className="absolute inset-0 bg-green-500/30 rounded-lg blur-md group-hover:blur-lg transition-all"></div>
              <div className="relative bg-[#1a1d24] border border-green-500/50 p-2 rounded-lg transform group-hover:scale-110 transition-all group-hover:border-green-400">
                <Terminal className="h-5 w-5 text-green-400" />
              </div>
            </div>
            <span className="font-mono font-bold text-xl">
              <span className="text-gray-400">$</span>
              <span className="text-green-400 ml-1">java</span>
              <span className="text-gray-300">-mentor</span>
            </span>
          </div>

          <div className="hidden md:flex items-center gap-8 text-sm font-mono">
            {["courses", "projects", "mentorship", "blog"].map((item) => (
              <a
                key={item}
                href="#"
                className="text-gray-400 hover:text-green-400 transition-all relative group"
              >
                <span className="text-green-500 mr-1">$</span>
                {item}
                <span className="absolute -bottom-1 left-0 w-0 h-[1px] bg-green-500 group-hover:w-full transition-all duration-300"></span>
              </a>
            ))}
          </div>

          <div className="flex items-center gap-4">
            <button className="hidden md:block border border-green-500/30 text-green-400 px-4 py-2 rounded text-sm font-mono hover:bg-green-500/10 hover:border-green-400 transition-all">
              <span className="text-gray-500">$</span> login
            </button>
            <button className="hidden md:block bg-green-500/10 border border-green-500 text-green-400 px-5 py-2 rounded text-sm font-mono hover:bg-green-500/20 hover:border-green-400 hover:text-green-300 transition-all">
              <span className="text-gray-500">$</span> ./join
            </button>
            <button
              className="md:hidden p-2 bg-[#1a1d24] border border-gray-800 rounded hover:border-green-500 transition-all"
              onClick={() => setMenu(!menu)}
            >
              {menu ? <X className="h-5 w-5 text-green-400" /> : <Menu className="h-5 w-5 text-green-400" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        {menu && (
          <div className="md:hidden bg-[#0f1117] border-t border-green-500/30 p-6 space-y-4 shadow-lg">
            {["courses", "projects", "mentorship", "blog"].map((item) => (
              <a key={item} href="#" className="block text-gray-400 hover:text-green-400 font-mono py-2 transition">
                <span className="text-green-500 mr-1">$</span> {item}
              </a>
            ))}
            <div className="pt-4 space-y-3">
              <button className="w-full border border-green-500/30 text-green-400 px-4 py-3 rounded text-sm font-mono hover:bg-green-500/10 transition-all">
                <span className="text-gray-500">$</span> login
              </button>
              <button className="w-full bg-green-500/10 border border-green-500 text-green-400 px-4 py-3 rounded text-sm font-mono hover:bg-green-500/20 transition-all">
                <span className="text-gray-500">$</span> ./join
              </button>
            </div>
          </div>
        )}
      </nav>

      {/* HERO SECTION - Code Editor Style */}
      <section className="relative pt-32 pb-20 overflow-hidden">
        {/* Background grid */}
        <div className="absolute inset-0 bg-[linear-gradient(to_right,#1a1d24_1px,transparent_1px),linear-gradient(to_bottom,#1a1d24_1px,transparent_1px)] bg-[size:4rem_4rem] [mask-image:radial-gradient(ellipse_80%_50%_at_50%_50%,black_70%,transparent_100%)]"></div>

        <div className="max-w-7xl mx-auto px-6 relative">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <div className="space-y-6">
              {/* Terminal Badge */}
              <div className="inline-flex items-center bg-[#1a1d24] border border-green-500/30 rounded px-4 py-2 font-mono">
                <span className="text-green-500 mr-2">$</span>
                <span className="text-green-400">System.out.println("</span>
                <span className="text-yellow-400">Learn Backend</span>
                <span className="text-green-400">")</span>
              </div>

              {/* Heading */}
              <h1 className="text-2xl md:text-3xl poppins-regular font-bold leading-tight">
                <span className="text-gray-500">{'public class '}</span>
                <span className="text-green-400">BackendEngineer</span>
                <span className="text-gray-500">{' {'}</span>
                <br />
                <span className="text-gray-500 ml-8">{'    public static void '}</span>
                <span className="text-yellow-400">main</span>
                <span className="text-gray-500">(String[] args) {'{'}</span>
              </h1>

              <p className="text-gray-400 text-lg max-w-md leading-relaxed font-mono border-l-2 border-green-500/50 pl-4">
                <span className="text-green-500">//</span> Learn Spring Boot, Microservices 
                <span className="text-green-500">//</span> and System Design by building
                <span className="text-green-500">//</span> real production-level applications
              </p>

              {/* Stats - Code Style */}
              <div className="flex flex-wrap gap-6 font-mono">
                <div className="border border-gray-800 bg-[#1a1d24] p-3 rounded">
                  <div className="text-green-400 text-xs">int</div>
                  <div className="text-2xl font-bold text-white">1200+</div>
                  <div className="text-gray-500 text-xs">students_count</div>
                </div>
                <div className="border border-gray-800 bg-[#1a1d24] p-3 rounded">
                  <div className="text-yellow-400 text-xs">float</div>
                  <div className="text-2xl font-bold text-white">4.9</div>
                  <div className="text-gray-500 text-xs">avg_rating</div>
                </div>
                <div className="border border-gray-800 bg-[#1a1d24] p-3 rounded">
                  <div className="text-blue-400 text-xs">int</div>
                  <div className="text-2xl font-bold text-white">500+</div>
                  <div className="text-gray-500 text-xs">job_placements</div>
                </div>
              </div>

              {/* CTA Buttons */}
              <div className="flex flex-wrap gap-4 pt-4">
                <button className="group bg-[#1a1d24] border border-green-500 text-green-400 px-8 py-4 rounded text-base font-mono hover:bg-green-500/10 hover:border-green-400 hover:text-green-300 transition-all flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  ./start-learning
                  <ChevronRight className="ml-2 h-4 w-4 group-hover:translate-x-1 transition-transform" />
                </button>
                <button className="bg-transparent text-gray-400 px-8 py-4 rounded text-base font-mono border border-gray-800 hover:border-green-500 hover:text-green-400 transition-all flex items-center">
                  <span className="text-gray-500 mr-2">$</span>
                  cat intro.mp4
                </button>
              </div>

              {/* Contributors */}
              <div className="flex items-center space-x-4 pt-4">
                <div className="flex -space-x-3">
                  {["0xJS", "0xMP", "0xER", "0xSK"].map((initial, i) => (
                    <div
                      key={i}
                      className="w-10 h-10 rounded-full bg-[#1a1d24] border border-green-500/50 flex items-center justify-center text-xs font-mono text-green-400 hover:border-green-400 hover:-translate-y-1 transition-all cursor-pointer"
                    >
                      {initial}
                    </div>
                  ))}
                  <div className="w-10 h-10 rounded-full bg-[#1a1d24] border border-gray-700 flex items-center justify-center text-xs font-mono text-gray-500">
                    +2k
                  </div>
                </div>
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
              </div>
            </div>

            {/* Right Content - VS Code Style Window */}
            <div className="relative">
              <div className="bg-[#1e1e1e] rounded-lg border border-gray-800 shadow-2xl overflow-hidden hover:border-green-500/50 transition-all group">
                {/* Window header */}
                <div className="bg-[#252526] px-4 py-2 flex items-center justify-between border-b border-gray-800">
                  <div className="flex items-center space-x-2">
                    <div className="w-3 h-3 rounded-full bg-[#ff5f56]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#ffbd2e]"></div>
                    <div className="w-3 h-3 rounded-full bg-[#27c93f]"></div>
                    <span className="text-xs text-gray-400 font-mono ml-2">UserController.java</span>
                  </div>
                  <div className="flex items-center space-x-2">
                    <div className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></div>
                    <span className="text-xs text-gray-500 font-mono">● LIVEPREVIEW</span>
                  </div>
                </div>

                {/* Line numbers and code */}
                <div className="flex">
                  {/* Line numbers */}
                  <div className="bg-[#1e1e1e] text-gray-600 p-4 text-right select-none font-mono text-sm border-r border-gray-800">
                    {[1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17].map(num => (
                      <div key={num} className="hover:text-gray-400">{num}</div>
                    ))}
                  </div>
                  
                  {/* Code content */}
                  <div className="p-4 font-mono text-sm overflow-x-auto bg-[#1e1e1e] flex-1">
                    <pre className="text-gray-300">
                      <code>
{`@RestController
@RequestMapping("/api/v1/users")
public class UserController {
    
    @Autowired
    private UserService userService;
    
    @GetMapping
    public ResponseEntity<List<User>> getUsers() {
        List<User> users = userService.findAll();
        return ResponseEntity.ok(users);
    }
    
    @PostMapping
    public ResponseEntity<User> createUser(
        @Valid @RequestBody User user
    ) {
        User saved = userService.save(user);
        return ResponseEntity
            .status(201)
            .body(saved);
    }
}`}
                      </code>
                    </pre>
                  </div>
                </div>

                {/* Status bar */}
                <div className="bg-[#007acc] text-white px-4 py-1 flex items-center justify-between text-xs font-mono">
                  <div className="flex items-center space-x-4">
                    <span>◉ main</span>
                    <span>⬇ 0 ↑ 0</span>
                    <span>⚠ 0</span>
                  </div>
                  <span>UTF-8 • Java 17 • Spring Boot 3</span>
                </div>
              </div>

              {/* Floating terminal */}
              <div className="absolute -bottom-4 -left-4 bg-[#2d2d2d] border border-gray-700 rounded p-3 hidden lg:block font-mono text-xs shadow-2xl">
                <div className="flex items-center space-x-2">
                  <span className="text-green-400">$</span>
                  <span className="text-gray-300">next_batch --days-left</span>
                </div>
                <div className="text-green-400 mt-1">→ 3 days remaining</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TRUSTED BY - Terminal Style */}
      <section className="py-12 border-y border-gray-800 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-center text-xs text-gray-600 mb-6 font-mono">
            <span className="text-green-500">/*</span> trusted by engineers from <span className="text-green-500">*/</span>
          </p>
          <div className="flex flex-wrap justify-center items-center gap-8 font-mono">
            {["Google", "Microsoft", "Amazon", "Meta", "Netflix", "Spotify"].map((company) => (
              <span key={company} className="text-gray-600 hover:text-green-400 text-sm transition cursor-default">
                &lt;{company.toLowerCase()}&gt;
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* WHAT YOU WILL LEARN - Code Blocks */}
      <section className="py-20 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <span className="text-green-500 text-sm font-mono">
              <span className="text-gray-600">//</span> curriculum
            </span>
            <h2 className="text-4xl font-mono font-bold text-white mt-2 mb-4">
              <span className="text-gray-500">$</span> cat mastery_paths
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              A comprehensive curriculum designed to take you from beginner to job-ready engineer
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                icon: Terminal,
                title: "Spring Boot",
                desc: "Build secure REST APIs with JWT authentication",
                topics: ["REST APIs", "Security", "JPA", "Validation"],
                color: "green"
              },
              {
                icon: GitBranch,
                title: "Microservices",
                desc: "Master distributed systems with Docker & Kubernetes",
                topics: ["Docker", "K8s", "API Gateway", "Circuit Breaker"],
                color: "blue"
              },
              {
                icon: Database,
                title: "System Design",
                desc: "Design scalable backend architecture",
                topics: ["Scalability", "Caching", "Databases", "Load Balancing"],
                color: "purple"
              }
            ].map((item, i) => (
              <div
                key={i}
                className="bg-[#1a1d24] border border-gray-800 p-6 rounded-lg hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all group"
              >
                <div className="flex items-center mb-4">
                  <div className={`w-10 h-10 bg-${item.color}-500/10 border border-${item.color}-500/30 rounded flex items-center justify-center mr-3`}>
                    <item.icon className={`h-5 w-5 text-${item.color}-400`} />
                  </div>
                  <h3 className="text-lg font-mono text-white">{item.title}</h3>
                </div>
                <p className="text-gray-400 text-sm font-mono mb-4 border-l-2 border-gray-700 pl-3">{item.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {item.topics.map((topic, j) => (
                    <span key={j} className="text-xs bg-[#252526] text-gray-400 px-2 py-1 rounded font-mono border border-gray-700">
                      {topic}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* LEARNING PATHS - Terminal Tabs */}
      <section className="py-20 bg-[#0c0e12]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-mono font-bold text-white mb-4">
              <span className="text-gray-500">$</span> ls <span className="text-green-400">paths/</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              choose your learning path
            </p>
          </div>

          {/* Terminal Tabs */}
          <div className="flex justify-center mb-8">
            <div className="bg-[#1a1d24] p-1 rounded border border-gray-800 inline-flex font-mono">
              {["beginner", "intermediate", "advanced"].map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveTab(tab)}
                  className={`px-6 py-2 rounded text-sm transition-all ${
                    activeTab === tab
                      ? "bg-green-500/20 text-green-400 border border-green-500/30"
                      : "text-gray-500 hover:text-gray-300"
                  }`}
                >
                  <span className="text-gray-600 mr-1">$</span>
                  ./{tab}.sh
                </button>
              ))}
            </div>
          </div>

          {/* Path Cards */}
          <div className="grid md:grid-cols-3 gap-6">
            {activeTab === "beginner" && (
              <>
                {[
                  {
                    title: "java-fundamentals",
                    duration: "4 weeks",
                    projects: "3 projects",
                    topics: ["syntax", "oop", "exceptions"],
                  },
                  {
                    title: "core-java-mastery",
                    duration: "6 weeks",
                    projects: "2 projects",
                    topics: ["collections", "threading", "io"],
                  },
                  {
                    title: "dev-toolkit",
                    duration: "3 weeks",
                    projects: "1 project",
                    topics: ["git", "maven", "testing"],
                  },
                ].map((course, i) => (
                  <div key={i} className="bg-[#1a1d24] border border-gray-800 p-6 rounded-lg hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all group">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="font-mono text-green-400">{course.title}</h3>
                      <span className="text-xs bg-[#252526] text-gray-400 px-2 py-1 rounded border border-gray-700 font-mono">
                        {course.duration}
                      </span>
                    </div>
                    <div className="space-y-2 mb-4 font-mono text-sm">
                      {course.topics.map((topic, j) => (
                        <div key={j} className="flex items-center text-gray-400">
                          <span className="text-green-500 mr-2">✓</span>
                          <span>{topic}</span>
                        </div>
                      ))}
                    </div>
                    <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                      <span className="text-xs text-gray-600 font-mono">{course.projects}</span>
                      <button className="text-green-500 text-sm font-mono hover:text-green-400 transition flex items-center">
                        view <ChevronRight className="h-3 w-3 ml-1" />
                      </button>
                    </div>
                  </div>
                ))}
              </>
            )}
          </div>
        </div>
      </section>

      {/* PROJECTS - Code Repositories */}
      <section className="py-20 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-mono font-bold text-white mb-4">
              <span className="text-gray-500">$</span> git clone <span className="text-green-400">projects</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              real-world applications for your portfolio
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                title: "e-commerce-backend",
                desc: "Complete e-commerce platform with payment integration",
                tech: ["spring-boot", "mysql", "jwt", "stripe"],
                level: "intermediate",
                stars: "234",
                forks: "56"
              },
              {
                title: "food-delivery-api",
                desc: "Microservices-based food delivery system",
                tech: ["spring-cloud", "docker", "mongodb", "rabbitmq"],
                level: "advanced",
                stars: "189",
                forks: "34"
              },
              {
                title: "chat-application",
                desc: "Real-time chat with WebSocket and Redis",
                tech: ["websockets", "redis", "jwt", "react"],
                level: "intermediate",
                stars: "156",
                forks: "28"
              },
            ].map((project, i) => (
              <div
                key={i}
                className="bg-[#1a1d24] border border-gray-800 rounded-lg p-6 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all group"
              >
                {/* GitHub style header */}
                <div className="flex items-center justify-between mb-3">
                  <div className="flex items-center">
                    <GitBranch className="h-4 w-4 text-gray-500 mr-2" />
                    <h3 className="font-mono text-green-400">{project.title}</h3>
                  </div>
                  <span className="text-xs bg-[#252526] text-gray-400 px-2 py-1 rounded border border-gray-700 font-mono">
                    {project.level}
                  </span>
                </div>
                
                <p className="text-gray-400 text-sm font-mono mb-4 border-l-2 border-gray-700 pl-3">{project.desc}</p>
                
                <div className="flex flex-wrap gap-2 mb-4">
                  {project.tech.map((t, j) => (
                    <span key={j} className="text-xs bg-[#252526] text-blue-400 px-2 py-1 rounded font-mono border border-gray-700">
                      {t}
                    </span>
                  ))}
                </div>
                
                {/* GitHub stats */}
                <div className="flex items-center justify-between pt-4 border-t border-gray-800">
                  <div className="flex items-center space-x-4 text-xs text-gray-500">
                    <span className="flex items-center">
                      <Star className="h-3 w-3 mr-1" /> {project.stars}
                    </span>
                    <span className="flex items-center">
                      <GitBranch className="h-3 w-3 mr-1" /> {project.forks}
                    </span>
                  </div>
                  <button className="text-green-500 text-sm font-mono hover:text-green-400 transition flex items-center">
                    ./deploy <ExternalLink className="h-3 w-3 ml-1" />
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* MENTORSHIP - Terminal Session */}
      <section className="py-20 bg-[#0c0e12]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-green-500 text-sm font-mono">
                <span className="text-gray-600">//</span> 1-on-1 mentorship
              </span>
              <h2 className="text-4xl font-mono font-bold text-white mt-2 mb-4">
                <span className="text-gray-500">$</span> ssh <span className="text-green-400">mentor@javamentor</span>
              </h2>
              <p className="text-gray-400 mb-6 font-mono border-l-2 border-green-500/50 pl-4">
                Not just a course — it's a partnership. Direct access to senior engineers.
              </p>
              <div className="space-y-4 font-mono">
                {[
                  "weekly-1on1 --video-call",
                  "code-review --project=$your_project",
                  "mock-interview --type=technical",
                  "resume-optimizer --linkedin",
                  "job-referral --company=faang"
                ].map((item, i) => (
                  <div key={i} className="flex items-center text-gray-300">
                    <span className="text-green-500 mr-3">$</span>
                    <span className="text-gray-400">{item}</span>
                  </div>
                ))}
              </div>
            </div>
            
            {/* Mentor Terminal */}
            <div className="bg-[#1e1e1e] border border-gray-800 rounded-lg overflow-hidden shadow-2xl">
              <div className="bg-[#252526] px-4 py-2 border-b border-gray-800">
                <div className="flex items-center">
                  <div className="w-3 h-3 rounded-full bg-[#ff5f56] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#ffbd2e] mr-2"></div>
                  <div className="w-3 h-3 rounded-full bg-[#27c93f] mr-2"></div>
                  <span className="text-xs text-gray-400 font-mono">mentor-session @ javamentor:~/</span>
                </div>
              </div>
              <div className="p-6 font-mono text-sm bg-[#1e1e1e]">
                <div className="flex items-start space-x-2 mb-4">
                  <span className="text-green-400">alex@mentor:$</span>
                  <span className="text-gray-300">whoami</span>
                </div>
                <div className="text-gray-400 mb-4 ml-6">
                  Senior Java Architect | Ex-Google, Amazon | 15+ years experience
                </div>
                <div className="flex items-start space-x-2 mb-4">
                  <span className="text-green-400">alex@mentor:$</span>
                  <span className="text-gray-300">ls achievements/</span>
                </div>
                <div className="text-gray-400 mb-4 ml-6 grid grid-cols-2 gap-2">
                  <span>500+_students</span>
                  <span>94%_placement</span>
                  <span>200+_reviews</span>
                  <span>4.9_rating</span>
                </div>
                <div className="bg-[#252526] border border-gray-800 rounded p-3 mt-4">
                  <span className="text-yellow-400">"</span>
                  <span className="text-gray-300 italic">I've mentored 500+ engineers to land jobs at top tech companies</span>
                  <span className="text-yellow-400">"</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* TESTIMONIALS - PR Style */}
      <section className="py-20 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-mono font-bold text-white mb-4">
              <span className="text-gray-500">$</span> cat <span className="text-green-400">success_stories.md</span>
            </h2>
            <p className="text-gray-400 max-w-2xl mx-auto font-mono">
              real results from real students
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-6">
            {[
              {
                name: "sarah_j",
                role: "Software Engineer @ Microsoft",
                quote: "From zero to Microsoft in 8 months. Alex's mentorship changed my life.",
                rating: 5,
                pr: "#234",
                merged: true
              },
              {
                name: "michael_p",
                role: "Senior Dev @ Google",
                quote: "The system design lessons were invaluable. I use these patterns daily.",
                rating: 5,
                pr: "#567",
                merged: true
              },
              {
                name: "emily_r",
                role: "Tech Lead @ Amazon",
                quote: "Best investment in my career. The mock interviews were exactly what I needed.",
                rating: 5,
                pr: "#890",
                merged: true
              },
            ].map((testimonial, i) => (
              <div key={i} className="bg-[#1a1d24] border border-gray-800 p-6 rounded-lg hover:border-green-500/50 transition-all">
                {/* GitHub PR style header */}
                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center">
                    <div className="w-8 h-8 rounded-full bg-[#252526] border border-gray-700 flex items-center justify-center text-xs font-mono text-green-400 mr-3">
                      {testimonial.name.slice(0,2)}
                    </div>
                    <div>
                      <h3 className="font-mono text-white text-sm">{testimonial.name}</h3>
                      <p className="text-xs text-gray-500 font-mono">{testimonial.role}</p>
                    </div>
                  </div>
                  <div className="flex items-center">
                    <span className="text-xs bg-green-500/10 text-green-400 px-2 py-1 rounded border border-green-500/30 font-mono">
                      PR {testimonial.pr}
                    </span>
                  </div>
                </div>
                
                <div className="flex mb-3">
                  {[...Array(testimonial.rating)].map((_, j) => (
                    <Star key={j} className="h-4 w-4 text-yellow-400" fill="currentColor" />
                  ))}
                </div>
                
                <p className="text-gray-400 text-sm font-mono border-l-2 border-gray-700 pl-3">
                  "{testimonial.quote}"
                </p>
                
                <div className="mt-4 flex items-center">
                  <div className="w-2 h-2 bg-green-500 rounded-full mr-2"></div>
                  <span className="text-xs text-green-500 font-mono">Merged</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ - Terminal Help */}
      <section className="py-20 bg-[#0c0e12]">
        <div className="max-w-3xl mx-auto px-6">
          <div className="text-center mb-12">
            <h2 className="text-4xl font-mono font-bold text-white mb-4">
              <span className="text-gray-500">$</span> ./faq <span className="text-green-400">--help</span>
            </h2>
            <p className="text-gray-400 font-mono">
              frequently asked questions
            </p>
          </div>

          <div className="space-y-4">
            {[
              {
                q: "What makes this program different?",
                a: "Direct access to senior architect. Live sessions, code reviews, personalized feedback."
              },
              {
                q: "Do I need prior coding experience?",
                a: "No! Program starts from fundamentals. Students from all backgrounds welcome."
              },
              {
                q: "How long until I'm job-ready?",
                a: "6-8 months with consistent effort (10-15 hours/week)."
              },
              {
                q: "What's the success rate?",
                a: "94% of students land a tech job within 6 months of completion."
              },
            ].map((faq, i) => (
              <div key={i} className="bg-[#1a1d24] border border-gray-800 rounded-lg p-6 hover:border-green-500/50 hover:shadow-lg hover:shadow-green-500/10 transition-all cursor-pointer">
                <div className="flex items-start">
                  <span className="text-green-500 mr-3 font-mono text-sm">Q:</span>
                  <div>
                    <h3 className="font-mono text-white mb-2">{faq.q}</h3>
                    <div className="flex items-start">
                      <span className="text-green-500 mr-3 font-mono text-sm">A:</span>
                      <p className="text-gray-400 text-sm font-mono">{faq.a}</p>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA - Terminal Command */}
      <section className="py-20 bg-[#0a0c10]">
        <div className="max-w-4xl mx-auto px-6">
          <div className="bg-[#1a1d24] border border-green-500/30 rounded-lg p-12 text-center relative overflow-hidden shadow-2xl">
            {/* Matrix-like characters */}
            <div className="absolute inset-0 opacity-5 font-mono text-green-500 text-xs overflow-hidden">
              {Array.from({ length: 50 }).map((_, i) => (
                <span key={i} className="absolute" style={{
                  top: `${Math.random() * 100}%`,
                  left: `${Math.random() * 100}%`,
                  transform: `rotate(${Math.random() * 360}deg)`
                }}>
                  {String.fromCharCode(0x30A0 + Math.random() * 96)}
                </span>
              ))}
            </div>
            
            <div className="relative">
              <div className="flex items-center justify-center mb-6">
                <Terminal className="h-8 w-8 text-green-500 mr-3" />
                <h2 className="text-4xl font-mono font-bold text-white">
                  <span className="text-gray-500">$</span> ./start_journey
                </h2>
              </div>
              
              <p className="text-xl text-gray-400 mb-8 max-w-2xl mx-auto font-mono">
                Join 1,200+ students who've transformed their careers
              </p>
              
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <button className="group bg-green-500/10 border border-green-500 text-green-400 px-8 py-4 rounded-lg text-lg font-mono hover:bg-green-500/20 hover:border-green-400 transition-all flex items-center justify-center">
                  <span className="text-gray-500 mr-2">$</span>
                  ./enroll --free
                  <Rocket className="ml-2 h-5 w-5 group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </button>
                <button className="bg-transparent border border-gray-700 text-gray-400 px-8 py-4 rounded-lg text-lg font-mono hover:border-green-500 hover:text-green-400 transition">
                  <span className="text-gray-500 mr-2">$</span>
                  cat curriculum.txt
                </button>
              </div>
              
              <div className="flex items-center justify-center space-x-4 mt-6 text-sm text-gray-500 font-mono">
                <Lock className="h-4 w-4" />
                <span>30-day money-back guarantee</span>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER - Terminal Style */}
      <footer className="border-t border-gray-800 py-16 bg-[#0a0c10]">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid md:grid-cols-4 gap-8 mb-12">
            {/* Brand */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <div className="bg-[#1a1d24] border border-green-500/30 p-2 rounded">
                  <Terminal className="h-5 w-5 text-green-400" />
                </div>
                <span className="font-mono font-bold text-xl">
                  <span className="text-gray-500">$</span>
                  <span className="text-green-400 ml-1">java</span>
                  <span className="text-gray-400">-mentor</span>
                </span>
              </div>
              <p className="text-gray-500 text-sm font-mono mb-4">
                /* helping devs master backend engineering */
              </p>
              <div className="flex gap-4">
                {[Github, Twitter, Linkedin, Mail].map((Icon, i) => (
                  <a key={i} href="#" className="text-gray-600 hover:text-green-400 transition">
                    <Icon className="h-5 w-5" />
                  </a>
                ))}
              </div>
            </div>

            {/* Links */}
            {[
              {
                title: "learning/",
                links: ["courses", "projects", "paths", "resources"],
              },
              {
                title: "support/",
                links: ["faq", "contact", "community", "terms"],
              },
              {
                title: "connect/",
                links: ["blog", "youtube", "discord", "newsletter"],
              },
            ].map((section, i) => (
              <div key={i}>
                <h3 className="font-mono text-green-400 mb-4">{section.title}</h3>
                <ul className="space-y-2">
                  {section.links.map((link, j) => (
                    <li key={j}>
                      <a href="#" className="text-gray-500 hover:text-green-400 text-sm font-mono transition">
                        {link}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-gray-800 pt-8 text-center text-xs text-gray-600 font-mono">
            <p>© 2026 JavaMentor. MIT License</p>
            <p className="mt-2">
              <span className="text-green-500">{'/*'}</span> made with {'<3'} for developers <span className="text-green-500">{'*/'}</span>
            </p>
          </div>
        </div>
      </footer>

      {/* Custom Animations */}
      <style>{`
        @keyframes pulse-green {
          0%, 100% { opacity: 0.5; }
          50% { opacity: 1; }
        }
        .animate-pulse-green {
          animation: pulse-green 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;
        }
        @keyframes matrix-fall {
          0% { transform: translateY(-100%); }
          100% { transform: translateY(100vh); }
        }
        .matrix-char {
          animation: matrix-fall 20s linear infinite;
        }
      `}</style>
    </div>
  );
}