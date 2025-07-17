
import { useState, useRef, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Volume2, VolumeX, Maximize, SkipBack, SkipForward } from "lucide-react";
import { Card } from "@/components/ui/card";

interface VideoPlayerProps {
  title: string;
  videoUrl?: string;
  duration?: string;
  thumbnail?: string;
  onPlay?: () => void;
  onPause?: () => void;
}

export const VideoPlayer = ({ 
  title, 
  videoUrl, 
  duration = "0:00", 
  thumbnail,
  onPlay, 
  onPause 
}: VideoPlayerProps) => {
  const [isPlaying, setIsPlaying] = useState(false);
  const [volume, setVolume] = useState([70]);
  const [isMuted, setIsMuted] = useState(false);
  const [isFullscreen, setIsFullscreen] = useState(false);
  const videoRef = useRef<HTMLVideoElement>(null);
  
  // For demo purposes, we'll simulate video playback
  const [simulatedProgress, setSimulatedProgress] = useState(0);

  useEffect(() => {
    let interval: NodeJS.Timeout;
    if (isPlaying) {
      interval = setInterval(() => {
        setSimulatedProgress(prev => {
          if (prev >= 100) {
            setIsPlaying(false);
            return 0;
          }
          return prev + 0.3; // Simulate progress slower for videos
        });
      }, 100);
    }
    return () => clearInterval(interval);
  }, [isPlaying]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
      onPause?.();
    } else {
      setIsPlaying(true);
      onPlay?.();
    }
  };

  const handleSeek = (value: number[]) => {
    setSimulatedProgress(value[0]);
  };

  const handleVolumeChange = (value: number[]) => {
    setVolume(value);
    setIsMuted(value[0] === 0);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const toggleFullscreen = () => {
    if (videoRef.current) {
      if (!isFullscreen) {
        videoRef.current.requestFullscreen?.();
      } else {
        document.exitFullscreen?.();
      }
      setIsFullscreen(!isFullscreen);
    }
  };

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs.toString().padStart(2, '0')}`;
  };

  return (
    <Card className="overflow-hidden bg-black">
      {/* Video Display Area */}
      <div className="relative bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 aspect-video">
        {/* Placeholder Video Content */}
        <div className="absolute inset-0 flex items-center justify-center">
          {!isPlaying ? (
            <div className="text-center text-white">
              <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mb-4 mx-auto">
                <Play className="w-8 h-8 text-white ml-1" />
              </div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-80">Click to start meditation</p>
            </div>
          ) : (
            <div className="text-center text-white">
              <div className="w-24 h-24 border-4 border-white/30 border-t-white rounded-full animate-spin mb-4 mx-auto"></div>
              <h3 className="text-lg font-semibold mb-2">{title}</h3>
              <p className="text-sm opacity-80">Meditation in progress...</p>
            </div>
          )}
        </div>

        {/* Play/Pause Overlay */}
        <div 
          className="absolute inset-0 flex items-center justify-center cursor-pointer"
          onClick={handlePlayPause}
        >
          <div className="w-16 h-16 bg-black/50 rounded-full flex items-center justify-center opacity-0 hover:opacity-100 transition-opacity">
            {isPlaying ? (
              <Pause className="w-8 h-8 text-white" />
            ) : (
              <Play className="w-8 h-8 text-white ml-1" />
            )}
          </div>
        </div>

        {/* Video element (hidden, for future real video implementation) */}
        <video
          ref={videoRef}
          className="w-full h-full object-cover opacity-0"
          src={videoUrl}
        />
      </div>

      {/* Controls */}
      <div className="p-4 bg-gray-900 text-white space-y-4">
        {/* Progress Bar */}
        <div className="space-y-2">
          <Slider
            value={[simulatedProgress]}
            onValueChange={handleSeek}
            max={100}
            step={1}
            className="w-full"
          />
          <div className="flex justify-between text-xs text-gray-400">
            <span>{formatTime((simulatedProgress / 100) * 600)}</span>
            <span>{duration}</span>
          </div>
        </div>

        {/* Control Buttons */}
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-800">
              <SkipBack className="w-4 h-4" />
            </Button>
            <Button 
              size="sm" 
              onClick={handlePlayPause} 
              className="w-12 h-12 rounded-full bg-purple-600 hover:bg-purple-700"
            >
              {isPlaying ? <Pause className="w-5 h-5" /> : <Play className="w-5 h-5 ml-0.5" />}
            </Button>
            <Button size="sm" variant="ghost" className="text-white hover:bg-gray-800">
              <SkipForward className="w-4 h-4" />
            </Button>
          </div>

          <div className="flex items-center space-x-2">
            {/* Volume Control */}
            <div className="flex items-center space-x-2">
              <Button size="sm" variant="ghost" onClick={toggleMute} className="text-white hover:bg-gray-800">
                {isMuted || volume[0] === 0 ? (
                  <VolumeX className="w-4 h-4" />
                ) : (
                  <Volume2 className="w-4 h-4" />
                )}
              </Button>
              <Slider
                value={isMuted ? [0] : volume}
                onValueChange={handleVolumeChange}
                max={100}
                step={1}
                className="w-20"
              />
            </div>

            <Button size="sm" variant="ghost" onClick={toggleFullscreen} className="text-white hover:bg-gray-800">
              <Maximize className="w-4 h-4" />
            </Button>
          </div>
        </div>
      </div>
    </Card>
  );
};
