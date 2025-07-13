
# MindfulSpace - Comprehensive Meditation Web App

A modern, feature-rich meditation web application built with React, TypeScript, and Tailwind CSS. MindfulSpace provides guided meditations, breathing exercises, progress tracking, and an integrated podcast/radio platform for a complete mindfulness experience.

## 🧘‍♀️ Core Meditation Features

### Guided Meditations
- **Categories**: Stress relief, anxiety, sleep, focus, confidence, relationships, grief, anger management
- **Duration Options**: 3, 5, 10, 15, 20, 30+ minute sessions
- **Voice Variety**: Multiple narrators with different accents and languages
- **Background Sounds**: Nature sounds, white noise, binaural beats, singing bowls
- **Themed Series**: 7-day challenges, progressive courses, seasonal content

### Meditation Timer
- **Customizable Sessions**: Adjustable duration from 3-60 minutes
- **Interval Bells**: Awareness check notifications during sessions
- **Audio Controls**: Start/end chimes with volume control
- **Background Sounds**: 8 different ambient sound options including nature, rain, ocean, forest
- **Session Logging**: Automatic tracking of completed sessions

## 🫁 Advanced Meditation Tools

### Breathing Exercises
- **Box Breathing**: 4-4-4-4 pattern for balance and calm
- **4-7-8 Technique**: Deep relaxation and sleep preparation
- **Wim Hof Method**: 30 breaths + retention for energy boost
- **Pranayama**: Traditional yogic breathing (4-4-6 pattern)
- **Visual Guides**: Animated breathing circle with real-time guidance
- **Customizable Ratios**: Adjustable breathing patterns

### Mindfulness Practices
- **Body Scan Meditations**: Progressive body awareness sessions
- **Walking Meditation**: Guides for mindful movement
- **Eating Meditation**: Mindful eating instructions
- **Daily Activities**: Mindfulness integration into routine tasks
- **Present Moment**: Awareness exercises for staying grounded

### Specialized Programs
- **Beginner Foundation**: Complete meditation course for newcomers
- **Advanced Content**: Deep practice sessions for experienced meditators
- **Workplace Stress**: Programs designed for professional stress relief
- **Student Support**: Exam anxiety and focus sessions
- **Senior Programs**: Age-appropriate meditation practices
- **Youth Content**: Kids and teens meditation programs
- **Pregnancy Support**: Prenatal and postpartum meditation

## 📊 Progress and Personalization

### Tracking Features
- **Daily Streaks**: Visual streak counter with flame indicator
- **Total Statistics**: Time meditated, sessions completed, achievements
- **Session History**: Detailed log of recent meditation practices
- **Mood Tracking**: Before/after session mood assessment
- **Personal Journal**: Reflection notes and meditation insights
- **Goal Setting**: Customizable daily, weekly, and monthly targets

### Achievement System
- **Progress Badges**: Unlockable achievements for milestones
- **Streak Rewards**: Recognition for consistent practice
- **Category Exploration**: Badges for trying different meditation types
- **Time Milestones**: Achievement for session duration goals
- **Consistency Awards**: Recognition for regular practice

### Customization Options
- **Personal Recommendations**: AI-suggested sessions based on usage
- **Custom Playlists**: Create personalized meditation collections
- **Guidance Density**: Adjustable talking vs. silence ratio
- **Reminder System**: Customizable meditation notifications
- **Preferred Times**: Schedule optimization for personal routine
- **Difficulty Adaptation**: Progressive skill level adjustment

## 🎧 Podcast & Radio Platform

### Meditation Podcasts
- **The Mindful Moment**: Daily mindfulness insights (145 episodes)
- **Meditation Science**: Research-backed techniques and neuroscience
- **Sleep Stories & Sounds**: Peaceful bedtime content (203 episodes)
- **Anxiety & Stress Relief**: Practical mental health techniques

### Live Radio Stations
- **Calm Radio**: 24/7 ambient meditation music
- **Mindful Beats**: Binaural beats for brainwave entrainment
- **Nature Sounds FM**: Rain, ocean, forest, and wildlife audio
- **Zen Garden**: Traditional Tibetan bowls and meditation music
- **Deep Focus**: Background music for concentration and study

### Audio Features
- **Real-time Player**: Fixed bottom audio player with controls
- **Episode History**: Recently played content tracking
- **Live Listener Count**: Real-time audience numbers for radio stations
- **Playback Controls**: Play, pause, skip, volume adjustment
- **Progress Tracking**: Visual progress bar for current audio

