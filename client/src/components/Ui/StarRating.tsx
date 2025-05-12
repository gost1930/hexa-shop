import { useState } from "react";
import { FaStar } from "react-icons/fa6";


const StarRating = ({ totalStars = 5, setRating, rating }: { totalStars?: number, setRating: (value: number) => void, rating: number }) => {
  const [hover, setHover] = useState(0);

  return (
    <div className="flex flex-row-reverse gap-1" dir="rtl">
      {[...Array(totalStars)].map((_, index) => {
        const starValue = index + 1;
        return (
          <button
            key={index}
            type="button"
            className="peer bg-transparent border-none outline-none h-fit"
            onClick={() => setRating(starValue)}
            onMouseEnter={() => setHover(starValue)}
            onMouseLeave={() => setHover(0)}
          >
            <FaStar
              className={`text-lg transition-all duration-200 
                peer-hover:bg-yellow-500 
                ${starValue <= (hover || rating) ? "text-yellow-400 fill-yellow-400" : "text-gray-400"}
              `}
            />
          </button>
        );
      })}
    </div>
  );
};

export default StarRating;
