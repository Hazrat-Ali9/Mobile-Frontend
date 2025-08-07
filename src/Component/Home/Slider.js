import React from 'react';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { useAuthState } from 'react-firebase-hooks/auth';
import auth from '../Firebase/firebase.init';
import { useNavigate } from 'react-router-dom';
const Slider = () => {
    const [user] = useAuthState(auth);
     const navigate = useNavigate()
    const sliders = [
        "/images/carosel/1.jpg",
        "/images/carosel/2.jpeg",
        "/images/carosel/3.jpg",
        "/images/carosel/4.jpg",
        "/images/carosel/5.jpg",
    ]
    // Slider Carosel
    return (
        <div className='mb-12 mt-0 w-full h-[600px]'>
            <Swiper
                loop={true}
                autoplay={{
                    delay: 2500,
                }}
                modules={[Autoplay]}
                className="h-full w-full rounded overflow-hidden">
                {
                    sliders.map((slider, index) => {
                        return <SwiperSlide>
                            <div
                                className="hero min-h-screen"
                                style={{
                                    backgroundImage: `url(${slider})`,
                                }}
                            >
                                <div className="hero-overlay bg-opacity-40"></div>
                                <div className="hero-content text-neutral-content text-center">
                                    <div data-aos="flip-up" className="max-w-md">
                                        <h1 className="mb-5 text-5xl font-medium"> Gadget <br/> Galaxy </h1>
                                        <p className="mb-5">
                                            We Provide All Type Of Mobile Parts And Accessories
                                        </p>                                       
                                            <button className='btn' onClick={() => {
                                                user ? navigate('') : navigate('')
                                            }}>Get Started</button>

                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    })
                }
            </Swiper>


        </div>
    );
};

export default Slider;