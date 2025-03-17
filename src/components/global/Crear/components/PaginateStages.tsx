import React, { useState, useEffect } from 'react'

interface PaginateStagesProps {
  currentStage: number
  handleNext: () => void
  handlePrev: () => void
  totalStages: number
}

const PaginateStages: React.FC<PaginateStagesProps> = ({ currentStage, handleNext, handlePrev, totalStages }) => {
  const [startStage, setStartStage] = useState(() => {
    const savedStartStage = localStorage.getItem('startStage')
    return savedStartStage ? parseInt(savedStartStage) : 1
  })

  useEffect(() => {
    localStorage.setItem('startStage', startStage.toString())
  }, [startStage])

  const visibleStages = Array.from(
    { length: Math.min(3, totalStages - startStage + 1) },
    (_, i) => startStage + i
  )

  const handleStageGroupPrev = () => {
    if (currentStage === visibleStages[0]) {
      setStartStage((prev) => Math.max(1, prev - 3))
    }
    handlePrev()
  }

  const handleStageGroupNext = () => {
    if (currentStage === visibleStages[visibleStages.length - 1]) {
      setStartStage((prev) => Math.min(totalStages - 2, prev + 3))
    }
    handleNext()
  }

  return (
    <>
      <nav aria-label="Page navigation example">
        <ul className="flex items-center -space-x-px h-8 text-sm">
          <li>
            <button
              onClick={handleStageGroupPrev}
              disabled={currentStage === 1}
              className="flex items-center justify-center px-3 h-8 ms-0 leading-tight text-gray-500 bg-white border border-e-0 border-gray-300 rounded-s-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Previous</span>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M7 1 1 7l6 6" />
              </svg>
            </button>
          </li>
          {visibleStages.map((stage) => (
            <li key={stage}>
              <button
                onClick={() => {
                  const delta = stage - currentStage
                  if (delta > 0) {
                    Array.from({ length: delta }).forEach(handleNext)
                  } else if (delta < 0) {
                    Array.from({ length: -delta }).forEach(handlePrev)
                  }
                }}
                className={`flex items-center justify-center px-3 h-8 leading-tight border ${
                  currentStage === stage
                    ? 'text-gray-700 bg-gray-200 border-gray-300 hover:bg-gray-100 hover:text-gray-800 z-10'
                    : 'text-gray-500 bg-white border-gray-300 hover:bg-gray-100 hover:text-gray-700'
                }`}
              >
                {stage}
              </button>
            </li>
          ))}
          <li>
            <button
              onClick={handleStageGroupNext}
              disabled={currentStage === totalStages}
              className="flex items-center justify-center px-3 h-8 leading-tight text-gray-500 bg-white border border-gray-300 rounded-e-lg hover:bg-gray-100 hover:text-gray-700"
            >
              <span className="sr-only">Next</span>
              <svg className="w-4 h-4" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 8 14">
                <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m1 13 6-6-6-6" />
              </svg>
            </button>
          </li>
        </ul>
      </nav>
    </>
  )
}

export default PaginateStages