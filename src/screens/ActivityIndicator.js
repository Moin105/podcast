import React from "react";
import "./ActivityIndicator.css"; // Import the CSS file for styling

const ActivityIndicator = ({ isLoading }) => {
  if (isLoading) {
    return (
      <div className="activity-indicator">
        <div className="spinner"></div>
      </div>
    );
  }

  return null;
};

export default ActivityIndicator;
