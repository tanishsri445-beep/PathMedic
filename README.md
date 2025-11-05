# 🚨 PathMedic: Ambulance Dispatch Simulation

A modern React + Vite application that visualizes and simulates real-time ambulance dispatch in a city using Dijkstra's shortest path algorithm. Designed for education, demonstration, and practical graph theory applications.

---

## Features

- **Interactive City Map:** 20 interconnected locations, animated SVG visualization
- **Ambulance Fleet:** 4 ambulances, real-time status, mission tracking
- **Emergency Call System:** Multiple severity levels, priority-based dispatch
- **Smart Dispatch:** Dijkstra's algorithm finds optimal ambulance routes
- **Hospital Network:** 3 hospitals, nearest hospital transport simulation
- **Statistics Dashboard:** Total calls, completed missions, active units, average response time
- **Animated UI:** Beautiful gradients, blobs, custom scrollbars, and SVG effects
- **Legend & Active Dispatches:** Footer shows map legend and ongoing missions

---



## Getting Started

### Prerequisites
- [Node.js](https://nodejs.org/) (v18 or newer recommended)
- npm (comes with Node.js)

### Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/tanishsri445-beep/PathMedic.git
   cd ambulance-dispatch
   ```
2. **Install dependencies:**
   ```bash
   npm install
   ```
3. **Start the development server:**
   ```bash
   npm run dev
   ```
4. **Open in browser:**
   Visit [http://localhost:5173](http://localhost:5173) (or as shown in terminal)

### Build for Production
```bash
npm run build
```

### Preview Production Build
```bash
npm run preview
```

---

## Project Structure

```
ambulance-dispatch/
├── public/                # Static assets
├── src/
│   ├── App.jsx            # Main application logic
│   ├── main.jsx           # React entry point
│   ├── App.css            # Custom styles
│   ├── index.css          # Tailwind base
│   └── assets/            # SVGs and images
├── index.html             # HTML shell
├── package.json           # Dependencies and scripts
├── vite.config.js         # Vite configuration
├── tailwind.config.js     # Tailwind configuration
├── postcss.config.js      # PostCSS configuration
├── eslint.config.js       # ESLint configuration
└── README.md              # Project documentation
```

---

## Technologies Used
- **React** (UI library)
- **Vite** (build tool)
- **Tailwind CSS** (utility-first styling)
- **Lucide React** (icon library)
- **SVG** (map visualization)
- **ESLint** (code linting)

---

## How It Works
- **Emergency calls** are generated with random location, severity, and type.
- **Ambulances** are dispatched to the highest priority call using Dijkstra's algorithm for shortest path.
- **Animated routes** show ambulance movement on the map.
- **After pickup**, the patient is transported to the nearest hospital.
- **Statistics** update in real time.

---

## Customization
- Change city nodes, roads, ambulances, or hospitals in `App.jsx`.
- Adjust styles in `App.css` or `index.css`.
- Add new features or UI components as needed.

---

## References
- Dijkstra, E. W. (1959). A note on two problems in connexion with graphs. Numerische Mathematik, 1, 269–271.
- React Documentation: https://react.dev/
- Lucide React: https://lucide.dev/
- Tailwind CSS: https://tailwindcss.com/docs
- SVG Specification: https://www.w3.org/TR/SVG11/
- World Health Organization: Emergency Medical Services
- MIT OpenCourseWare: Graph Theory and Network Optimization

---

## License
This project is for educational and demonstration purposes.

---

## Author
- [tanishsri445-beep](https://github.com/tanishsri445-beep)
