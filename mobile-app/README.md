# ZenAI — Premium AI Soundscapes
React Native (Expo + TypeScript) implementation of the ZenAI mobile app design.

## Folder Structure
```
zenai/
├── App.tsx                          # Root entry point
├── app.json                         # Expo config
├── package.json
├── tsconfig.json
├── babel.config.js
└── src/
    ├── theme/
    │   ├── colors.ts                # All color tokens
    │   ├── typography.ts            # Font sizes, families, letter spacing
    │   ├── spacing.ts               # Spacing scale, border radius, icon sizes
    │   └── index.ts                 # Barrel export
    ├── constants/
    │   └── index.ts                 # App-wide constants (moods, environments, durations)
    ├── components/
    │   ├── ui/
    │   │   ├── Logo.tsx             # ZenAI brand logo + tagline
    │   │   ├── Button.tsx           # Reusable button (primary / secondary / ghost)
    │   │   ├── Input.tsx            # Text input with icon + password toggle
    │   │   ├── SocialButton.tsx     # Google / Apple auth buttons
    │   │   ├── TagChip.tsx          # Selectable mood/environment chips
    │   │   └── NavArrow.tsx         # Left/right circle nav arrows
    │   └── session/
    │       ├── CircularSlider.tsx   # Arc-based duration slider
    │       └── VolumeSlider.tsx     # Horizontal volume control
    ├── navigation/
    │   └── AppNavigator.tsx         # Root + Auth + Main stack navigators + type defs
    └── screens/
        ├── auth/
        │   ├── LoginScreen.tsx
        │   └── RegisterScreen.tsx
        ├── main/
        │   ├── HomeScreen.tsx
        │   └── PremiumScreen.tsx
        └── session/
            ├── SessionLengthScreen.tsx
            ├── MoodScreen.tsx
            ├── EnvironmentScreen.tsx
            ├── CustomVibeScreen.tsx
            ├── ActiveSessionScreen.tsx
            └── SessionCompletedScreen.tsx
```

## Screens
| Screen | Route | Description |
|--------|-------|-------------|
| Login | `Auth/Login` | Email + password + social login |
| Register | `Auth/Register` | Full name, email, password fields |
| Home | `Main/Home` | ZenAI logo + Start Session CTA |
| Premium | `Main/Premium` | Basic / Silver / Gold pricing tiers |
| Session Length | `Main/SessionLength` | Circular arc slider, preset buttons |
| Mood | `Main/Mood` | Multi-select mood chip grid |
| Environment | `Main/Environment` | Single-select environment chip grid |
| Custom Vibe | `Main/CustomVibe` | Free-text prompt + Start Listening |
| Active Session | `Main/ActiveSession` | Live countdown timer, volume, pause/stop |
| Session Completed | `Main/SessionCompleted` | Rating + feedback + save |

## Setup
```bash
npm install
npx expo start
```

## Design Decisions
- **Navigation**: Single flat `MainStack` containing all post-auth screens for simple `navigate()` calls. In production, split into nested stacks with a tab bar.
- **Auth State**: `isAuthenticated = false` toggle in `AppNavigator.tsx`. Wire to a context or Redux store for real sessions.
- **CircularSlider**: Pure React Native implementation (no SVG dependency). Uses 60 dot segments drawn in a circle + PanResponder for drag.
- **VolumeSlider**: Uses `@react-native-community/slider` — install separately if not bundled: `npx expo install @react-native-community/slider`
- **Gold tier price**: Design PDF showed both Silver and Gold at $9.99. Gold was updated to $19.99 as the design appeared to be a placeholder with identical pricing.
- **Font**: Uses platform system fonts. Swap `FontFamily` values in `src/theme/typography.ts` for custom fonts (e.g., `expo-font` + Google Fonts).

## Theme Customization
All design tokens live in `src/theme/`. Change colors, spacing, or font sizes there — every screen and component references these constants.
