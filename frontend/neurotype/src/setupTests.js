// src/setupTests.js
import "@testing-library/jest-dom";

// Polyfill TextEncoder and TextDecoder
import { TextEncoder, TextDecoder } from "util";

global.TextEncoder = TextEncoder;
global.TextDecoder = TextDecoder;
