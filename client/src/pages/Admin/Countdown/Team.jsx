import { BiListPlus } from "react-icons/bi";
import React, { useState, useEffect } from 'react';
import axiosInstance from '../../../utlis/axiosInstance'; // Import the configured axios instance
import { apiurl } from '../../../utlis/var'; // Import the apiurl
import { toast, ToastContainer } from 'react-toastify';
import "react-toastify/dist/ReactToastify.css";
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import Cookies from 'js-cookie'; // Import js-cookie
import { useNavigate } from 'react-router-dom'; // Import useNavigate for redirection

const Team = () => {
    const [membersList, setMembersList] = useState([]);
    const [formData, setFormData] = useState({
        id: null,
        photo: null,
        civilite: '',
        nom: '',
        prenom: '',
        telephone: '',
        adresse: '',
        ville: '',
        email: '',
    });
    const [currentPage, setCurrentPage] = useState(1);
    const [totalPages, setTotalPages] = useState(1);
    const [loading, setLoading] = useState(false);
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    const navigate = useNavigate(); // Hook for redirection

    useEffect(() => {
        // Check auth token on component mount
        const token = Cookies.get('auth_token'); // Get token from cookies
        if (!token) {
            navigate('/admin/login'); // Redirect to login if token is not present
            return;
        }
        fetchMembers();
    }, [currentPage, navigate]);

    const fetchMembers = async () => {
        setLoading(true);
        try {
            const response = await axiosInstance.get(`${apiurl}/api/membres?per_page=10&page=${currentPage}`);
            setMembersList(response.data.data);
            setTotalPages(response.data.last_page);
            toast.success('Members fetched successfully!');
        } catch (error) {
            if (error.response && error.response.data.error === "You do not have admin access") {
                toast.error('You do not have admin access. Redirecting to login.');
                navigate('/admin/login'); // Redirect to login if unauthorized
            } else if (error.response && error.response.data.error === "Unauthorized") {
                toast.error('Unauthorized access. Redirecting to login.');
                navigate('/admin/login'); // Redirect to login if unauthorized
            } else {
                console.error('Error fetching members:', error);
                toast.error('Error fetching members');
            }
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
            photo: e.target.files[0],
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        const submitData = new FormData();
        if (formData.id) {
            submitData.append("_method", "PUT");
        }
        
        Object.keys(formData).forEach(key => {
            submitData.append(key, formData[key]);
        });

        setLoading(true);
        try {
            if (formData.id) {
                await axiosInstance.post(`${apiurl}/api/membres/${formData.id}`, submitData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Member updated successfully!');
            } else {
                await axiosInstance.post(`${apiurl}/api/membres`, submitData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                toast.success('Member added successfully!');
            }
            fetchMembers();
            resetForm();
            closeModals();
        } catch (error) {
            if (error.response && error.response.data.error === "You do not have admin access") {
                toast.error('You do not have admin access. Redirecting to login.');
                navigate('/admin/login'); // Redirect to login if unauthorized
            } else if (error.response && error.response.data.error === "Unauthorized") {
                toast.error('Unauthorized access. Redirecting to login.');
                navigate('/admin/login'); // Redirect to login if unauthorized
            } else {
                console.error('Error submitting member:', error);
                toast.error('Error submitting member');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleDelete = async (id) => {
        setLoading(true);
        try {
            await axiosInstance.delete(`${apiurl}/api/membres/${id}`);
            fetchMembers();
            toast.success('Member deleted successfully!');
        } catch (error) {
            if (error.response && error.response.data.error === "You do not have admin access") {
                toast.error('You do not have admin access. Redirecting to login.');
                navigate('/admin/login'); // Redirect to login if unauthorized
            } else if (error.response && error.response.data.error === "Unauthorized") {
                toast.error('Unauthorized access. Redirecting to login.');
                navigate('/admin/login'); // Redirect to login if unauthorized
            } else {
                console.error('Error deleting member:', error);
                toast.error('Error deleting member');
            }
        } finally {
            setLoading(false);
        }
    };

    const handleEdit = (member) => {
        setFormData({
            id: member.id,
            photo: null,
            civilite: member.civilite,
            nom: member.nom,
            prenom: member.prenom,
            telephone: member.telephone,
            adresse: member.adresse,
            ville: member.ville,
            email: member.email,
        });
        setIsEditModalOpen(true);
    };

    const handlePageChange = (newPage) => {
        setCurrentPage(newPage);
    };

    const resetForm = () => {
        setFormData({
            id: null,
            photo: null,
            civilite: '',
            nom: '',
            prenom: '',
            telephone: '',
            adresse: '',
            ville: '',
            email: '',
        });
    };

    const openCreateModal = () => {
        resetForm();
        setIsCreateModalOpen(true);
    };

    const closeModals = () => {
        setIsCreateModalOpen(false);
        setIsEditModalOpen(false);
    };

    return (
        <div className="p-6 overflow-scroll text-black">
            <ToastContainer />
            <h1 className="text-2xl font-bold mb-4 text-black">Members Manager</h1>
            <Button
                onClick={openCreateModal}
                className="flex items-center justify-center gap-2 bg-green-500 text-white px-4 py-2 rounded mb-4 hover:bg-green-600"
            > 
                <BiListPlus className="h-10 w-10" />
                <span>Add Member</span>
            </Button>

            <h2 className="text-xl font-semibold mb-4">Members List</h2>
            {loading ? (
                <p>Loading...</p>
            ) : (
                <div className="overflow-x-auto">
                    <table className="min-w-full divide-y divide-gray-200">
                        <thead className="bg-gray-50">
                            <tr>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Civilité</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Nom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Prénom</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Téléphone</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Adresse</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Ville</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Email</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Photo</th>
                                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="bg-white divide-y divide-gray-200">
                            {membersList.map(member => (
                                <tr key={member.id}>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.civilite}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.nom}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.prenom}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.telephone}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.adresse}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.ville}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">{member.email}</td>
                                    <td className="px-6 py-4 whitespace-nowrap">
  <img
    src={
      member.photo === "Male"
        ? `${apiurl}/storage/photos/default/Male.png`
        : member.photo === "Female"
        ? `${apiurl}/storage/photos/default/Female.png`
        : member.photo
        ? `${apiurl}/storage/${member.photo}`
        : `${apiurl}/storage/photos/default/defaultimage.png`
    }
    alt={member.nom}
    className="w-16 h-16 object-cover"
  />
</td>

                                    <td className="px-6 py-4 whitespace-nowrap text-right">
                                        <Button
                                            onClick={() => handleEdit(member)}
                                            className="bg-blue-500 hover:bg-blue-700 mr-2 text-white"
                                        >
                                            Edit
                                        </Button>
                                        <Button
                                            onClick={() => handleDelete(member.id)}
                                            className="bg-red-500 hover:bg-red-700 text-white"
                                        >
                                            Delete
                                        </Button>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                    <div className="flex justify-between mt-4">
                        <button 
                            onClick={() => handlePageChange(currentPage - 1)} 
                            disabled={currentPage === 1} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Previous
                        </button>
                        <button 
                            onClick={() => handlePageChange(currentPage + 1)} 
                            disabled={currentPage === totalPages} 
                            className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                        >
                            Next
                        </button>
                    </div>
                </div>
            )}

            <Modal show={isCreateModalOpen} onHide={closeModals}>
                <Modal.Header closeButton>
                    <Modal.Title className=" text-black">Add New Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className=" text-black">
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo</label>
                            <input type="file" id="photo" name="photo" onChange={handleFileChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="civilite" className="form-label">Civilité</label>
                            <input type="text" id="civilite" name="civilite" value={formData.civilite} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telephone" className="form-label">Téléphone</label>
                            <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="adresse" className="form-label">Adresse</label>
                            <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ville" className="form-label">Ville</label>
                            <input type="text" id="ville" name="ville" value={formData.ville} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
                        </div>
                        <Button type="submit" className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600">
                            {formData.id ? 'Update' : 'Add'} Member
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>

            <Modal show={isEditModalOpen} onHide={closeModals}>
                <Modal.Header closeButton>
                    <Modal.Title className=" text-black">Edit Member</Modal.Title>
                </Modal.Header>
                <Modal.Body>
                    <form onSubmit={handleSubmit} className=" text-black">
                        <div className="mb-3">
                            <label htmlFor="photo" className="form-label">Photo</label>
                            <input type="file" id="photo" name="photo" onChange={handleFileChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="civilite" className="form-label">Civilité</label>
                            <input type="text" id="civilite" name="civilite" value={formData.civilite} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="nom" className="form-label">Nom</label>
                            <input type="text" id="nom" name="nom" value={formData.nom} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="prenom" className="form-label">Prénom</label>
                            <input type="text" id="prenom" name="prenom" value={formData.prenom} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="telephone" className="form-label">Téléphone</label>
                            <input type="text" id="telephone" name="telephone" value={formData.telephone} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="adresse" className="form-label">Adresse</label>
                            <input type="text" id="adresse" name="adresse" value={formData.adresse} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="ville" className="form-label">Ville</label>
                            <input type="text" id="ville" name="ville" value={formData.ville} onChange={handleInputChange} className="form-control" />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email" className="form-label">Email</label>
                            <input type="email" id="email" name="email" value={formData.email} onChange={handleInputChange} className="form-control" />
                        </div>
                        <Button type="submit" className="bg-green-500 text-black px-4 py-2 rounded hover:bg-green-600">
                            Update Member
                        </Button>
                    </form>
                </Modal.Body>
            </Modal>
        </div>
    );
};

export default Team;
