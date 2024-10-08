import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiurl } from "../../../utlis/var";
import axiosInstance from "../../../utlis/axiosInstance";
import Player from "../Player/Player";
import Loader from "../../../components/loader/Loader/Loader";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import the blur effect

const Agpc = ({ scrollPosition }) => {
  const [conferenceList, setConferenceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const type = "conferences_agpc"; // Use "agpc" as the type parameter

  useEffect(() => {
    fetchConferences();
  }, [currentPage]);

  const fetchConferences = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${apiurl}/api/media/type/${type}?per_page=10&page=${currentPage}`
      );
      setConferenceList(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching conferences:", error);
      toast.error("Error fetching conferences");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6 bg-gray-100 min-h-screen  px-14 md:px-56">
      <ToastContainer />
      <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">CONFÉRENCES AGPC</h1>
      
      {loading ? (
        <div className="flex justify-center items-center">
          <Loader />
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {conferenceList.map((conference, index) => (
            <div key={conference.id} className="shadow-[9px_9px_7px_0px_#1a202c] rounded-lg   overflow-hidden">
              {conference.poster && (
                <LazyLoadImage
                  key={index}
                  alt={conference.titre} // Better to use conference title as alt text
                  scrollPosition={scrollPosition} // Pass the scrollPosition prop here
                  src={`${apiurl}/storage/${conference.poster}`}
                  effect="blur" // Apply the blur effect
                  className="w-full "
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: {transitionDelay: "1s"},
                }}
                />
              )}
              <div className="p-4">
                <h2 className="text-xl font-semibold text-gray-800 mb-2">{conference.titre}</h2>
               <div className=" flex justify-between items-end">
                                 <p className="text-sm text-gray-500 mb-4">{conference.date}</p>
                                 <Player url={conference.lien} /> 
               </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-center mt-6">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={loading}
            className={`px-4 py-2 mx-1 rounded-full border ${
              currentPage === i + 1
                ? "bg-blue-500 text-white border-blue-500"
                : "bg-white text-gray-800 border-gray-300"
            } hover:bg-blue-400 hover:text-white transition-colors duration-200 disabled:bg-gray-200 disabled:text-gray-400`}
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Wrap the component with trackWindowScroll HOC
export default trackWindowScroll(Agpc);
