import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiurl } from "../../../utlis/var";
import axiosInstance from "../../../utlis/axiosInstance";
import Player from "../Player/Player";
import Loader from "../../../components/loader/Loader/Loader";
import { LazyLoadImage, trackWindowScroll } from 'react-lazy-load-image-component';
import 'react-lazy-load-image-component/src/effects/blur.css'; // Import blur effect

const Hepatologie = ({ scrollPosition }) => {
  const { dateParam } = useParams(); // Extract the date parameter from the URL
  const [conferenceList, setConferenceList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  const type = "journees_hypato"; // Use "journees_hypato" as the type parameter

  useEffect(() => {
    fetchConferences();
   }, [currentPage, dateParam]); // Fetch conferences when dateParam or currentPage changes

  const fetchConferences = async () => {
    setLoading(true);
    try {
      // Include date as parameter in the API request
      const response = await axiosInstance.get(
        `${apiurl}/api/media/type/${type}?date=${dateParam}&per_page=10&page=${currentPage}`
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
    <div className="p-6 bg-gray-100 min-h-screen px-14 md:px-56">
      <ToastContainer />
      <h1 className="text-3xl font-extrabold text-gray-800 mb-8 text-center">JOURNÉES D'HÉPATOLOGIE</h1>
      
      {loading ? (
        <Loader />
      ) : (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3 ">
          {conferenceList.map((conference) => (
            <div key={conference.id} className="shadow-[9px_9px_7px_0px_#1a202c] rounded-lg overflow-hidden">
              {conference.poster && (
                <LazyLoadImage
                  alt={conference.titre}
                  scrollPosition={scrollPosition} // Pass scrollPosition prop
                  src={`${apiurl}/storage/${conference.poster}`}
                  effect="blur" // Apply blur effect
                  className="w-full"
                  wrapperProps={{
                    // If you need to, you can tweak the effect transition using the wrapper style.
                    style: { transitionDelay: "1s" },
                  }}
                />
              )}
              <div className="p-4 flex flex-col justify-end">
                <h4 className="text-lg font-semibold text-gray-800 mb-2">{conference.titre}</h4>
                <div className="flex justify-between items-end">
                  <p className="text-sm text-gray-500 mb-4">{conference.date}</p>
                  <Player url={conference.lien} />
                </div>
              </div>
            </div>
          ))}
        </div>
      )}

      <div className="mt-6 flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={loading}
            className="bg-blue-500 text-white px-4 py-2 rounded-lg mx-1 hover:bg-blue-600 disabled:bg-blue-300"
          >
            {i + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

// Wrap the component with trackWindowScroll HOC
export default trackWindowScroll(Hepatologie);
