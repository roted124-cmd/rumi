# RUMI 20.0

- Expanded the beginner curriculum to 20 missions and 120 vocabulary cards.
- Added XP, learner levels, daily challenge, five-question arcade quiz and sentence-building studio.
- Added achievement badges and parent-facing learning summary.
- Preserved migration from the previous `rumi50` / `rumi30` local progress records.
- Added static asset validation to the Android CI workflow.
- Android package version: `20.0.0` (`versionCode 20`).

## Known limitations

- The 3D character remains a procedural Three.js avatar, not a professionally rigged VRM/GLB character.
- The optional AI backend is source code and must be deployed with an API key by the app owner.
- A debug APK has not been built in this environment because Android SDK / Gradle are not installed here. Use Android Studio or the included GitHub Actions workflow.
