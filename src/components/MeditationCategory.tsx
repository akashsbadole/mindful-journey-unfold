
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Video, Clock, Star, ArrowLeft } from "lucide-react";
import { AudioPlayer } from "./AudioPlayer";
import { VideoPlayer } from "./VideoPlayer";
import { useAppStore } from "@/store/useAppStore";

interface MeditationCategoryProps {
  category: string;
  onBack: () => void;
}

export const MeditationCategory = ({ category, onBack }: MeditationCategoryProps) => {
  const [selectedSession, setSelectedSession] = useState<string | null>(null);
  const { addSession, setCurrentTrack } = useAppStore();

  const categoryData = {
    "Stress Relief": {
      color: "bg-rose-100 text-rose-700",
      sessions: [
        {
          id: "stress-1",
          title: "Quick Stress Relief",
          duration: "5:00",
          type: "audio" as const,
          description: "Fast relief for overwhelming moments",
          narrator: "Dr. Sarah Chen",
          difficulty: "Beginner"
        },
        {
          id: "stress-2",
          title: "Deep Stress Release",
          duration: "20:00",
          type: "video" as const,
          description: "Comprehensive stress relief with visual guidance",
          narrator: "Michael Rivers",
          difficulty: "Intermediate"
        },
        {
          id: "stress-3",
          title: "Workplace Calm",
          duration: "10:00",
          type: "audio" as const,
          description: "Perfect for office or work breaks",
          narrator: "Emma Grace",
          difficulty: "Beginner"
        }
      ]
    },
    "Anxiety": {
      color: "bg-blue-100 text-blue-700",
      sessions: [
        {
          id: "anxiety-1",
          title: "Anxiety Relief Breathing",
          duration: "8:00",
          type: "video" as const,
          description: "Visual breathing techniques for anxiety",
          narrator: "Dr. Lisa Park",
          difficulty: "Beginner"
        },
        {
          id: "anxiety-2",
          title: "Panic Attack Recovery",
          duration: "12:00",
          type: "audio" as const,
          description: "Guided recovery from panic episodes",
          narrator: "James Wilson",
          difficulty: "Advanced"
        }
      ]
    },
    "Sleep": {
      color: "bg-indigo-100 text-indigo-700",
      sessions: [
        {
          id: "sleep-1",
          title: "Deep Sleep Journey",
          duration: "45:00",
          type: "audio" as const,
          description: "Extended sleep meditation with nature sounds",
          narrator: "Emma Grace",
          difficulty: "Beginner"
        },
        {
          id: "sleep-2",
          title: "Sleep Stories - Forest Walk",
          duration: "30:00",
          type: "video" as const,
          description: "Calming visual journey through peaceful forests",
          narrator: "Michael Rivers",
          difficulty: "Beginner"
        }
      ]
    },
    "Focus": {
      color: "bg-green-100 text-green-700",
      sessions: [
        {
          id: "focus-1",
          title: "Morning Focus Boost",
          duration: "15:00",
          type: "video" as const,
          description: "Start your day with clear intention",
          narrator: "Dr. Sarah Chen",
          difficulty: "Intermediate"
        },
        {
          id: "focus-2",
          title: "Deep Work Preparation",
          duration: "10:00",
          type: "audio" as const,
          description: "Prepare your mind for concentrated work",
          narrator: "James Wilson",
          difficulty: "Beginner"
        }
      ]
    },
    "Confidence": {
      color: "bg-orange-100 text-orange-700",
      sessions: [
        {
          id: "confidence-1",
          title: "Inner Strength Building",
          duration: "18:00",
          type: "video" as const,
          description: "Build unshakeable self-confidence",
          narrator: "Dr. Lisa Park",
          difficulty: "Intermediate"
        },
        {
          id: "confidence-2",
          title: "Daily Affirmations",
          duration: "12:00",
          type: "audio" as const,
          description: "Positive affirmations for self-belief",
          narrator: "Emma Grace",
          difficulty: "Beginner"
        }
      ]
    }
  };

  const currentCategory = categoryData[category as keyof typeof categoryData];

  if (!currentCategory) {
    return (
      <div className="text-center py-12">
        <p className="text-gray-600">Category not found</p>
        <Button onClick={onBack} className="mt-4">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Categories
        </Button>
      </div>
    );
  }

  const handlePlaySession = (session: any) => {
    addSession({
      title: session.title,
      category,
      duration: parseInt(session.duration.split(':')[0]),
      type: session.type,
    });

    setCurrentTrack({
      id: session.id,
      title: session.title,
      type: session.type,
      isPlaying: true,
    });

    setSelectedSession(session.id);
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <Button variant="ghost" onClick={onBack} className="mb-4">
            <ArrowLeft className="w-4 h-4 mr-2" />
            Back to Categories
          </Button>
          <h2 className="text-3xl font-bold text-gray-900">{category} Meditations</h2>
          <p className="text-gray-600">Choose from our curated {category.toLowerCase()} sessions</p>
        </div>
        <Badge className={currentCategory.color} variant="secondary">
          {currentCategory.sessions.length} sessions
        </Badge>
      </div>

      <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
        {currentCategory.sessions.map((session) => (
          <Card key={session.id} className="hover:shadow-lg transition-shadow">
            <CardHeader>
              <div className="flex items-start justify-between">
                <div className="flex-1">
                  <CardTitle className="text-lg flex items-center gap-2">
                    {session.type === 'video' ? (
                      <Video className="w-5 h-5 text-purple-600" />
                    ) : (
                      <Play className="w-5 h-5 text-blue-600" />
                    )}
                    {session.title}
                  </CardTitle>
                  <CardDescription className="mt-2">{session.description}</CardDescription>
                </div>
              </div>
            </CardHeader>
            <CardContent className="space-y-4">
              <div className="flex items-center justify-between text-sm text-gray-600">
                <span className="flex items-center">
                  <Clock className="w-4 h-4 mr-1" />
                  {session.duration}
                </span>
                <Badge variant="outline">{session.difficulty}</Badge>
              </div>
              
              <div className="text-sm text-gray-600">
                <p>Narrator: {session.narrator}</p>
              </div>

              {session.type === 'video' ? (
                <VideoPlayer
                  title={session.title}
                  duration={session.duration}
                  onPlay={() => handlePlaySession(session)}
                  onPause={() => console.log(`Paused ${session.title}`)}
                />
              ) : (
                <AudioPlayer
                  title={session.title}
                  duration={session.duration}
                  onPlay={() => handlePlaySession(session)}
                  onPause={() => console.log(`Paused ${session.title}`)}
                />
              )}
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};
