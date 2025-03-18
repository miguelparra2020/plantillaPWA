import React from "react"
interface CardProps {
    title: string
    subtitle: string
    progress: number
    children: React.ReactNode
  }

const CardGeneral: React.FC<CardProps> = ({ title, subtitle, progress, children }) => {
    return (
        <div className="mt-4 group relative overflow-hidden w-[96%] max-w-md bg-white  border border-zinc-200  rounded-2xl transition-all duration-300 hover:shadow-[0_8px_30px_rgb(0,0,0,0.12)]  min-h-[600px] flex flex-col gap-2">
        <div className="p-4 flex items-center justify-between border-b border-zinc-200 dark:border-zinc-800">
            <div className="flex items-center gap-3">
                <div>
                <h3 className="text-sm font-medium text-zinc-900 dark:text-zinc-100">{title}</h3>
                <p className="text-xs text-zinc-500 dark:text-zinc-400 mb-2">{subtitle}</p>
                <div
                className="bg-gray-400 text-xs font-medium text-gray-100 text-center p-0.5 leading-none rounded-full"
                style={{ width: `${progress}%` }}
            >
                {progress}%
                </div>
                </div>
            </div>                        
          </div>
          {children}
      </div>
    )
  }

  export default CardGeneral