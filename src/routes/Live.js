import React from "react";
import "../styles/live.css"
 
export default function Live() {
  return (
    <main>
      <nav className="live-nav">
        <a>General</a>
        <a>Powertrain</a>
        <a>Electrical</a>
        <a>Suspension</a>
        <a>Aerodynamics</a>
        <button>Connect</button>
      </nav>
      
    </main>
  );
}