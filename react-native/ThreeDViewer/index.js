// Load polyfills before anything else (defines DOMRect on Hermes).
import './src/polyfills';

import { registerRootComponent } from 'expo';
import App from './App';

registerRootComponent(App);
