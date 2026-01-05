'use client'
import { useState, useEffect } from 'react'

export default function FlipHero() {
    const [currentSlide, setCurrentSlide] = useState(0)

    const banners = [
        '/images/hero_banner_sale.png',
        '/images/hero_banner_phone.png',
        '/images/hero_banner_audio.png',
    ]

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % banners.length)
        }, 4000)
        return () => clearInterval(timer)
    }, [])

    return (
        <div className="relative w-full bg-gray-100 overflow-hidden cursor-pointer h-[200px] md:h-[280px]">
            <div
                className="flex transition-transform duration-500 ease-out h-full"
                style={{ transform: `translateX(-${currentSlide * 100}%)` }}
            >
                {banners.map((src, idx) => (
                    <img
                        key={idx}
                        src={src}
                        alt={`Banner ${idx + 1}`}
                        className="w-full h-full object-cover min-w-full"
                    />
                ))}
            </div>

            {/* Dots */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
                {banners.map((_, idx) => (
                    <div
                        key={idx}
                        className={`w-2 h-2 rounded-full transition-colors ${idx === currentSlide ? 'bg-white' : 'bg-white/50'}`}
                    />
                ))}
            </div>

            {/* Arrows */}
            <button
                className="absolute top-1/2 left-4 -translate-y-1/2 bg-white/30 hover:bg-white rounded-r px-2 py-8 text-black hidden md:block shadow"
                onClick={() => setCurrentSlide(prev => (prev - 1 + banners.length) % banners.length)}
            >
                ❮
            </button>
            <button
                className="absolute top-1/2 right-4 -translate-y-1/2 bg-white/30 hover:bg-white rounded-l px-2 py-8 text-black hidden md:block shadow"
                onClick={() => setCurrentSlide(prev => (prev + 1) % banners.length)}
            >
                ❯
            </button>
        </div>
    )
}
