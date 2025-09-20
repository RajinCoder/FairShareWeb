# FairShare Web

A modern web application for splitting restaurant bills fairly among friends. Built with Next.js, TypeScript, and Tailwind CSS.

## Features

- **Welcome Screen**: Clean landing page with app branding
- **People Setup**: Select number of people and enter their names
- **Bill Creation**: Add food items, prices, tip percentage, and tax
- **Food Splitting**: Assign food items to specific people
- **Fair Calculation**: Automatically calculate each person's fair share including proportional tip and tax distribution

## Tech Stack

- **Framework**: Next.js 15 with App Router
- **Language**: TypeScript
- **Styling**: Tailwind CSS
- **Animations**: Framer Motion
- **Icons**: Lucide React
- **State Management**: React Context API with useReducer

## Getting Started

1. **Install dependencies**:

   ```bash
   npm install
   ```

2. **Run the development server**:

   ```bash
   npm run dev
   ```

3. **Open your browser** and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── app/
│   ├── layout.tsx          # Root layout with metadata
│   └── page.tsx            # Main page component
├── components/
│   ├── screens/            # Screen components
│   │   ├── WelcomeScreen.tsx
│   │   ├── FormScreen.tsx
│   │   ├── BillScreen.tsx
│   │   ├── FoodSplitScreen.tsx
│   │   └── SummaryScreen.tsx
│   ├── App.tsx             # Main app component with navigation
│   ├── NextScreenBtn.tsx   # Reusable button component
│   └── Visual.tsx           # Welcome screen visual component
├── context/
│   └── AppContext.tsx      # Global state management
└── types/
    └── index.ts            # TypeScript type definitions
```

## How It Works

1. **Welcome Screen**: Users start by clicking "Create New Bill"
2. **Form Screen**: Select number of people (1-10) and enter their names
3. **Bill Screen**: Add food items with prices, tip percentage, and tax amount
4. **Food Split Screen**: Assign each food item to the people who shared it
5. **Summary Screen**: View calculated fair shares for each person

## Key Features

- **Responsive Design**: Works on desktop, tablet, and mobile devices
- **Smooth Animations**: Framer Motion provides smooth transitions between screens
- **Type Safety**: Full TypeScript implementation with proper type definitions
- **State Management**: Centralized state management using React Context
- **Fair Calculation**: Proportional distribution of tip and tax based on food consumption
- **Modern UI**: Clean, modern interface with Tailwind CSS

## Calculation Logic

The app calculates fair shares by:

1. Dividing each food item's cost among the people who shared it
2. Calculating proportional tip and tax distribution based on each person's food consumption
3. Adding the proportional tip/tax to each person's food share
4. Rounding to the nearest cent for final amounts

## Development

The app uses modern React patterns:

- Functional components with hooks
- TypeScript for type safety
- Context API for state management
- Custom hooks for reusable logic
- Responsive design with Tailwind CSS

## License

This project is based on the original FairShare React Native app and has been converted to a modern web application.
