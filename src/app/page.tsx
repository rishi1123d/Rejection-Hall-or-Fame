"use client"

import type React from "react"

import { useState, useEffect, useRef } from "react"
import Image from "next/image"
import Link from "next/link"
import { useInView } from "react-intersection-observer"
import { Button } from "@/components/ui/button"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Tabs, TabsList, TabsTrigger } from "@/components/ui/tabs"
import {
  ArrowRight,
  Star,
  TrendingUp,
  Heart,
  Sparkles,
  Menu,
  X,
  Search,
  Share2,
  BookOpen,
  User,
  Send,
  Sun,
  Moon,
  Trophy,
} from "lucide-react"
import { useToast } from "@/hooks/use-toast"
import { useMobile } from "@/hooks/use-mobile"
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog"
import { Tooltip, TooltipContent, TooltipProvider, TooltipTrigger } from "@/components/ui/tooltip"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

// Sample rejection stories data with real-time like functionality
const rejectionStories = [
  {
    id: 1,
    title: "Rejected by 12 Publishers",
    person: "J.K. Rowling",
    category: "Arts",
    rejection: "Harry Potter was rejected by 12 different publishers before Bloomsbury finally took a chance.",
    rejectionDetail:
      "In 1995, J.K. Rowling completed her manuscript for 'Harry Potter and the Philosopher's Stone'. She submitted it to 12 publishing houses, all of which rejected it. Bloomsbury, a small London publishing house, only agreed to publish it after the CEO's eight-year-old daughter begged her father to print the book.",
    success: "Became one of the best-selling book series in history with over 500 million copies sold worldwide.",
    successDetail:
      "The Harry Potter series has been translated into 80 languages and has grossed more than $7.7 billion. J.K. Rowling became the first billionaire author in history, though she later lost this status after donating much of her wealth to charity.",
    lessons:
      "Persistence is key. Just because multiple people don't see value in your work doesn't mean it lacks merit.",
    likes: 2453,
    liked: false,
    date: "2023-05-15",
    personImage: "/images/people/jk-rowling.png",
  },
  {
    id: 2,
    title: "Too Ordinary to Succeed",
    person: "Walt Disney",
    category: "Business",
    rejection: "Fired from a newspaper for 'lacking imagination' and 'having no original ideas'.",
    rejectionDetail:
      "Early in his career, Walt Disney was fired from the Kansas City Star newspaper because his editor felt he 'lacked imagination and had no good ideas.' He went on to form his first animation company, Laugh-O-Gram Studio, which went bankrupt within a few years.",
    success: "Founded Disney, now one of the world's largest entertainment companies valued at over $200 billion.",
    successDetail:
      "After his initial failures, Disney moved to Hollywood and established Disney Brothers Studio with his brother Roy. The company pioneered animation techniques and created beloved characters like Mickey Mouse. Today, The Walt Disney Company is a global entertainment empire.",
    lessons:
      "Your current critics don't determine your future potential. What others see as flaws might become your greatest strengths.",
    likes: 1872,
    liked: false,
    date: "2023-06-22",
    personImage: "/placeholder.svg?height=400&width=400&text=Walt+Disney",
  },
  {
    id: 3,
    title: "Rejected by Harvard",
    person: "Warren Buffett",
    category: "Business",
    rejection: "Rejected from Harvard Business School, which he considered his top choice for graduate education.",
    rejectionDetail:
      "At age 19, Warren Buffett applied to Harvard Business School and was rejected after his interview. The interviewer reportedly told him he was too young. This rejection led him to apply to Columbia Business School instead, where he studied under Benjamin Graham, who became his mentor and shaped his investment philosophy.",
    success: "Became one of the most successful investors of all time with a net worth over $100 billion.",
    successDetail:
      "As the chairman and CEO of Berkshire Hathaway, Buffett transformed a failing textile company into a multinational conglomerate. His investment strategies and business acumen have made him one of the wealthiest people in the world, and he's known as the 'Oracle of Omaha'.",
    lessons: "Rejection can redirect you to better opportunities that align more closely with your path to success.",
    likes: 1543,
    liked: false,
    date: "2023-07-10",
    personImage: "/images/people/warren-buffett.png",
  },
  {
    id: 4,
    title: "Failed Audition",
    person: "Lady Gaga",
    category: "Arts",
    rejection: "Dropped by her first major record label, Island Def Jam, after just three months.",
    rejectionDetail:
      "In 2006, after being discovered by music producer Rob Fusari, Lady Gaga (then Stefani Germanotta) signed with Island Def Jam. However, the label dropped her after only three months without explanation. She later described this as one of the most devastating moments of her career.",
    success:
      "Won 13 Grammy Awards and became one of the world's best-selling music artists with over 124 million records sold.",
    successDetail:
      "After being dropped, Gaga worked in the New York club scene and eventually signed with Interscope Records. Her debut album 'The Fame' launched her to international stardom. She has since become known for her musical versatility, visual reinventions, and acting career, including an Academy Award nomination.",
    lessons:
      "Sometimes rejection is just a sign that you haven't found the right audience or platform for your talents yet.",
    likes: 1298,
    liked: false,
    date: "2023-08-05",
    personImage: "/placeholder.svg?height=400&width=400&text=Lady+Gaga",
  },
  {
    id: 5,
    title: "Rejected by KFC",
    person: "Colonel Sanders",
    category: "Business",
    rejection: "His famous chicken recipe was rejected over 1,000 times before a restaurant accepted it.",
    rejectionDetail:
      "At age 65, after his restaurant failed due to a new interstate highway bypassing his location, Harland Sanders took his chicken recipe on the road. He reportedly received 1,009 rejections before finding his first franchisee. He would sleep in his car while traveling from restaurant to restaurant trying to sell his recipe.",
    success: "Founded KFC, which now has over 24,000 locations worldwide in more than 145 countries.",
    successDetail:
      "After finally finding success with his franchise model, Sanders sold the company in 1964 for $2 million (equivalent to about $17 million today). He remained the company's brand ambassador until his death in 1980. KFC is now one of the world's largest fast-food chains.",
    lessons:
      "Age is just a number when it comes to entrepreneurship, and persistence eventually pays off if you believe in your product.",
    likes: 987,
    liked: false,
    date: "2023-09-18",
    personImage: "/placeholder.svg?height=400&width=400&text=Colonel+Sanders",
  },
  {
    id: 6,
    title: "Failed First Business",
    person: "Arianna Huffington",
    category: "Media",
    rejection: "Her second book was rejected by 36 publishers.",
    rejectionDetail:
      "After moving to the United States, Arianna Huffington (then Arianna Stassinopoulos) wrote her second book, which was rejected by 36 publishers before finally being accepted. Throughout her career, she faced criticism for her accent and writing style.",
    success: "Co-founded The Huffington Post, which was later sold to AOL for $315 million.",
    successDetail:
      "Despite early rejections, Huffington persevered and became a successful author before co-founding The Huffington Post in 2005. After selling the company to AOL, she launched Thrive Global, a company focused on health and wellness. She's now recognized as one of the most influential women in media.",
    lessons: "Your unique voice and perspective are valuable, even when others don't immediately recognize it.",
    likes: 765,
    liked: false,
    date: "2023-10-30",
    personImage: "/placeholder.svg?height=400&width=400&text=Arianna+Huffington",
  },
]

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const [activeTab, setActiveTab] = useState("all")
  const [stories, setStories] = useState(rejectionStories)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [searchQuery, setSearchQuery] = useState("")
  const [theme, setTheme] = useState<"light" | "dark">("light")
  const { toast } = useToast()
  const isMobile = useMobile()
  const heroRef = useRef<HTMLDivElement>(null)
  const [loadingMore, setLoadingMore] = useState(false) // State for "Load More" button

  // Animation refs with IntersectionObserver
  const [heroRef1, heroInView1] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [heroRef2, heroInView2] = useInView({
    triggerOnce: true,
    threshold: 0.1,
    delay: 300,
  })

  const [storiesRef, storiesInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [formRef, formInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  const [aboutRef, aboutInView] = useInView({
    triggerOnce: true,
    threshold: 0.1,
  })

  // Handle like functionality
  const handleLike = (id: number) => {
    setStories((prevStories) =>
      prevStories.map((story) =>
        story.id === id
          ? { ...story, likes: story.liked ? story.likes - 1 : story.likes + 1, liked: !story.liked }
          : story,
      ),
    )

    // Show confetti animation on like
    if (!stories.find((s) => s.id === id)?.liked) {
      createConfetti()
    }
  }

  // Create confetti animation
  const createConfetti = () => {
    const confettiContainer = document.getElementById("confetti-container")
    if (!confettiContainer) return

    for (let i = 0; i < 30; i++) {
      const confetti = document.createElement("div")
      confetti.classList.add("confetti")
      confetti.style.left = `${Math.random() * 100}%`
      confetti.style.backgroundColor = getRandomColor()
      confetti.style.animationDuration = `${Math.random() * 3 + 2}s`
      confettiContainer.appendChild(confetti)

      // Remove confetti after animation
      setTimeout(() => {
        confetti.remove()
      }, 3000)
    }
  }

  // Get random color for confetti
  const getRandomColor = () => {
    const colors = [
      "hsl(var(--primary))",
      "hsl(var(--secondary))",
      "hsl(var(--accent))",
      "hsl(var(--highlight))",
      "hsl(var(--rose))",
    ]
    return colors[Math.floor(Math.random() * colors.length)]
  }

  // Handle form submission
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulate form submission
    setTimeout(() => {
      setIsSubmitting(false)
      toast({
        title: "Story submitted!",
        description: "Thank you for sharing your rejection story. It will be reviewed and published soon.",
      })

      // Reset form
      const form = e.target as HTMLFormElement
      form.reset()
    }, 1500)
  }

  // Filter stories based on active tab and search query
  const filteredStories = stories.filter((story) => {
    const matchesCategory = activeTab === "all" || story.category.toLowerCase() === activeTab.toLowerCase()
    const matchesSearch =
      searchQuery === "" ||
      story.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.person.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.rejection.toLowerCase().includes(searchQuery.toLowerCase()) ||
      story.success.toLowerCase().includes(searchQuery.toLowerCase())

    return matchesCategory && matchesSearch
  })

  // Toggle theme
  const toggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light"
    setTheme(newTheme)
    document.documentElement.classList.toggle("dark")
  }

  // Scroll to section
  const scrollToSection = (id: string) => {
    const element = document.getElementById(id)
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
    setMobileMenuOpen(false)
  }

  // Initialize theme on component mount
  useEffect(() => {
    // Check if user prefers dark mode
    if (window.matchMedia && window.matchMedia("(prefers-color-scheme: dark)").matches) {
      setTheme("dark")
      document.documentElement.classList.add("dark")
    }

    // Fix for iOS viewport height issues
    const setVh = () => {
      const vh = window.innerHeight * 0.01
      document.documentElement.style.setProperty("--vh", `${vh}px`)
    }

    setVh()
    window.addEventListener("resize", setVh)

    return () => {
      window.removeEventListener("resize", setVh)
    }
  }, [])

  return (
    <div className="flex min-h-screen flex-col">
      {/* Confetti container */}
      <div id="confetti-container" className="fixed inset-0 pointer-events-none z-50"></div>

      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
        <div className="container flex h-16 items-center justify-between">
          <div className="flex items-center gap-2 font-bold text-xl">
            <Trophy className="h-6 w-6 logo-icon" />
            <span className="font-poppins logo-text">Rejection Hall of Fame</span>
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
              href="#submit"
              onClick={() => scrollToSection("submit")}
              className="text-foreground hover:text-secondary transition-colors nav-link font-medium"
            >
              Submit
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

            {/* Submit button (desktop) */}
            <div className="hidden md:block">
              <Button
                onClick={() => scrollToSection("submit")}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
              >
                Share Your Story
              </Button>
            </div>

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
          <div className="md:hidden bg-background border-b">
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
                href="#submit"
                onClick={() => scrollToSection("submit")}
                className="text-foreground hover:text-secondary transition-colors py-2 font-medium"
              >
                Submit
              </Link>
              <Link
                href="#about"
                onClick={() => scrollToSection("about")}
                className="text-foreground hover:text-secondary transition-colors py-2 font-medium"
              >
                About
              </Link>
              <Button
                onClick={() => scrollToSection("submit")}
                className="bg-secondary hover:bg-secondary/90 text-secondary-foreground w-full mt-2"
              >
                Share Your Story
              </Button>
            </nav>
          </div>
        )}
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
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
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none font-poppins mobile-full">
                  <span className="text-secondary">Rejection</span> Hall of Fame
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Celebrating the rejections that preceded greatness. A collection of stories from people who faced
                  rejection but went on to accomplish awesome things.
                </p>
                <div className="flex flex-col sm:flex-row gap-2 mobile-stack mobile-full">
                  <Button
                    size="lg"
                    onClick={() => scrollToSection("stories")}
                    className="inline-flex gap-1 bg-secondary hover:bg-secondary/90 text-secondary-foreground mobile-full"
                  >
                    Explore Stories <ArrowRight className="h-4 w-4" />
                  </Button>
                  <Button
                    size="lg"
                    variant="outline"
                    onClick={() => scrollToSection("submit")}
                    className="border-secondary text-secondary hover:bg-secondary/10 mobile-full"
                  >
                    Submit Your Story
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
                    src="/images/rejection-banner.png"
                    alt="Rejection Hall of Fame"
                    fill
                    className="object-cover"
                    priority
                    sizes="(max-width: 768px) 100vw, 50vw"
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
                  <Star className="h-3.5 w-3.5 mr-1" />
                  Featured Stories
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-poppins">
                  From <span className="text-secondary">Rejection</span> to <span className="text-accent">Success</span>
                </h2>
                <p className="max-w-[900px] text-muted-foreground md:text-xl/relaxed lg:text-base/relaxed xl:text-xl/relaxed">
                  These stories live in dark corners, but they deserve the spotlight. Get inspired by those who turned
                  rejection into motivation.
                </p>
              </div>
            </div>

            {/* Search and filter */}
            <div className="mt-8 mb-6 flex flex-col md:flex-row gap-4 items-center justify-between">
              <div className="relative w-full md:w-auto flex-1 max-w-sm">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input
                  placeholder="Search stories..."
                  className="pl-10 pr-4"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                />
              </div>

              <Tabs defaultValue="all" className="w-full md:w-auto" onValueChange={setActiveTab}>
                <TabsList className="grid grid-cols-2 md:grid-cols-4 w-full md:w-auto">
                  <TabsTrigger value="all">All</TabsTrigger>
                  <TabsTrigger value="business">Business</TabsTrigger>
                  <TabsTrigger value="arts">Arts</TabsTrigger>
                  <TabsTrigger value="career">Career</TabsTrigger>
                </TabsList>
              </Tabs>
            </div>

            {/* Stories grid */}
            <div className="mx-auto grid max-w-7xl grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mt-8">
              {filteredStories.length > 0 ? (
                filteredStories.map((story) => (
                  <Card
                    key={story.id}
                    className="flex flex-col h-full card-hover border-t-4"
                    style={{ borderTopColor: "hsl(var(--secondary))" }}
                  >
                    <CardHeader>
                      <div className="flex items-center gap-2 mb-2">
                        <Badge variant="outline" className="bg-primary/10 text-primary-foreground border-primary/20">
                          {story.category}
                        </Badge>
                        <TooltipProvider>
                          <Tooltip>
                            <TooltipTrigger asChild>
                              <button
                                className={`flex items-center text-sm gap-1 ml-auto like-button ${story.liked ? "text-secondary" : "text-muted-foreground"}`}
                                onClick={() => handleLike(story.id)}
                                aria-label={story.liked ? "Unlike" : "Like"}
                              >
                                <Heart className={`h-4 w-4 ${story.liked ? "fill-current" : ""}`} />
                                <span>{story.likes}</span>
                              </button>
                            </TooltipTrigger>
                            <TooltipContent>
                              <p>{story.liked ? "Unlike this story" : "Like this story"}</p>
                            </TooltipContent>
                          </TooltipProvider>
                      </div>
                      <CardTitle className="font-poppins">{story.title}</CardTitle>
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
                                <div className="w-full md:w-1/3 aspect-square relative rounded-lg overflow-hidden shadow-md">
                                  <Image 
                                    src={story.personImage || "/placeholder.svg"} 
                                    alt={story.person}
                                    fill
                                    className="object-cover"
                                    sizes="(max-width: 768px) 100vw, 200px"
                                  />
                                </div>
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
                              <Button variant="outline" className="gap-2">
                                <Share2 className="h-4 w-4" /> Share Story
                              </Button>
                            </DialogFooter>
                          </DialogContent>
                        </Dialog>

                        <Badge variant="outline" className="text-muted-foreground">
                          {new Date(story.date).toLocaleDateString()}
                        </Badge>
                      </div>
                    </CardFooter>
                  </Card>
                ))
              ) : (
                <div className="col-span-full flex flex-col items-center justify-center py-12 text-center">
                  <div className="rounded-full bg-muted p-4 mb-4">
                    <Search className="h-6 w-6 text-muted-foreground" />
                  </div>
                  <h3 className="text-xl font-medium mb-2">No stories found</h3>
                  <p className="text-muted-foreground max-w-md">
                    We couldn't find any stories matching your search criteria. Try adjusting your filters or search
                    query.
                  </p>
                  <Button
                    variant="outline"
                    className="mt-4"
                    onClick={() => {
                      setSearchQuery("")
                      setActiveTab("all")
                    }}
                  >
                    Clear filters
                  </Button>
                </div>
              )}
            </div>

            {filteredStories.length > 0 && (
              <div className="flex justify-center mt-10">
                <Button
                  variant="outline"  size="lg" 
                  className="border-secondary text-secondary hover:bg-secondary/10"
                  disabled={loadingMore}
                  onClick={() => {
                    setLoadingMore(true);
                    setTimeout(() => {
                      // Simulate loading more stories
                      setLoadingMore(false);
                      toast({
                        title: "More stories loaded!",
                        description: "Keep scrolling to discover more inspiring stories.",
                      });
                    }, 1500);
                  }}
                >
                  {loadingMore ? (
                    <>
                      <svg className="animate-spin -ml-1 mr-2 h-5 w-5 text-secondary" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Loading More...
                    </>
                  ) : (
                    "Load More Stories"
                  )}
                </Button>
              </div>
            )}
          </div>
        </section>

        {/* Submit Section */}
        <section
          id="submit"
          className="w-full py-12 md:py-24 lg:py-32 bg-gradient-to-b from-primary/10 to-background"
          ref={formRef}
        >
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className={`space-y-4 ${formInView ? "scroll-animation visible" : "scroll-animation"}`}>
                <Badge className="px-3 py-1 text-sm bg-secondary text-secondary-foreground">
                  <Send className="h-3.5 w-3.5 mr-1" />
                  Share Your Journey
                </Badge>
                <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-poppins">
                  Share Your <span className="text-secondary">Rejection</span> Story
                </h2>
                <p className="text-muted-foreground md:text-xl">
                  Your story could inspire countless others facing similar challenges. Help us build a community of
                  resilient risk-takers.
                </p>

                <Accordion type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger>Why share your story?</AccordionTrigger>
                    <AccordionContent>
                      <ul className="space-y-2">
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-secondary"></div>
                          <span>Celebrate your journey from rejection to success</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-secondary"></div>
                          <span>Inspire others who are facing similar challenges</span>
                        </li>
                        <li className="flex items-center gap-2">
                          <div className="h-2 w-2 rounded-full bg-secondary"></div>
                          <span>Join a community that values resilience and perseverance</span>
                        </li>
                      </ul>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-2">
                    <AccordionTrigger>What happens after submission?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        After you submit your story, our team will review it to ensure it meets our community
                        guidelines. Once approved, your story will be published on the Rejection Hall of Fame website,
                        where it can inspire others facing similar challenges.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                  <AccordionItem value="item-3">
                    <AccordionTrigger>Privacy concerns?</AccordionTrigger>
                    <AccordionContent>
                      <p>
                        We respect your privacy. You can choose to remain anonymous when sharing your story. We will
                        never share your personal information without your explicit consent.
                      </p>
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>
              </div>

              <div
                className={`rounded-xl overflow-hidden border bg-background p-6 shadow-lg form-container ${formInView ? "scroll-animation visible" : "scroll-animation"} mobile-p-4`}
                style={{ transitionDelay: "200ms" }}
              >
                <form className="space-y-4" onSubmit={handleSubmit}>
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <label
                        htmlFor="name"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Your Name
                      </label>
                      <Input id="name" placeholder="John Doe" required />
                    </div>
                    <div className="space-y-2">
                      <label
                        htmlFor="email"
                        className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                      >
                        Email
                      </label>
                      <Input id="email" type="email" placeholder="you@example.com" required />
                    </div>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="title"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Story Title
                    </label>
                    <Input id="title" placeholder="My Journey from Rejection to Success" required />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="category"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Category
                    </label>
                    <Select required>
                      <SelectTrigger>
                        <SelectValue placeholder="Select a category" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="business">Business</SelectItem>
                        <SelectItem value="arts">Arts</SelectItem>
                        <SelectItem value="career">Career</SelectItem>
                        <SelectItem value="education">Education</SelectItem>
                        <SelectItem value="relationships">Relationships</SelectItem>
                        <SelectItem value="other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="rejection"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      The Rejection
                    </label>
                    <Textarea
                      id="rejection"
                      placeholder="Describe the rejection you faced..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="success"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      The Success
                    </label>
                    <Textarea
                      id="success"
                      placeholder="Describe what you accomplished after the rejection..."
                      className="min-h-[100px]"
                      required
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="lessons"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Lessons Learned
                    </label>
                    <Textarea
                      id="lessons"
                      placeholder="What did you learn from this experience?"
                      className="min-h-[100px]"
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="anonymous"
                      className="h-4 w-4 rounded border-gray-300 text-secondary focus:ring-secondary"
                    />
                    <label
                      htmlFor="anonymous"
                      className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    >
                      Submit anonymously
                    </label>
                  </div>

                  <div className="flex justify-end">
                    <Button
                      type="submit"
                      className="bg-secondary hover:bg-secondary/90 text-secondary-foreground"
                      disabled={isSubmitting}
                    >
                      {isSubmitting ? (
                        <>
                          <svg
                            className="animate-spin -ml-1 mr-2 h-4 w-4 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                          >
                            <circle
                              className="opacity-25"
                              cx="12"
                              cy="12"
                              r="10"
                              stroke="currentColor"
                              strokeWidth="4"
                            ></circle>
                            <path
                              className="opacity-75"
                              fill="currentColor"
                              d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                            ></path>
                          </svg>
                          Submitting...
                        </>
                      ) : (
                        "Submit Story"
                      )}
                    </Button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="w-full py-12 md:py-24 lg:py-32" ref={aboutRef}>
          <div className="container px-4 md:px-6">
            <div
              className={`mx-auto max-w-3xl space-y-4 text-center ${aboutInView ? "scroll-animation visible" : "scroll-animation"}`}
            >
              <Badge className="px-3 py-1 text-sm bg-highlight text-highlight-foreground mx-auto">
                <BookOpen className="h-3.5 w-3.5 mr-1" />
                Our Mission
              </Badge>
              <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl font-poppins">
                Why We Created This
              </h2>
              <p className="text-muted-foreground md:text-xl">
                These stories live in dark corners and we need a little positive inspiration for all the risk-takers
                taking the L's day-to-day.
              </p>
              <p className="text-muted-foreground md:text-xl">
                The Rejection Hall of Fame celebrates the courage it takes to put yourself out there, face rejection,
                and keep moving forward. Every success story starts with a series of setbacks.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mt-12 text-left">
                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="rounded-full bg-secondary/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Heart className="h-6 w-6 text-secondary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Community</h3>
                  <p className="text-muted-foreground">
                    Building a supportive community where people can share their stories and find inspiration.
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="rounded-full bg-primary/20 w-12 h-12 flex items-center justify-center mb-4">
                    <Sparkles className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Inspiration</h3>
                  <p className="text-muted-foreground">
                    Providing inspiration for those facing rejection and helping them see the potential for future
                    success.
                  </p>
                </div>

                <div className="bg-muted/50 p-6 rounded-lg">
                  <div className="rounded-full bg-accent/20 w-12 h-12 flex items-center justify-center mb-4">
                    <TrendingUp className="h-6 w-6 text-accent" />
                  </div>
                  <h3 className="text-lg font-medium mb-2">Growth</h3>
                  <p className="text-muted-foreground">
                    Encouraging personal and professional growth through resilience and perseverance in the face of
                    rejection.
                  </p>
                </div>
              </div>

              <div className="mx-auto max-w-md mt-8">
                <Button className="mt-4 bg-secondary hover:bg-secondary/90 text-secondary-foreground" size="lg">
                  Learn More About Our Mission
                </Button>
              </div>
            </div>
          </div>
        </section>
      </main>

      <footer
  className =
    "w-full border-t py-6 md:py-0 bg-muted/30" >
    (
      <div className="container flex flex-col md:flex-row items-center justify-between gap-4 md:h-24">
        <div className="flex items-center gap-2 font-medium mobile-center">
          <Trophy className="h-5 w-5 logo-icon" />
          <span className="logo-text">Rejection Hall of Fame</span>
          <span className="text-sm text-muted-foreground hidden md:inline">
            © {new Date().getFullYear()} All rights reserved.
          </span>
        </div>
        <nav className="flex gap-4 sm:gap-6 mobile-center mobile-gap-2">
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Terms
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Privacy
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            Contact
          </Link>
          <Link href="#" className="text-sm text-muted-foreground hover:underline underline-offset-4">
            FAQ
          </Link>
        </nav>
        <div className="text-sm text-muted-foreground md:hidden text-center mobile-mt-4">
          © {new Date().getFullYear()} All rights reserved.
        </div>
      </div>
    )
  </footer>
    </div>
  )
}

