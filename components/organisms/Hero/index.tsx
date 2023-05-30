import Image from "next/image"

const Hero: React.FC = () => (
  <div className="sm:h-60 md:h-h_full w-screen md:mb-8 mb-6">
    <div className="w-full h-full relative">
      <Image
        src="/img/pc-hero.jpg"
        alt="hero-image"
        fill
        className="object-cover sm:h-60 md:h-h_full w-screen"
      />
    </div>
  </div>
)

export default Hero
