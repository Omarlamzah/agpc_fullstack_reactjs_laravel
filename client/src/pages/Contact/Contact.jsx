import React, { useState } from 'react';
import { BiMailSend } from "react-icons/bi";
import { motion } from 'framer-motion';
import Titleanimated from '../../components/Title/Titleanimated';
import { Player } from "@lottiefiles/react-lottie-player";
import AnimatedCursor from "react-animated-cursor";
import axiosInstance from "../../utlis/axiosInstance";
import { apiurl } from "../../utlis/var";
import "./css.css";

export default function Contact() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    sujet: '',
    message: ''
  });

  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setSuccess(false);
    setError(null);
    setValidationErrors({});

    try {
      const response = await axiosInstance.post(`${apiurl}/api/contact`, formData);
      setLoading(false);

      if (response.data.message === "OK") {
        setSuccess(true);
        setError(null);
        setValidationErrors({});
        // Optionally reset the form
        setFormData({
          name: '',
          email: '',
          sujet: '',
          message: ''
        });
      } else {
        setError('Unexpected response from the server.');
      }
    } catch (error) {
      setLoading(false);
      if (error.response && error.response.data) {
        if (error.response.status === 422) {
          // Handle validation errors
          setValidationErrors(error.response.data.errors || {});
          setError(error.response.data.message || 'Validation error');
        } else {
          setError('There was an error sending your message.');
        }
        setSuccess(false);
      } else {
        setError('There was an error sending your message.');
      }
    }
  };

  return (
    <section className="m-auto">
      <motion.h6
        className="my-3 m-auto bg-slate-950 md:w-[180px] mb-6"
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
      >
        <Titleanimated text="CONTACT" />
      </motion.h6>

      <div className="form-container m-auto">
        <motion.div 
          className="form flex flex-col justify-center items-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
        >
          <span className="heading">Contactez Nous</span>
          <Player src="assets/contact/anim.json" loop autoplay className="player w-32 "/>  

          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-2">
            <div className="flex gap-2 w-full">
              <motion.input 
                placeholder="Votre Nom" 
                name="name" 
                type="text" 
                className={`input ${validationErrors.name ? 'border-red-500' : ''}`}
                value={formData.name}
                onChange={handleChange}
                initial={{ x: -50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                required
              />
              <motion.input 
                placeholder="Email:" 
                name="email" 
                type="email" 
                className={`input ${validationErrors.email ? 'border-red-500' : ''}`}
                value={formData.email}
                onChange={handleChange}
                initial={{ x: 50, opacity: 0 }}
                whileInView={{ x: 0, opacity: 1 }}
                transition={{ duration: 0.5 }}
                required
              />
            </div>
            <motion.input 
              placeholder="Sujet" 
              name="sujet" 
              type="text" 
              className={`input ${validationErrors.sujet ? 'border-red-500' : ''}`}
              value={formData.sujet}
              onChange={handleChange}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              required
            />
            <motion.textarea 
              placeholder="Message" 
              rows="10" 
              cols="30" 
              name="message" 
              className={`textarea ${validationErrors.message ? 'border-red-500' : ''}`}
              value={formData.message}
              onChange={handleChange}
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              transition={{ duration: 0.6 }}
              required
            ></motion.textarea>
            <motion.div 
              className="button-container"
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.7 }}
            >
              <motion.button 
                type="submit"
                className="send-button text-white cursor-pointer flex justify-center items-center gap-2 text-xl"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.95 }}
                disabled={loading}
              >
                <span>{loading ? 'Sending...' : 'Validate'}</span> 
                <BiMailSend className="animate-pulse w-8 h-8"/>
              </motion.button>
            </motion.div>
          </form>

          {success && (
  <div className="mt-4 p-4 bg-green-100 border border-green-300 text-green-800 rounded-lg">
    Your message has been sent successfully!
  </div>
)}
{error && (
  <div className="mt-4 p-4 bg-red-100 border border-red-300 text-red-800 rounded-lg">
    {error}
  </div>
)}

          {Object.keys(validationErrors).length > 0 && (
            <div className="validation-errors">
              {Object.keys(validationErrors).map((key) => (
                <p key={key}>{validationErrors[key].join(', ')}</p>
              ))}
            </div>
          )}
        </motion.div>
      </div>

     
    </section>
  );
}
