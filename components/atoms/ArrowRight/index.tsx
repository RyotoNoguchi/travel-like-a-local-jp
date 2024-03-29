import { ArrowProps } from "react-multi-carousel/lib/types"

const ArrowRight: React.FC = (arrowProps: ArrowProps) => {
  return (
    <div
      className="flex justify-center absolute arrow-btn right-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full"
      onClick={() => arrowProps.onClick?.()}
    >
      <svg
        xmlns="http://www.w3.org/2000/svg"
        className="h-6 w-6 text-white max-w-full"
        fill="none"
        viewBox="0 0 24 24"
        stroke="currentColor"
      >
        <path
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M14 5l7 7m0 0l-7 7m7-7H3"
        />
      </svg>
    </div>
  )
}

export default ArrowRight
