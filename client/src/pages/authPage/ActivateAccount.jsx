import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

const ActivateAccount = () => {
  const { token } = useParams(); 
  const [status, setStatus] = useState('Processing...'); 
console.log("Token",status);
  useEffect(() => {
    if (!token) {
      toast.error('Invalid activation token.');
      setStatus('Invalid activation token.');
      return;
    }

    axios
      .post('http://localhost:3002/api/user/activate', { token })
      .then((response) => {
        console.log("Response",response.status);
        if (response.status === 201) {
          toast.success('Account activated successfully!');
          setStatus('Account activated successfully!');
        }
      })
      .catch((error) => {
        console.log("errrr",error);
       toast.error(error)
      });
  }, [token]);

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-lg p-6 my-4"> 
      <h1 className="text-2xl font-bold text-gray-800">Activate Account</h1> 
      <p className="text-gray-600 mt-2"> 
        {
        status
        } 
      </p>
    </div>
  );
};

export default ActivateAccount;
