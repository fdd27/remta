'use client'

import { useKeenSlider } from "keen-slider/react"
import "keen-slider/keen-slider.min.css"
import Image from "next/image"
import { useState } from "react"
import { Dialog } from "@headlessui/react"

import images from "@/data/gallery"

function ThumbnailPlugin(mainRef) {
    return (slider) => {
        function removeActive() {
            slider.slides.forEach((slide) => {
                slide.classList.remove("active")
            })
        }
        function addActive(idx) {
            slider.slides[idx].classList.add("active")
        }

        function addClickEvents() {
            slider.slides.forEach((slide, idx) => {
                slide.addEventListener("click", () => {
                    if (mainRef.current) mainRef.current.moveToIdx(idx)
                })
            })
        }

        slider.on("created", () => {
            if (!mainRef.current) return
            addActive(slider.track.details.rel)
            addClickEvents()
            mainRef.current.on("animationStarted", (main) => {
                removeActive()
                const next = main.animator.targetIdx || 0
                addActive(main.track.absToRel(next))
                slider.moveToIdx(Math.min(slider.track.details.maxIdx, next))
            })
        })
    }
}

const Gallery = () => {
    const [sliderRef, instanceRef] = useKeenSlider({
        initial: 0,
    })
    const [thumbnailRef] = useKeenSlider(
        {
            initial: 0,
            slides: {
                perView: 4,
                spacing: 10,
            },
        },
        [ThumbnailPlugin(instanceRef)]
    )

    let [isOpen, setIsOpen] = useState(false)
    const [fsImage, setFsImage] = useState(null)

    return (
        <section id="gallery" className="w-full px-4 md:px-16 xl:px-24 2xl:px-60">
            {/* Dialog to show image pop up */}
            <Dialog
                open={isOpen}
                onClose={() => setIsOpen(false)}
                className="relative z-50"
            >
                {/* The backdrop, rendered as a fixed sibling to the panel container */}
                <div className="fixed inset-0 bg-black/80" aria-hidden="true" />

                {/* Full-screen scrollable container */}
                <div className="fixed inset-0 w-screen overflow-y-auto">

                    {/* Container to center the panel */}
                    <div className="flex min-h-full items-center justify-center p-4">
                        <Dialog.Panel className="mx-auto max-w-xl md:max-w-2xl lg:max-w-4xl xl:max-w-5xl rounded bg-white">
                            <span onClick={() => setIsOpen(false)} className="absolute top-0 right-4 lg:right-8 text-5xl lg:text-7xl font-extrabold text-white cursor-pointer z-50 hover:scale-110 transition duration-200 ease-in-out">&times;</span>
                            <Image src={fsImage} alt="" className="rounded-md" />
                        </Dialog.Panel>
                    </div>
                </div>
            </Dialog>

            <h1 className="text-[#56423E] text-center text-3xl md:text-4xl lg:text-3xl xl:text-[2rem] 2xl:text-4xl font-semibold leading-[3rem] tracking-wider mt-0 mb-8 lg:my-24">
                Галерия
            </h1>

            {/* Slider pics */}
            <div ref={sliderRef} className="keen-slider">
                {images.map((img, i) => {
                    return (
                        <div key={i} className={`keen-slider__slide img-slide${i} cursor-pointer`}>
                            <Image
                                src={img}
                                alt=""
                                fill
                                sizes="(max-width: 1200px) 100vw, 70vw"
                                className="object-cover"
                                onClick={() => {
                                    setFsImage(img)
                                    setIsOpen(true)
                                }}
                                placeholder="blur"
                            />
                        </div>
                    )
                })}
            </div>

            {/* Thumbnails */}
            <div ref={thumbnailRef} className="keen-slider thumbnail lg:mb-24">
                {images.map((img, i) => {
                    return (
                        <div key={i} className={`keen-slider__slide img-slide${i} cursor-pointer`}>
                            <Image
                                src={img}
                                alt=""
                                fill
                                sizes="20vw"
                                className="object-cover"
                                placeholder="blur"
                            />
                        </div>
                    )
                })}
            </div>
        </section>
    )
}

export default Gallery