# 🌤️ Weather4U

[![React](https://img.shields.io/badge/React-19.1.0-61DAFB?style=flat&logo=react)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.2.2-3178C6?style=flat&logo=typescript)](https://www.typescriptlang.org/)
[![PWA](https://img.shields.io/badge/PWA-Ready-5A0FC8?style=flat&logo=pwa)](https://web.dev/progressive-web-apps/)
[![License](https://img.shields.io/badge/License-All%20Rights%20Reserved-red?style=flat)](#license)

> A modern, responsive Progressive Web App for real-time weather updates and air quality monitoring
> across the globe.

Weather4U delivers comprehensive weather information with a beautiful, intuitive interface that
works seamlessly across all devices. Built with React, TypeScript, and modern web technologies.

## ✨ Features

### 🌍 **Global Weather Coverage**

- Real-time weather data for any city worldwide
- Comprehensive weather metrics including temperature, humidity, pressure, wind, and visibility
- Automatic location detection and manual city search

### 🔄 **Smart Updates**

- Auto-refresh every 10 minutes for current data
- Manual refresh option for instant updates
- Intelligent caching for optimal performance

### 🌈 **Air Quality Monitoring**

- Real-time Air Quality Index (AQI) data
- Detailed pollutant breakdown (PM2.5, PM10, O3, NO2, SO2, CO)
- Color-coded quality indicators and health recommendations

### 🎨 **Modern UI/UX**

- **Dark/Light/System Theme**: Automatic theme switching based on user preference
- **Responsive Design**: Optimized for desktop, tablet, and mobile devices
- **Progressive Web App**: Install on any device for native app-like experience
- **Smooth Animations**: Beautiful starlight animations and transitions
- **iOS Optimized**: Enhanced experience for iOS Safari and PWA installation

### 🌐 **Internationalization**

- **Multi-language Support**: English, Spanish, Portuguese, French
- **Dynamic Translations**: All content adapts to selected language
- **Localized Date/Time**: Format adapts to language preferences

### ⚙️ **Customization**

- **Imperial/Metric Units**: Toggle between measurement systems with persistence
- **Theme Persistence**: Your preferences are saved across sessions
- **Location Memory**: Remembers your last searched location

### 🔧 **Technical Excellence**

- **Clean Architecture**: Domain-driven design with clear separation of concerns
- **TypeScript**: Full type safety and enhanced developer experience
- **Performance Optimized**: Lazy loading, code splitting, and efficient state management
- **Error Handling**: Robust error boundaries and graceful fallbacks

## 📱 Demo

### Web Version

<img src='https://raw.githubusercontent.com/RodoAgusSM/Web_Weather_4_U/HEAD/src/demo_images/weather_web.gif?v=2' width='600' height='auto' alt='Weather4U Web Demo'>

### Mobile Version

<img src='https://raw.githubusercontent.com/RodoAgusSM/Web_Weather_4_U/HEAD/src/demo_images/weather_mobile.gif?v=2' width='300' height='auto' alt='Weather4U Mobile Demo'>

## 🚀 Quick Start

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn package manager
- OpenWeatherMap API key (free at [openweathermap.org](https://openweathermap.org/api))

### Installation

1. **Clone the repository**

   ```bash
   git clone https://github.com/RodoAgusSM/Web_Weather_4_U.git
   cd Web_Weather_4_U/Weather_4_U
   ```

2. **Install dependencies**

   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up environment variables**

   Create a `.env` file in the root directory:

   ```bash
   REACT_APP_WEATHER_API_KEY=your_openweathermap_api_key_here
   ```

4. **Start development server**

   ```bash
   npm start
   # or
   yarn start
   ```

5. **Open your browser** Navigate to `http://localhost:3000` and enjoy real-time weather updates!

### Build for Production

```bash
npm run build
# or
yarn build
```

## 🏗️ Architecture

Weather4U follows Clean Architecture principles:

```
src/
├── application/        # Use cases and business logic
├── domain/            # Entities and domain models
├── infrastructure/    # External services and data sources
├── presentation/      # React components and UI logic
├── shared/           # Common utilities and types
├── styles/           # Global styles and themes
└── translations/     # Internationalization files
```

### Key Technologies

- **Frontend**: React 18, TypeScript, Styled Components
- **State Management**: React Context API with custom hooks
- **API Integration**: OpenWeatherMap API
- **Styling**: CSS-in-JS with styled-components
- **Internationalization**: react-i18next
- **Build Tool**: Create React App with custom configurations

## 🌟 Contributing

Contributions are welcome! This project is actively maintained and open to improvements.

### Development Guidelines

1. Follow the existing code style and architecture patterns
2. Write meaningful commit messages
3. Test your changes across different devices and browsers
4. Update documentation when adding new features

## 📄 License

**All Rights Reserved**

This project is the intellectual property of **Rodolfo Agustín Silva Messano**, Software Engineer
from Montevideo, Uruguay.

Unauthorized copying, modification, distribution, or use of this software is strictly prohibited
without explicit written permission from the author.

## 👨‍💻 Author

**Rodolfo Agustín Silva Messano**  
Software Engineer | Montevideo, Uruguay

- 🌐 Portfolio: [github.com/RodoAgusSM](https://github.com/RodoAgusSM)
- 💼 LinkedIn:
  [https://www.linkedin.com/in/rodolfosilvamessano/](https://www.linkedin.com/in/rodolfosilvamessano/)
- 📧 Email: [rodoagussm@gmail.com](mailto:rodoagussm@gmail.com)

---

<div align="center">

**Made with ❤️ in Uruguay**

_Weather4U - Your gateway to global weather information_

</div>
