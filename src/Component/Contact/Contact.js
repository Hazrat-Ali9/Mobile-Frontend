import React, { useEffect, useRef, useState } from 'react';
import Lottie from 'lottie-react';
import emailjs from '@emailjs/browser';
import Swal from 'sweetalert2';

const Contact = () => {
    const [contactData, setContactData] = useState(null);

    const form = useRef();

    useEffect(() => {
        fetch('/contact.json')
            .then((response) => response.json())
            .then((data) => setContactData(data))
            .catch((error) => console.error('Error fetching contact data:', error));
    }, []);

    if (!contactData) {
        return <div>Loading...</div>;
    }

    const sendEmail = (e) => {
        e.preventDefault();

        emailjs
            .sendForm('service_z6kxcgb', 'template_gk2kk89', form.current, {
                publicKey: 's3kd9otSruWkqhe9v',
            })
            .then(
                () => {
                    Swal.fire({
                        title: 'Success!',
                        text: 'Your message has been sent successfully.',
                        icon: 'success',
                        confirmButtonText: 'OK',
                    });
                },
                (error) => {
                    Swal.fire({
                        title: 'Error!',
                        text: `Failed to send the message. Error: ${error.text}`,
                        icon: 'error',
                        confirmButtonText: 'Try Again',
                    });
                }
            );
    };

    return (
        <div className="mt-16 mx-auto">
            <div className="grid max-w-screen-xl grid-cols-1 gap-8 px-8 py-16 mx-auto rounded-lg md:grid-cols-2 md:px-12 lg:px-16 xl:px-32 dark:text-gray-800">
                <div className="flex flex-col justify-between h-full">
                    <div className="space-y-2">
                        <h2 className="text-4xl font-bold text-gray-300 leading-tight lg:text-5xl">Contact Us!</h2>
                        <div className="dark:text-gray-400">Have a question? Reach out, and we'll get back to you soon!</div>
                    </div>
                    <Lottie
                        animationData={contactData}
                        className="h-48 md:h-64 lg:h-72 xl:h-80"
                    />
                </div>
                <form ref={form} onSubmit={sendEmail} className="space-y-6">
                    <div>
                        <label htmlFor="name" className="text-sm dark:text-gray-200">Full name</label>
                        <input
                            id="name"
                            type="text"
                            name="user_name"
                            placeholder="Enter your name"
                            className="w-full p-3 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                    </div>
                    <div>
                        <label htmlFor="email" className="text-sm dark:text-gray-200">Email</label>
                        <input
                            id="email"
                            type="email"
                            name="user_email"
                            placeholder="Enter your email"
                            className="w-full p-3 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        />
                    </div>
                    <div>
                        <label htmlFor="message" className="text-sm dark:text-gray-200">Message</label>
                        <textarea
                            id="message"
                            rows="3"
                            name="message"
                            placeholder="Enter your message"
                            className="w-full p-3 rounded dark:bg-gray-800 dark:text-gray-100 dark:border-gray-700"
                        ></textarea>
                    </div>
                    <button
                        type="submit"
                        className="w-full p-3 text-sm font-bold tracking-wide uppercase rounded dark:bg-blue-600 dark:text-gray-50"
                    >
                        Send Message
                    </button>
                </form>
            </div>
        </div>
    );
};

export default Contact;
