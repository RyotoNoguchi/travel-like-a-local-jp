import { ArrowProps } from "react-multi-carousel/lib/types"

const ArrowLeft: React.FC = (arrowProps: ArrowProps) => (
  <div className="flex justify-center absolute arrow-btn left-0 text-center py-3 cursor-pointer bg-pink-600 rounded-full">
    <svg
      xmlns="http://www.w3.org/2000/svg"
      className="h-6 text-white w-full"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
      onClick={() => arrowProps.onClick?.()}
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="2"
        d="M10 19l-7-7m0 0l7-7m-7 7h18"
      />
    </svg>
  </div>
)

export default ArrowLeft
