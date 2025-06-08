"use client";

import type React from "react";

import { useState } from "react";
import { motion } from "framer-motion";
import {
  Github,
  ExternalLink,
  RotateCcw,
  Trash2,
  ArrowLeft,
  ArrowRight,
  RotateCw,
  Home,
  Search,
  Lock,
  Globe,
  Star,
  Clock,
  Bookmark,
  Award,
  User,
  Mail,
  MapPin,
  Linkedin,
  Phone,
  FileText,
  Code,
  Briefcase,
  Chrome,
  X,
} from "lucide-react";

interface WindowContentProps {
  type: string;
  onOpenWindow?: (windowData: any) => void;
  trashedItems?: any[];
  onRestoreItem?: (itemId: string) => void;
  onMoveToTrash?: (item: any) => void;
  isMobile?: boolean;
}

export default function WindowContent({
  type,
  onOpenWindow,
  trashedItems,
  onRestoreItem,
  onMoveToTrash,
  isMobile = false,
}: WindowContentProps) {
  // Icon mapping for trashed items
  const iconMap: { [key: string]: any } = {
    about: User,
    projects: Code,
    "work-projects": Briefcase,
    resume: FileText,
    contact: Mail,
    browser: Chrome,
  };
  // Move all the data arrays here at the top
  const projects = [
    {
      title: "Studio Monitors App",
      description:
        "Internal dashboard displayed across all company facility televisions",
      tech: [
        "JavaScript",
        "React",
        "TypeScript",
        "Next.js",
        "GraphQL",
        "Moment",
        "Jest",
        "REST API",
      ],
      color: "text-blue-400",
      details:
        "Independently designed, built, and deployed an always-on internal dashboard displayed across all company facility televisions. The app features real-time data on what's currently playing across the company's radio stations (The Current, YourClassical), daily weather updates, featured top stories from MPR News, and internal company announcements.",
      features: [
        "Real-time audio playback tracking",
        "Weather updates",
        "Featured news stories",
        "Company announcements",
        "Responsive Design",
      ],
      github: "https://github.com/username/studio-monitors",
      demo: "https://studio-monitors-demo.vercel.app",
    },
    {
      title: "Hack_feeds App",
      description: "RSS feed aggregator similar to Feedly",
      tech: [
        "JavaScript",
        "React",
        "Redux",
        "Saga",
        "Axios",
        "Node",
        "Express",
        "Passport.js",
        "PostgreSQL",
        "Material UI",
      ],
      color: "text-purple-400",
      details:
        "Developed a web mobile application that allows a user to favourite RSS feeds source and view multiple RSS sources all at the same time. A replica of Feedly.",
      features: [
        "RSS Feed Aggregation",
        "User Authentication",
        "Favorites Management",
        "Mobile Responsive",
        "Multiple Source Viewing",
      ],
      github: "https://github.com/username/hack_feeds",
      demo: "https://hack-feeds-demo.vercel.app",
    },
    {
      title: "React Audio Player",
      description:
        "Standardized audio playback component published as NPM package",
      tech: ["React", "TypeScript", "HTML5 Audio API", "CSS3", "Jest", "NPM"],
      color: "text-green-400",
      details:
        "Standardized audio playback across all MPR applications by developing a customizable React audio player and publishing it as an internal NPM package.",
      features: [
        "Customizable UI",
        "Streaming Support",
        "Playlist Management",
        "Accessibility Features",
        "Cross-browser Compatibility",
      ],
      github: "https://github.com/username/react-audio-player",
      demo: "https://react-audio-player-demo.vercel.app",
    },
  ];

  // Work projects data
  const workProjects = [
    {
      title: "MPR News Website",
      description:
        "Minnesota's premier news source with real-time updates and multimedia content",
      tech: [
        "React",
        "Next.js",
        "TypeScript",
        "CMS Integration",
        "Webpack",
        "SCSS",
        "Node.js",
        "Express",
        "PostgreSQL",
      ],
      color: "text-[#327e98]",
      details:
        "Led frontend development for MPR News, Minnesota's most trusted news source serving over 900,000 monthly users. Built responsive, accessible news platform with real-time content updates, multimedia integration, and optimized performance for breaking news coverage.",
      features: [
        "Real-time News Updates",
        "Multimedia Content Integration",
        "Weather Widget Integration",
        "Newsletter Subscription System",
        "Mobile-First Responsive Design",
        "Accessibility Compliance (WCAG 2.1)",
      ],
      company: "Minnesota Public Radio",
      duration: "2021 - Present",
      team: "Frontend development team",
      url: "https://www.mprnews.org/",
      screenshots: [
        "/images/mprnews/mprnews-1.png",
        "/images/mprnews/mprnews-2.png",
        "/images/mprnews/mprnews-3.png",
        "/images/mprnews/mprnews-4.png",
        "/images/mprnews/mprnews-5.png",
        "/images/mprnews/mprnews-6.png",
      ],
      awards: ["Eppy Award - Best Local Radio News website (2021)"],
    },
    {
      title: "The Current Music Platform",
      description: "Minnesota's premier music discovery and streaming platform",
      tech: [
        "React",
        "Audio APIs",
        "Music Metadata APIs",
        "Real-time WebSockets",
        "Redux",
        "SASS",
      ],
      color: "text-purple-400",
      details:
        "Built interactive music platform for The Current, featuring live streaming, music discovery, artist interviews, and concert listings. Integrated with music APIs and real-time playlist updates.",
      features: [
        "Live Music Streaming",
        "Artist Discovery Engine",
        "Concert Event Listings",
        "Music Playlist Management",
        "Artist Interview Archive",
        "Social Music Sharing",
      ],
      company: "Minnesota Public Radio",
      duration: "2018 - Present",
      team: "Music platform team",
      url: "https://www.thecurrent.org/",
      screenshots: [
        "/images/thecurrent/thecurrent-1.png",
        "/images/thecurrent/thecurrent-2.png",
        "/images/thecurrent/thecurrent-3.png",
        "/images/thecurrent/thecurrent-4.png",
        "/images/thecurrent/thecurrent-5.png",
      ],
    },
    {
      title: "YourClassical Music Library",
      description: "Classical music streaming and educational platform",
      tech: [
        "React",
        "Audio Streaming",
        "Music Database APIs",
        "Search Engine",
        "TypeScript",
        "GraphQL",
      ],
      color: "text-green-400",
      details:
        "Developed comprehensive classical music platform with advanced search, curated playlists, and educational content. Features sophisticated music categorization and streaming capabilities.",
      features: [
        "Advanced Music Search",
        "Curated Classical Playlists",
        "Educational Content",
        "Composer Biographies",
        "Music Period Classification",
        "High-Quality Audio Streaming",
      ],
      company: "American Public Media",
      duration: "2018 - Present",
      team: "Classical music team",
      url: "https://www.yourclassical.org/",
      screenshots: ["/placeholder.svg?height=400&width=600"],
    },
    {
      title: "Internal React Component Library",
      description:
        "Standardized UI components used across multiple applications",
      tech: [
        "React",
        "TypeScript",
        "Storybook",
        "CSS Modules",
        "Jest",
        "Rollup",
      ],
      color: "text-blue-400",
      details:
        "Streamlined UI consistency and improved code maintainability by building an internal React component library adopted across 5+ applications.",
      features: [
        "Standardized UI Components",
        "Accessibility Compliance",
        "Comprehensive Documentation",
        "Automated Testing",
        "Version Control",
      ],
      company: "American Public Media Group",
      duration: "2021 - Present",
      team: "Frontend infrastructure team",
      url: "https://internal-component-library.apmg.org/",
      screenshots: ["/placeholder.svg?height=400&width=600"],
    },
    {
      title: "Podcast Template System",
      description:
        "Auto-generates new podcast websites from configuration files",
      tech: [
        "Next.js",
        "TypeScript",
        "Node.js",
        "CMS Integration",
        "AWS",
        "CI/CD",
      ],
      color: "text-red-400",
      details:
        "Streamlined podcast site creation by implementing a custom template app that auto-generates new websites from config files—now powering 6+ APMG podcast sites.",
      features: [
        "Automated Site Generation",
        "Customizable Templates",
        "Content Management Integration",
        "Analytics Integration",
        "Responsive Design",
      ],
      company: "American Public Media Group",
      duration: "2019 - 2021",
      team: "Podcast platform team",
      url: "https://www.apmg.org/podcasts",
      screenshots: ["/placeholder.svg?height=400&width=600"],
    },
  ];

  // All state and handler functions go here
  const [currentPage, setCurrentPage] = useState("home");
  const [inputUrl, setInputUrl] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [history, setHistory] = useState<string[]>(["home"]);
  const [historyIndex, setHistoryIndex] = useState(0);
  const [isDragOver, setIsDragOver] = useState(false);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [selectedWorkProject, setSelectedWorkProject] = useState<any>(null);
  const [fullscreenImage, setFullscreenImage] = useState<string | null>(null);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0 },
  };

  const handleDragStart = (e: React.DragEvent, item: any) => {
    const dragData = { ...item, isFromTrash: true };
    e.dataTransfer.setData("application/json", JSON.stringify(dragData));
    e.dataTransfer.effectAllowed = "move";
  };

  // Trash window drag handlers
  const handleTrashDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    e.dataTransfer.dropEffect = "move";
    setIsDragOver(true);
  };

  const handleTrashDragLeave = (e: React.DragEvent) => {
    // Only set drag over to false if we're actually leaving the trash window
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX;
    const y = e.clientY;

    if (x < rect.left || x > rect.right || y < rect.top || y > rect.bottom) {
      setIsDragOver(false);
    }
  };

  const handleTrashDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragOver(false);

    try {
      const data = e.dataTransfer.getData("application/json");
      if (data) {
        const item = JSON.parse(data);
        console.log("Dropped item data:", item);

        // Handle items being restored from trash back to desktop
        if (item.isFromTrash && onRestoreItem) {
          console.log("Restoring item from trash to desktop:", item);
          onRestoreItem(item.id);
        }
        // Handle desktop icons being dragged into trash window
        else if (!item.isFromTrash && onMoveToTrash) {
          console.log("Moving desktop icon into trash window:", item);
          onMoveToTrash(item);
        }
      }
    } catch (error) {
      console.error("Error parsing dropped data:", error);

      // Fallback: try to get the data as text and parse it
      try {
        const textData = e.dataTransfer.getData("text/plain");
        if (textData) {
          const item = JSON.parse(textData);
          if (!item.isFromTrash && onMoveToTrash) {
            console.log(
              "Moving desktop icon into trash window (fallback):",
              item,
            );
            onMoveToTrash(item);
          }
        }
      } catch (fallbackError) {
        console.error("Fallback parsing also failed:", fallbackError);
      }
    }
  };

  // Browser functionality
  const navigateToPage = (page: string) => {
    setIsLoading(true);

    // Add to history if it's a new page
    if (page !== history[historyIndex]) {
      const newHistory = history.slice(0, historyIndex + 1);
      newHistory.push(page);
      setHistory(newHistory);
      setHistoryIndex(newHistory.length - 1);
    }

    setTimeout(() => {
      setCurrentPage(page);
      setIsLoading(false);
    }, 500);
  };

  const handleUrlSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const url = inputUrl.trim().toLowerCase();

    if (url.includes("google") || url === "" || url.includes("search")) {
      navigateToPage("google");
    } else if (url.includes("github")) {
      navigateToPage("github");
    } else if (url.includes("portfolio") || url.includes("about")) {
      navigateToPage("portfolio");
    } else if (
      url.includes("news") ||
      url.includes("cnn") ||
      url.includes("bbc")
    ) {
      navigateToPage("news");
    } else {
      // For any other URL, show a "site blocked" page
      navigateToPage("blocked");
    }
  };

  const handleBack = () => {
    if (historyIndex > 0) {
      setHistoryIndex(historyIndex - 1);
      setCurrentPage(history[historyIndex - 1]);
    }
  };

  const handleForward = () => {
    if (historyIndex < history.length - 1) {
      setHistoryIndex(historyIndex + 1);
      setCurrentPage(history[historyIndex + 1]);
    }
  };

  const handleRefresh = () => {
    setIsLoading(true);
    setTimeout(() => {
      setIsLoading(false);
    }, 500);
  };

  const handleHome = () => {
    navigateToPage("home");
    setInputUrl("");
  };

  const getPageTitle = () => {
    switch (currentPage) {
      case "home":
        return "New Tab";
      case "google":
        return "Google";
      case "github":
        return "GitHub";
      case "portfolio":
        return "Portfolio";
      case "news":
        return "Tech News";
      case "blocked":
        return "Site Blocked";
      default:
        return "Chrome";
    }
  };

  const getAddressBarUrl = () => {
    switch (currentPage) {
      case "home":
        return "chrome://newtab/";
      case "google":
        return "https://www.google.com";
      case "github":
        return "https://github.com";
      case "portfolio":
        return "https://portfolio.dev";
      case "news":
        return "https://technews.com";
      case "blocked":
        return inputUrl;
      default:
        return "";
    }
  };

  const renderPageContent = () => {
    switch (currentPage) {
      case "home":
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="text-center max-w-2xl">
              <h1 className="text-4xl font-light text-gray-800 mb-8">Chrome</h1>

              {/* Search bar */}
              <form onSubmit={handleUrlSubmit} className="mb-12">
                <div className="relative">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Search Google or type a URL"
                    className="w-full max-w-lg px-6 py-4 text-lg border border-gray-300 rounded-full shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </form>

              {/* Quick links */}
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                {[
                  {
                    name: "Google",
                    icon: Search,
                    page: "google",
                    color: "bg-blue-500",
                  },
                  {
                    name: "GitHub",
                    icon: Github,
                    page: "github",
                    color: "bg-gray-800",
                  },
                  {
                    name: "Portfolio",
                    icon: Star,
                    page: "portfolio",
                    color: "bg-purple-500",
                  },
                  {
                    name: "Tech News",
                    icon: Globe,
                    page: "news",
                    color: "bg-green-500",
                  },
                ].map((link) => (
                  <button
                    key={link.name}
                    onClick={() => navigateToPage(link.page)}
                    className="flex flex-col items-center p-4 rounded-lg hover:bg-gray-100 transition-colors"
                  >
                    <div
                      className={`w-12 h-12 ${link.color} rounded-lg flex items-center justify-center mb-2`}
                    >
                      <link.icon className="w-6 h-6 text-white" />
                    </div>
                    <span className="text-sm text-gray-700">{link.name}</span>
                  </button>
                ))}
              </div>
            </div>
          </div>
        );

      case "google":
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="text-center">
              <h1 className="text-6xl font-light text-blue-500 mb-8">Google</h1>
              <form onSubmit={handleUrlSubmit} className="mb-8">
                <div className="relative">
                  <input
                    type="text"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="Search Google"
                    className="w-96 px-4 py-3 border border-gray-300 rounded-full focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <Search className="absolute right-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-gray-400" />
                </div>
              </form>
              <div className="space-x-4">
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm">
                  Google Search
                </button>
                <button className="px-4 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm">
                  I'm Feeling Lucky
                </button>
              </div>
            </div>
          </div>
        );

      case "github":
        return (
          <div className="h-full bg-gray-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
              <div className="flex items-center mb-8">
                <Github className="w-8 h-8 mr-3" />
                <h1 className="text-3xl font-bold">GitHub</h1>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">
                    Popular Repositories
                  </h3>
                  <div className="space-y-3">
                    {["react", "vue", "angular", "next.js"].map((repo) => (
                      <div
                        key={repo}
                        className="flex items-center space-x-3 p-3 bg-gray-700 rounded"
                      >
                        <div className="w-3 h-3 bg-yellow-400 rounded-full"></div>
                        <span>{repo}</span>
                        <Star className="w-4 h-4 ml-auto" />
                      </div>
                    ))}
                  </div>
                </div>

                <div className="bg-gray-800 p-6 rounded-lg">
                  <h3 className="text-xl font-semibold mb-4">Trending</h3>
                  <div className="space-y-3">
                    {["AI Tools", "Web3 Projects", "Mobile Apps", "DevOps"].map(
                      (trend) => (
                        <div key={trend} className="p-3 bg-gray-700 rounded">
                          <span>{trend}</span>
                        </div>
                      ),
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        );

      case "portfolio":
        return (
          <div className="h-full bg-gradient-to-br from-purple-900 to-blue-900 text-white p-8">
            <div className="max-w-4xl mx-auto">
              <div className="text-center mb-12">
                <h1 className="text-5xl font-bold mb-4">Frontend Engineer</h1>
                <p className="text-xl text-purple-200">
                  Creating amazing digital experiences
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                {[
                  {
                    title: "React Apps",
                    desc: "Modern web applications",
                    icon: "⚛️",
                  },
                  {
                    title: "UI/UX Design",
                    desc: "Beautiful interfaces",
                    icon: "🎨",
                  },
                  {
                    title: "Performance",
                    desc: "Optimized solutions",
                    icon: "⚡",
                  },
                ].map((item) => (
                  <div
                    key={item.title}
                    className="bg-white/10 backdrop-blur-sm p-6 rounded-lg"
                  >
                    <div className="text-3xl mb-3">{item.icon}</div>
                    <h3 className="text-xl font-semibold mb-2">{item.title}</h3>
                    <p className="text-purple-200">{item.desc}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "news":
        return (
          <div className="h-full bg-white p-8">
            <div className="max-w-4xl mx-auto">
              <h1 className="text-3xl font-bold mb-8 text-gray-800">
                Tech News
              </h1>

              <div className="space-y-6">
                {[
                  {
                    title: "AI Revolution in Web Development",
                    time: "2 hours ago",
                    category: "AI",
                  },
                  {
                    title: "New React 19 Features Released",
                    time: "5 hours ago",
                    category: "React",
                  },
                  {
                    title: "The Future of TypeScript",
                    time: "1 day ago",
                    category: "TypeScript",
                  },
                  {
                    title: "Web Performance Best Practices",
                    time: "2 days ago",
                    category: "Performance",
                  },
                ].map((article, index) => (
                  <div key={index} className="border-b border-gray-200 pb-4">
                    <div className="flex items-start justify-between">
                      <div>
                        <h3 className="text-lg font-semibold text-gray-800 mb-2">
                          {article.title}
                        </h3>
                        <div className="flex items-center space-x-4 text-sm text-gray-500">
                          <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                            {article.category}
                          </span>
                          <span className="flex items-center">
                            <Clock className="w-4 h-4 mr-1" />
                            {article.time}
                          </span>
                        </div>
                      </div>
                      <div className="w-20 h-16 bg-gray-200 rounded"></div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        );

      case "blocked":
        return (
          <div className="flex flex-col items-center justify-center h-full bg-white">
            <div className="text-center">
              <div className="w-16 h-16 bg-red-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <ExternalLink className="w-8 h-8 text-red-500" />
              </div>
              <h2 className="text-2xl font-semibold text-gray-800 mb-2">
                Site Cannot Be Reached
              </h2>
              <p className="text-gray-600 mb-4">
                This site cannot be loaded in the browser due to security
                restrictions.
              </p>
              <p className="text-sm text-gray-500 mb-6">
                Try visiting: Google, GitHub, Portfolio, or Tech News
              </p>
              <button
                onClick={() => navigateToPage("home")}
                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors"
              >
                Go to Home Page
              </button>
            </div>
          </div>
        );

      default:
        return (
          <div className="flex items-center justify-center h-full bg-white">
            <div className="text-center">
              <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
              <h3 className="text-lg font-medium text-gray-600">Loading...</h3>
            </div>
          </div>
        );
    }
  };

  // Browser window
  if (type === "browser") {
    return (
      <div className="h-full bg-white flex flex-col">
        {/* Browser toolbar */}
        <div className="bg-gray-200 border-b border-gray-400 p-2 flex items-center space-x-2">
          {/* Navigation buttons */}
          <div className="flex items-center space-x-1">
            <button
              onClick={handleBack}
              disabled={historyIndex <= 0}
              className={`p-2 rounded hover:bg-gray-300 transition-colors ${
                historyIndex <= 0 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              title="Back"
            >
              <ArrowLeft className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleForward}
              disabled={historyIndex >= history.length - 1}
              className={`p-2 rounded hover:bg-gray-300 transition-colors ${
                historyIndex >= history.length - 1
                  ? "opacity-50 cursor-not-allowed"
                  : ""
              }`}
              title="Forward"
            >
              <ArrowRight className="w-4 h-4 text-gray-700" />
            </button>
            <button
              onClick={handleRefresh}
              className="p-2 rounded hover:bg-gray-300 transition-colors"
              title="Refresh"
            >
              <RotateCw
                className={`w-4 h-4 text-gray-700 ${
                  isLoading ? "animate-spin" : ""
                }`}
              />
            </button>
            <button
              onClick={handleHome}
              className="p-2 rounded hover:bg-gray-300 transition-colors"
              title="Home"
            >
              <Home className="w-4 h-4 text-gray-700" />
            </button>
          </div>

          {/* Address bar */}
          <form onSubmit={handleUrlSubmit} className="flex-1 flex items-center">
            <div className="flex-1 flex items-center bg-white border-2 border-gray-400 rounded-full px-3 py-1 focus-within:border-blue-500 focus-within:ring-1 focus-within:ring-blue-500">
              <div className="flex items-center space-x-2 mr-2">
                {currentPage === "home" ? (
                  <Globe className="w-4 h-4 text-gray-600" />
                ) : (
                  <Lock className="w-4 h-4 text-green-600" />
                )}
              </div>
              <input
                type="text"
                value={inputUrl || getAddressBarUrl()}
                onChange={(e) => setInputUrl(e.target.value)}
                onFocus={() => setInputUrl("")}
                onBlur={() => !inputUrl && setInputUrl("")}
                className="flex-1 outline-none text-sm text-gray-800"
                placeholder="Search Google or type a URL"
              />
              <button
                type="submit"
                className="p-1 hover:bg-gray-200 rounded"
                title="Go"
              >
                <Search className="w-4 h-4 text-gray-600" />
              </button>
            </div>
          </form>

          {/* Browser menu */}
          <div className="flex items-center space-x-1">
            <button
              className="p-2 rounded hover:bg-gray-300 transition-colors"
              title="Bookmark"
            >
              <Bookmark className="w-4 h-4 text-gray-700" />
            </button>
            <button className="p-2 rounded hover:bg-gray-300 transition-colors">
              <div className="w-1 h-1 bg-gray-700 rounded-full"></div>
              <div className="w-1 h-1 bg-gray-700 rounded-full mt-1"></div>
              <div className="w-1 h-1 bg-gray-700 rounded-full mt-1"></div>
            </button>
          </div>
        </div>

        {/* Loading bar */}
        {isLoading && (
          <div className="h-1 bg-gray-200">
            <motion.div
              className="h-full bg-blue-500"
              initial={{ width: "0%" }}
              animate={{ width: "100%" }}
              transition={{ duration: 0.5 }}
            />
          </div>
        )}

        {/* Browser content */}
        <div className="flex-1 relative overflow-hidden">
          {renderPageContent()}
        </div>

        {/* Status bar */}
        <div className="bg-gray-100 border-t border-gray-300 px-3 py-1 text-xs text-gray-600 flex items-center justify-between">
          <span>{isLoading ? "Loading..." : "Done"}</span>
          <span className="text-xs">{getPageTitle()}</span>
        </div>
      </div>
    );
  }

  // Windows-style icon view for trash
  if (type === "trash") {
    return (
      <div
        className={`h-full bg-white text-black flex flex-col ${
          isDragOver ? "bg-blue-50" : ""
        }`}
        onDragOver={handleTrashDragOver}
        onDragLeave={handleTrashDragLeave}
        onDrop={handleTrashDrop}
      >
        {/* Windows-style toolbar */}
        <div
          className={`bg-gray-100 border-b border-gray-300 px-4 py-2 flex items-center justify-between ${
            isMobile ? "text-xs" : "text-sm"
          }`}
        >
          <div className="flex items-center space-x-4">
            <span className="font-medium">
              {trashedItems && trashedItems.length > 0
                ? `${trashedItems.length} item${
                    trashedItems.length !== 1 ? "s" : ""
                  }`
                : "0 items"}
            </span>
          </div>
          {!isMobile && (
            <div className="flex items-center space-x-2">
              <button className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border">
                View
              </button>
              <button className="px-3 py-1 text-xs bg-gray-200 hover:bg-gray-300 rounded border">
                Sort by
              </button>
            </div>
          )}
        </div>

        {/* Content area */}
        <div
          className={`p-4 flex-1 overflow-auto transition-all duration-200 ${
            isDragOver
              ? "bg-blue-50 border-2 border-dashed border-blue-400 shadow-inner"
              : ""
          }`}
        >
          {trashedItems && trashedItems.length > 0 ? (
            <div
              className={`grid ${
                isMobile ? "grid-cols-3" : "grid-cols-6"
              } gap-4 auto-rows-max`}
            >
              {trashedItems.map((item) => (
                <motion.div
                  key={item.id}
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex flex-col items-center p-2 rounded hover:bg-blue-100 cursor-pointer group"
                  draggable
                  onDragStart={(e) => handleDragStart(e, item)}
                  onDoubleClick={() => onRestoreItem && onRestoreItem(item.id)}
                >
                  <div
                    className={`${
                      isMobile ? "w-8 h-8" : "w-12 h-12"
                    } bg-gradient-to-br from-gray-200 to-gray-300 rounded border border-gray-400 flex items-center justify-center mb-1 group-hover:border-blue-400`}
                  >
                    {(() => {
                      const IconComponent = iconMap[item.id] || User;
                      return (
                        <IconComponent
                          className={`${isMobile ? "w-4 h-4" : "w-6 h-6"} ${
                            item.color?.replace("text-", "text-gray-") ||
                            "text-gray-600"
                          }`}
                        />
                      );
                    })()}
                  </div>
                  <span
                    className={`${
                      isMobile ? "text-xs" : "text-xs"
                    } text-center max-w-full truncate px-1 group-hover:bg-blue-500 group-hover:text-white rounded`}
                  >
                    {item.name}
                  </span>
                  <div className="absolute hidden group-hover:block">
                    <div className="relative">
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          onRestoreItem && onRestoreItem(item.id);
                        }}
                        className={`absolute top-0 right-0 ${
                          isMobile ? "w-3 h-3" : "w-4 h-4"
                        } bg-blue-500 text-white rounded-full flex items-center justify-center text-xs hover:bg-blue-600`}
                        title="Restore"
                      >
                        <RotateCcw
                          className={`${isMobile ? "w-1.5 h-1.5" : "w-2 h-2"}`}
                        />
                      </button>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          ) : (
            <div
              className={`flex flex-col items-center justify-center h-full text-gray-500 ${
                isDragOver ? "opacity-50" : ""
              }`}
            >
              <Trash2
                className={`${
                  isMobile ? "w-12 h-12" : "w-16 h-16"
                } mb-4 text-gray-400 ${isDragOver ? "animate-bounce" : ""}`}
              />
              <h3
                className={`${
                  isMobile ? "text-base" : "text-lg"
                } font-medium mb-2`}
              >
                {isDragOver ? "Drop to Delete" : "Recycle Bin is empty"}
              </h3>
              <p className={`${isMobile ? "text-xs" : "text-sm"} text-center`}>
                {isDragOver ? (
                  <span className="text-blue-600 font-medium text-base">
                    Release to move item to trash
                  </span>
                ) : (
                  <>
                    When you delete files, they'll appear here.
                    <br />
                    Drag desktop icons here to delete them.
                  </>
                )}
              </p>
            </div>
          )}
        </div>
      </div>
    );
  }

  // Resume content - Replace the existing resume section with this comprehensive version
  if (type === "resume") {
    const handleDownloadPDF = () => {
      // Google Drive direct download link
      const fileId = "16iLgjK685XztmBuPFwlZzTv2ssxSxEyk";
      const downloadUrl = `https://drive.google.com/uc?export=download&id=${fileId}`;

      // Open in new tab for viewing
      window.open(
        `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
        "_blank",
      );

      // Also trigger download
      const link = document.createElement("a");
      link.href = downloadUrl;
      link.download = "Jason_Phan_Resume.pdf";
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    };

    const handlePrint = () => {
      // Google Drive file ID
      const fileId = "16iLgjK685XztmBuPFwlZzTv2ssxSxEyk";

      // Use Google Drive's direct PDF URL that opens in browser's PDF viewer
      const directPdfUrl = `https://drive.google.com/uc?export=view&id=${fileId}`;

      // Open PDF in new window - browser's built-in PDF viewer has print functionality
      const printWindow = window.open(directPdfUrl, "_blank");

      // Fallback: If that doesn't work, open the regular view and show instructions
      if (!printWindow) {
        alert(
          "Please allow popups and try again, or manually open the PDF and use Ctrl+P to print.",
        );
        window.open(
          `https://drive.google.com/file/d/${fileId}/view?usp=sharing`,
          "_blank",
        );
      }
    };

    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${isMobile ? "p-4" : "p-6"} text-white`}
      >
        {/* Header with contact info */}
        <motion.div
          variants={itemVariants}
          className="text-center mb-8 bg-gradient-to-r from-green-900/30 to-cyan-900/30 p-6 rounded-lg border border-green-400/20"
        >
          <h1
            className={`${
              isMobile ? "text-2xl" : "text-3xl"
            } font-bold text-green-400 mb-2`}
          >
            JASON PHAN
          </h1>
          <h2
            className={`${isMobile ? "text-lg" : "text-xl"} text-cyan-400 mb-4`}
          >
            FRONTEND ENGINEER
          </h2>

          <div className="flex flex-wrap justify-center items-center gap-4 text-sm">
            <div className="flex items-center text-gray-300">
              <Phone className="w-4 h-4 mr-2 text-green-400" />
              <span>+1 612 325 1178</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Mail className="w-4 h-4 mr-2 text-green-400" />
              <span>jason.jayphan@gmail.com</span>
            </div>
            <div className="flex items-center text-gray-300">
              <MapPin className="w-4 h-4 mr-2 text-green-400" />
              <span>Los Angeles, CA</span>
            </div>
            <div className="flex items-center text-gray-300">
              <Linkedin className="w-4 h-4 mr-2 text-green-400" />
              <span>linkedin.com/in/jason-phan-dev</span>
            </div>
          </div>
        </motion.div>

        {/* Action buttons */}
        <motion.div
          variants={itemVariants}
          className="flex justify-center space-x-4 mb-8"
        >
          <button
            onClick={handleDownloadPDF}
            className={`${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-green-600 hover:bg-green-700 rounded-lg transition-colors flex items-center space-x-2 font-medium`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
              />
            </svg>
            <span>Download PDF</span>
          </button>
          <button
            onClick={handlePrint}
            className={`${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2 font-medium`}
          >
            <svg
              className="w-4 h-4"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 17h2a2 2 0 002-2v-4a2 2 0 00-2-2H5a2 2 0 00-2 2v4a2 2 0 002 2h2m2 4h6a2 2 0 002-2v-4a2 2 0 00-2-2H9a2 2 0 00-2 2v4a2 2 0 002 2zm8-12V5a2 2 0 00-2-2H9a2 2 0 00-2 2v4h10z"
              />
            </svg>
            <span>Print</span>
          </button>
        </motion.div>

        {/* Profile */}
        <motion.div
          variants={itemVariants}
          className="mb-8 bg-gray-800/30 p-6 rounded-lg border border-gray-700/50"
        >
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-green-400 mb-3`}
          >
            PROFILE
          </h3>
          <p className="text-gray-300 leading-relaxed">
            Frontend-focused Full Stack Engineer with 7+ years of experience
            delivering scalable, high-performance web applications using React,
            TypeScript, and Next.js. Proven track record of leading component
            libraries, improving accessibility, and building user-centric
            features for platforms serving over one million monthly users.
            Skilled at partnering with designers, engineers, and product teams
            to build performant, accessible, and user-centric web applications.
            Known for mentoring engineers, tackling complex UI challenges, and
            raising engineering standards through scalable, maintainable code.
            Passionate about continuous learning, and comfortable thriving in
            lean teams or high-velocity environments.
          </p>
        </motion.div>

        {/* Experience */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-green-400 mb-4`}
          >
            EXPERIENCE
          </h3>

          <div className="space-y-6">
            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-cyan-400">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">
                  Frontend Engineer II
                </h4>
                <span className="text-gray-400 text-sm">
                  September 2021 - Present
                </span>
              </div>
              <p className="text-cyan-400 mb-3">
                American Public Media Group - Minnesota Public Radio | St.Paul,
                MN (Remote)
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>
                  Deployed an always-on internal dashboard across all MPR
                  facility televisions by independently designing and building
                  the web application end to end.
                </li>
                <li>
                  Streamlined UI consistency and improved code maintainability
                  by building an internal React component library adopted across
                  5+ applications.
                </li>
                <li>
                  Standardized audio playback across all MPR applications by
                  developing a customizable React audio player and publishing it
                  as an internal NPM package.
                </li>
                <li>
                  Achieved 90th percentile Lighthouse accessibility scores
                  across APMG sites by enhancing ARIA attributes and improving
                  accessibility practices.
                </li>
                <li>
                  Led critical feature delivery during periods of reduced
                  engineering capacity, ensuring consistent output and code
                  quality under tight resources.
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-purple-400">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">
                  Associate Frontend Engineer
                </h4>
                <span className="text-gray-400 text-sm">
                  August 2018 - September 2021
                </span>
              </div>
              <p className="text-purple-400 mb-3">
                American Public Media Group - Minnesota Public Radio | St.Paul,
                MN (Hybrid)
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>
                  Modernized web infrastructure by migrating 10+ legacy websites
                  from outdated platforms to React, Next.js, and TypeScript.
                </li>
                <li>
                  Streamlined podcast site creation by implementing a custom
                  template app that auto-generates new websites from config
                  files—now powering 6+ APMG podcast sites.
                </li>
                <li>
                  Improved code reliability and reduced bugs by expanding test
                  coverage on key projects using Jest, Enzyme, and React Testing
                  Library.
                </li>
                <li>
                  Improved accessibility and user experience by auditing legacy
                  pages and updating them to meet WCAG 2.1 standards.
                </li>
              </ul>
            </div>

            <div className="bg-gray-800/30 p-4 rounded-lg border-l-4 border-blue-400">
              <div className="flex justify-between items-start mb-2">
                <h4 className="font-semibold text-white">
                  Freelance Full Stack Engineer
                </h4>
                <span className="text-gray-400 text-sm">
                  December 2018 - November 2021
                </span>
              </div>
              <p className="text-blue-400 mb-3">
                Fiverr | Minneapolis, MN (Remote)
              </p>
              <ul className="list-disc list-inside text-gray-300 space-y-1 text-sm">
                <li>
                  Built custom websites for clothing brands, personal
                  portfolios, and product-based businesses.
                </li>
                <li>
                  Delivered seamless user experiences by translating client
                  vision into performant, responsive web solutions.
                </li>
                <li>
                  Provided post-launch support and created video tutorials for
                  client independence.
                </li>
              </ul>
            </div>
          </div>
        </motion.div>

        {/* Technical Skills with styled containers */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-green-400 mb-4`}
          >
            TECHNICAL SKILLS
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-4 rounded-lg border border-blue-400/20">
              <h4 className="font-semibold text-blue-400 mb-3 flex items-center">
                <div className="w-2 h-2 bg-blue-400 rounded-full mr-2"></div>
                Frontend
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "JavaScript",
                  "React",
                  "TypeScript",
                  "Next.js",
                  "HTML5",
                  "CSS3",
                  "Flexbox",
                  "CSS Grid",
                  "SASS",
                  "Webpack",
                  "Context API",
                  "Redux",
                  "Apollo Client",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-blue-800/40 text-blue-200 px-2 py-1 rounded text-xs border border-blue-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-purple-400/20">
              <h4 className="font-semibold text-purple-400 mb-3 flex items-center">
                <div className="w-2 h-2 bg-purple-400 rounded-full mr-2"></div>
                Backend
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Node.js",
                  "Ruby",
                  "Ruby on Rails",
                  "GraphQL",
                  "Express.js",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-purple-800/40 text-purple-200 px-2 py-1 rounded text-xs border border-purple-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-green-400/20">
              <h4 className="font-semibold text-green-400 mb-3 flex items-center">
                <div className="w-2 h-2 bg-green-400 rounded-full mr-2"></div>
                Databases & Cloud
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "PostgreSQL",
                  "DynamoDB",
                  "AWS (S3, Lambda, Cognito)",
                  "Docker",
                  "GitHub Actions",
                  "GitLab",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-green-800/40 text-green-200 px-2 py-1 rounded text-xs border border-green-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            <div className="bg-gradient-to-br from-orange-900/30 to-red-900/30 p-4 rounded-lg border border-orange-400/20">
              <h4 className="font-semibold text-orange-400 mb-3 flex items-center">
                <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                Testing & Tools
              </h4>
              <div className="flex flex-wrap gap-2">
                {[
                  "Jest",
                  "React Testing Library",
                  "Postman",
                  "Chrome DevTools",
                  "Figma",
                  "ESLint",
                  "Prettier",
                ].map((skill) => (
                  <span
                    key={skill}
                    className="bg-orange-800/40 text-orange-200 px-2 py-1 rounded text-xs border border-orange-600/30"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </motion.div>

        {/* Education */}
        <motion.div variants={itemVariants} className="mb-8">
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-green-400 mb-4`}
          >
            EDUCATION
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-white mb-1">
                Full Stack Software Engineer
              </h4>
              <p className="text-gray-400 text-sm mb-2">Certification</p>
              <p className="text-green-400">Prime Digital Academy</p>
            </div>

            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-white mb-1">
                Bachelor of Science
              </h4>
              <p className="text-gray-400 text-sm mb-2">Psychology</p>
              <p className="text-green-400">University of Minnesota</p>
            </div>

            <div className="bg-gray-800/30 p-4 rounded-lg border border-gray-600/30">
              <h4 className="font-semibold text-white mb-1">
                Associate of Science
              </h4>
              <p className="text-gray-400 text-sm mb-2">Engineering</p>
              <p className="text-green-400">Anoka Ramsey Community College</p>
            </div>
          </div>
        </motion.div>

        {/* Awards */}
        <motion.div variants={itemVariants}>
          <h3
            className={`${
              isMobile ? "text-lg" : "text-xl"
            } font-semibold text-green-400 mb-4`}
          >
            AWARDS
          </h3>

          <div className="bg-gradient-to-r from-yellow-900/30 to-orange-900/30 p-4 rounded-lg border border-yellow-400/20 flex items-center">
            <Award className="text-yellow-400 w-8 h-8 mr-4 flex-shrink-0" />
            <div>
              <h4 className="font-semibold text-yellow-400">Eppy Award</h4>
              <p className="text-gray-300">
                Best Local Radio News website | MPRnews.org | 2021
              </p>
            </div>
          </div>
        </motion.div>
      </motion.div>
    );
  }

  // About Me content - Replace with simpler introduction
  if (type === "about") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${isMobile ? "p-4" : "p-6"} text-white`}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-cyan-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <User className="w-12 h-12 text-white" />
          </div>
          <h2
            className={`${
              isMobile ? "text-2xl" : "text-3xl"
            } font-bold text-cyan-400 mb-2`}
          >
            Hello, I'm Jason
          </h2>
          <p className="text-gray-300 text-lg">
            Frontend Engineer & Problem Solver
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="bg-gray-800/30 p-6 rounded-lg border border-cyan-400/20 mb-6"
        >
          <p className="text-gray-300 leading-relaxed text-center">
            I'm passionate about creating beautiful, accessible, and performant
            web applications. With over 7 years of experience in frontend
            development, I specialize in React, TypeScript, and modern web
            technologies. I love solving complex problems and building user
            experiences that make a difference.
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6"
        >
          <div className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-4 rounded-lg border border-blue-400/20 text-center">
            <div className="text-3xl mb-2">⚛️</div>
            <h3 className="font-semibold text-blue-400 mb-2">React Expert</h3>
            <p className="text-gray-300 text-sm">
              Building scalable applications with modern React patterns
            </p>
          </div>

          <div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-4 rounded-lg border border-purple-400/20 text-center">
            <div className="text-3xl mb-2">🎨</div>
            <h3 className="font-semibold text-purple-400 mb-2">UI/UX Focus</h3>
            <p className="text-gray-300 text-sm">
              Creating intuitive and accessible user interfaces
            </p>
          </div>

          <div className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-4 rounded-lg border border-green-400/20 text-center">
            <div className="text-3xl mb-2">⚡</div>
            <h3 className="font-semibold text-green-400 mb-2">Performance</h3>
            <p className="text-gray-300 text-sm">
              Optimizing for speed and user experience
            </p>
          </div>
        </motion.div>

        <motion.div variants={itemVariants} className="text-center">
          <p className="text-gray-400 mb-4">
            Want to know more about my experience and skills?
          </p>
          <button
            onClick={() =>
              onOpenWindow &&
              onOpenWindow({
                title: "Resume",
                content: "resume",
                icon: FileText,
              })
            }
            className="px-6 py-3 bg-cyan-600 hover:bg-cyan-700 rounded-lg transition-colors font-medium"
          >
            View My Resume
          </button>
        </motion.div>
      </motion.div>
    );
  }

  // Projects content
  if (type === "projects") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${isMobile ? "p-4" : "p-6"} text-white`}
      >
        <motion.h2
          variants={itemVariants}
          className={`${
            isMobile ? "text-xl" : "text-2xl"
          } font-bold mb-4 text-cyan-400`}
        >
          Personal Projects
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className={`text-gray-300 mb-6 ${isMobile ? "text-sm" : ""}`}
        >
          A collection of my personal development projects
        </motion.p>

        <div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-1"} gap-6`}
        >
          {projects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-cyan-400/50 transition-colors cursor-pointer"
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-semibold ${project.color}`}
                >
                  {project.title}
                </h3>
                <div className="flex space-x-2">
                  <button
                    className={`${
                      isMobile ? "p-1" : "p-2"
                    } bg-gray-700 hover:bg-gray-600 rounded transition-colors`}
                  >
                    <Github className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                  </button>
                  <button
                    className={`${
                      isMobile ? "p-1" : "p-2"
                    } bg-gray-700 hover:bg-gray-600 rounded transition-colors`}
                  >
                    <ExternalLink
                      className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                    />
                  </button>
                </div>
              </div>
              <p className={`text-gray-300 mb-3 ${isMobile ? "text-sm" : ""}`}>
                {project.description}
              </p>
              <p
                className={`text-gray-400 mb-4 ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                {project.details}
              </p>

              <div className="mb-4">
                <h4 className={`font-medium mb-2 ${isMobile ? "text-sm" : ""}`}>
                  Key Features:
                </h4>
                <ul className="space-y-1">
                  {project.features.map((feature) => (
                    <li
                      key={feature}
                      className={`flex items-center ${
                        isMobile ? "text-xs" : "text-sm"
                      } text-gray-300`}
                    >
                      <div className="w-2 h-2 bg-cyan-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`${
                      isMobile ? "px-2 py-1 text-xs" : "px-3 py-1 text-xs"
                    } bg-gray-700 rounded text-gray-300`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  // Contact content - New component
  if (type === "contact") {
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${isMobile ? "p-4" : "p-6"} text-white`}
      >
        <motion.div variants={itemVariants} className="text-center mb-8">
          <div className="w-24 h-24 bg-gradient-to-br from-pink-400 to-purple-500 rounded-full flex items-center justify-center mx-auto mb-4">
            <Mail className="w-12 h-12 text-white" />
          </div>
          <h2
            className={`${
              isMobile ? "text-2xl" : "text-3xl"
            } font-bold text-pink-400 mb-2`}
          >
            Get In Touch
          </h2>
          <p className="text-gray-300 text-lg">
            Let's connect and discuss opportunities
          </p>
        </motion.div>

        <motion.div
          variants={itemVariants}
          className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8"
        >
          {/* Email */}
          <motion.a
            href="mailto:jason.jayphan@gmail.com"
            className="bg-gradient-to-br from-blue-900/30 to-cyan-900/30 p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center group-hover:bg-blue-400 transition-colors">
                <Mail className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">Email</h3>
                <p className="text-gray-300 text-sm">jason.jayphan@gmail.com</p>
              </div>
            </div>
          </motion.a>

          {/* Phone */}
          <motion.a
            href="tel:+16123251178"
            className="bg-gradient-to-br from-green-900/30 to-emerald-900/30 p-6 rounded-lg border border-green-400/20 hover:border-green-400/50 transition-all duration-300 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center group-hover:bg-green-400 transition-colors">
                <Phone className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-green-400 mb-1">Phone</h3>
                <p className="text-gray-300 text-sm">+1 (612) 325-1178</p>
              </div>
            </div>
          </motion.a>

          {/* LinkedIn */}
          <motion.a
            href="https://linkedin.com/in/jason-phan-dev"
            target="_blank"
            rel="noopener noreferrer"
            className="bg-gradient-to-br from-blue-900/30 to-indigo-900/30 p-6 rounded-lg border border-blue-400/20 hover:border-blue-400/50 transition-all duration-300 group cursor-pointer"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-blue-600 rounded-lg flex items-center justify-center group-hover:bg-blue-500 transition-colors">
                <Linkedin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-blue-400 mb-1">LinkedIn</h3>
                <p className="text-gray-300 text-sm">jason-phan-dev</p>
              </div>
            </div>
          </motion.a>

          {/* Location */}
          <motion.div className="bg-gradient-to-br from-purple-900/30 to-pink-900/30 p-6 rounded-lg border border-purple-400/20">
            <div className="flex items-center space-x-4">
              <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center">
                <MapPin className="w-6 h-6 text-white" />
              </div>
              <div>
                <h3 className="font-semibold text-purple-400 mb-1">Location</h3>
                <p className="text-gray-300 text-sm">Los Angeles, CA</p>
              </div>
            </div>
          </motion.div>
        </motion.div>

        {/* Professional Note */}
        <motion.div
          variants={itemVariants}
          className="bg-gray-800/30 p-6 rounded-lg border border-pink-400/20 mb-6"
        >
          <h3 className="font-semibold text-pink-400 mb-3">
            Let's Work Together
          </h3>
          <p className="text-gray-300 leading-relaxed mb-4">
            I'm always interested in discussing new opportunities, collaborating
            on exciting projects, or just having a conversation about frontend
            development and technology. Whether you're looking for a frontend
            engineer, need consultation on a project, or want to connect
            professionally, I'd love to hear from you.
          </p>
          <div className="flex flex-wrap gap-3">
            <span className="px-3 py-1 bg-pink-900/30 border border-pink-400/30 rounded-full text-pink-200 text-sm">
              Frontend Development
            </span>
            <span className="px-3 py-1 bg-pink-900/30 border border-pink-400/30 rounded-full text-pink-200 text-sm">
              React & Next.js
            </span>
            <span className="px-3 py-1 bg-pink-900/30 border border-pink-400/30 rounded-full text-pink-200 text-sm">
              TypeScript
            </span>
            <span className="px-3 py-1 bg-pink-900/30 border border-pink-400/30 rounded-full text-pink-200 text-sm">
              UI/UX Implementation
            </span>
          </div>
        </motion.div>

        {/* Quick Actions */}
        <motion.div
          variants={itemVariants}
          className="flex flex-wrap justify-center gap-4"
        >
          <motion.a
            href="mailto:jason.jayphan@gmail.com?subject=Let's Connect&body=Hi Jason, I'd like to discuss..."
            className={`${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-pink-600 hover:bg-pink-700 rounded-lg transition-colors flex items-center space-x-2 font-medium`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Mail className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
            <span>Send Email</span>
          </motion.a>

          <motion.a
            href="https://linkedin.com/in/jason-phan-dev"
            target="_blank"
            rel="noopener noreferrer"
            className={`${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-blue-600 hover:bg-blue-700 rounded-lg transition-colors flex items-center space-x-2 font-medium`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <Linkedin className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
            <span>Connect on LinkedIn</span>
          </motion.a>

          <motion.button
            onClick={() =>
              onOpenWindow &&
              onOpenWindow({
                title: "Resume",
                content: "resume",
                icon: FileText,
              })
            }
            className={`${
              isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
            } bg-gray-700 hover:bg-gray-600 rounded-lg transition-colors flex items-center space-x-2 font-medium`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <FileText className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
            <span>View Resume</span>
          </motion.button>
        </motion.div>
      </motion.div>
    );
  }

  // Work Projects content
  if (type === "work-projects") {
    // If a specific project is selected, show detailed view
    if (selectedWorkProject) {
      return (
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className={`${isMobile ? "p-4" : "p-6"} text-white`}
        >
          {/* Back button */}
          <motion.button
            variants={itemVariants}
            onClick={() => setSelectedWorkProject(null)}
            className="flex items-center space-x-2 mb-4 text-[#327e98] hover:text-[#327e98]/80 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            <span>Back to Projects</span>
          </motion.button>

          <motion.div variants={itemVariants} className="mb-6">
            <h2
              className={`${isMobile ? "text-xl" : "text-2xl"} font-bold mb-2 ${
                selectedWorkProject.color
              }`}
            >
              {selectedWorkProject.title}
            </h2>
            <div
              className={`flex items-center space-x-4 text-gray-400 mb-4 ${
                isMobile ? "text-xs" : "text-sm"
              }`}
            >
              <span className="flex items-center">
                <div className="w-3 h-3 bg-orange-400 rounded-full mr-2"></div>
                {selectedWorkProject.company}
              </span>
              <span>{selectedWorkProject.duration}</span>
              <span>{selectedWorkProject.team}</span>
            </div>
            <p className={`text-gray-300 mb-4 ${isMobile ? "text-sm" : ""}`}>
              {selectedWorkProject.description}
            </p>
            <p className={`text-gray-400 ${isMobile ? "text-xs" : "text-sm"}`}>
              {selectedWorkProject.details}
            </p>
          </motion.div>

          {/* Image Gallery */}
          {selectedWorkProject.screenshots &&
            selectedWorkProject.screenshots.length > 0 && (
              <motion.div variants={itemVariants} className="mb-6">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-semibold mb-4 text-[#327e98]`}
                >
                  Screenshots
                </h3>
                <div className="space-y-4">
                  {/* Main images grid */}
                  <div className={`grid ${isMobile ? 'grid-cols-1' : 'grid-cols-2'} gap-4`}>
                    {selectedWorkProject.screenshots
                      .slice(currentImageIndex, currentImageIndex + (isMobile ? 1 : 2))
                      .map((screenshot: string, index: number) => (
                        <div 
                          key={index} 
                          className="relative cursor-pointer"
                          onClick={() => setFullscreenImage(screenshot)}
                        >
                          <img
                            src={screenshot || "/placeholder.svg"}
                            alt={`${selectedWorkProject.title} screenshot ${currentImageIndex + index + 1}`}
                            className="w-full h-64 object-cover rounded-lg border border-gray-700 hover:opacity-90 transition-opacity"
                          />
                        </div>
                    ))}
                  </div>

                  {/* Navigation buttons */}
                  {selectedWorkProject.screenshots.length > (isMobile ? 1 : 2) && (
                    <div className="flex justify-center gap-4 mt-4">
                      <button
                        onClick={() =>
                          setCurrentImageIndex(
                            Math.max(0, currentImageIndex - (isMobile ? 1 : 2))
                          )
                        }
                        disabled={currentImageIndex === 0}
                        className="bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
                      >
                        <ArrowLeft className="w-4 h-4" />
                      </button>
                      <button
                        onClick={() =>
                          setCurrentImageIndex(
                            Math.min(
                              selectedWorkProject.screenshots.length - (isMobile ? 1 : 2),
                              currentImageIndex + (isMobile ? 1 : 2)
                            )
                          )
                        }
                        disabled={
                          currentImageIndex >=
                          selectedWorkProject.screenshots.length - (isMobile ? 1 : 2)
                        }
                        className="bg-black/50 text-white p-2 rounded-full disabled:opacity-50"
                      >
                        <ArrowRight className="w-4 h-4" />
                      </button>
                    </div>
                  )}

                  {/* Thumbnail navigation */}
                  {selectedWorkProject.screenshots.length > (isMobile ? 1 : 2) && (
                    <div className="flex space-x-2 overflow-x-auto mt-4">
                      {selectedWorkProject.screenshots.map(
                        (screenshot: string, index: number) => (
                          <button
                            key={index}
                            onClick={() => setCurrentImageIndex(index)}
                            className={`flex-shrink-0 w-16 h-12 rounded border-2 overflow-hidden ${
                              index === currentImageIndex
                                ? "border-[#327e98]"
                                : "border-gray-600"
                            }`}
                          >
                            <img
                              src={screenshot || "/placeholder.svg"}
                              alt={`Thumbnail ${index + 1}`}
                              className="w-full h-full object-cover"
                            />
                          </button>
                        ),
                      )}
                    </div>
                  )}

                  {/* Fullscreen view */}
                  {fullscreenImage && (
                    <motion.div
                      initial={{ opacity: 0 }}
                      animate={{ opacity: 1 }}
                      exit={{ opacity: 0 }}
                      className="fixed inset-0 z-50 bg-black/90 flex items-center justify-center p-4"
                      onClick={() => setFullscreenImage(null)}
                    >
                      <div className="relative max-w-full max-h-full">
                        <img
                          src={fullscreenImage}
                          alt="Fullscreen view"
                          className="max-w-full max-h-[90vh] object-contain rounded-lg"
                        />
                        <button
                          onClick={(e) => {
                            e.stopPropagation();
                            setFullscreenImage(null);
                          }}
                          className="absolute top-4 right-4 bg-black/50 text-white p-2 rounded-full hover:bg-black/70 transition-colors"
                        >
                          <X className="w-6 h-6" />
                        </button>
                      </div>
                    </motion.div>
                  )}
                </div>
              </motion.div>
            )}

          {/* Features */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3
              className={`${
                isMobile ? "text-lg" : "text-xl"
              } font-semibold mb-4 text-[#327e98]`}
            >
              Key Features
            </h3>
            <div
              className={`grid ${
                isMobile ? "grid-cols-1" : "grid-cols-2"
              } gap-3`}
            >
              {selectedWorkProject.features.map((feature: string) => (
                <div
                  key={feature}
                  className={`flex items-center ${
                    isMobile ? "text-xs" : "text-sm"
                  } text-gray-300`}
                >
                  <div className="w-2 h-2 bg-orange-400 rounded-full mr-3"></div>
                  {feature}
                </div>
              ))}
            </div>
          </motion.div>

          {/* Technologies */}
          <motion.div variants={itemVariants} className="mb-6">
            <h3
              className={`${
                isMobile ? "text-lg" : "text-xl"
              } font-semibold mb-4 text-[#327e98]`}
            >
              Technologies Used
            </h3>
            <div className="flex flex-wrap gap-2">
              {selectedWorkProject.tech.map((tech: string) => (
                <span
                  key={tech}
                  className={`${
                    isMobile ? "px-2 py-1 text-xs" : "px-3 py-1 text-xs"
                  } bg-orange-900/30 border border-orange-400/30 rounded text-orange-200`}
                >
                  {tech}
                </span>
              ))}
            </div>
          </motion.div>

          {/* Awards if any */}
          {selectedWorkProject.awards &&
            selectedWorkProject.awards.length > 0 && (
              <motion.div variants={itemVariants} className="mb-6">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-semibold mb-4 text-[#327e98]`}
                >
                  Awards
                </h3>
                <div className="space-y-2">
                  {selectedWorkProject.awards.map(
                    (award: string, index: number) => (
                      <div
                        key={index}
                        className="flex items-center bg-orange-900/20 p-3 rounded-lg"
                      >
                        <Award className="text-yellow-400 w-5 h-5 mr-3 flex-shrink-0" />
                        <span className="text-orange-200">{award}</span>
                      </div>
                    ),
                  )}
                </div>
              </motion.div>
            )}

          {/* Visit Site Button */}
          {selectedWorkProject.url && (
            <motion.div variants={itemVariants}>
              <button
                onClick={() => window.open(selectedWorkProject.url, "_blank")}
                className={`${
                  isMobile ? "px-4 py-2 text-sm" : "px-6 py-3"
                } bg-orange-600 hover:bg-orange-700 rounded-lg transition-colors flex items-center space-x-2`}
              >
                <ExternalLink
                  className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`}
                />
                <span>Visit Live Site</span>
              </button>
            </motion.div>
          )}
        </motion.div>
      );
    }

    // Default work projects list view
    return (
      <motion.div
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        className={`${isMobile ? "p-4" : "p-6"} text-white`}
      >
        <motion.h2
          variants={itemVariants}
          className={`${
            isMobile ? "text-xl" : "text-2xl"
          } font-bold mb-4 text-[#327e98]`}
        >
          Work Projects
        </motion.h2>
        <motion.p
          variants={itemVariants}
          className={`text-gray-300 mb-6 ${isMobile ? "text-sm" : ""}`}
        >
          A selection of projects I've worked on professionally
        </motion.p>

        <div
          className={`grid ${isMobile ? "grid-cols-1" : "grid-cols-2"} gap-6`}
        >
          {workProjects.map((project, index) => (
            <motion.div
              key={project.title}
              variants={itemVariants}
              className="bg-gray-800/50 p-4 rounded-lg border border-gray-700 hover:border-[#327e98]/50 transition-colors cursor-pointer"
              onClick={() => setSelectedWorkProject(project)}
            >
              <div className="flex items-start justify-between mb-3">
                <h3
                  className={`${
                    isMobile ? "text-lg" : "text-xl"
                  } font-semibold ${project.color}`}
                >
                  {project.title}
                </h3>
                {/* <div className="flex space-x-2">
                  <button
                    className={`${isMobile ? "p-1" : "p-2"} bg-gray-700 hover:bg-gray-600 rounded transition-colors`}
                  >
                    <Github className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                  </button>
                  <button
                    className={`${isMobile ? "p-1" : "p-2"} bg-gray-700 hover:bg-gray-600 rounded transition-colors`}
                  >
                    <ExternalLink className={`${isMobile ? "w-3 h-3" : "w-4 h-4"}`} />
                  </button>
                </div> */}
              </div>
              <div
                className={`flex items-center space-x-4 text-gray-400 mb-4 ${
                  isMobile ? "text-xs" : "text-sm"
                }`}
              >
                <span className="flex items-center">
                  <div className="w-3 h-3 text-[#8E6] rounded-full mr-2"></div>
                  {project.company}
                </span>
                {/* <span>{project.duration}</span> */}
                {/* <span>{project.team}</span> */}
              </div>
              <p className={`text-gray-300 mb-3 ${isMobile ? "text-sm" : ""}`}>
                {project.description}
              </p>
              {/* <p className={`text-gray-400 mb-4 ${isMobile ? "text-xs" : "text-sm"}`}>{project.details}</p> */}

              {/* <div className="mb-4">
                <h4 className={`font-medium mb-2 ${isMobile ? "text-sm" : ""}`}>Key Features:</h4>
                <ul className="space-y-1">
                  {project.features.map((feature) => (
                    <li key={feature} className={`flex items-center ${isMobile ? "text-xs" : "text-sm"} text-gray-300`}>
                      <div className="w-2 h-2 bg-orange-400 rounded-full mr-2"></div>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div> */}

              <div className="flex flex-wrap gap-2">
                {project.tech.map((tech) => (
                  <span
                    key={tech}
                    className={`${
                      isMobile ? "px-2 py-1 text-xs" : "px-3 py-1 text-xs"
                    } bg-orange-900/30 border border-orange-400/30 rounded text-orange-200`}
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </motion.div>
    );
  }

  return (
    <div className="flex items-center justify-center h-full bg-white">
      <div className="text-center">
        <Globe className="w-16 h-16 text-gray-400 mx-auto mb-4" />
        <h3 className="text-lg font-medium text-gray-600">
          Content Loading...
        </h3>
      </div>
    </div>
  );
}
