
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Slider } from "@/components/ui/slider";
import { Play, Pause, Square, Volume2, Bell, RotateCcw } from "lucide-react";

export const MeditationTimer = () => {
  const [isActive, setIsActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(600); // 10 minutes default
  const [selectedDuration, setSelectedDuration] = useState(10);
  const [volume, setVolume] = useState([50]);
  const [intervalBells, setIntervalBells] = useState(false);
  const [backgroundSound, setBackgroundSound] = useState("nature");
  const [sessionComplete, setSessionComplete] = useState(false);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(timeLeft => {
          const newTime = timeLeft - 1;
          if (newTime === 0) {
            setIsActive(false);
            setSessionComplete(true);
            // Play completion sound simulation
            console.log("🔔 Meditation completed! Well done!");
          }
          return newTime;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleStart = () => {
    setIsActive(true);
    setSessionComplete(false);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleStop = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration * 60);
    setSessionComplete(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setTimeLeft(selectedDuration * 60);
    setSessionComplete(false);
  };

  const handleDurationChange = (value: string) => {
    const duration = parseInt(value);
    setSelectedDuration(duration);
    if (!isActive) {
      setTimeLeft(duration * 60);
    }
  };

  const progress = ((selectedDuration * 60 - timeLeft) / (selectedDuration * 60)) * 100;

  return (
    <div className="max-w-6xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-2xl sm:text-3xl font-bold text-gray-900">Meditation Timer</h2>
        <p className="text-gray-600 px-4">Create your own meditation practice with customizable timers</p>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Timer Display */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>Session Timer</CardTitle>
            {sessionComplete && (
              <div className="text-green-600 font-medium">🎉 Session Complete!</div>
            )}
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="relative w-40 h-40 sm:w-48 sm:h-48 mx-auto">
              {/* Outer circle */}
              <div className="absolute inset-0 rounded-full border-8 border-gray-200"></div>
              {/* Progress circle */}
              <div 
                className="absolute inset-0 rounded-full border-8 border-transparent transition-all duration-1000"
                style={{
                  background: `conic-gradient(from -90deg, #3b82f6 0%, #3b82f6 ${progress}%, transparent ${progress}%, transparent 100%)`,
                  borderRadius: '50%',
                  mask: 'radial-gradient(circle at 50% 50%, transparent 70%, black 70%)',
                  WebkitMask: 'radial-gradient(circle at 50% 50%, transparent 70%, black 70%)'
                }}
              ></div>
              {/* Timer display */}
              <div className="absolute inset-0 flex items-center justify-center">
                <div className="text-3xl sm:text-4xl font-mono font-bold text-gray-900">
                  {formatTime(timeLeft)}
                </div>
              </div>
            </div>

            <div className="flex flex-wrap justify-center gap-2 sm:gap-4">
              {!isActive ? (
                <Button onClick={handleStart} size="lg" className="bg-green-500 hover:bg-green-600 flex-1 sm:flex-none">
                  <Play className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Start
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" variant="outline" className="flex-1 sm:flex-none">
                  <Pause className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={handleStop} size="lg" variant="outline" className="flex-1 sm:flex-none">
                <Square className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Stop
              </Button>
              <Button onClick={handleReset} size="lg" variant="outline" className="flex-1 sm:flex-none">
                <RotateCcw className="w-4 h-4 sm:w-5 sm:h-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Settings */}
        <Card>
          <CardHeader>
            <CardTitle>Timer Settings</CardTitle>
            <CardDescription>Customize your meditation experience</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Duration */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Duration</label>
              <Select onValueChange={handleDurationChange} defaultValue="10">
                <SelectTrigger>
                  <SelectValue placeholder="Select duration" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="3">3 minutes</SelectItem>
                  <SelectItem value="5">5 minutes</SelectItem>
                  <SelectItem value="10">10 minutes</SelectItem>
                  <SelectItem value="15">15 minutes</SelectItem>
                  <SelectItem value="20">20 minutes</SelectItem>
                  <SelectItem value="30">30 minutes</SelectItem>
                  <SelectItem value="45">45 minutes</SelectItem>
                  <SelectItem value="60">60 minutes</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Background Sound */}
            <div className="space-y-2">
              <label className="text-sm font-medium">Background Sound</label>
              <Select onValueChange={setBackgroundSound} defaultValue="nature">
                <SelectTrigger>
                  <SelectValue placeholder="Select background sound" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="silence">🔇 Silence</SelectItem>
                  <SelectItem value="nature">🌿 Nature Sounds</SelectItem>
                  <SelectItem value="rain">🌧️ Rain</SelectItem>
                  <SelectItem value="ocean">🌊 Ocean Waves</SelectItem>
                  <SelectItem value="forest">🌲 Forest</SelectItem>
                  <SelectItem value="whitenoise">📻 White Noise</SelectItem>
                  <SelectItem value="bowls">🎵 Singing Bowls</SelectItem>
                  <SelectItem value="binaural">🧠 Binaural Beats</SelectItem>
                </SelectContent>
              </Select>
            </div>

            {/* Volume Control */}
            <div className="space-y-2">
              <label className="text-sm font-medium flex items-center">
                <Volume2 className="w-4 h-4 mr-2" />
                Volume: {volume[0]}%
              </label>
              <Slider
                value={volume}
                onValueChange={setVolume}
                max={100}
                step={1}
                className="w-full"
              />
            </div>

            {/* Interval Bells */}
            <div className="flex items-center justify-between">
              <label className="text-sm font-medium flex items-center">
                <Bell className="w-4 h-4 mr-2" />
                Interval Bells
              </label>
              <Button
                variant={intervalBells ? "default" : "outline"}
                size="sm"
                onClick={() => setIntervalBells(!intervalBells)}
              >
                {intervalBells ? "On" : "Off"}
              </Button>
            </div>

            {/* Sound Preview */}
            <div className="p-4 bg-blue-50 rounded-lg">
              <div className="text-sm font-medium text-blue-900 mb-2">
                🎵 Currently playing: {backgroundSound === "silence" ? "Silence" : backgroundSound.charAt(0).toUpperCase() + backgroundSound.slice(1)}
              </div>
              <div className="text-xs text-blue-700">
                Volume: {volume[0]}% {intervalBells && "• Interval bells enabled"}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
