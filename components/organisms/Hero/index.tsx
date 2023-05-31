import Image from "next/image"
import useMediaQuery from "@mui/material/useMediaQuery"
import {
  HERO_IMAGE_PC,
  HERO_IMAGE_SP,
  BLUR_DATA_URL
} from "components/constants"

const Hero: React.FC = () => {
  const isMobile = useMediaQuery("(max-width:400px)")
  return (
    <div className="h-60 md:h-h_full w-screen md:mb-8 mb-6">
      <div className="w-full h-full relative">
        <Image
          src={isMobile ? HERO_IMAGE_SP : HERO_IMAGE_PC}
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
}

export default Hero
