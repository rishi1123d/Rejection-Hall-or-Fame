"use client";

import { useState } from "react";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Heart, Moon, Sun, Trophy, Menu, X } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { useMobile } from "@/hooks/use-mobile";

// Define story type
interface Story {
  id: number;
  title: string;
  person: string;
  category: string;
  rejection: string;
  success: string;
  likes: number;
  liked: boolean;
  date: string;
}

// Sample rejection stories data
const rejectionStories: Story[] = [
  {
    id: 1,
    title: "Rejected by 12 Publishers",
    person: "J.K. Rowling",
    category: "Arts",
    rejection: "Harry Potter was rejected by 12 different publishers before Bloomsbury finally took a chance.",
    success: "Became one of the best-selling book series in history with over 500 million copies sold worldwide.",
    likes: 2453,
    liked: false,
    date: "2023-05-15",
  },
  {
    id: 2,
    title: "Too Ordinary to Succeed",
    person: "Walt Disney",
    category: "Business",
    rejection: "Fired from a newspaper for 'lacking imagination' and 'having no original ideas'.",
    success: "Founded Disney, now one of the world's largest entertainment companies valued at over $200 billion.",
    likes: 1872,
    liked: false,
    date: "2023-06-22",
  }
];

export default function Home() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [stories, setStories] = useState<Story[]>(rejectionStories);
  const [theme, setTheme] = useState("light");
  const { toast } = useToast();
  const isMobile = useMobile();
  
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
  };

  return (
    <div className="flex min-h-screen flex-col">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b bg-background/95 backdrop-blur">
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
      </header>

      <main className="flex-1">
        {/* Hero Section */}
        <section id="home" className="w-full py-12 md:py-24 lg:py-32 bg-primary/10">
          <div className="container px-4 md:px-6">
            <div className="grid gap-6 lg:grid-cols-2 lg:gap-12 items-center">
              <div className="space-y-4">
                <h1 className="text-4xl font-bold tracking-tighter sm:text-5xl xl:text-6xl/none">
                  <span className="text-secondary">Rejection</span> Hall of Fame
                </h1>
                <p className="max-w-[600px] text-muted-foreground md:text-xl">
                  Celebrating the rejections that preceded greatness. A collection of stories from people who faced
                  rejection but went on to accomplish awesome things.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Stories Section */}
        <section id="stories" className="w-full py-12 md:py-24 lg:py-32">
          <div className="container px-4 md:px-6">
            <h2 className="text-3xl font-bold mb-10 text-center">Inspiring Stories of Rejection</h2>
            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {stories.map((story) => (
                <Card key={story.id} className="h-full">
                  <CardHeader>
                    <CardTitle>{story.title}</CardTitle>
                    <CardDescription>{story.person}</CardDescription>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm">{story.rejection}</p>
                  </CardContent>
                  <CardFooter className="flex justify-between">
                    <p className="text-sm">{story.success}</p>
                    <button
                      onClick={() => handleLike(story.id)}
                      className="flex items-center gap-1 text-sm"
                    >
                      <Heart
                        className={story.liked ? "fill-rose-500 text-rose-500 h-4 w-4" : "h-4 w-4"}
                      />
                      <span>{story.likes}</span>
                    </button>
                  </CardFooter>
                </Card>
              ))}
            </div>
          </div>
        </section>
      </main>

      <footer className="w-full py-6 bg-muted">
        <div className="container px-4 md:px-6">
          <p className="text-center text-sm text-muted-foreground">
            © 2024 Rejection Hall of Fame. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
} 