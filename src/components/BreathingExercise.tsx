
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Play, Pause, RotateCcw } from "lucide-react";

type BreathingPattern = {
  name: string;
  description: string;
  pattern: number[];
  labels: string[];
};

const breathingPatterns: BreathingPattern[] = [
  {
    name: "Box Breathing",
    description: "4-4-4-4 pattern for balance and calm",
    pattern: [4, 4, 4, 4],
    labels: ["Inhale", "Hold", "Exhale", "Hold"]
  },
  {
    name: "4-7-8 Technique",
    description: "For deep relaxation and sleep",
    pattern: [4, 7, 8],
    labels: ["Inhale", "Hold", "Exhale"]
  },
  {
    name: "Wim Hof Method",
    description: "30 breaths + retention",
    pattern: [2, 0, 2],
    labels: ["Inhale", "", "Exhale"]
  },
  {
    name: "Pranayama 4-4-6",
    description: "Traditional yogic breathing",
    pattern: [4, 4, 6],
    labels: ["Inhale", "Hold", "Exhale"]
  }
];

export const BreathingExercise = () => {
  const [selectedPattern, setSelectedPattern] = useState<BreathingPattern>(breathingPatterns[0]);
  const [isActive, setIsActive] = useState(false);
  const [currentPhase, setCurrentPhase] = useState(0);
  const [timeLeft, setTimeLeft] = useState(4);
  const [cycles, setCycles] = useState(0);
  const [scale, setScale] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;
    
    if (isActive) {
      interval = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            // Move to next phase
            setCurrentPhase(current => {
              const nextPhase = (current + 1) % selectedPattern.pattern.length;
              if (nextPhase === 0) {
                setCycles(prev => prev + 1);
              }
              return nextPhase;
            });
            return selectedPattern.pattern[currentPhase];
          }
          return prev - 1;
        });
      }, 1000);
    }
    
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, currentPhase, selectedPattern.pattern]);

  // Breathing animation
  useEffect(() => {
    if (isActive) {
      const currentLabel = selectedPattern.labels[currentPhase];
      if (currentLabel === "Inhale") {
        setScale(1.3);
      } else if (currentLabel === "Exhale") {
        setScale(0.7);
      } else {
        setScale(1.1);
      }
    } else {
      setScale(1);
    }
  }, [currentPhase, isActive, selectedPattern.labels]);

  const handleStart = () => {
    setIsActive(true);
    setTimeLeft(selectedPattern.pattern[0]);
  };

  const handlePause = () => {
    setIsActive(false);
  };

  const handleReset = () => {
    setIsActive(false);
    setCurrentPhase(0);
    setTimeLeft(selectedPattern.pattern[0]);
    setCycles(0);
    setScale(1);
  };

  const handlePatternChange = (value: string) => {
    const pattern = breathingPatterns.find(p => p.name === value);
    if (pattern) {
      setSelectedPattern(pattern);
      setCurrentPhase(0);
      setTimeLeft(pattern.pattern[0]);
      setCycles(0);
      setIsActive(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      <div className="text-center space-y-2">
        <h2 className="text-3xl font-bold text-gray-900">Breathing Exercises</h2>
        <p className="text-gray-600">Practice various breathing techniques for relaxation and focus</p>
      </div>

      <div className="grid md:grid-cols-2 gap-6">
        {/* Breathing Guide */}
        <Card className="text-center">
          <CardHeader>
            <CardTitle>{selectedPattern.name}</CardTitle>
            <CardDescription>{selectedPattern.description}</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            {/* Breathing Circle */}
            <div className="relative w-64 h-64 mx-auto flex items-center justify-center">
              <div 
                className="w-48 h-48 rounded-full bg-gradient-to-br from-blue-400 to-indigo-500 transition-all duration-1000 ease-in-out flex items-center justify-center shadow-lg"
                style={{ transform: `scale(${scale})` }}
              >
                <div className="text-white text-center">
                  <div className="text-2xl font-bold mb-2">
                    {selectedPattern.labels[currentPhase] || "Ready"}
                  </div>
                  <div className="text-4xl font-mono">
                    {isActive ? timeLeft : selectedPattern.pattern[0]}
                  </div>
                </div>
              </div>
            </div>

            {/* Stats */}
            <div className="flex justify-center space-x-8 text-center">
              <div>
                <div className="text-2xl font-bold text-blue-600">{cycles}</div>
                <div className="text-sm text-gray-600">Cycles</div>
              </div>
              <div>
                <div className="text-2xl font-bold text-green-600">
                  {Math.floor(cycles * selectedPattern.pattern.reduce((a, b) => a + b, 0) / 60)}
                </div>
                <div className="text-sm text-gray-600">Minutes</div>
              </div>
            </div>

            {/* Controls */}
            <div className="flex justify-center space-x-4">
              {!isActive ? (
                <Button onClick={handleStart} size="lg" className="bg-blue-500 hover:bg-blue-600">
                  <Play className="w-5 h-5 mr-2" />
                  Start
                </Button>
              ) : (
                <Button onClick={handlePause} size="lg" variant="outline">
                  <Pause className="w-5 h-5 mr-2" />
                  Pause
                </Button>
              )}
              <Button onClick={handleReset} size="lg" variant="outline">
                <RotateCcw className="w-5 h-5 mr-2" />
                Reset
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Pattern Selection */}
        <Card>
          <CardHeader>
            <CardTitle>Breathing Patterns</CardTitle>
            <CardDescription>Choose a breathing technique</CardDescription>
          </CardHeader>
          <CardContent className="space-y-6">
            <Select onValueChange={handlePatternChange} defaultValue={selectedPattern.name}>
              <SelectTrigger>
                <SelectValue placeholder="Select breathing pattern" />
              </SelectTrigger>
              <SelectContent>
                {breathingPatterns.map((pattern) => (
                  <SelectItem key={pattern.name} value={pattern.name}>
                    {pattern.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>

            {/* Pattern Details */}
            <div className="space-y-4">
              <h4 className="font-semibold">Pattern Details:</h4>
              <div className="grid grid-cols-2 gap-4">
                {selectedPattern.labels.map((label, index) => (
                  <div key={index} className="text-center p-3 bg-gray-50 rounded-lg">
                    <div className="font-medium text-sm">{label}</div>
                    <div className="text-2xl font-bold text-blue-600">
                      {selectedPattern.pattern[index]}s
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Benefits */}
            <div className="space-y-2">
              <h4 className="font-semibold">Benefits:</h4>
              <div className="text-sm text-gray-600 space-y-1">
                {selectedPattern.name === "Box Breathing" && (
                  <>
                    <p>• Reduces stress and anxiety</p>
                    <p>• Improves focus and concentration</p>
                    <p>• Balances the nervous system</p>
                  </>
                )}
                {selectedPattern.name === "4-7-8 Technique" && (
                  <>
                    <p>• Promotes deep relaxation</p>
                    <p>• Helps with sleep and insomnia</p>
                    <p>• Reduces anxiety quickly</p>
                  </>
                )}
                {selectedPattern.name === "Wim Hof Method" && (
                  <>
                    <p>• Boosts energy and alertness</p>
                    <p>• Strengthens immune system</p>
                    <p>• Increases cold tolerance</p>
                  </>
                )}
                {selectedPattern.name === "Pranayama 4-4-6" && (
                  <>
                    <p>• Traditional yogic practice</p>
                    <p>• Balances mind and body</p>
                    <p>• Increases lung capacity</p>
                  </>
                )}
              </div>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};
