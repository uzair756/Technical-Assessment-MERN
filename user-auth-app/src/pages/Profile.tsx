import React, { useEffect, useState } from 'react';
import { Button, Modal, Form } from 'react-bootstrap';
import { useNavigate } from 'react-router-dom';
import './Profile.css'; // Import the CSS file

const Profile = () => {
  const [user, setUser] = useState<any>(null);
  const [showModal, setShowModal] = useState(false);
  const [updatedName, setUpdatedName] = useState<string>('');
  const [updatedEmail, setUpdatedEmail] = useState<string>('');
  const [updatedPassword, setUpdatedPassword] = useState<string>('');
  const [successMessage, setSuccessMessage] = useState<string>('');
  const navigate = useNavigate();

  useEffect(() => {
    const fetchProfile = async () => {
      try {
        const token = localStorage.getItem('token'); // Retrieve the token from localStorage
        const response = await fetch('http://localhost:3002/profile', {
          method: 'GET',
          headers: { 'Authorization': `Bearer ${token}` }, // Include JWT token in Authorization header
        });

        if (response.ok) {
          const data = await response.json();
          console.log('Profile data:', data); // Debug log to check fetched data

          if (data.success) {
            setUser(data.user);
            setUpdatedName(data.user.name || '');
            setUpdatedEmail(data.user.email || '');
          } else {
            alert(data.message); // Handle case where user is not authenticated
          }
        } else {
          console.error('Failed to fetch profile');
        }
      } catch (error) {
        console.error('Error fetching profile:', error);
        alert('An error occurred');
      }
    };

    fetchProfile();
  }, []);

  const handleUpdate = async () => {
    try {
      const token = localStorage.getItem('token'); // Retrieve the token from localStorage
      const response = await fetch('http://localhost:3002/profile', {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify({
          name: updatedName || user.name,
          email: updatedEmail || user.email,
          password: updatedPassword
        })
      });

      const data = await response.json();
      if (data.success) {
        setSuccessMessage('Profile updated successfully!'); // Set success message
        setUser({ ...user, name: updatedName || user.name, email: updatedEmail || user.email });
        setShowModal(false);
        setTimeout(() => setSuccessMessage(''), 5000); // Hide message after 5 seconds
      } else {
        alert(data.message);
      }
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('An error occurred');
    }
  };

  const handleSignOut = () => {
    localStorage.removeItem('token'); // Remove the token from localStorage
    navigate('/login'); // Navigate to the login page
  };

  return (
    <div className='app-container'>
      <Button
        variant='outline-light'
        onClick={handleSignOut}
        className='logout-button'
      >
        Log Out
      </Button>
      <h1 className='title'>Profile Details</h1>

      {user ? (
        <div>
          <table className='profile-table'>
            <tbody>
              <tr>
                <td className='bold'>Name:</td>
                <td>{user.name}</td>
              </tr>
              <tr>
                <td className='bold'>Email:</td>
                <td>{user.email}</td>
              </tr>
            </tbody>
          </table>
          <Button variant='dark' className='update-button' onClick={() => setShowModal(true)}>Update Details</Button>

          <Modal show={showModal} onHide={() => setShowModal(false)}>
            <Modal.Header closeButton>
              <Modal.Title>Update Profile</Modal.Title>
            </Modal.Header>
            <Modal.Body>
              <Form>
                <Form.Group controlId="formName">
                  <Form.Label>Name</Form.Label>
                  <Form.Control
                    type="text"
                    placeholder={user.name}
                    value={updatedName}
                    onChange={(e) => setUpdatedName(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formEmail">
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="email"
                    placeholder={user.email}
                    value={updatedEmail}
                    onChange={(e) => setUpdatedEmail(e.target.value)}
                  />
                </Form.Group>
                <Form.Group controlId="formPassword">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    placeholder="Leave blank to keep current password"
                    value={updatedPassword}
                    onChange={(e) => setUpdatedPassword(e.target.value)}
                  />
                </Form.Group>
              </Form>
            </Modal.Body>
            <Modal.Footer>
              <Button variant="secondary" onClick={() => setShowModal(false)}>
                Close
              </Button>
              <Button variant="primary" onClick={handleUpdate}>
                Save Changes
              </Button>
            </Modal.Footer>
          </Modal>

          {/* Success Message */}
          {successMessage && (
            <div className="success-message">
              {successMessage}
            </div>
          )}
        </div>
      ) : (
        <p>Loading profile...</p>
      )}
    </div>
  );
};

export default Profile;
