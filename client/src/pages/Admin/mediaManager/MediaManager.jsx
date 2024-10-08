import { BiListPlus } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utlis/axiosInstance'; // Import the configured axios instance
import { apiurl } from '../../../utlis/var'; // Import the apiurl
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection
import Cookies from 'js-cookie'; // Import js-cookie for cookie handling
import "./css.css"
const MediaManager = () => {



 


    const [mediaList, setMediaList] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        type: '',
        titre: '',
        description: '',
        date: '',
        video: '',
        poster: null,
        etat: 1,
        ordre: '',
        date_creation: '',
        lien: '',
    });
    const [errors, setErrors] = useState({}); // State to track form errors
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const navigate = useNavigate(); // Initialize navigate



      // Check auth token on component mount
     


    useEffect(() => {
        fetchMedia();

        const token = Cookies.get('auth_token'); // Get token from cookies
        if (!token) {
            navigate('/admin/login'); // Redirect to login if token is not present
            return;
        }
    }, [currentPage,navigate]);

    const fetchMedia = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${apiurl}/api/media?per_page=10&page=${currentPage}`);
            setMediaList(response.data.data);
            setTotalPages(response.data.last_page);
            toast.success('Media fetched successfully!');
        } catch (error) {
            handleApiError(error, 'Error fetching media');
        } finally {
            setLoading(false);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleFileChange = (e) => {
        setFormData({
            ...formData,
            poster: e.target.files[0],
        });
    };

    const validateForm = () => {
        let formErrors = {};
        if (!formData.type) formErrors.type = 'Type is required';
        if (!formData.titre) formErrors.titre = 'Title is required';
         if (!formData.date) formErrors.date = 'Date is required';

        setErrors(formErrors);
        return Object.keys(formErrors).length === 0;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) return; // Validate the form before submitting

        const submitData = new FormData();
        if (formData.id) {
            submitData.append("_method", "PUT");
        }
        
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });
    
        submitData.set('etat', formData.etat ? 1 : 0);
    
        setLoading(true);
        try {
            if (formData.id) {
                await axiosInstance.post(`${apiurl}/api/media/${formData.id}`, submitData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Media updated successfully!');
            } else {
                await axiosInstance.post(`${apiurl}/api/media`, submitData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Media added successfully!');
            }
            fetchMedia();
            resetForm();
            closeModals();
        } catch (error) {
           // handleApiError(error, 'Error submitting media');
            toast.error( error.response.data.error);

        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`${apiurl}/api/media/${id}`);
            fetchMedia();
            toast.success('Media deleted successfully!');
        } catch (error) {
           // handleApiError(error, 'Error deleting media');
            toast.error( error.response.data.error);

        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (media) => {
        setFormData({
            id: media.id,
            type: media.type,
            titre: media.titre,
            description: media.description,
            date: media.date,
            video: media.video,
            poster: null,
            etat: media.etat,
            ordre: media.ordre,
            date_creation: media.date_creation,
            lien: media.lien,
        });
        setIsEditModalOpen(true);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const resetForm = () => {
        setFormData({
            id: null,
            type: '',
            titre: '',
            description: '',
            date: '',
            video: '',
            poster: null,
            etat: 1,
            ordre: '',
            date_creation: '',
            lien: '',
        });
        setErrors({});
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
    };

    const handleApiError = (error, defaultMessage) => {
        console.log(defaultMessage, error.response.data.error);
        if (error.response && error.response.data) {
            toast.error( error.response.data.error);
         //   navigate('/admin/login'); // Redirect to login if token is not present
        } else {
            toast.error(defaultMessage);
        }
    };

    return (
        <div className="p-6 overflow-scroll text-black">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4">Conference Manager</h1>
            <Button
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            >
                <BiListPlus className="h-10 w-10" />
                <span>Add Conference</span>
            </Button>

            <h2 className="text-xl font-semibold mb-4">Conference List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Titre</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">conferences</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                 <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Poster</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {mediaList.map(media => (
                                <tr key={media.id}>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{media.titre}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-500">{media.type}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{media.description}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{media.date}</td>
                                     <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{media.poster ? <img src={`${apiurl}/storage/${media.poster}`} alt="Poster" className="w-16 h-16 object-cover" /> : 'No Poster'}</td>
                                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium">
                                        <button
                                            onClick={() => handleEdit(media)}
                                            className="text-indigo-600 hover:text-indigo-900 mr-4"
                                        >
                                            Edit
                                        </button>
                                        <button
                                            onClick={() => handleDelete(media.id)}
                                            className="text-red-600 hover:text-red-900"
                                        >
                                            Delete
                                        </button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <Button onClick={() => handlePageChange(currentPage - 1)} disabled={currentPage === 1}>
                            Previous
                        </Button>
                        <span>Page {currentPage} of {totalPages}</span>
                        <Button onClick={() => handlePageChange(currentPage + 1)} disabled={currentPage === totalPages}>
                            Next
                        </Button>
                    </div>
                </div>
            )}
            
            {/* Create/Edit Modal */}
            <Modal show={isCreateModalOpen || isEditModalOpen} onHide={closeModals}>
                <Modal.Header closeButton>
                    <Modal.Title>{formData.id ? 'Edit' : 'Add'} Media</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} encType="multipart/form-data">
                        <div className="mb-4">
                            <label htmlFor="type" className="block text-sm font-medium text-gray-700">
                                Type
                            </label>
                           

<select   className=" text-black" name="type" id=""      onChange={handleInputChange} >
<option  value="conferences_agpc">----select conf conferences----</option>
                            <option  value="conferences_agpc">conferences agpc</option>
<option value="journees_hypato">journees hypato</option>
<option value="echographie_digestive">echographie_digestive</option>
<option value="conferences">auther conferences</option>
                         </select>


                            {errors.type && <span className="text-red-600 text-sm">{errors.type}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="titre" className="block text-sm font-medium text-gray-700">
                                Title
                            </label>
                            <input
                                type="text"
                                name="titre"
                                value={formData.titre}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.titre && <span className="text-red-600 text-sm">{errors.titre}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="description" className="block text-sm font-medium text-gray-700">
                                Description
                            </label>
                            <textarea
                                name="description"
                                value={formData.description && ""}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.description && <span className="text-red-600 text-sm">{errors.description}</span>}
                        </div>
                        <div className="mb-4">
                            <label htmlFor="date" className="block text-sm font-medium text-gray-700">
                                Date
                            </label>
                            <input
                                type="date"
                                name="date"
                                value={formData.date}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                            {errors.date && <span className="text-red-600 text-sm">{errors.date}</span>}
                        </div>
                        <div className="mb-4 hidden">
                            <label htmlFor="video" className=" hidden  text-sm font-medium text-gray-700">
                                Video URL
                            </label>
                            <input
                                type="text"
                                name="video"
                                value={formData.video}
                                onChange={handleInputChange}
                                className=" hiddenmt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="poster" className="block text-sm font-medium text-gray-700">
                                Poster
                            </label>
                            <input
                                type="file"
                                name="poster"
                                onChange={handleFileChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4 hidden">
                            <label htmlFor="ordre" className="block text-sm font-medium text-gray-700">
                                Order
                            </label>
                            <input
                                type="number"
                                name="ordre"
                                value={formData.ordre}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <div className="mb-4 hidden">
                            <label htmlFor="etat" className="block text-sm font-medium text-gray-700">
                                State
                            </label>
                            <input
                                type="checkbox"
                                name="etat"
                                checked={formData.etat}
                                onChange={() => setFormData({ ...formData, etat: !formData.etat })}
                                className="mt-1 block"
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="lien" className="block text-sm font-medium text-gray-700">
                                Link
                            </label>
                            <input
                                type="text"
                                name="lien"
                                value={formData.lien}
                                onChange={handleInputChange}
                                className="mt-1 block w-full border-gray-300 rounded-md shadow-sm"
                            />
                        </div>
                        <Button variant="primary" type="submit" className="mr-2" disabled={loading}>
  {loading ? 'Waiting...' : `${formData.id ? 'Update' : 'Add'} Media`}
</Button>

                        <Button variant="secondary" onClick={closeModals}>
                            Cancel
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default MediaManager;
