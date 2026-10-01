import React from 'react'

const Title = ({ text1, text2 }) => {
  return (
    <div className="flex items-center justify-center gap-3 mb-3">
      
      {/* Title */}
      <p className="text-2xl sm:text-3xl md:text-3xl text-gray-600 font-light tracking-tight">
        {text1}

        <span className="ml-1 font-medium text-gray-800">
          {text2}
        </span>
      </p>

      {/* Small line */}
      <span className="w-8 sm:w-10 h-[1px] bg-gray-700"></span>

    </div>
  )
}

export default Title