import React, { useState, useEffect } from 'react';
import { MapPin, Trophy, User, Zap, BookOpen, Coffee, FlaskConical, Utensils, Dumbbell, Users, GraduationCap, Camera, CheckCircle, XCircle, Star, Sparkles, Award, Target } from 'lucide-react';

export default function App() {
    // Mock data (replace with API calls when backend is ready)
    const mockCampusLocations = [
        {
            id: 1,
            name: "Central Library",
            description: "The heart of academic knowledge on campus",
            icon: BookOpen,
            position: { x: 25, y: 30 },
            unlocked: true,
            difficulty: "easy"
        },
        {
            id: 2,
            name: "Student Union",
            description: "Hub of student activities and dining",
            icon: Coffee,
            position: { x: 60, y: 45 },
            unlocked: false,
            difficulty: "medium"
        },
        {
            id: 3,
            name: "Science Laboratory",
            description: "Where scientific discoveries happen",
            icon: FlaskConical,
            position: { x: 40, y: 70 },
            unlocked: false,
            difficulty: "hard"
        },
        {
            id: 4,
            name: "Dining Hall",
            description: "Fuel your body and mind",
            icon: Utensils,
            position: { x: 75, y: 25 },
            unlocked: false,
            difficulty: "easy"
        },
        {
            id: 5,
            name: "Recreation Center",
            description: "Stay active and healthy",
            icon: Dumbbell,
            position: { x: 15, y: 60 },
            unlocked: false,
            difficulty: "medium"
        },
        {
            id: 6,
            name: "Student Services",
            description: "Get help and support",
            icon: Users,
            position: { x: 80, y: 60 },
            unlocked: false,
            difficulty: "easy"
        }
    ];

    const mockQuestions = {
        1: [
            {
                id: 1,
                question: "What is the most important resource in a university library?",
                options: ["Books", "Computers", "Quiet spaces", "Librarian expertise"],
                correct: 3,
                explanation: "While all are important, librarians provide expert guidance to help you find exactly what you need!"
            }
        ],
        2: [
            {
                id: 2,
                question: "What's the best way to get involved in campus life?",
                options: ["Join clubs", "Attend events", "Volunteer", "All of the above"],
                correct: 3,
                explanation: "Campus involvement comes in many forms - the more you participate, the richer your experience!"
            }
        ],
        3: [
            {
                id: 3,
                question: "What safety equipment is essential in a science lab?",
                options: ["Safety goggles", "Lab coat", "Closed-toe shoes", "All of the above"],
                correct: 3,
                explanation: "Lab safety requires multiple layers of protection - every item is crucial!"
            }
        ],
        4: [
            {
                id: 4,
                question: "What's important for maintaining healthy eating habits on campus?",
                options: ["Variety in meals", "Regular meal times", "Balanced nutrition", "All of the above"],
                correct: 3,
                explanation: "A holistic approach to campus dining supports both academic and personal success!"
            }
        ],
        5: [
            {
                id: 5,
                question: "How often should you exercise for optimal health?",
                options: ["Once a week", "3-4 times a week", "Every day", "Only when stressed"],
                correct: 1,
                explanation: "Regular exercise 3-4 times a week helps maintain physical and mental well-being!"
            }
        ],
        6: [
            {
                id: 6,
                question: "When should you seek help from student services?",
                options: ["Only in emergencies", "When struggling academically", "For general guidance", "Both B and C"],
                correct: 3,
                explanation: "Student services are there to support you proactively, not just in crisis situations!"
            }
        ]
    };

    // Game state
    const [campusLocations, setCampusLocations] = useState(mockCampusLocations);
    const [locationQuestions] = useState(mockQuestions);
    const [currentLocation, setCurrentLocation] = useState(null);
    const [playerStats, setPlayerStats] = useState({ 
        name: '', 
        level: 1, 
        experience: 0, 
        levelsCleared: 0, 
        engagementScore: 0 
    });
    const [gameStarted, setGameStarted] = useState(false);
    const [showQuiz, setShowQuiz] = useState(false);
    const [currentQuestion, setCurrentQuestion] = useState(null);
    const [selectedAnswer, setSelectedAnswer] = useState(null);
    const [showResult, setShowResult] = useState(false);
    const [arMode, setArMode] = useState(false);
    const [visitedLocations, setVisitedLocations] = useState(new Set());
    const [showLevelUp, setShowLevelUp] = useState(false);
    const [particles, setParticles] = useState([]);
    const [pulsingLocations, setPulsingLocations] = useState(new Set());
    const [energyWaves, setEnergyWaves] = useState([]);
    const [floatingElements, setFloatingElements] = useState([]);
    const [screenShake, setScreenShake] = useState(false);
    const [playerName, setPlayerName] = useState('');

    // Animation effects
    useEffect(() => {
        const interval = setInterval(() => {
            setParticles(prev => prev.filter(p => p.life > 0).map(p => ({
                ...p,
                y: p.y - 1,
                life: p.life - 0.02,
                x: p.x + Math.sin(p.life * 10) * 0.5
            })));

            setEnergyWaves(prev => prev.filter(w => w.opacity > 0).map(w => ({
                ...w,
                radius: w.radius + 2,
                opacity: w.opacity - 0.01
            })));

            setFloatingElements(prev => prev.map(el => ({
                ...el,
                y: el.y + Math.sin(Date.now() * 0.001 + el.offset) * 0.5,
                rotation: (el.rotation + 1) % 360
            })));
        }, 50);

        return () => clearInterval(interval);
    }, []);

    useEffect(() => {
        if (screenShake) {
            setTimeout(() => setScreenShake(false), 820);
        }
    }, [screenShake]);

    // Initialize floating elements
    useEffect(() => {
        const elements = Array.from({ length: 6 }, (_, i) => ({
            id: i,
            x: Math.random() * 100,
            y: Math.random() * 100,
            rotation: 0,
            offset: i * Math.PI / 3
        }));
        setFloatingElements(elements);
    }, []);

    const startGame = (name) => {
        if (!name.trim()) return;
        setPlayerStats(prev => ({ ...prev, name: name.trim() }));
        setGameStarted(true);
        createParticles(50, 50, 15, 'success');
    };

    const createParticles = (x, y, count, type = 'default') => {
        const newParticles = Array.from({ length: count }, () => ({
            id: Math.random(),
            x: x + (Math.random() - 0.5) * 20,
            y: y + (Math.random() - 0.5) * 20,
            life: 1,
            color: type === 'success' ? '#10B981' : type === 'error' ? '#EF4444' : '#3B82F6',
            size: Math.random() * 4 + 2
        }));
        setParticles(prev => [...prev, ...newParticles]);
    };

    const createEnergyWave = (x, y) => {
        const wave = {
            id: Math.random(),
            x,
            y,
            radius: 0,
            opacity: 0.6
        };
        setEnergyWaves(prev => [...prev, wave]);
    };

    const visitLocation = (location) => {
        if (!location.unlocked) return;
        
        setCurrentLocation(location);
        setPulsingLocations(prev => new Set([...prev, location.id]));
        createEnergyWave(location.position.x, location.position.y);
        
        const questions = locationQuestions[location.id];
        if (questions && questions.length > 0) {
            setCurrentQuestion(questions[0]);
            setShowQuiz(true);
        }
    };

    const submitAnswer = (answerIndex) => {
        setSelectedAnswer(answerIndex);
        setShowResult(true);
        
        const isCorrect = answerIndex === currentQuestion.correct;
        const experienceGain = isCorrect ? 100 : 50;
        
        createParticles(50, 50, isCorrect ? 15 : 8, isCorrect ? 'success' : 'error');

        if (isCorrect) {
            setScreenShake(true);
        }

        setTimeout(() => {
            setPlayerStats(prev => {
                const newExp = prev.experience + experienceGain;
                const newLevel = Math.floor(newExp / 300) + 1;
                const leveledUp = newLevel > prev.level;
                
                if (leveledUp) {
                    setShowLevelUp(true);
                    setTimeout(() => setShowLevelUp(false), 3000);
                }

                return {
                    ...prev,
                    experience: newExp,
                    level: newLevel,
                    levelsCleared: prev.levelsCleared + (isCorrect ? 1 : 0),
                    engagementScore: prev.engagementScore + experienceGain / 10
                };
            });

            setVisitedLocations(prev => new Set([...prev, currentLocation.id]));
            
            // Unlock adjacent locations
            setCampusLocations(prev => prev.map(loc => {
                if (loc.id !== currentLocation.id && !visitedLocations.has(loc.id)) {
                    const distance = Math.sqrt(
                        Math.pow(loc.position.x - currentLocation.position.x, 2) +
                        Math.pow(loc.position.y - currentLocation.position.y, 2)
                    );
                    if (distance < 40) {
                        return { ...loc, unlocked: true };
                    }
                }
                return loc;
            }));

            setShowQuiz(false);
            setShowResult(false);
            setSelectedAnswer(null);
            setCurrentQuestion(null);
            setCurrentLocation(null);
            
            setTimeout(() => {
                setPulsingLocations(prev => {
                    const newSet = new Set(prev);
                    newSet.delete(currentLocation?.id);
                    return newSet;
                });
            }, 1000);
        }, 2500);
    };

    const toggleARMode = () => {
        setArMode(!arMode);
        createParticles(90, 10, 8, 'success');
    };

    // Welcome screen
    if (!gameStarted) {
        return (
            <div className="min-h-screen bg-gradient-to-br from-indigo-900 via-purple-900 to-pink-800 flex items-center justify-center p-4">
                <div className="absolute inset-0 overflow-hidden">
                    {Array.from({ length: 50 }).map((_, i) => (
                        <div
                            key={i}
                            className="absolute animate-star-twinkle"
                            style={{
                                left: `${Math.random() * 100}%`,
                                top: `${Math.random() * 100}%`,
                                animationDelay: `${Math.random() * 3}s`
                            }}
                        >
                            <Star className="w-2 h-2 text-white opacity-70" />
                        </div>
                    ))}
                </div>

                <div className="relative bg-white/10 backdrop-blur-xl rounded-3xl p-8 max-w-md w-full text-center border border-white/20 shadow-2xl">
                    <div className="mb-6">
                        <div className="w-20 h-20 mx-auto mb-4 bg-gradient-to-br from-yellow-400 to-orange-500 rounded-full flex items-center justify-center animate-icon-bob">
                            <GraduationCap className="w-10 h-10 text-white" />
                        </div>
                        <h1 className="text-3xl font-bold text-white mb-2 opacity-0 animate-title-entrance">
                            Campus Explorer
                        </h1>
                        <p className="text-white/80 opacity-0 animate-subtitle-slide">
                            Discover your campus through interactive exploration and challenges!
                        </p>
                    </div>

                    <div className="space-y-4">
                        <input
                            type="text"
                            placeholder="Enter your name"
                            value={playerName}
                            onChange={(e) => setPlayerName(e.target.value)}
                            className="w-full px-4 py-3 rounded-xl bg-white/20 backdrop-blur border border-white/30 text-white placeholder-white/60 focus:outline-none focus:ring-2 focus:ring-yellow-400 focus:border-transparent transition-all duration-300"
                            onKeyPress={(e) => e.key === 'Enter' && startGame(playerName)}
                        />
                        <button
                            onClick={() => startGame(playerName)}
                            disabled={!playerName.trim()}
                            className="w-full bg-gradient-to-r from-yellow-400 to-orange-500 text-white font-semibold py-3 px-6 rounded-xl hover:from-yellow-500 hover:to-orange-600 transform hover:scale-105 transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed disabled:transform-none shadow-lg"
                        >
                            Start Adventure
                        </button>
                    </div>

                    <div className="mt-6 flex justify-center space-x-4 text-white/60">
                        <div className="flex items-center space-x-1">
                            <Target className="w-4 h-4" />
                            <span className="text-sm">Explore</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Trophy className="w-4 h-4" />
                            <span className="text-sm">Learn</span>
                        </div>
                        <div className="flex items-center space-x-1">
                            <Star className="w-4 h-4" />
                            <span className="text-sm">Achieve</span>
                        </div>
                    </div>
                </div>
            </div>
        );
    }

    // Main game view
    return (
        <div className={`min-h-screen bg-gradient-to-br from-blue-900 via-indigo-900 to-purple-900 relative overflow-hidden ${screenShake ? 'animate-shake' : ''}`}>
            {/* Particles */}
            {particles.map(particle => (
                <div
                    key={particle.id}
                    className="absolute pointer-events-none z-50"
                    style={{
                        left: `${particle.x}%`,
                        top: `${particle.y}%`,
                        opacity: particle.life,
                    }}
                >
                    <div
                        className="rounded-full"
                        style={{
                            width: `${particle.size}px`,
                            height: `${particle.size}px`,
                            backgroundColor: particle.color,
                            boxShadow: `0 0 ${particle.size * 2}px ${particle.color}`,
                        }}
                    />
                </div>
            ))}

            {/* Energy Waves */}
            {energyWaves.map(wave => (
                <div
                    key={wave.id}
                    className="absolute pointer-events-none border-2 border-yellow-400 rounded-full"
                    style={{
                        left: `${wave.x}%`,
                        top: `${wave.y}%`,
                        width: `${wave.radius}px`,
                        height: `${wave.radius}px`,
                        opacity: wave.opacity,
                        transform: 'translate(-50%, -50%)',
                    }}
                />
            ))}

            {/* Floating Elements */}
            {floatingElements.map(el => (
                <div
                    key={el.id}
                    className="absolute pointer-events-none opacity-20"
                    style={{
                        left: `${el.x}%`,
                        top: `${el.y}%`,
                        transform: `rotate(${el.rotation}deg)`,
                    }}
                >
                    <Sparkles className="w-6 h-6 text-yellow-400" />
                </div>
            ))}

            {/* Header */}
            <div className="relative z-10 p-4 bg-black/20 backdrop-blur border-b border-white/10">
                <div className="flex items-center justify-between max-w-6xl mx-auto">
                    <div className="flex items-center space-x-4">
                        <div className="flex items-center space-x-2">
                            <User className="w-6 h-6 text-yellow-400" />
                            <span className="text-white font-semibold">{playerStats.name}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Trophy className="w-5 h-5 text-yellow-400" />
                            <span className="text-white">Level {playerStats.level}</span>
                        </div>
                        <div className="flex items-center space-x-2">
                            <Zap className="w-5 h-5 text-blue-400" />
                            <span className="text-white">{playerStats.experience} XP</span>
                        </div>
                    </div>
                    
                    <button
                        onClick={toggleARMode}
                        className={`px-4 py-2 rounded-lg font-medium transition-all duration-300 ${
                            arMode 
                                ? 'bg-green-600 text-white shadow-green-400/50' 
                                : 'bg-gray-600 text-gray-300 hover:bg-gray-500'
                        } shadow-lg`}
                    >
                        <div className="flex items-center space-x-2">
                            <Camera className="w-4 h-4" />
                            <span>AR Mode</span>
                        </div>
                    </button>
                </div>
            </div>

            {/* Campus Map */}
            <div className="relative z-0 flex-1 p-8">
                <div className="max-w-6xl mx-auto">
                    <div className="relative h-[70vh] bg-green-800/30 rounded-2xl border border-white/20 backdrop-blur overflow-hidden">
                        {/* Campus background pattern */}
                        <div className="absolute inset-0 opacity-10">
                            <div className="w-full h-full bg-gradient-to-br from-green-400 to-green-600" />
                        </div>

                        {/* Location markers */}
                        {campusLocations.map((location) => {
                            const IconComponent = location.icon;
                            return (
                                <button
                                    key={location.id}
                                    data-location={location.id}
                                    onClick={() => visitLocation(location)}
                                    disabled={!location.unlocked}
                                    className={`absolute transform -translate-x-1/2 -translate-y-1/2 transition-all duration-300 ${
                                        location.unlocked
                                            ? 'hover:scale-110 cursor-pointer'
                                            : 'opacity-50 cursor-not-allowed'
                                    } ${pulsingLocations.has(location.id) ? 'animate-pulse' : ''}`}
                                    style={{
                                        left: `${location.position.x}%`,
                                        top: `${location.position.y}%`,
                                    }}
                                >
                                    <div className={`relative p-4 rounded-full border-4 transition-all duration-300 ${
                                        visitedLocations.has(location.id)
                                            ? 'bg-green-500 border-green-300 shadow-lg shadow-green-500/50'
                                            : location.unlocked
                                            ? 'bg-blue-500 border-blue-300 shadow-lg shadow-blue-500/50 hover:shadow-blue-400/70'
                                            : 'bg-gray-600 border-gray-400'
                                    }`}>
                                        <IconComponent className="w-6 h-6 text-white" />
                                        {visitedLocations.has(location.id) && (
                                            <CheckCircle className="absolute -top-2 -right-2 w-6 h-6 text-green-400 bg-white rounded-full" />
                                        )}
                                    </div>
                                    
                                    <div className="mt-2 text-center">
                                        <div className="bg-black/60 backdrop-blur px-3 py-1 rounded-lg">
                                            <p className="text-white font-medium text-sm">{location.name}</p>
                                        </div>
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </div>
            </div>

            {/* Quiz Modal */}
            {showQuiz && currentQuestion && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
                    <div className="bg-white rounded-2xl p-8 max-w-2xl w-full shadow-2xl animate-scale-in">
                        <div className="text-center mb-6">
                            <h2 className="text-2xl font-bold text-gray-800 mb-2">
                                {currentLocation?.name}
                            </h2>
                            <p className="text-gray-600">{currentLocation?.description}</p>
                        </div>

                        <div className="mb-6">
                            <h3 className="text-xl font-semibold text-gray-800 mb-4">
                                {currentQuestion.question}
                            </h3>
                            <div className="space-y-3">
                                {currentQuestion.options.map((option, index) => (
                                    <button
                                        key={index}
                                        onClick={() => !showResult && submitAnswer(index)}
                                        disabled={showResult}
                                        className={`w-full p-4 text-left rounded-lg border-2 transition-all duration-300 ${
                                            showResult
                                                ? index === currentQuestion.correct
                                                    ? 'bg-green-100 border-green-500 text-green-800'
                                                    : selectedAnswer === index
                                                    ? 'bg-red-100 border-red-500 text-red-800'
                                                    : 'bg-gray-100 border-gray-300 text-gray-600'
                                                : 'bg-gray-50 border-gray-300 hover:bg-blue-50 hover:border-blue-400 text-gray-800'
                                        }`}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span className="font-medium">{option}</span>
                                            {showResult && (
                                                <div>
                                                    {index === currentQuestion.correct && (
                                                        <CheckCircle className="w-6 h-6 text-green-600" />
                                                    )}
                                                    {selectedAnswer === index && index !== currentQuestion.correct && (
                                                        <XCircle className="w-6 h-6 text-red-600" />
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </button>
                                ))}
                            </div>
                        </div>

                        {showResult && (
                            <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 animate-fade-in">
                                <div className="flex items-start space-x-3">
                                    <div className="flex-shrink-0">
                                        {selectedAnswer === currentQuestion.correct ? (
                                            <CheckCircle className="w-6 h-6 text-green-600" />
                                        ) : (
                                            <XCircle className="w-6 h-6 text-red-600" />
                                        )}
                                    </div>
                                    <div>
                                        <h4 className="font-semibold text-gray-800 mb-1">
                                            {selectedAnswer === currentQuestion.correct ? 'Correct!' : 'Not quite right'}
                                        </h4>
                                        <p className="text-gray-700 text-sm">{currentQuestion.explanation}</p>
                                        <p className="text-sm text-blue-600 mt-2 font-medium">
                                            +{selectedAnswer === currentQuestion.correct ? '100' : '50'} XP
                                        </p>
                                    </div>
                                </div>
                            </div>
                        )}
                    </div>
                </div>
            )}

            {/* Level Up Modal */}
            {showLevelUp && (
                <div className="fixed inset-0 bg-black/60 backdrop-blur flex items-center justify-center z-50 p-4">
                    <div className="bg-gradient-to-br from-yellow-400 to-orange-500 rounded-2xl p-8 text-center shadow-2xl animate-scale-in">
                        <div className="w-20 h-20 mx-auto mb-4 bg-white/20 rounded-full flex items-center justify-center">
                            <Award className="w-12 h-12 text-white animate-spin" />
                        </div>
                        <h2 className="text-3xl font-bold text-white mb-2">Level Up!</h2>
                        <p className="text-white/90 text-lg">You've reached Level {playerStats.level}!</p>
                        <div className="mt-4 flex justify-center">
                            <Sparkles className="w-8 h-8 text-white animate-sparkle-spin" />
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}
