# ShelfWise

A platform to catalog your personal book collection, track reading progress, and discover new titles, built with React, TypeScript and Django REST Framework.

## Table of Contents

-   [Description](#description)
-   [Live Demo](#live-demo)
-   [Features](#features)
-   [Tech Stack](#tech-stack)
-   [Screenshots](#screenshots)
-   [Getting Started](#getting-started)
-   [Contact](#contact)

## Description

Shelfwise is a full-stack web application that allows users to discover, track, and organize their reading journey. Built with React and Django, ShelfWise integrates with Google Books API to provide comprehensive book information and reading progress tracking.

The application features a clean, responsive interface built with React and Tailwind CSS, backed by a robust Django REST API with JWT authentication and Redis caching for optimal performance.

## Live Demo

The application is deployed and publicly accessible:

-   **Frontend (Vercel):** [https://shelfwise-library.vercel.app](https://shelfwise-library.vercel.app)
-   **Backend (Render):** [https://shelfwise-be3f.onrender.com](https://shelfwise-be3f.onrender.com)
-   **Database (Neon):** PostgreSQL database hosted on Neon
-   **Caching (Redis Cloud):** Redis caching database for improved performance

_Note: The backend is hosted on a free Render instance, so the initial server response might be slow as the instance "wakes up" from a sleep state._

## Features

### Core Functionality

-   **User Authentication**: Secure registration, login, and JWT-based authentication
-   **Book Discovery**: Search and explore books using Google Books API
-   **Personal Library**: Add books to your personal collection
-   **Reading Progress**: Track reading status (Plan to Read, Reading, Finished)
-   **Progress Tracking**: Monitor page progress for books you're currently reading.

## Tech Stack

### Frontend

-   React
-   TypeScript
-   Tailwind CSS
-   Shadcn
-   Framer Motion
-   Zod

### Backend

-   Django
-   Django Rest Framework
-   PostgreSQL
-   Redis
-   Google Books API

## Screenshots

### Home Page

<img src="./images/home.png" alt="Home Page" width="800px">

Discover and search for books with a clean, intuitive interface.

### Explore Page

<img src="./images/explore.png" alt="Book Search" width="800px">
Discover books by genre.

### Book Search

<img src="./images/search.png" alt="Book Search" width="800px">

Search through millions of books using Google Books API integration.

### Personal Library

<img src="./images/library.png" alt="Personal Library" width="800px">

Manage your personal book collection with reading status tracking.

### Book Details

<img src="./images/book-details.png" alt="Book Details" width="800px">

Detailed book information with options to add to library and track progress.

### Reading Progress Tracking

<img src="./images/progress-1.png" alt="Reading Progress" width="800px">
<br>
<img src="./images/progress-2.png" alt="Reading Progress" width="800px">
Track your reading progress with status updates (Plan to Read, Reading, Finished).

### Login Page

<img src="./images/login.png" alt="Login Page" width="800px">

Secure user authentication with JWT tokens.

### Sign Up Page

<img src="./images/signup.png" alt="Sign Up Page" width="800px">

Easy registration process for new users.

## Getting Started

Follow these instructions to set up and run the project locally.

### Prerequisites

-   **Node.js** (v18 or later)
-   **Python** (v3.8 or later)
-   **PostgreSQL** (v12 or later)
-   **Redis** (for caching)
-   **Git**

### 1. Clone the Repository

```bash
git clone https://github.com/JoyM268/Shelfwise.git
cd shelfwise
```

### 2. Backend Setup

Navigate to the server directory:

```bash
cd server
```

Create and activate a virtual environment:

```bash
# Windows
python -m venv env
env\Scripts\activate

# macOS/Linux
python -m venv env
source env/bin/activate
```

Install dependencies:

```bash
pip install -r requirements.txt
```

Create a `.env` file in the server directory:

```env
SECRET_KEY="your-secret-key-here"
GOOGLE_API_KEY="your-google-books-api-key"
ALLOWED_HOSTS="127.0.0.1,localhost"
ALLOWED_ORIGINS="http://localhost:5173"
CSRF_TRUSTED_ORIGINS="http://localhost:5173"
DATABASE_URL="postgresql://user:password@localhost:5432/shelfwise"
REDIS_URL="redis://localhost:6379"
```

**Note:** For local development, you can use PostgreSQL or SQLite. To use SQLite for development, you can temporarily modify the `DATABASES` setting in `settings.py` to use the commented SQLite configuration.

Run database migrations:

```bash
python manage.py makemigrations
python manage.py migrate
```

Start the development server:

```bash
python manage.py runserver
```

The backend will be available at `http://127.0.0.1:8000`

### 3. Frontend Setup

In a new terminal, navigate to the client directory:

```bash
cd client
```

Install dependencies:

```bash
npm install
```

Create a `.env` file in the client directory:

```env
VITE_SERVER_URL="http://127.0.0.1:8000"
```

Start the development server:

```bash
npm run dev
```

The frontend will be available at `http://localhost:5173`

## Contact

For any questions or suggestions, please reach out to [joy.mascarenhas@outlook.com](mailto:joy.mascarenhas@outlook.com).
