import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import Button from "../../ui/button";
import { IoChevronBackOutline, IoChevronForwardOutline } from "react-icons/io5";
import "./index.css";
import bg1 from "../../../assets/images/bg-1.png";
import bg2 from "../../../assets/images/bg-2.png";
import bg3 from "../../../assets/images/bg-3.png";

type Slide = {
  id: number;
  title: string;
  description: string;
  image: string;
  buttonText: string;
  buttonAction: {
    type: "navigate" | "external";
    value: string;
  };
};

const slides: Slide[] = [
  {
    id: 1,
    title: "Start learning something new today",
    description:
      "Explore a wide range of expert-led courses in design, development, business, and more. Find the skills you need to grow your career and learn at your own pace.",
    image: bg1,
    buttonText: "Browse Courses",
    buttonAction: {
      type: "navigate",
      value: "/courses",
    },
  },
  {
    id: 2,
    title: "Pick up where you left off",
    description:
      "Your learning journey is already in progress. Continue your enrolled courses, track your progress, and stay on track toward completing your goals.",
    image: bg2,
    buttonText: "Start Learning",
    buttonAction: {
      type: "navigate",
      value: "/courses",
    },
  },
  {
    id: 3,
    title: "Learn together, grow faster",
    description: "",
    image: bg3,
    buttonText: "Learn More",
    buttonAction: {
      type: "external",
      value: "/courses",
    },
  },
];

export default function HeaderBanner() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const navigate = useNavigate();

  const currentSlide = slides[currentIndex];

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 4000);

    return () => clearInterval(interval);
  }, []);

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

  const goToSlide = (index: number) => {
    setCurrentIndex(index);
  };

  const handleButtonClick = () => {
    const { type, value } = currentSlide.buttonAction;

    if (type === "navigate") {
      navigate(value);
      return;
    }

    if (type === "external") {
      window.open(value, "_blank");
    }
  };

  return (
    <section className="hero-banner">
      <div
        className="hero-banner__background"
        style={{ backgroundImage: `url(${currentSlide.image})` }}
      >
        <div className="hero-banner__overlay" />

        <div className="hero-banner__content">
          <div className="hero-banner__text">
            <h1 className="hero-banner__title">{currentSlide.title}</h1>

            <p className="hero-banner__description">
              {currentSlide.description}
            </p>

            <Button width="206px" height="64px" onClick={handleButtonClick}>
              {currentSlide.buttonText}
            </Button>
          </div>

          <div className="hero-banner__controls">
            <div className="hero-banner__dots">
              {slides.map((slide, index) => (
                <button
                  key={slide.id}
                  type="button"
                  className={`hero-banner__dot ${
                    index === currentIndex ? "active" : ""
                  }`}
                  onClick={() => goToSlide(index)}
                  aria-label={`Go to slide ${index + 1}`}
                />
              ))}
            </div>

            <div className="hero-banner__arrows">
              <button
                type="button"
                className="hero-banner__arrow"
                onClick={handlePrev}
                aria-label="Previous slide"
              >
                <IoChevronBackOutline />
              </button>

              <button
                type="button"
                className="hero-banner__arrow"
                onClick={handleNext}
                aria-label="Next slide"
              >
                <IoChevronForwardOutline />
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
