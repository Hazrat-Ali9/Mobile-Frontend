import React from 'react';
// Team
const Team = () => {
    return (
        <div className='py-10'>
            <h1 className='lg:text-4xl font-semibold md:text-4xl text-xl text-center'>Meet My Team</h1>
            <div className='flex flex-wrap justify-center items-center mt-10 gap-5'>
                <TeamCard
                    image={"/images/image.png"}
                    name={"Hazrat Ali"}
                />
                <TeamCard
                    image={"/images/mamber-2.jpeg"}
                    name={"Roma Akter"}
                />
                <TeamCard
                    image={"/images/mamber-1.png"}
                    name={"Sahil Chowdhury"}
                />


            </div>
        </div>
    );
};

export default Team;

const TeamCard = ({ image, name }) => {
    return <div className="card card-compact lg:w-96 md:w-80 w-full bg-base-100 shadow-xl">
        <div className='h-[400px] w-full shadow'
            style={{
                backgroundImage: `url(${image})`,
                backgroundSize: 'cover',
                backgroundPosition: "center"
            }}
        >
        </div>
        <div className="card-body  w-full">
            <h2 className="text-2xl font-semibold text-center">{name}</h2>
        </div>
    </div>
}