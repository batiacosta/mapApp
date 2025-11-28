# mapApp

A small Expo + React Native sample app demonstrating `react-native-maps` with a few markers (San Francisco sample markers and University of Oklahoma campus markers).

## Features

- Displays markers from `assets/marker.ts`.
- Initial region set to the University of Oklahoma campus in `app/index.tsx`.
- Defensive handler for marker presses to avoid crashes and log payloads.

## Quick Start

Prerequisites:
- Node.js (recommended v16+)
- `npm` or `yarn`
- Expo CLI (optional global) — you can run with `npx expo` without a global install

Install and run:

```bash
# from project root
npm install
# ensure native deps are compatible with your Expo SDK
npx expo install

# start Metro + Expo dev tools
npx expo start
```

To run on an Android emulator or iOS simulator, use the Expo dev tools or run:

```bash
# Android
npx expo run:android

# iOS
npx expo run:ios
```

If you change native deps, rebuild or run the appropriate Expo commands for your workflow.

## Where to change markers

Markers are defined in `assets/marker.ts`. The app maps over the exported `markers` array in `app/index.tsx`. Edit `assets/marker.ts` to add, remove, or update locations (latitude, longitude, and deltas).

Example marker entry format:

```ts
{
  latitude: 35.2057,
  longitude: -97.4455,
  latitudeDelta: 0.005,
  longitudeDelta: 0.005,
  name: "Gaylord Stadium"
}
```

## Marker press crash / debugging

If the app crashes when tapping a marker, the code now logs the payload passed to the press handler and shows an alert safely. To view the logs:

1. Start Expo: `npx expo start`.
2. Open Metro/Expo logs in the terminal or use `adb logcat` for Android device logs.
3. Look for lines containing `Marker pressed:` which show the payload the handler received.

If you'd like the OU markers shown with a distinct icon or merged differently, edit `app/index.tsx` to render both arrays or merge them in `assets/marker.ts`.

## Keep-awake error on emulator

You might see `Unable to activate keep awake` from `expo-keep-awake` on Android emulator. This is usually harmless on an emulator but may cause an unhandled promise rejection in some setups.

Options:
- Add a global unhandled rejection logger to surface the stack and confirm the source.
- If you don't need `expo-keep-awake`, remove it:

```bash
npm uninstall expo-keep-awake
# or
yarn remove expo-keep-awake
```

- Ensure you have a compatible `expo-keep-awake` version for your Expo SDK by running:

```bash
npx expo install expo-keep-awake
```

## Development notes

- Initial region is configured in `app/index.tsx` (variable `INITIAL_REGION`). Adjust `latitudeDelta`/`longitudeDelta` to change zoom.
- Marker press handler is implemented defensively and logs payloads to help debugging.

## Questions or changes

If you'd like me to:
- Merge OU markers into the main `markers` array,
- Render OU markers with custom icons,
- Or further harden the marker event handling,

tell me which and I’ll patch the code.
