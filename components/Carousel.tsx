// @ts-nocheck
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import carouselData from '@/data/carousel.json';

export default function Carousel() {
    const [current, setCurrent] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrent((prev) => (prev + 1) % carouselData.length);
        }, 5000);
        return () => clearInterval(timer);
    }, []);

    return (
        <section className="relative h-[500px] md:h-[600px] overflow-hidden border-y border-stone-200">
            {/* Slides */}
            {carouselData.map((slide, index) => (
                <div
                    key={slide.id}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === current ? 'opacity-100 z-10' : 'opacity-0 z-0'
                        }`}
                >
                    {/* Image */}
                    <Image
                        src={slide.image}
                        alt={slide.title}
                        fill
                        className="object-cover"
                        priority={index === 0}
                    />
                    {/* Overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-stone-950/90 via-stone-950/40 to-transparent flex items-end pb-20">
                        <div className="container mx-auto px-4 text-center md:text-left">
                            <div className={`transition-all duration-700 delay-300 transform ${index === current ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}>
                                <h3 className="text-3xl md:text-5xl font-heading font-bold text-white mb-4 drop-shadow-md">
                                    {slide.title}
                                </h3>
                                <p className="text-lg md:text-xl text-stone-200 max-w-2xl drop-shadow">
                                    {slide.description}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            ))}

            {/* Indicators */}
            <div className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20 flex gap-3">
                {carouselData.map((_, idx) => (
                    <button
                        key={idx}
                        onClick={() => setCurrent(idx)}
                        className={`transition-all duration-300 rounded-full h-3 shadow-md ${idx === current ? 'bg-gold w-10' : 'bg-white/60 w-3 hover:bg-white'
                            }`}
                        aria-label={`Go to slide ${idx + 1}`}
                    />
                ))}
            </div>

            {/* Decoration */}
            <div className="absolute top-0 w-full h-24 bg-gradient-to-b from-stone-900/40 to-transparent z-10 pointer-events-none"></div>
        </section>
    );
}
