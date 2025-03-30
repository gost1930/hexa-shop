import { Swiper } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
// Import Swiper styles
import 'swiper/swiper-bundle.css';

interface Props {
    customNavigationButtons?: boolean
    children: any
    classnameForDivParent?: string
    type: string
}
const SwiperPro: React.FC<Props> = ({ customNavigationButtons = true, children, classnameForDivParent, type }) => {
    return (
        <div className={`h-full relative mb-4 min-w-full ${classnameForDivParent}`}>
            <Swiper
                direction="horizontal"
                loop={true}
                autoplay={{ delay: 1000 }}
                slidesPerView= {1}
                breakpoints={{
                    200: {
                        slidesPerView: 2,
                    },
                    640: {
                        slidesPerView: 3,
                    },
                }}
                navigation={{
                    nextEl: `.${type}-next`,
                    prevEl: `.${type}-prev`,
                }}
                modules={[Navigation, Pagination]}
                className="mySwiper "
            >

                {children}

            </Swiper>
            {customNavigationButtons && (
                <>
                    <button className={`${type}-next absolute -top-5 md:top-1/2 -right-1 md:-right-16 cursor-pointer hover:bg-black hover:text-white dark:text-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-900 transform -translate-y-1/2 z-10 md:py-3 px-5 border rotate-180`}>
                        &#10094;{/* Right arrow icon */}
                    </button>
                    <button className={`${type}-prev absolute -top-5 md:top-1/2 -left-1 md:-left-16 cursor-pointer hover:bg-black hover:text-white dark:text-gray-100 dark:hover:bg-gray-900 dark:hover:border-gray-900 transform -translate-y-1/2 z-10 md:py-3 px-5 border rotate-180`}>
                        &#10095;{/* Left arrow icon */}
                    </button>
                </>
            )}
        </div>
    );
};

export default SwiperPro;

