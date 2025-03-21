# RetroGames

A retro gaming website built using React + Vite with Firebase as the backend and Google authentication.

## Live Demo
[RetroGames Website](https://retrogames-bysid.firebaseapp.com/)

## Features
- Play classic retro games
- Google authentication for user login
- Firebase backend for user management and data storage
- Fast and optimized with Vite

## Tech Stack
- **Frontend:** React, Vite
- **Backend:** Firebase (Authentication, Firestore)
- **Hosting:** Firebase Hosting

## Installation
### Prerequisites
- Node.js installed
- Firebase CLI installed

### Steps
1. Clone the repository:
   ```bash
   git clone https://github.com/yourusername/retrogames.git
   cd retrogames
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Google Sign-In)
   - Configure Firestore (if needed for game data storage)
   - Add Firebase config in `.env` file:
     ```env
     VITE_FIREBASE_API_KEY=your_api_key
     VITE_FIREBASE_AUTH_DOMAIN=your_auth_domain
     VITE_FIREBASE_PROJECT_ID=your_project_id
     ```
4. Start the development server:
   ```bash
   npm run dev
   ```

## Deployment
To deploy the project using Firebase Hosting:
```bash
firebase deploy
```

## Contributing
Feel free to fork the repository and submit pull requests for improvements or bug fixes!

## License
This project is open-source and available under the [MIT License](LICENSE).

## Contact
For any issues or suggestions, reach out at [siddharthapittala.dev@gmail.com] or create an issue in the repository.