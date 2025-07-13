
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

const Index = () => {
  const [activeTab, setActiveTab] = useState("meditations");

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
      duration: "10 min",
      category: "Focus",
      description: "Start your day with clarity and intention",
      narrator: "Sarah Chen"
    },
    {
      title: "Deep Sleep Journey",
      duration: "20 min",
      category: "Sleep",
      description: "Gentle guidance into peaceful rest",
      narrator: "Michael Rivers"
    },
    {
      title: "Anxiety Release",
      duration: "15 min",
      category: "Anxiety",
      description: "Find calm amidst life's storms",
      narrator: "Emma Grace"
    }
  ];

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-50 via-blue-50 to-indigo-50">
      {/* Header */}
      <header className="border-b bg-white/80 backdrop-blur-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <h1 className="text-2xl font-bold bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
              MindfulSpace
            </h1>
            <div className="flex items-center space-x-4">
              <Badge variant="secondary" className="bg-green-100 text-green-700">
                7 day streak 🔥
              </Badge>
              <Button variant="outline" size="sm">Sign In</Button>
            </div>
          </div>
        </div>
      </header>

      <div className="container mx-auto px-4 py-8">
        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <TabsList className="grid w-full grid-cols-5 mb-8">
            <TabsTrigger value="meditations" className="flex items-center gap-2">
              <Play className="w-4 h-4" />
              Meditations
            </TabsTrigger>
            <TabsTrigger value="timer" className="flex items-center gap-2">
              <Timer className="w-4 h-4" />
              Timer
            </TabsTrigger>
            <TabsTrigger value="breathing" className="flex items-center gap-2">
              <Heart className="w-4 h-4" />
              Breathing
            </TabsTrigger>
            <TabsTrigger value="progress" className="flex items-center gap-2">
              <TrendingUp className="w-4 h-4" />
              Progress
            </TabsTrigger>
            <TabsTrigger value="podcast" className="flex items-center gap-2">
              <Radio className="w-4 h-4" />
              Podcast
            </TabsTrigger>
          </TabsList>

          <TabsContent value="meditations" className="space-y-8">
            {/* Hero Section */}
            <div className="text-center space-y-4 py-12">
              <h2 className="text-4xl font-bold text-gray-900">
                Find Your Inner Peace
              </h2>
              <p className="text-xl text-gray-600 max-w-2xl mx-auto">
                Discover guided meditations, breathing exercises, and mindfulness practices 
                designed to reduce stress and enhance well-being.
              </p>
            </div>

            {/* Categories */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Meditation Categories</h3>
              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
                {meditationCategories.map((category) => {
                  const IconComponent = category.icon;
                  return (
                    <Card key={category.name} className="hover:shadow-lg transition-shadow cursor-pointer">
                      <CardContent className="p-6 text-center">
                        <div className={`w-12 h-12 rounded-full ${category.color} flex items-center justify-center mx-auto mb-3`}>
                          <IconComponent className="w-6 h-6" />
                        </div>
                        <h4 className="font-semibold text-gray-900">{category.name}</h4>
                        <p className="text-sm text-gray-600">{category.sessions} sessions</p>
                      </CardContent>
                    </Card>
                  );
                })}
              </div>
            </div>

            {/* Featured Sessions */}
            <div className="space-y-4">
              <h3 className="text-2xl font-semibold text-gray-900">Featured Sessions</h3>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {featuredSessions.map((session, index) => (
                  <Card key={index} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <div className="flex justify-between items-start">
                        <div>
                          <CardTitle className="text-lg">{session.title}</CardTitle>
                          <CardDescription>{session.description}</CardDescription>
                        </div>
                        <Badge variant="outline">{session.category}</Badge>
                      </div>
                    </CardHeader>
                    <CardContent>
                      <div className="flex items-center justify-between">
                        <div className="text-sm text-gray-600">
                          <p>{session.duration} • {session.narrator}</p>
                        </div>
                        <Button size="sm" className="bg-gradient-to-r from-blue-500 to-indigo-500">
                          <Play className="w-4 h-4 mr-2" />
                          Play
                        </Button>
                      </div>
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
    </div>
  );
};

export default Index;
