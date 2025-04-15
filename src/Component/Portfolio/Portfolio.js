import React from "react";
// Portfolio js
const Portfolio = () => {
  return (
    <div className="container mx-auto  py-16">
      <div className="my-inpo mb-5 py-5">
        <div className="avatar">
          <div className="w-32 h-36 rounded">
            <img
              src="https://i.ibb.co/smCH4ZD/283342077-757600998736366-5383732411825892613-n.jpg"
              alt="my avater"
            />
          </div>
        </div>
        <h1 className="font-bold">
          Name : <span className="font-normal">Hazrat Ali</span>
        </h1>
        <h1 className="font-bold">
          Email :{" "}
          <span className="font-normal">programmer.hazratali@gmail.com</span>
        </h1>
        <h1 className="font-bold">
          Phone : <span className="font-normal"> +8801986234683</span>
        </h1>
        <h1 className="font-bold mt-3">Skills</h1>
        <ul className="grid grid-cols-2 lg:grid-cols-4 gap-3 mt-4 list-disc border p-5">
          <li>
            <h1>React</h1>
          </li>
          <li>Javascript</li>
          <li>Node js</li>
          <li>Express</li>
          <li>Mongoose</li>
          <li>Css</li>
          <li>Bootstrap</li>
          <li>Tailwind</li>
        </ul>
        <div className="">
          {/* <p className='font-bold mt-5'> I am Hazrat Ali.  I am studied BSC in CSE </p> */}
          <p className="mt-4">
            Hello I'm Hazrat Ali.I am currently pursuing BSC in CSE. I want to
            be a Software Engineer in near future.Now I am currently a MERN
            Stack Developer and I have passion in Web technologies. I am a fast
            learner and I am confident about myself.I believe I can face
            chanllenges of this always changing tech industry.I am looking
            forward to face the upcoming challenges. Talking about my hobby I
            love to read books related to programming and I love to develop
            things with programming languages.Thanks for visiting my profile.   
             
          </p>
          
        </div>
      </div>
    </div>
  );
};

export default Portfolio;
