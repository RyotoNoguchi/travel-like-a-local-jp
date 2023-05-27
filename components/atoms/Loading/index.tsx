import React from "react"

const Loading: React.FC = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen">
      <div className="animate-spin rounded-full border-4 border-t-4 border-blue-500 h-12 w-12 mb-4" />
      <div className="text-lg text-gray-800">Loading...</div>
    </div>
  )
}

export default Loading
