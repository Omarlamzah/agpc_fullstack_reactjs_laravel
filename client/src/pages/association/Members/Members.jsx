import React, { useState, useEffect } from "react";
import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { apiurl } from "../../../utlis/var";
import axiosInstance from "../../../utlis/axiosInstance";
import Cardteam from "../../../components/Card/cardtem/Cardteam";
import Loader from "../../../components/loader/Loader/Loader";

const Members = () => {
  const [memberList, setMemberList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchMembers();
  }, [currentPage]);

  const fetchMembers = async () => {
    setLoading(true);
    try {
      const response = await axiosInstance.get(
        `${apiurl}/api/membres?per_page=20&page=${currentPage}`
      );
      setMemberList(response.data.data);
      setTotalPages(response.data.last_page);
    } catch (error) {
      console.error("Error fetching members:", error);
      toast.error("Error fetching members");
    } finally {
      setLoading(false);
    }
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
  };

  return (
    <div className="p-6">
      <ToastContainer />
      <h1 className="text-2xl font-bold mb-4">Members</h1>
      {loading ? (
        <p>          <Loader/></p>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {memberList.map((member) => (
            <Cardteam
              key={member.id}
              photo={member.photo}
              civilite={member.civilite}
              nom={member.nom}
              prenom={member.prenom}
              telephone={member.telephone}
              adresse={member.adresse}
              ville={member.ville}
              email={member.email}
            />
          ))}
        </div>
      )}

      <div className="mt-6 w-full flex justify-center">
        {Array.from({ length: totalPages }, (_, i) => (
          <button
            key={i + 1}
            onClick={() => handlePageChange(i + 1)}
            disabled={loading}
            className="bg-gray-300 text-gray-800 px-3 py-1 rounded mr-1 hover:bg-gray-400 disabled:bg-gray-200"
          >
            {i + 1}
          </button>
        ))}
      </div>



       
    </div>
  );
};

export default Members;
