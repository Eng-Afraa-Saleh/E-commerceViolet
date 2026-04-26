# 🛒💜 Modern E-Commerce Platform

![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB)
![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white)
![TailwindCSS](https://img.shields.io/badge/tailwindcss-%2338B2AC.svg?style=for-the-badge&logo=tailwind-css&logoColor=white)
![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white)

 
## 💡 Overview

[cite_start]A robust, fully responsive e-commerce front-end application built with modern web technologies[cite: 62]. Designed with a focus on clean code architecture, predictable state management, and a professional, minimalist user interface. The platform offers a seamless shopping experience from product discovery to checkout, complemented by a secure administrative dashboard.

## ✨ Key Features

### 🛍️ User Experience
* [cite_start]**Dynamic Product Catalog:** Browse products seamlessly with a dedicated shop page and detailed single-product views[cite: 45, 52].
* [cite_start]**Smart Cart & Wishlist:** Efficient global state management allows users to add, remove, and track items in their cart and wishlist without unnecessary re-renders[cite: 35, 56, 19, 22].
* [cite_start]**Streamlined Checkout:** A clear and intuitive checkout process[cite: 39].
* [cite_start]**Personalized Profiles:** Dedicated user profile management[cite: 48].

### 🛡️ Admin Controls
* [cite_start]**Secure Access:** Dedicated administrative login portal[cite: 32].
* [cite_start]**Management Dashboard:** A centralized hub for managing store operations, inventory, and analytics[cite: 26].

## 🛠️ Tech Stack & Architecture

This project strictly adheres to modern development standards, prioritizing maintainability and performance:

* [cite_start]**Core:** React 18 + Vite for lightning-fast Hot Module Replacement (HMR) and highly optimized production builds[cite: 62, 126].
* [cite_start]**Type Safety:** Fully typed with TypeScript to catch errors early and ensure a predictable codebase[cite: 125].
* [cite_start]**Styling:** Tailwind CSS for a utility-first, highly customizable, and responsive design system that easily supports RTL/LTR scalability[cite: 1, 62].
* [cite_start]**State Management:** React Context API natively structured (`ProductContext`, `CartContext`, `UserContext`, `AdminContext`) to maintain global state elegantly[cite: 18, 19, 20, 21, 22].

## 📂 Project Structure

[cite_start]The codebase is organized for modularity and scalability[cite: 127, 128]:

```text
src/
├── assets/         # Static visual assets
├── components/     # Reusable UI components (Navbar, Footer, ProductCards)
├── context/        # Global state management providers
├── lib/            # Utility functions and mock data
├── pages/          # Full-page route components (Home, Shop, Admin, etc.)
├── types.ts        # Global TypeScript interfaces and type definitions
├── App.tsx         # Main application root and routing
└── main.tsx        # React DOM rendering entry point
```
## ⚙️ Local Development
To get a local copy up and running, follow these simple steps:
1. **Clone the repository:**
  ```bash
  git clone [https://github.com/Eng-Afraa-Saleh/E-commerceViolet.git](https://github.com/Eng-Afraa-Saleh/E-commerceViolet.git)
  ```

  
  2. **Navigate to the directory:**
  ```bash
  cd E-commerceViolet
  ```

  3. **Install dependencies:**
  ```bash
  npm install
  ```

  4. **Start the development server:**
  ```bash
  npm run dev
  ```

  ## 🌐 Deployment
This project is configured for continuous deployment via GitHub Pages. Any push to the main branch triggers a GitHub Action workflow that automatically builds the Vite project and deploys the optimized static files.