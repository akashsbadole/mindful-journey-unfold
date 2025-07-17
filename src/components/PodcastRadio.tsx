
import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Play, Pause, SkipForward, SkipBack, Volume2, Radio, Headphones, Clock } from "lucide-react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { useAppStore } from "@/store/useAppStore";

export const PodcastRadio = () => {
  const { currentTrack, setCurrentTrack, togglePlayPause } = useAppStore();

  const podcasts = [
    {
      id: "podcast-1",
      title: "The Mindful Moment",
      host: "Dr. Sarah Chen",
      duration: "25 min",
      description: "Daily insights on mindfulness and meditation practice",
      episodes: 145,
      category: "Daily Practice"
    },
    {
      id: "podcast-2",
      title: "Meditation Science",
      host: "Prof. Michael Rivers",
      duration: "40 min", 
      description: "Research-backed meditation techniques and neuroscience",
      episodes: 87,
      category: "Education"
    },
    {
      id: "podcast-3",
      title: "Sleep Stories & Sounds",
      host: "Emma Grace",
      duration: "30 min",
      description: "Gentle stories and sounds for peaceful sleep",
      episodes: 203,
      category: "Sleep"
    },
    {
      id: "podcast-4",
      title: "Anxiety & Stress Relief",
      host: "Dr. James Wilson",
      duration: "20 min",
      description: "Practical techniques for managing anxiety and stress",
      episodes: 96,
      category: "Mental Health"
    }
  ];

  const radioStations = [
    {
      id: "radio-1",
      name: "Calm Radio",
      genre: "Ambient Meditation",
      description: "24/7 peaceful meditation music and nature sounds",
      listeners: "12.5K"
    },
    {
      id: "radio-2",
      name: "Mindful Beats",
      genre: "Binaural Beats",
      description: "Brainwave entrainment for focus and relaxation",
      listeners: "8.2K"
    },
    {
      id: "radio-3",
      name: "Nature Sounds FM",
      genre: "Nature Audio",
      description: "Rain, ocean, forest and wildlife sounds",
      listeners: "15.8K"
    },
    {
      id: "radio-4",
      name: "Zen Garden",
      genre: "Traditional",
      description: "Tibetan bowls, gongs, and traditional meditation music",
      listeners: "6.4K"
    },
    {
      id: "radio-5",
      name: "Deep Focus",
      genre: "Concentration",
      description: "Background music designed for deep work and study",
      listeners: "11.2K"
    }
  ];

  const recentEpisodes = [
    {
      id: "episode-1",
      title: "Morning Intention Setting",
      podcast: "The Mindful Moment",
      duration: "12 min",
      date: "Today",
      plays: "2.1K"
    },
    {
      id: "episode-2",
      title: "The Science of Gratitude",
      podcast: "Meditation Science", 
      duration: "35 min",
      date: "Yesterday",
      plays: "1.8K"
    },
    {
      id: "episode-3",
      title: "Forest Rain for Sleep",
      podcast: "Sleep Stories & Sounds",
      duration: "45 min",
      date: "2 days ago",
      plays: "3.2K"
    },
    {
      id: "episode-4",
      title: "Breathing Through Panic",
      podcast: "Anxiety & Stress Relief",
      duration: "18 min",
      date: "3 days ago",
      plays: "1.5K"
    }
  ];

  const handlePlay = (trackId: string, title: string, type: 'podcast' | 'radio') => {
    if (currentTrack?.id === trackId && currentTrack.isPlaying) {
      togglePlayPause();
    } else {
      setCurrentTrack({
        id: trackId,
        title,
        type,
        isPlaying: true,
      });
    }
  };

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Podcast & Radio</h2>
        <p className="text-gray-600">Listen to meditation podcasts and ambient radio stations</p>
      </div>

      <Tabs defaultValue="podcasts" className="w-full">
        <TabsList className="grid w-full grid-cols-3">
          <TabsTrigger value="podcasts" className="flex items-center gap-2">
            <Headphones className="w-4 h-4" />
            Podcasts
          </TabsTrigger>
          <TabsTrigger value="radio" className="flex items-center gap-2">
            <Radio className="w-4 h-4" />
            Radio Stations
          </TabsTrigger>
          <TabsTrigger value="recent" className="flex items-center gap-2">
            <Clock className="w-4 h-4" />
            Recent
          </TabsTrigger>
        </TabsList>

        <TabsContent value="podcasts" className="space-y-6">
          <div className="grid md:grid-cols-2 gap-6">
            {podcasts.map((podcast) => (
              <Card key={podcast.id} className="hover:shadow-lg transition-shadow">
                <CardHeader>
                  <div className="flex justify-between items-start">
                    <div className="flex-1">
                      <CardTitle className="text-lg">{podcast.title}</CardTitle>
                      <CardDescription>by {podcast.host}</CardDescription>
                    </div>
                    <Badge variant="outline">{podcast.category}</Badge>
                  </div>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-4">{podcast.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500">
                      {podcast.episodes} episodes • {podcast.duration} avg
                    </div>
                    <Button
                      size="sm"
                      onClick={() => handlePlay(podcast.id, podcast.title, 'podcast')}
                      className="bg-gradient-to-r from-purple-500 to-pink-500"
                    >
                      {currentTrack?.id === podcast.id && currentTrack.isPlaying ? (
                        <><Pause className="w-4 h-4 mr-2" />Pause</>
                      ) : (
                        <><Play className="w-4 h-4 mr-2" />Play</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="radio" className="space-y-6">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {radioStations.map((station) => (
              <Card key={station.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-base flex items-center">
                    <Radio className="w-5 h-5 mr-2 text-red-500" />
                    {station.name}
                  </CardTitle>
                  <CardDescription>{station.genre}</CardDescription>
                </CardHeader>
                <CardContent>
                  <p className="text-sm text-gray-600 mb-3">{station.description}</p>
                  <div className="flex items-center justify-between">
                    <div className="text-xs text-gray-500 flex items-center">
                      <span className="w-2 h-2 bg-green-500 rounded-full mr-1"></span>
                      {station.listeners} listening
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      onClick={() => handlePlay(station.id, station.name, 'radio')}
                    >
                      {currentTrack?.id === station.id && currentTrack.isPlaying ? (
                        <><Pause className="w-4 h-4 mr-2" />Stop</>
                      ) : (
                        <><Play className="w-4 h-4 mr-2" />Listen</>
                      )}
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="recent" className="space-y-6">
          <Card>
            <CardHeader>
              <CardTitle>Recent Episodes</CardTitle>
              <CardDescription>Latest episodes from your favorite podcasts</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="space-y-4">
                {recentEpisodes.map((episode) => (
                  <div key={episode.id} className="flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50">
                    <div className="flex-1">
                      <h4 className="font-medium">{episode.title}</h4>
                      <p className="text-sm text-gray-600">{episode.podcast}</p>
                      <p className="text-xs text-gray-500">{episode.date} • {episode.duration} • {episode.plays} plays</p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <Button size="sm" variant="ghost">
                        <SkipBack className="w-4 h-4" />
                      </Button>
                      <Button
                        size="sm"
                        onClick={() => handlePlay(episode.id, episode.title, 'podcast')}
                      >
                        {currentTrack?.id === episode.id && currentTrack.isPlaying ? (
                          <Pause className="w-4 h-4" />
                        ) : (
                          <Play className="w-4 h-4" />
                        )}
                      </Button>
                      <Button size="sm" variant="ghost">
                        <SkipForward className="w-4 h-4" />
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            </CardContent>
          </Card>
        </TabsContent>
      </Tabs>

      {/* Audio Player (Fixed Bottom) */}
      {currentTrack && (
        <div className="fixed bottom-0 left-0 right-0 bg-white border-t shadow-lg p-4 z-50">
          <div className="container mx-auto">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                  <Headphones className="w-6 h-6 text-white" />
                </div>
                <div>
                  <div className="font-medium text-sm">{currentTrack.title}</div>
                  <div className="text-xs text-gray-600">
                    {currentTrack.type === 'podcast' ? 'Podcast' : 'Radio Station'}
                    {currentTrack.isPlaying ? ' • Playing' : ' • Paused'}
                  </div>
                </div>
              </div>

              <div className="flex items-center space-x-4">
                <Button size="sm" variant="ghost">
                  <SkipBack className="w-4 h-4" />
                </Button>
                <Button
                  size="sm"
                  onClick={togglePlayPause}
                  className="bg-blue-500 hover:bg-blue-600"
                >
                  {currentTrack.isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4" />}
                </Button>
                <Button size="sm" variant="ghost">
                  <SkipForward className="w-4 h-4" />
                </Button>
                <Button size="sm" variant="ghost">
                  <Volume2 className="w-4 h-4" />
                </Button>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="mt-3">
              <div className="w-full bg-gray-200 rounded-full h-1">
                <div className="bg-blue-500 h-1 rounded-full w-1/3 transition-all duration-1000"></div>
              </div>
              <div className="flex justify-between text-xs text-gray-500 mt-1">
                <span>2:15</span>
                <span>8:42</span>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
