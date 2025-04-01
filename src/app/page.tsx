"use client"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { Trophy, Moon, Sun, Heart, TrendingUp, Sparkles, Menu, X, User } from "lucide-react"
import { useInView } from "react-intersection-observer"

// Define story type
interface Story {
  id: number;
  title: string;
  person: string;
  category: string;
  rejection: string;
  rejectionDetail?: string;
  success: string;
  successDetail?: string;
  lessons?: string;
  likes: number;
  liked: boolean;
  date: string;
  personImage?: string;
}

// Sample rejection stories data
const rejectionStories: Story[] = [
  {
    id: 1,
    title: "Rejected by 12 Publishers",
    person: "J.K. Rowling",
    category: "Arts",
    rejection: "Harry Potter was rejected by 12 different publishers before Bloomsbury finally took a chance.",
    rejectionDetail: "In 1995, J.K. Rowling completed her manuscript for 'Harry Potter and the Philosopher's Stone'. She submitted it to 12 publishing houses, all of which rejected it. Bloomsbury, a small London publishing house, only agreed to publish it after the CEO's eight-year-old daughter begged her father to print the book.",
    success: "Became one of the best-selling book series in history with over 500 million copies sold worldwide.",
    successDetail: "The Harry Potter series has been translated into 80 languages and has grossed more than $7.7 billion. J.K. Rowling became the first billionaire author in history, though she later lost this status after donating much of her wealth to charity.",
    lessons: "Persistence is key. Just because multiple people don't see value in your work doesn't mean it lacks merit.",
    likes: 2453,
    liked: false,
    date: "2023-05-15",
    personImage: "https://placehold.co/400x400/e9d5ff/1a1a1a?text=J.K.+Rowling",
  },
  {
    id: 2,
    title: "Too Ordinary to Succeed",
    person: "Walt Disney",
    category: "Business",
    rejection: "Fired from a newspaper for 'lacking imagination' and 'having no original ideas'.",
    rejectionDetail: "Early in his career, Walt Disney was fired from the Kansas City Star newspaper because his editor felt he 'lacked imagination and had no good ideas.' He went on to form his first animation company, Laugh-O-Gram Studio, which went bankrupt within a few years.",
    success: "Founded Disney, now one of the world's largest entertainment companies valued at over $200 billion.",
    successDetail: "After his initial failures, Disney moved to Hollywood and established Disney Brothers Studio with his brother Roy. The company pioneered animation techniques and created beloved characters like Mickey Mouse. Today, The Walt Disney Company is a global entertainment empire.",
    lessons: "Your current critics don't determine your future potential. What others see as flaws might become your greatest strengths.",
    likes: 1872,
    liked: false,
    date: "2023-06-22",
    personImage: "https://placehold.co/400x400/e9d5ff/1a1a1a?text=Walt+Disney",
  },
  {
    id: 3,
    title: "Rejected by Harvard",
    person: "Warren Buffett",
    category: "Business",
    rejection: "Rejected from Harvard Business School, which he considered his top choice for graduate education.",
    rejectionDetail: "At age 19, Warren Buffett applied to Harvard Business School and was rejected after his interview. The interviewer reportedly told him he was too young. This rejection led him to apply to Columbia Business School instead, where he studied under Benjamin Graham, who became his mentor and shaped his investment philosophy.",
    success: "Became one of the most successful investors of all time with a net worth over $100 billion.",
    successDetail: "As the chairman and CEO of Berkshire Hathaway, Buffett transformed a failing textile company into a multinational conglomerate. His investment strategies and business acumen have made him one of the wealthiest people in the world, and he's known as the 'Oracle of Omaha'.",
    lessons: "Rejection can redirect you to better opportunities that align more closely with your path to success.",
    likes: 1543,
    liked: false,
    date: "2023-07-10",
    personImage: "https://placehold.co/400x400/e9d5ff/1a1a1a?text=Warren+Buffett",
  },
  {
    id: 4,
    title: "Failed Audition",
    person: "Lady Gaga",
    category: "Arts",
    rejection: "Dropped by her first major record label, Island Def Jam, after just three months.",
    rejectionDetail: "In 2006, after being discovered by music producer Rob Fusari, Lady Gaga (then Stefani Germanotta) signed with Island Def Jam. However, the label dropped her after only three months without explanation. She later described this as one of the most devastating moments of her career.",
    success: "Won 13 Grammy Awards and became one of the world's best-selling music artists with over 124 million records sold.",
    successDetail: "After being dropped, Gaga worked in the New York club scene and eventually signed with Interscope Records. Her debut album 'The Fame' launched her to international stardom. She has since become known for her musical versatility, visual reinventions, and acting career, including an Academy Award nomination.",
    lessons: "Sometimes rejection is just a sign that you haven't found the right audience or platform for your talents yet.",
    likes: 1298,
    liked: false,
    date: "2023-08-05",
    personImage: "https://placehold.co/400x400/e9d5ff/1a1a1a?text=Lady+Gaga",
  }
];

