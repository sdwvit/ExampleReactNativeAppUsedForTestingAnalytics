# React Native App with Noibu Integration

This is a simple React Native application that demonstrates the integration of the Noibu React Native SDK.
The app showcases a basic shopping experience with a cart feature and includes functionalities to trigger simulated errors for testing and debugging purposes.

## Table of Contents

- [Introduction](#introduction)
- [Prerequisites](#prerequisites)
- [Getting Started](#getting-started)
- [Features](#features)
- [Simulated Errors](#simulated-errors)
- [Support](#support)
- [License](#license)

## Introduction

The React Native App with Noibu Integration provides a sample e-commerce experience where users can view a list of products, add items to their cart, and view the cart's total. Additionally, the app includes a Noibu integration to capture and report errors in the application.

[Noibu](https://www.noibu.com/) is an error monitoring tool that helps developers identify and resolve errors in web and mobile applications. With the Noibu React Native SDK, you can easily integrate error tracking and monitoring capabilities into your React Native projects.

## Prerequisites

To run this application, you'll need the following installed on your development machine:

- Node.js and npm (Node Package Manager)
- React Native CLI
- Android SDK or Xcode for iOS development

## Getting Started

Follow these steps to get the app up and running on your local machine:

1. Clone this repository to your local machine using Git.
2. Navigate to the project's root directory.

### Installation

Install the required dependencies:

```bash
npm install
```

Additionally, for iOS target do:
```bash
npx pod-install
```

### Running the App
Connect your device or start an emulator.

For Android:
```bash
npx react-native run-android
```

For iOS:
```bash
npx react-native run-ios
```

## Features

The app includes the following features:

- A simple view with a set of interactive elements to mimic real-world e-commerce application.
- Triggers placed to simulate and handle various types of errors for testing and debugging of SDK features.

## Simulated Errors

The application includes several options to simulate errors and test the Noibu React Native SDK's error reporting capabilities. These options can be found in the app under the "Simulated Errors" section:

- **Flush all events and request a help code**: Simulates flushing events to the Noibu server and requesting a help code.
- **Simulate closed socket**: Closes the socket connection to force SDK to reconnect to the Noibu server.
- **Simulate console logged error**: Calls console log with an Error object passed as an argument. Tests certain error catch mechanisms.
- **Simulate sync error**: Throws a synchronous error, which is supposed to be caught by SDK.
- **Simulate react error**: Triggers a React component error caught by ErrorBoundary (Expected Error: Restart the app).
- **Simulate an HTTP call and an async promise rejection**: Initiates an HTTP call and simulates an asynchronous promise rejection which is then caught by SDK.
- **Simulate a form**: an input field. Noibu SDK is supposed to track keyboard typing events on input fields.

## Support

For support and inquiries regarding the Noibu React Native SDK, please refer to the [Readme Section on npm](https://www.npmjs.com/package/noibu-react-native).

## License

Copyright 2023 Noibu.com

Permission to use, copy, modify, and/or distribute this software for any purpose with or without fee is hereby granted, provided that the above copyright notice and this permission notice appear in all copies.

THE SOFTWARE IS PROVIDED “AS IS” AND THE AUTHOR DISCLAIMS ALL WARRANTIES WITH REGARD TO THIS SOFTWARE INCLUDING ALL IMPLIED WARRANTIES OF MERCHANTABILITY AND FITNESS. IN NO EVENT SHALL THE AUTHOR BE LIABLE FOR ANY SPECIAL, DIRECT, INDIRECT, OR CONSEQUENTIAL DAMAGES OR ANY DAMAGES WHATSOEVER RESULTING FROM LOSS OF USE, DATA OR PROFITS, WHETHER IN AN ACTION OF CONTRACT, NEGLIGENCE OR OTHER TORTIOUS ACTION, ARISING OUT OF OR IN CONNECTION WITH THE USE OR PERFORMANCE OF THIS SOFTWARE.
