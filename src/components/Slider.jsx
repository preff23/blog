import { useState } from 'react';
import '../styles/slider.css';

const reviews = [
  {
    id: 1,
    name: 'Анна',
    text: 'Отличный блог! Очень удобно читать статьи и следить за обновлениями.'
  },
  {
    id: 2,
    name: 'Михаил',
    text: 'Понятный интерфейс и интересный контент. Рекомендую всем!'
  },
  {
    id: 3,
    name: 'Елена',
    text: 'Нашла много полезной информации. Спасибо за качественный контент!'
  },
  {
    id: 4,
    name: 'Дмитрий',
    text: 'Простой и функциональный блог. Именно то, что нужно для изучения.'
  }
];

function Slider() {
  const [currentSlide, setCurrentSlide] = useState(0);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % reviews.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + reviews.length) % reviews.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  const currentReview = reviews[currentSlide];

  return (
    <div className="slider-container">
      <div className="slider-content" style={{ transform: `translateX(-${currentSlide * 100}%)` }}>
        {reviews.map((review) => (
          <div key={review.id} className="slide">
            <div className="slide-avatar">
              {review.name.charAt(0)}
            </div>
            <h3 className="slide-name">{review.name}</h3>
            <p className="slide-text">{review.text}</p>
          </div>
        ))}
      </div>

      <div className="slider-controls">
        <button 
          className="slider-btn" 
          onClick={prevSlide}
          disabled={currentSlide === 0}
        >
          ←
        </button>
        <button 
          className="slider-btn" 
          onClick={nextSlide}
          disabled={currentSlide === reviews.length - 1}
        >
          →
        </button>
      </div>

      <div className="slider-dots">
        {reviews.map((_, index) => (
          <button
            key={index}
            className={`dot ${index === currentSlide ? 'active' : ''}`}
            onClick={() => goToSlide(index)}
          />
        ))}
      </div>
    </div>
  );
}

export default Slider;
