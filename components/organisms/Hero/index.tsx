import Image from "next/image"

const Hero: React.FC = () => (
  <div className="sm:h-60 md:h-h_full w-screen md:mb-8 mb-6">
    <Image
      src="/img/pc-hero.jpg"
      alt="hero-image"
      width={1200}
      height={500}
      className="object-cover sm:h-60 md:h-h_full w-screen"
    />
  </div>
)

export default Hero
