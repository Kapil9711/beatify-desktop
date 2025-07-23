import React, { useState } from 'react'
import { motion } from 'framer-motion'

// Define the shape of a single tab item
interface TabItem {
  id: string
  label: string
}

// Define the props for the AnimatedButtonGroup component
interface AnimatedButtonGroupProps {
  tabs: TabItem[]
  initialActiveTabId?: string // Optional ID for the initially active tab
  onTabChange?: (activeTabId: string) => void // Callback when the tab changes
  className?: string // Additional classes for the button group container
}

const AnimatedButtonGroup: React.FC<AnimatedButtonGroupProps> = ({
  tabs,
  initialActiveTabId,
  onTabChange,
  className = ''
}) => {
  // State to keep track of the currently active tab ID
  const [activeTab, setActiveTab] = useState<string>(
    initialActiveTabId || (tabs.length > 0 ? tabs[0].id : '')
  )

  // Handle a tab click
  const handleTabClick = (tabId: string) => {
    setActiveTab(tabId)
    onTabChange?.(tabId) // Call the provided callback if it exists
  }

  // If no tabs are provided, render nothing or a placeholder
  if (tabs.length === 0) {
    return null // Or <div className="p-4 text-gray-500">No tabs available</div>;
  }

  return (
    <div
      className={`
        relative flex items-center
        bg-gray-100 rounded-xl p-1
        shadow-sm
        ${className}
      `}
    >
      {tabs.map((tab) => (
        <button
          key={tab.id}
          onClick={() => handleTabClick(tab.id)}
          className={`
            relative z-10 flex-1
            px-4 py-2
            text-sm font-medium
            text-gray-700
            transition-colors duration-300
            rounded-lg
            focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-0
            ${activeTab === tab.id ? 'text-blue-700' : 'hover:text-gray-900'}
          `}
        >
          {tab.label}
        </button>
      ))}

      {/* The sliding active background */}
      {/* We use a key prop here to ensure Framer Motion treats it as a new element
          when activeTab changes, allowing for re-animation of its position. */}
      {activeTab && (
        <motion.div
          key={activeTab} // Crucial for re-animating position
          layoutId="activeTabIndicator" // For shared layout animation
          className="absolute inset-0 bg-white rounded-lg shadow pointer-events-none"
          // Framer Motion automatically animates 'x' and 'width' changes
          // when `layoutId` is used and the component's parent has `layout`.
          // In this case, it handles the position smoothly.
          transition={{
            type: 'spring',
            stiffness: 350,
            damping: 30,
            duration: 0.3 // Shorter duration for snappier feel
          }}
        />
      )}
    </div>
  )
}

export default AnimatedButtonGroup

// --- How to use it ---
/*
import React, { useState } from 'react';
import AnimatedButtonGroup from './AnimatedButtonGroup'; // Adjust path

function App() {
  const [currentTab, setCurrentTab] = useState('photos');

  const tabs = [
    { id: 'photos', label: 'Photos' },
    { id: 'videos', label: 'Videos' },
    { id: 'documents', label: 'Documents' },
    { id: 'settings', label: 'Settings' },
  ];

  const handleTabChange = (tabId: string) => {
    console.log(`Active tab changed to: ${tabId}`);
    setCurrentTab(tabId);
    // You can perform other actions based on the active tab here
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 flex flex-col items-center justify-center p-8">
      <h1 className="text-4xl font-extrabold text-gray-800 mb-12">Dynamic Tab Group</h1>

      <div className="w-full max-w-md">
        <AnimatedButtonGroup
          tabs={tabs}
          initialActiveTabId="photos"
          onTabChange={handleTabChange}
          className="mb-8"
        />

        <div className="mt-8 p-6 bg-white rounded-xl shadow-lg text-center text-lg text-gray-700">
          <p>Current active content for: <span className="font-bold text-blue-600">{currentTab}</span></p>
          {currentTab === 'photos' && <p className="mt-4">Displaying your amazing photos!</p>}
          {currentTab === 'videos' && <p className="mt-4">Enjoy your video collection!</p>}
          {currentTab === 'documents' && <p className="mt-4">Manage your important documents here.</p>}
          {currentTab === 'settings' && <p className="mt-4">Adjust your preferences.</p>}
        </div>
      </div>
    </div>
  );
}

export default App;
*/
