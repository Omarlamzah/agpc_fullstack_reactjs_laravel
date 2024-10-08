import { BiDownload } from "react-icons/bi"; 
import React, { useState, useEffect } from 'react';
import "./css.css";
import axios from 'axios';
import { apiurl } from '../../utlis/var';

export default function Counter() {
  const [timeLeft, setTimeLeft] = useState({
    days: 0,
    hours: 0,
    minutes: 0,
    seconds: 0,
  });

  const [rotation, setRotation] = useState(0); // State to track rotation value
  const [targetDate, setTargetDate] = useState(null); // State to hold the target date

  const defaultDate = new Date("2024-12-31T23:59:59"); // Default fallback date

  useEffect(() => {
    // Fetch the target date from the API
    axios.get(`${apiurl}/api/target-date`)
      .then(response => {
        setTargetDate(new Date(response.data.targetDate));
      })
      .catch(error => {
        console.error('Error fetching target date:', error);
        setTargetDate(defaultDate); // Set the default date if there's an error
      });
  }, []);

  useEffect(() => {
    if (!targetDate) return;

    const interval = setInterval(() => {
      const now = new Date();
      const difference = targetDate - now;

      if (difference <= 0) {
        clearInterval(interval);
        setTimeLeft({ days: 0, hours: 0, minutes: 0, seconds: 0 });
      } else {
        const days = Math.floor(difference / (1000 * 60 * 60 * 24));
        const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
        const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
        const seconds = Math.floor((difference % (1000 * 60)) / 1000);

        setTimeLeft({ days, hours, minutes, seconds });
      }
    }, 1000);

    return () => clearInterval(interval);
  }, [targetDate]);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setRotation(scrollTop / 10); // Adjust this divisor for more or less rotation
    };

    window.addEventListener("scroll", handleScroll);

    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <section className=" " >

      <section
        className="bg-[#efefef] mt-10 md:mt-[20vh] lg:mt-[25vh] hover:bg-[#ffffffe7] p-3 rounded-xl min-w-[200px] flex flex-col sm:flex-row md:flex-row items-center justify-center gap-2 sm:gap-4 md:gap-6 sm:p-6 md:p-8 text-black"
        style={{
          transform: `rotatex(${rotation}deg)`,
          transition: 'transform 0.3s ease',
        }}
      >
        <div className="mb-4 sm:mb-6 md:mb-8 text-center flex flex-col justify-center items-center gap-2 sm:gap-3 md:gap-4">
          <span className="text-lg sm:text-xl md:text-2xl font-semibold">inscrivez-vous</span>
          <a className="buttoncounter px-3 py-2" href='https://itechagencymaroc.com/AGPC/'>
            Je M'inscris
          </a>
        </div>
        <div className="flex flex-wrap gap-2 sm:gap-4 md:gap-6 text-center">
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#ea261d] text-white w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 flex items-center justify-center rounded-lg shadow-md">
              {timeLeft.days}
            </span>
            <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-3">Days</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold h-12 sm:h-16 md:h-20 flex items-center">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#ea261d] text-white w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 flex items-center justify-center rounded-lg shadow-md">
              {timeLeft.hours}
            </span>
            <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-3">Hours</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold h-12 sm:h-16 md:h-20 flex items-center">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#ea261d] text-white w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 flex items-center justify-center rounded-lg shadow-md">
              {timeLeft.minutes}
            </span>
            <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-3">Minutes</span>
          </div>
          <span className="text-xl sm:text-2xl md:text-3xl font-bold h-12 sm:h-16 md:h-20 flex items-center">:</span>
          <div className="flex flex-col items-center">
            <span className="text-xl sm:text-2xl md:text-3xl font-bold bg-[#ea261d] text-white w-12 sm:w-16 md:w-20 h-12 sm:h-16 md:h-20 flex items-center justify-center rounded-lg shadow-md">
              {timeLeft.seconds}
            </span>
            <span className="text-xs sm:text-sm md:text-base mt-1 sm:mt-2 md:mt-3">Seconds</span>
          </div>
        </div>
      </section>

      <button
        className="mt-3 flex justify-center m-auto items-center cursor-pointer transition-all duration-500 hover:shadow-[0_15px_50px_-15px_#13b6da] py-2 px-4 rounded-[20px] gap-1 bg-gradient-to-r from-[#ea261d] to-[#4e100d]"
      >
        <BiDownload className="animate-bounce w-10 h-10 fill-white" />
        <span className="text-[1.2rem] font-bold text-white pr-3">
          <a href={`${apiurl}/storage/programme/programme.pdf`}>PROGRAMME</a>
        </span>
      </button>

    </section>
  );
}
