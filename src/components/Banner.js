import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css";

function Banner() {
  return (
    <div className="relative">
        <div className="absolute bottom-0 z-20 w-full h-32 bg-gradient-to-t from-gray-100 to-transparent " />
      <Carousel
        autoPlay
        infiniteLoop
        showStatus={false}
        showIndicators={false}
        showThumbs={false}
        interval={5000}
      >
          <div>
              <img src="https://links.papareact.com/gi1" loading="lazy" alt="image" />
          </div>
          <div>
              <img src="https://links.papareact.com/6ff" loading="lazy" alt="image" />
          </div>
          <div>
              <img src="https://links.papareact.com/7ma" loading="lazy" alt="image" />
          </div>
      </Carousel>
    </div>
  );
}

export default Banner;
