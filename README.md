---

# YouTube Video Sharing App

## 1. Introduction
A full-stack web application designed for sharing YouTube videos with a real-time notification system. Users can register, log in, and share their favorite content, while other online users receive instant alerts about new shares.

## 2. Key Features
*   **User Authentication**: Secure registration and login functionality.
*   **Video Sharing**: Share YouTube videos via URL with custom titles and descriptions.
*   **Home Feed**: A centralized list of all shared videos with integrated YouTube players.
*   **Real-time Notifications**: Instant pop-up alerts for newly shared videos using WebSockets (ActionCable) and Background Jobs.

## 3. Tech Stack
*   **Frontend**: React.js, Tailwind CSS, Vitest (Testing Library).
*   **Backend**: Ruby on Rails (API Mode), ActionCable, Redis.
*   **Database**: MySQL.
*   **DevOps**: Docker, Docker Compose.

## 4. Prerequisites
*   Docker and Docker Compose installed.
*   Git (to clone the repository).

## 5. Installation & Configuration (Dockerized)
The application is fully containerized for easy setup. Follow these steps to run it locally:

1.  **Clone the repository**:
```bash
git clone <your-repository-url>
cd YouTube
```
2.  **Build and Start Containers**:
```bash
docker-compose up --build
```
3.  **Setup the Database** (Run this once in a new terminal):
```bash
docker-compose exec api rails db:prepare
```
4.  **Access the Application**:
*   **Frontend**: [http://localhost:5173](http://localhost:5173)
*   **Backend API**: [http://localhost:3000](http://localhost:3000)

## 6. Running the Test Suite
Testing is integrated into both the Backend and Frontend to ensure reliability.

### Backend Tests (Minitest)
```bash
docker-compose exec api rails test
