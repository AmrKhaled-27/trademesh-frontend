# Trademesh Marketplace Frontend

Trademesh is a distributed online marketplace designed to facilitate seamless transactions within a virtual economy system. This frontend application provides the user interface for authenticating users, managing products, tracking orders, and interacting with the Trademesh backend via a robust API. Built with React and Vite, it emphasizes performance, modularity, and a clean user experience.

## Architecture & Structure

This project follows a modular React architecture to maintain clean separation of concerns and enable rapid scaling of features:

```
trademesh-frontend/
├── public/                 # Static assets
└── src/
    ├── api/                # Axios/fetch clients and API endpoints (auth.js, user.js)
    ├── components/         # Reusable UI components (Navbar, Button, Input)
    ├── hooks/              # Custom React hooks containing business and state logic (useAuth, useUser)
    ├── layouts/            # Page structures containing persistent elements (AuthLayout, MainLayout, StudioLayout)
    └── pages/              # Application routing views
        ├── home/           # Main landing page
        ├── login/          # Auth - Login flow
        ├── signup/         # Auth - Registration flow
        ├── otp/            # Auth - OTP Verification
        └── studio/         # Seller dashboard
            ├── analytics/  # Store analytics
            ├── dashboard/  # Main overview
            ├── inventory/  # Product management
            ├── orders/     # Order tracking
            └── settings/   # Store configurations
```

## Prerequisites

1.  **Node.js** (v18+)
2.  Running instance of the **Trademesh Backend** (local or remote)

## Setup & Execution

**1. Install Dependencies**

```bash
npm install
```

**2. Setup Environment Variables**
Create a `.env` file in the root directory and configure necessary variables (e.g., targeting the backend API URL).

```env
VITE_API_BASE_URL=http://localhost:3000/api
```

**3. Start the Development Server**

```bash
# Boot up Vite with Hot Module Replacement (HMR) for active development
npm run dev
```

**4. Build for Production**

```bash
# Create an optimized production build
npm run build
```

## Tooling & Linting

This project uses Husky (`pre-commit`) and `lint-staged` to enforce code quality and formatting before commits are pushed.
