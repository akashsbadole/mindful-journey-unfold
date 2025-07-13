
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Calendar, Clock, Target, Flame, Award, BookOpen, Smile, Frown } from "lucide-react";

export const ProgressTracker = () => {
  const [journalEntry, setJournalEntry] = useState("");
  const [mood, setMood] = useState<"happy" | "neutral" | "sad" | null>(null);

  // Mock data - in a real app, this would come from a database
  const stats = {
    currentStreak: 7,
    totalMinutes: 1230,
    totalSessions: 45,
    longestStreak: 12,
    favoriteCategory: "Sleep",
    averageSession: 27
  };

  const recentSessions = [
    { date: "Today", duration: 15, type: "Morning Calm", category: "Focus" },
    { date: "Yesterday", duration: 20, type: "Deep Sleep", category: "Sleep" },
    { date: "2 days ago", duration: 10, type: "Anxiety Relief", category: "Anxiety" },
    { date: "3 days ago", duration: 25, type: "Body Scan", category: "Mindfulness" },
    { date: "4 days ago", duration: 15, type: "Breathing Exercise", category: "Stress Relief" }
  ];

  const achievements = [
    { name: "First Steps", description: "Complete your first meditation", unlocked: true },
    { name: "Week Warrior", description: "7-day meditation streak", unlocked: true },
    { name: "Mindful Month", description: "30-day meditation streak", unlocked: false },
    { name: "Hour Master", description: "60+ minutes in a day", unlocked: true },
    { name: "Category Explorer", description: "Try all meditation categories", unlocked: false },
    { name: "Early Bird", description: "5 morning sessions", unlocked: true }
  ];

  const goals = [
    { name: "Daily Practice", target: 7, current: 7, unit: "days" },
    { name: "Weekly Minutes", target: 150, current: 95, unit: "minutes" },
    { name: "Monthly Sessions", target: 20, current: 12, unit: "sessions" }
  ];

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Your Progress</h2>
        <p className="text-gray-600">Track your meditation journey and celebrate achievements</p>
      </div>

      {/* Stats Overview */}
      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
        <Card className="text-center">
          <CardContent className="p-4">
            <Flame className="w-8 h-8 text-orange-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-orange-600">{stats.currentStreak}</div>
            <div className="text-xs text-gray-600">Day Streak</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Clock className="w-8 h-8 text-blue-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-blue-600">{stats.totalMinutes}</div>
            <div className="text-xs text-gray-600">Total Minutes</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Target className="w-8 h-8 text-green-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-green-600">{stats.totalSessions}</div>
            <div className="text-xs text-gray-600">Sessions</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Award className="w-8 h-8 text-purple-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-purple-600">{stats.longestStreak}</div>
            <div className="text-xs text-gray-600">Best Streak</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <BookOpen className="w-8 h-8 text-indigo-500 mx-auto mb-2" />
            <div className="text-sm font-bold text-indigo-600">{stats.favoriteCategory}</div>
            <div className="text-xs text-gray-600">Favorite</div>
          </CardContent>
        </Card>
        
        <Card className="text-center">
          <CardContent className="p-4">
            <Calendar className="w-8 h-8 text-teal-500 mx-auto mb-2" />
            <div className="text-2xl font-bold text-teal-600">{stats.averageSession}</div>
            <div className="text-xs text-gray-600">Avg Minutes</div>
          </CardContent>
        </Card>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Recent Sessions */}
        <Card>
          <CardHeader>
            <CardTitle>Recent Sessions</CardTitle>
            <CardDescription>Your latest meditation practices</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {recentSessions.map((session, index) => (
                <div key={index} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
                  <div>
                    <div className="font-medium">{session.type}</div>
                    <div className="text-sm text-gray-600">{session.date}</div>
                  </div>
                  <div className="text-right">
                    <Badge variant="outline">{session.category}</Badge>
                    <div className="text-sm text-gray-600 mt-1">{session.duration} min</div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>

        {/* Goals */}
        <Card>
          <CardHeader>
            <CardTitle>Goals</CardTitle>
            <CardDescription>Track your meditation goals</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              {goals.map((goal, index) => (
                <div key={index} className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="font-medium">{goal.name}</span>
                    <span className="text-gray-600">{goal.current}/{goal.target} {goal.unit}</span>
                  </div>
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className="bg-blue-500 h-2 rounded-full transition-all"
                      style={{ width: `${Math.min((goal.current / goal.target) * 100, 100)}%` }}
                    ></div>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Achievements */}
      <Card>
        <CardHeader>
          <CardTitle>Achievements</CardTitle>
          <CardDescription>Unlock badges as you progress in your meditation journey</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
            {achievements.map((achievement, index) => (
              <div 
                key={index} 
                className={`p-4 rounded-lg border-2 text-center ${
                  achievement.unlocked 
                    ? 'border-green-200 bg-green-50' 
                    : 'border-gray-200 bg-gray-50 opacity-60'
                }`}
              >
                <Award className={`w-8 h-8 mx-auto mb-2 ${
                  achievement.unlocked ? 'text-green-500' : 'text-gray-400'
                }`} />
                <div className="font-medium text-sm">{achievement.name}</div>
                <div className="text-xs text-gray-600 mt-1">{achievement.description}</div>
                {achievement.unlocked && (
                  <Badge variant="default" className="mt-2 bg-green-500">Unlocked</Badge>
                )}
              </div>
            ))}
          </div>
        </CardContent>
      </Card>

      {/* Meditation Journal */}
      <div className="grid md:grid-cols-2 gap-6">
        <Card>
          <CardHeader>
            <CardTitle>Today's Reflection</CardTitle>
            <CardDescription>How are you feeling after your practice?</CardDescription>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="space-y-2">
              <label className="text-sm font-medium">Mood after meditation:</label>
              <div className="flex space-x-4">
                <Button
                  variant={mood === "happy" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood("happy")}
                  className="flex items-center"
                >
                  <Smile className="w-4 h-4 mr-2" />
                  Happy
                </Button>
                <Button
                  variant={mood === "neutral" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood("neutral")}
                  className="flex items-center"
                >
                  😐 Neutral
                </Button>
                <Button
                  variant={mood === "sad" ? "default" : "outline"}
                  size="sm"
                  onClick={() => setMood("sad")}
                  className="flex items-center"
                >
                  <Frown className="w-4 h-4 mr-2" />
                  Stressed
                </Button>
              </div>
            </div>
            
            <div className="space-y-2">
              <label className="text-sm font-medium">Reflection notes:</label>
              <Textarea
                placeholder="How did today's meditation feel? What did you notice?"
                value={journalEntry}
                onChange={(e) => setJournalEntry(e.target.value)}
                rows={4}
              />
            </div>
            
            <Button className="w-full">Save Entry</Button>
          </CardContent>
        </Card>

        <Card>
          <CardHeader>
            <CardTitle>Weekly Insights</CardTitle>
            <CardDescription>Your meditation patterns this week</CardDescription>
          </CardHeader>
          <CardContent>
            <div className="space-y-4">
              <div className="text-center p-6 bg-blue-50 rounded-lg">
                <div className="text-3xl font-bold text-blue-600 mb-2">85%</div>
                <div className="text-sm text-gray-600">Consistency Score</div>
                <div className="text-xs text-gray-500 mt-1">You meditated 6 out of 7 days</div>
              </div>
              
              <div className="grid grid-cols-2 gap-4 text-center">
                <div className="p-3 bg-green-50 rounded-lg">
                  <div className="text-lg font-bold text-green-600">Morning</div>
                  <div className="text-xs text-gray-600">Most active time</div>
                </div>
                <div className="p-3 bg-purple-50 rounded-lg">
                  <div className="text-lg font-bold text-purple-600">Sleep</div>
                  <div className="text-xs text-gray-600">Favorite category</div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