## 🌟 Interactive Elements

### Community Features (Future Implementation)
- **Group Sessions**: Live or scheduled meditation with others
- **Challenges**: Meditation challenges with friends and community
- **Discussion Forums**: Experience sharing and community support
- **Teacher Q&A**: Direct interaction with meditation instructors
- **Buddy System**: Meditation partner matching

### Learning Resources
- **Technique Explanations**: Detailed instruction for each method
- **Philosophy Content**: History and principles of meditation
- **Scientific Research**: Evidence-based benefits and studies
- **Practice Tips**: Guidance for building consistent habits
- **Troubleshooting**: Solutions for common meditation obstacles

## 🏗️ Technical Architecture

### Database Schema

#### Users Table
```sql
users (
  id, email, password_hash, created_at, updated_at,
  profile_name, preferred_language, timezone,
  notification_preferences, subscription_status
)
```

#### Meditation Sessions Table
```sql
meditation_sessions (
  id, user_id, session_type, category, duration,
  started_at, completed_at, mood_before, mood_after,
  notes, background_sound, guidance_level
)
```

#### User Progress Table
```sql
user_progress (
  id, user_id, current_streak, longest_streak,
  total_minutes, total_sessions, last_session_date,
  achievements_unlocked, goals_current, goals_target
)
```

#### Content Library Table
```sql
content_library (
  id, title, description, category, duration,
  difficulty_level, narrator, background_sounds,
  file_url, transcript, tags, created_at
)
```

#### Podcasts Table
```sql
podcasts (
  id, title, host, description, category,
  episode_count, average_duration, cover_image,
  rss_feed, last_updated
)
```

#### Radio Stations Table
```sql
radio_stations (
  id, name, genre, description, stream_url,
  current_listeners, tags, is_active
)
```

### Component Structure
- **Pages**: Index (main dashboard with tabbed navigation)
- **Components**: 
  - MeditationTimer (customizable meditation sessions)
  - BreathingExercise (visual breathing guides)
  - ProgressTracker (statistics and achievements)
  - PodcastRadio (audio content platform)
- **UI Components**: Shadcn/ui component library
- **Styling**: Tailwind CSS with custom gradients and animations

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- npm or yarn package manager

### Installation
```bash
# Clone the repository
git clone <repository-url>

# Navigate to project directory
cd mindful-space

# Install dependencies
npm install

# Start development server
npm run dev
```

### Environment Setup
Create a `.env.local` file for environment variables:
```
VITE_API_URL=your_api_endpoint
VITE_SUPABASE_URL=your_supabase_url
VITE_SUPABASE_KEY=your_supabase_key
```

## 🛠️ Technology Stack

- **Frontend**: React 18, TypeScript, Vite
- **UI Framework**: Tailwind CSS, Shadcn/ui components
- **State Management**: React hooks and context
- **Icons**: Lucide React
- **Audio**: Web Audio API integration
- **Charts**: Recharts for progress visualization
- **Routing**: React Router DOM
- **Backend**: Supabase (recommended)
- **Authentication**: Supabase Auth
- **Database**: PostgreSQL via Supabase
- **File Storage**: Supabase Storage for audio files

## 📱 Features Implementation Status

### ✅ Completed Features
- [x] Responsive meditation dashboard
- [x] Meditation timer with customizable settings
- [x] Breathing exercise with visual guides
- [x] Progress tracking and statistics
- [x] Achievement system
- [x] Podcast and radio platform
- [x] Audio player controls
- [x] Modern UI with smooth animations
- [x] Session logging and history
- [x] Mood tracking interface
- [x] Meditation journal

### 🚧 In Development
- [ ] User authentication and profiles
- [ ] Database integration
- [ ] Audio file streaming
- [ ] Push notifications
- [ ] Offline mode support
- [ ] Advanced analytics

### 🔮 Future Enhancements
- [ ] AI-powered personalization
- [ ] Social features and community
- [ ] Advanced biometric integration
- [ ] Multi-language support
- [ ] Wearable device connectivity
- [ ] Voice recognition for guided sessions

## 🤝 Contributing

We welcome contributions to MindfulSpace! Please read our contributing guidelines and submit pull requests for any improvements.

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🙏 Acknowledgments

- Meditation content inspired by traditional mindfulness practices
- UI design influenced by leading meditation apps
- Audio processing techniques from Web Audio API documentation
- Community feedback and user research insights

---

**MindfulSpace** - Your journey to inner peace starts here. 🧘‍♀️✨
