#!/usr/bin/env bash
# Aligns this project to the LATEST Expo SDK so it matches a current Expo Go app.
# Run this if you hit "private properties are not supported" or any other error
# that points at React Native's own runtime modules (an SDK / Hermes mismatch).
set -e

cd "$(dirname "$0")"

echo "▸ Removing stale install + caches…"
rm -rf node_modules package-lock.json .expo

echo "▸ Installing the latest Expo SDK…"
npm install expo@latest

echo "▸ Aligning react, react-native and other deps to that SDK…"
npx expo install --fix
npx expo install react-native-safe-area-context

echo "▸ Starting Metro with a clean cache…"
npx expo start -c
