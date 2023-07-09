'use client'

import { Raleway } from "next/font/google"
import left_arrow from "../assets/desktop/left-arrow.svg"
import right_arrow from "../assets/desktop/right-arrow.svg"
import Image from "next/image"
import { useState } from "react"
import services_img_1 from "../assets/desktop/services-img-1.svg"
import services_img_2 from "../assets/desktop/services-img-2.svg"
import services_img_3 from "../assets/desktop/services-img-3.svg"
import services_img_4 from "../assets/desktop/services-img-4.svg"
import services_img_5 from "../assets/desktop/services-img-5.svg"
import { RxDotFilled } from 'react-icons/rx'

const raleway = Raleway({
    subsets: ['cyrillic', 'latin'],
    weight: ['400', '500'],
})

const Services = () => {

    const slides = [
        {
            img: services_img_1,
            title: 'Консултация',
            text: 'Започваме с разбиране на вашата визия и изисквания. Нашият екип ще работи в тясно сътрудничество с вас, за да обсъдим вашите идеи, стилови предпочитания, размери и всякакви други специфични подробности. Тази стъпка е от решаващо значение за реализирането на вашата визия.'
        },
        {
            img: services_img_2,
            title: 'Избор на материали и цветове',
            text: 'По време на този етап ще имате възможност да избирате от широка гама висококачествени материали. Нашият екип ще ви насочи при избора на материали, които най-добре отговарят на вашите изисквания за дизайн и издръжливост.'
        },
        {
            img: services_img_3,
            title: 'Конструкция и производство',
            text: 'След като дизайнът, цветовете и материалите са финализирани започваме производствения процес. Всяка мебел е изработена в нашия цех, който съчетава традиционни техники с модерни технологии.'
        },
        {
            img: services_img_4,
            title: 'Гарантиране на качеството',
            text: 'Преди вашите мебели по поръчка да напуснат нашия цех те преминават през строг процес на контрол на качеството. Нашият екип проверява всеки аспект на детайла, за да гарантира, че отговаря на нашите строги стандарти за майсторство, издръжливост и естетика.'
        },
        {
            img: services_img_5,
            title: 'Доставка и монтаж',
            text: 'След като вашите мебели преминат нашата проверка на качеството, ние организираме удобно време за доставка, което отговаря на вашия график. Нашият професионален екип за доставка гарантира, че вашите мебели пристигат безопасно и са експертно монтирани на желаното от вас място.'
        },
    ]

    const [currentIndex, setCurrentIndex] = useState(0)

    const prevSlide = () => {
        const isFirstSlide = currentIndex === 0
        const newIndex = isFirstSlide ? slides.length - 1 : currentIndex - 1
        setCurrentIndex(newIndex)
    }

    const nextSlide = () => {
        const isLastSlide = currentIndex === slides.length - 1
        const newIndex = isLastSlide ? 0 : currentIndex + 1
        setCurrentIndex(newIndex)
    }

    const goToSlide = (slideIndex) => {
        setCurrentIndex(slideIndex)
    }

    return (
        <div id="services" className="w-full h-screen px-6 md:px-16 xl:px-24 2xl:px-44">
            <h1 className="pt-10 lg:pt-40 text-[#56423E] text-center text-3xl md:text-4xl xl:text-[2.5rem] 2xl:text-[2.8125rem] font-semibold leading-[3rem] tracking-wider">Как работи всичко</h1>
            <p className={`max-w-[77.875rem] mx-auto mt-7 font-medium text-[#56423E] text-justify text-base md:text-xl 2xl:text-[1.375rem] leading-4 lg:leading-8 tracking-wide ${raleway.className}`}>
                Държим клиентите ни да участват във всяка стъпка от процеса, за да сме сигурни, че тяхната визия е реализирана във всеки аспект на дизайна. От избора на материалите до размерите и характеристиките, ние работим в тясно сътрудничество с нашите клиенти, за да създадем обзавеждане, което идеално пасва на нуждите и предпочитанията им.
            </p>

            {/* Carousel Buttons*/}
            <div className="flex justify-center items-center mt-8 lg:mt-[4.34rem]">
                {/* Left arrow */}
                <div>
                    <Image className="cursor-pointer hover:scale-110" onClick={prevSlide} src={left_arrow} alt="previous" width='3.125rem' height='2.8125rem' />
                </div>

                {/* Dots */}
                <div className="flex justify-center">
                    {slides.map((slide, slideIndex) => (
                        <div key={slideIndex} onClick={() => goToSlide(slideIndex)} className="text-2xl cursor-pointer hover:scale-110">
                            <RxDotFilled />
                        </div>
                    ))}
                </div>

                {/* Right arrow */}
                <div>
                    <Image className="cursor-pointer hover:scale-110" onClick={nextSlide} src={right_arrow} alt="next" width='3.125rem' height='2.8125rem' />
                </div>
            </div>


            {/* Carousel */}
            <div className="mt-10 mx-auto p-20 flex justify-center items-center xl:w-[69.25rem] xl:h-[23.2065rem] rounded-[1.25rem] bg-[rgba(255,255,255,0.6)] shadow-[7px_7px_0_rgba(0,0,0,0.25)]">
                <div className="flex flex-shrink-0 justify-center items-center xl:w-[16.51963rem] xl:h-[13.30994rem] rounded-[6.25rem_0] border-2 border-solid border-[#FF6E41] bg-white shadow-[4px_4px_0_rgba(0,0,0,0.3)]">
                    <Image
                        src={slides[currentIndex].img} 
                        alt="" 
                        width='7.5rem' 
                        height='7.5rem' 
                    />
                </div>
                <div className="flex flex-col justify-between items-start ml-[4.5rem] h-[13.30994rem]">
                    <h1 className="text-[#FF6E41] text-[1.5625rem] font-medium leading-[3rem] tracking-[0.03125rem]">{slides[currentIndex].title}</h1>
                    <p className={`text-[#56423E] text-justify text-xl ${raleway.className}`}>{slides[currentIndex].text}</p>
                </div>
            </div>

        </div>
    )
}

export default Services