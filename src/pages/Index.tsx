import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Badge } from "@/components/ui/badge";
import { Play, Timer, Headphones, Radio, TrendingUp, Heart, Brain, Moon, Focus, Zap } from "lucide-react";
import { MeditationTimer } from "@/components/MeditationTimer";
import { BreathingExercise } from "@/components/BreathingExercise";
import { ProgressTracker } from "@/components/ProgressTracker";
import { PodcastRadio } from "@/components/PodcastRadio";
import { AudioPlayer } from "@/components/AudioPlayer";
import { MeditationCategory } from "@/components/MeditationCategory";
import { Footer } from "@/components/Footer";
import { useAppStore } from "@/store/useAppStore";

const Index = () => {
  const [activeTab, setActiveTab] = useState("meditations");
  const { selectedCategory, setSelectedCategory, userProgress } = useAppStore();

  const meditationCategories = [
    { name: "Stress Relief", icon: Heart, color: "bg-rose-100 text-rose-700", sessions: 25 },
    { name: "Anxiety", icon: Brain, color: "bg-blue-100 text-blue-700", sessions: 18 },
    { name: "Sleep", icon: Moon, color: "bg-indigo-100 text-indigo-700", sessions: 30 },
    { name: "Focus", icon: Focus, color: "bg-green-100 text-green-700", sessions: 22 },
    { name: "Confidence", icon: Zap, color: "bg-orange-100 text-orange-700", sessions: 15 },
  ];

  const featuredSessions = [
    {
      title: "Morning Calm",
      duration: "10:00",
      category: "Focus",
      description: "Start your day with clarity and intention",
      narrator: "Sarah Chen"
    },
    {
      title: "Deep Sleep Journey",
      duration: "20:15",
      category: "Sleep",
      description: "Gentle guidance into peaceful rest",
      narrator: "Michael Rivers"
    },
    {
      title: "Anxiety Release",
      duration: "15:30",
      category: "Anxiety",
      description: "Find calm amidst life's storms",
      narrator: "Emma Grace"
    },
    {
      title: "Confidence Boost",
      duration: "12:45",
      category: "Confidence",
      description: "Build inner strength and self-belief",
      narrator: "James Wilson"
    },
    {
      title: "Stress Relief",
      duration: "18:20",
      category: "Stress Relief",
      description: "Release tension and find peace",
      narrator: "Lisa Park"
    },
    {
      title: "Body Scan Relaxation",
      duration: "25:00",
      category: "Mindfulness",
      description: "Progressive muscle relaxation",
      narrator: "David Chen"
    }
  ];

  const handleCategoryClick = (categoryName: string) => {
    setSelectedCategory(categoryName);
  };

  if (selectedCategory) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
        {/* Header */}
        <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
          <div className="container mx-auto px-4 py-4">
            <div className="flex items-center justify-between">
              <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                MindfulSpace
              </h1>
              <div className="flex items-center space-x-2 sm:space-x-4">
                <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs sm:text-sm">
                  {userProgress.currentStreak} day streak 🔥
                </Badge>
                <Button variant="outline" size="sm" className="text-xs sm:text-sm">Sign In</Button>
              </div>
            </div>
          </div>
        </header>

        <div className="container mx-auto px-4 py-6 sm:py-8">
          <MeditationCategory 
            category={selectedCategory} 
            onBack={() => setSelectedCategory(null)} 
          />
        </div>

        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MindfulSpace
            </h1>
            <div className="flex items-center space-x-2 sm:space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700 text-xs sm:text-sm">
                {userProgress.currentStreak} day streak 🔥
              </Badge>
              <Button variant="outline" size="sm" className="text-xs sm:text-sm">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-6 sm:py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-6 sm:mb-8 h-auto">
            <TabsTrigger value="meditations" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Play className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Meditations</span>
              <span className="sm:hidden">Med</span>
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Timer className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Timer</span>
              <span className="sm:hidden">Time</span>
            </TabsTrigger>
            <TabsTrigger value="breathing" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Heart className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Breathing</span>
              <span className="sm:hidden">Breath</span>
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <TrendingUp className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Progress</span>
              <span className="sm:hidden">Stats</span>
            </TabsTrigger>
            <TabsTrigger value="podcast" className="flex flex-col sm:flex-row items-center gap-1 sm:gap-2 p-2 sm:p-3 text-xs sm:text-sm">
              <Radio className="w-3 h-3 sm:w-4 sm:h-4" />
              <span className="hidden sm:inline">Podcast</span>
              <span className="sm:hidden">Radio</span>
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meditations" className="space-y-6 sm:space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-8 sm:py-12">
              <h2 className="text-2xl sm:text-4xl font-bold text-gray-900">
                Find Your Inner Peace
              </h2>
              <p className="text-lg sm:text-xl text-gray-600 max-w-2xl mx-auto px-4">
                Discover guided meditations, breathing exercises, and mindfulness practices 
                designed to reduce stress and enhance well-being.
              </p>
              <div className="flex justify-center gap-4 text-sm text-gray-500">
                <span>{userProgress.totalSessions} sessions completed</span>
                <span>•</span>
                <span>{userProgress.totalMinutes} minutes practiced</span>
              </div>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 px-2">Meditation Categories</h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-5 gap-3 sm:gap-4">
                {meditationCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card 
                      key={category.name} 
                      className="hover:shadow-lg transition-all cursor-pointer hover:scale-105 active:scale-95"
                      onClick={() => handleCategoryClick(category.name)}
                    >
                      <CardContent className="p-4 sm:p-6 text-center">
                        <div className={`w-10 h-10 sm:w-12 sm:h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-2 sm:mb-3`}>
                          <IconComponent className="w-5 h-5 sm:w-6 sm:h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900 text-sm sm:text-base">{category.name}</h4>
                        <p className="text-xs sm:text-sm text-gray-600">{category.sessions} sessions</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Featured Sessions */}
            <div className="space-y-4">
              <h3 className="text-xl sm:text-2xl font-semibold text-gray-900 px-2">Featured Sessions</h3>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
                {featuredSessions.map((session, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader className="pb-3">
                      <div className="flex justify-between items-start">
                        <div className="flex-1">
                          <CardTitle className="text-base sm:text-lg">{session.title}</CardTitle>
                          <CardDescription className="text-sm">{session.description}</CardDescription>
                        </div>
                        <Badge variant="outline" className="text-xs">{session.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent className="space-y-4">
                      <div className="text-xs sm:text-sm text-gray-600">
                        <p>{session.duration} • {session.narrator}</p>
                      </div>
                      <AudioPlayer 
                        title={session.title}
                        duration={session.duration}
                        onPlay={() => console.log(`Playing ${session.title}`)}
                        onPause={() => console.log(`Paused ${session.title}`)}
                      />
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </TabsContent>

          <TabsContent value="timer">
            <MeditationTimer />
          </TabsContent>

          <TabsContent value="breathing">
            <BreathingExercise />
          </TabsContent>

          <TabsContent value="progress">
            <ProgressTracker />
          </TabsContent>

          <TabsContent value="podcast">
            <PodcastRadio />
          </TabsContent>
        </Tabs>
      </div>

      <Footer />
    </div>
  );
};

export default Index;
