Planit Tech Solutions - Event Management Platform

Planit is a modern, responsive event management web application designed to help users list, discover, and showcase events seamlessly. Built with a sleek "glassmorphism" aesthetic, it provides a premium experience for managing corporate gatherings, social parties, and community fests.

🚀 Key Features

Glassmorphism UI: A modern, semi-transparent design system that creates a high-end, immersive feel.

Dynamic Event Listing: Users can list new events via a structured, user-friendly submission form.

Real-time Event Display: Seamlessly fetches and categorizes events into "Upcoming" and "Past" sections using Appwrite backend services.

Secure Authentication: User login/signup integrated with Appwrite Auth for personalized event management.

Responsive Design: Fully optimized for mobile, tablet, and desktop viewing.

Carousel Experience: Engaging hero section showcasing featured events with interactive navigation.

Auto-Security: Implements session handling and idle-timer logout for increased security.

🛠️ Technical Stack

Frontend: HTML5, CSS3 (Custom Glassmorphism), JavaScript (Vanilla ES6+).

Backend & Database: Appwrite (Auth, Database, Storage).

Deployment: Optimized for hosting on static site providers (GitHub Pages, Vercel, Netlify).

📂 Project Structure

/
├── Assets/          # Brand images, videos, and logos
├── CSS/             # Style sheets (Style.css, login.css, signup.css, etc.)
├── HTML/            # Page templates (Index.html, List a new event.html, etc.)
├── JS/              # App logic (appwrite-config.js, navbar.js, etc.)
└── README.md        # Project documentation


⚙️ How to Run Locally

Clone the repository:

git clone [https://github.com/your-username/planit-tech.git](https://github.com/your-username/planit-tech.git)


Use a Web Server:
Since the application uses fetch() to load the navigation bar, it must be served through a local web server to avoid CORS errors.

Open the project folder in VS Code.

Use the Live Server extension to launch the application.

Configure Appwrite:
Ensure your JS/appwrite-config.js is configured with your specific Project ID, Database ID, and Collection IDs from your Appwrite Console.

💡 Contributing

Contributions are welcome! If you'd like to improve the UI or add new event features, feel free to fork this repository and submit a pull request.

Built with passion for seamless event planning.
