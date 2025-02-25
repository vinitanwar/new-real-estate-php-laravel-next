export default function loading() {
    return (
      <div className="animate-pulse p-20">
        {/* Header Section */}
        <div className="flex justify-between items-center p-4 border-b">
          <div className="h-8 bg-gray-300 rounded w-24"></div>
          <div className="h-8 bg-gray-300 rounded w-24"></div>
        </div>
  
        {/* Main Content Section */}
        <div className="p-4">
          {/* Title */}
          <div className="h-6 bg-gray-300 rounded w-1/2 mb-4"></div>
  
          {/* Image Placeholder */}
          <div className="h-48 bg-gray-300 rounded-lg mb-4"></div>
  
          {/* Price */}
          <div className="h-6 bg-gray-300 rounded w-1/4 mb-4"></div>
  
          {/* Buttons */}
          <div className="flex space-x-4">
            <div className="h-10 bg-gray-300 rounded w-24"></div>
            <div className="h-10 bg-gray-300 rounded w-24"></div>
          </div>
        </div>
      </div>
    );
  }