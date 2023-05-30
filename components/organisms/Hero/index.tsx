import Image from "next/image"
import { HERO_IMAGE_SRC, BLUR_DATA_URL } from "components/constants"

const Hero: React.FC = () => (
  <div className="sm:h-60 md:h-h_full w-screen md:mb-8 mb-6">
    <div className="w-full h-full relative">
      <Image
        src={HERO_IMAGE_SRC}
        alt="hero-image"
        fill
        className="object-cover sm:h-60 md:h-h_full w-screen"
        placeholder="blur"
        blurDataURL={BLUR_DATA_URL}
        priority
      />
    </div>
  </div>
)

export default Hero