// Simple component stubs to avoid build errors
const Button = ({ children, className, onClick, ...props }: any) => (
  <button className={`px-4 py-2 rounded font-medium ${className}`} onClick={onClick} {...props}>
    {children}
  </button>
);

const Badge = ({ children, className, ...props }: any) => (
  <span className={`inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold ${className}`} {...props}>
    {children}
  </span>
);

const Card = ({ children, className, ...props }: any) => (
  <div className={`rounded-lg border bg-card text-card-foreground shadow-sm ${className}`} {...props}>
    {children}
  </div>
);

const CardHeader = ({ children, className, ...props }: any) => (
  <div className={`flex flex-col space-y-1.5 p-6 ${className}`} {...props}>
    {children}
  </div>
);

const CardTitle = ({ children, className, ...props }: any) => (
  <h3 className={`text-lg font-semibold leading-none tracking-tight ${className}`} {...props}>
    {children}
  </h3>
);

const CardDescription = ({ children, className, ...props }: any) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);

const CardContent = ({ children, className, ...props }: any) => (
  <div className={`p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const CardFooter = ({ children, className, ...props }: any) => (
  <div className={`flex items-center p-6 pt-0 ${className}`} {...props}>
    {children}
  </div>
);

const Dialog = ({ children }: any) => children;
const DialogTrigger = ({ children, asChild }: any) => children;
const DialogContent = ({ children, className }: any) => (
  <div className={`fixed z-50 top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-lg p-6 shadow-lg max-w-lg w-full ${className}`} style={{ backgroundColor: 'hsl(var(--background))' }}>
    {children}
  </div>
);
const DialogHeader = ({ children, className }: any) => <div className={`space-y-1.5 ${className}`}>{children}</div>;
const DialogTitle = ({ children, className }: any) => (
  <h2 className={`text-xl font-semibold ${className}`}>{children}</h2>
);
const DialogDescription = ({ children, className, ...props }: any) => (
  <p className={`text-sm text-muted-foreground ${className}`} {...props}>
    {children}
  </p>
);
const DialogFooter = ({ children, className }: any) => (
  <div className={`flex justify-end ${className}`}>{children}</div>
);

const useToast = () => ({ toast: (args: any) => console.log('Toast:', args) });
const useMobile = () => false;

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stories, setStories] = useState<Story[]>(rejectionStories);
  const [activeTab, setActiveTab] = useState("all");
  const [theme, setTheme] = useState("light");
  const { toast } = useToast();
  const isMobile = useMobile();
  
  // Animation refs with IntersectionObserver
  const [heroRef1, heroInView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  const [heroRef2, heroInView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 300,
  });

  const [storiesRef, storiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  });

  // Confetti container ref
  const confettiContainerRef = useRef<HTMLDivElement>(null);

  // Toggle theme function
  const toggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    document.documentElement.classList.toggle("dark");
  };

  // Scroll to section function
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
      setMobileMenuOpen(false);
    }
  };
  
  // Handle like functionality
  const handleLike = (id: number) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id
          ? { ...story, likes: story.liked ? story.likes - 1 : story.likes + 1, liked: !story.liked }
          : story,
      ),
    );

    // Show confetti animation on like
    if (!stories.find((s) => s.id === id)?.liked) {
      createConfetti();
    }
  };

  // Create confetti animation
  const createConfetti = () => {
    if (!confettiContainerRef.current) return;
    
    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div");
      confetti.classList.add("confetti");
      confetti.style.left = `${Math.random() * 100}%`;
      confetti.style.backgroundColor = getRandomColor();
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`;
      confettiContainerRef.current.appendChild(confetti);

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove();
      }, 3000);
    }
  };

  // Get random color for confetti
  const getRandomColor = () => {
    const colors = [
      "#e9d5ff",  // light purple
      "#f97316",  // orange
      "#22c55e",  // green
      "#f472b6",  // pink
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  useEffect(() => {
    // Fix for iOS viewport height issues
    const setVh = () => {
      const vh = window.innerHeight * 0.01;
      document.documentElement.style.setProperty("--vh", `${vh}px`);
    };

    setVh();
    window.addEventListener("resize", setVh);

    return () => {
      window.removeEventListener("resize", setVh);
    };
  }, []);

  // Filter stories based on active tab
  const filteredStories = activeTab === "all" 
    ? stories 
    : stories.filter(story => story.category.toLowerCase() === activeTab.toLowerCase());

  return (
    <div className="flex min-h-screen flex-col">
      {/* Confetti container */}
      <div ref={confettiContainerRef} className="fixed inset-0 pointer-events-none z-50"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b backdrop-blur supports-[backdrop-filter]:bg-white/60 dark:supports-[backdrop-filter]:bg-gray-900/60" style={{ backgroundColor: 'hsla(var(--background), 0.95)' }}>
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Trophy className="h-6 w-6 logo-icon" />
            <span className="logo-text">Rejection Hall of Fame</span>
          </div>

          {/* Desktop Navigation */}
          <nav className="hidden md:flex gap-8">
            <Link
              href="#"
              onClick={() => scrollToSection("home")}
              className="text-foreground hover:text-secondary transition-colors nav-link font-medium"
            >
              Home
            </Link>
            <Link
              href="#stories"
              onClick={() => scrollToSection("stories")}
              className="text-foreground hover:text-secondary transition-colors nav-link font-medium"
            >
              Stories
            </Link>
            <Link
              href="#about"
              onClick={() => scrollToSection("about")}
              className="text-foreground hover:text-secondary transition-colors nav-link font-medium"
            >
              About
            </Link>
          </nav>

          <div className="flex items-center gap-4">
            {/* Theme toggle */}
            <button
              onClick={toggleTheme}
              className="p-2 rounded-full hover:bg-muted transition-colors"
              aria-label="Toggle theme"
            >
              {theme === "light" ? <Moon className="h-5 w-5" /> : <Sun className="h-5 w-5" />}
            </button>

            {/* Mobile menu button */}
            <button
              className="md:hidden p-2"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="h-6 w-6" /> : <Menu className="h-6 w-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {mobileMenuOpen && (
          <div className="md:hidden border-b" style={{ backgroundColor: 'hsl(var(--background))' }}>
            <nav className="container py-4 flex flex-col gap-4">
              <Link
                href="#"
                onClick={() => scrollToSection("home")}
                className="text-foreground hover:text-secondary transition-colors py-2 font-medium"
              >
                Home
              </Link>
              <Link
                href="#stories"
                onClick={() => scrollToSection("stories")}
                className="text-foreground hover:text-secondary transition-colors py-2 font-medium"
              >
                Stories
              </Link>
              <Link
                href="#about"
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-secondary transition-colors py-2 font-medium"
              >
                About
              </Link>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 hero-pattern">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div
                ref={heroRef1}
                className={`space-y-4 ${heroInView1 ? "scroll-animation visible" : "scroll-animation"}`}
              >
                <Badge className="px-3 py-1 text-sm bg-secondary text-secondary-foreground">
                  <Sparkles className="h-3.5 w-3.5 mr-1" />
                  Inspiring Stories
                </Badge>
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-poppins">
                  <span className="text-secondary">Rejection</span> Hall of Fame
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Celebrating the rejections that preceded greatness. A collection of stories from people who faced
                  rejection but went on to accomplish awesome things.
                </p>
                <div className="flex flex-col sm:flex-row gap-2">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("stories")}
                    className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                  >
                    Explore Stories
                  </Button>
                </div>
              </div>
              <div
                ref={heroRef2}
                className={`aspect-ratio-box rounded-xl overflow-hidden shadow-2xl ${heroInView2 ? "scroll-animation visible" : "scroll-animation"}`}
                style={{ transitionDelay: "200ms" }}
              >
                <div className="aspect-ratio-content">
                  <Image
                    src="https://placehold.co/600x400/e9d5ff/1a1a1a?text=Rejection+Stories"
                    alt="Rejection Hall of Fame"
                    width={600}
                    height={400}
                    className="object-cover"
                    priority
                  />
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section id="stories" className="w-full py-12 md:py-24 lg:py-32" ref={storiesRef}>
          <div className="container px-4 md:px-6">
            <div
              className={`flex flex-col items-center justify-center space-y-4 text-center ${storiesInView ? "scroll-animation visible" : "scroll-animation"}`}
            >
              <div className="space-y-2">
                <Badge className="px-3 py-1 text-sm bg-accent text-accent-foreground badge-glow">
                  <TrendingUp className="h-3.5 w-3.5 mr-1" />
                  Popular Stories
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-poppins">
                  Stories of Famous Rejections
                </h2>
                <p className="mx-auto max-w-[700px] text-muted-foreground md:text-xl">
                  Learn how successful people turned rejection into opportunity and used it as fuel for their journey.
                </p>
              </div>
            </div>

            <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {filteredStories.map((story) => (
                <Card key={story.id} className="h-full card-hover">
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription className="flex items-center gap-1">
                      <User className="h-3.5 w-3.5" />
                      {story.person}
                    </CardDescription>
                  </CardHeader>
                  <CardContent className="flex-1">
                    <div className="space-y-2">
                      <div className="flex items-center gap-2 text-sm font-medium text-muted-foreground">
                        <span className="bg-primary/20 text-primary-foreground px-2 py-0.5 rounded text-xs">
                          THE REJECTION
                        </span>
                      </div>
                      <p className="text-muted-foreground">{story.rejection}</p>
                    </div>
                  </CardContent>
                  <CardFooter className="border-t pt-4 flex flex-col items-start gap-2">
                    <div className="flex items-center gap-2 text-sm font-medium text-accent">
                      <TrendingUp className="h-4 w-4" />
                      <span className="bg-accent/20 text-accent px-2 py-0.5 rounded text-xs">THE SUCCESS</span>
                    </div>
                    <p>{story.success}</p>

                    <div className="flex items-center justify-between w-full mt-4">
                      <Dialog>
                        <DialogTrigger asChild>
                          <Button variant="link" className="p-0 h-auto">
                            Read full story
                          </Button>
                        </DialogTrigger>
                        
                        <DialogContent className="sm:max-w-[600px]">
                          <DialogHeader>
                            <DialogTitle className="font-poppins text-2xl">{story.title}</DialogTitle>
                            <DialogDescription className="flex items-center gap-1">
                              <User className="h-3.5 w-3.5" />
                              {story.person}
                            </DialogDescription>
                          </DialogHeader>
                          <div className="space-y-6 py-4">
                            <div className="flex flex-col md:flex-row gap-6">
                              {story.personImage && (
                                <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-md">
                                  <Image 
                                    src={story.personImage} 
                                    alt={story.person}
                                    width={200}
                                    height={200}
                                    className="object-cover person-image"
                                  />
                                </div>
                              )}
                              <div className="w-full md:w-2/3 space-y-4">
                                <div className="space-y-2">
                                  <h4 className="font-medium flex items-center gap-2 text-primary">
                                    <span className="bg-primary/20 text-primary-foreground px-2 py-0.5 rounded text-xs">THE REJECTION</span>
                                  </h4>
                                  <p>{story.rejection}</p>
                                  <p className="text-muted-foreground text-sm">{story.rejectionDetail}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-medium flex items-center gap-2 text-accent">
                                    <TrendingUp className="h-4 w-4" />
                                    <span className="bg-accent/20 text-accent px-2 py-0.5 rounded text-xs">THE SUCCESS</span>
                                  </h4>
                                  <p>{story.success}</p>
                                  <p className="text-muted-foreground text-sm">{story.successDetail}</p>
                                </div>
                                
                                <div className="space-y-2">
                                  <h4 className="font-medium">Lessons Learned</h4>
                                  <p className="text-muted-foreground">{story.lessons || "Every rejection is a redirection to something better."}</p>
                                </div>
                              </div>
                            </div>
                          </div>
                          <DialogFooter className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <Button 
                                variant="ghost" 
                                size="icon"
                                className={`${story.liked ? 'text-secondary' : 'text-muted-foreground'}`}
                                onClick={() => handleLike(story.id)}
                              >
                                <Heart className={`h-4 w-4 ${story.liked ? 'fill-current' : ''}`} />
                              </Button>
                              <span>{story.likes} likes</span>
                            </div>
                          </DialogFooter>
                        </DialogContent>
                      </Dialog>

                      <Badge variant="outline" className="text-muted-foreground">
                        {new Date(story.date).toLocaleDateString()}
                      </Badge>
                    </div>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32 bg-muted/30">
          <div className="container px-4 md:px-6">
            <div className="grid gap-10 lg:grid-cols-2">
              <div className="space-y-4">
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-poppins">About This Project</h2>
                <p className="text-muted-foreground md:text-lg">
                  The Rejection Hall of Fame celebrates those who faced significant rejection on their path to success. Our mission is to inspire others by showcasing that rejection is often just a redirection to something better.
                </p>
                <p className="text-muted-foreground md:text-lg">
                  Every successful person has faced rejection at some point. What sets them apart is how they responded to it. These stories remind us that persistence, belief in oneself, and the ability to learn from failure are crucial components of success.
                </p>
              </div>
              <div className="space-y-4">
                <h3 className="text-2xl font-bold">Why Rejection Stories Matter</h3>
                <p className="text-muted-foreground">
                  Rejection stories matter because they:
                </p>
                <ul className="list-disc pl-5 space-y-2 text-muted-foreground">
                  <li>Normalize failure as part of the journey to success</li>
                  <li>Provide perspective on how successful people handle setbacks</li>
                  <li>Offer valuable lessons that we can apply to our own lives</li>
                  <li>Inspire perseverance when we're facing our own rejections</li>
                  <li>Show that success often comes after multiple attempts and failures</li>
                </ul>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full border-t py-6 md:py-0 bg-muted/30">
        <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
          <div className="flex items-center gap-2 font-medium">
            <Trophy className="h-5 w-5 logo-icon" />
            <span className="logo-text">Rejection Hall of Fame</span>
            <span className="text-sm text-muted-foreground hidden md:inline">
              © {new Date().getFullYear()} All rights reserved.
            </span>
          </div>
          <nav className="flex gap-4 sm:gap-6">
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Terms
            </Link>
            <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
              Privacy
            </Link>
          </nav>
        </div>
      </footer>
    </div>
  );
}

