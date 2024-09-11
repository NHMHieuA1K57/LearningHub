import React, { useState, useEffect } from 'react';
import axios from 'axios';
import './UserList.css';
import Header from "../components/layout/Header";
import Footer from "../components/layout/Footer";

const UserList = () => {
  const [activeTab, setActiveTab] = useState('userManagement');
  const [searchKeyword, setSearchKeyword] = useState('');
  const [userData, setUserData] = useState([]);
  const [featureData, setFeatureData] = useState([]);

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  const handleSearch = async () => {
    try {
      const response = await fetch("Localhost:8080/api/v1/user");
      const data = await response.json();

      if (activeTab === 'userManagement') {
        setUserData(data.data);
      } else if (activeTab === 'featureManagement') {
        setFeatureData(data.data);
      }
    } catch (error) {
      console.error('Lỗi khi tìm kiếm:', error);
    }
  };

  useEffect(() => {
    handleSearch();
  }, [activeTab]); // Gọi handleSearch khi activeTab thay đổi


  const renderUserManagement = () => {
    return (
      <div className="management-wrapper">
        <h2>User Management</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>User name</th>
              <th>Phone number</th>
              <th>Last update</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {userData.map((user, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{user.username}</td>
                <td>{user.phoneNumber}</td>
                <td>{user.lastUpdate}</td>
                <td>
                  <span className={`status-dot ${user.status ? 'active' : 'inactive'}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  const renderFeatureManagement = () => {
    return (
      <div className="management-wrapper">
        <h2>Feature Management</h2>
        <div className="search-bar">
          <input
            type="text"
            value={searchKeyword}
            onChange={(e) => setSearchKeyword(e.target.value)}
          />
          <button onClick={handleSearch}>Search</button>
        </div>
        <table>
          <thead>
            <tr>
              <th>STT</th>
              <th>Name</th>
              <th>Description</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {featureData.map((feature, index) => (
              <tr key={index}>
                <td>{index + 1}</td>
                <td>{feature.name}</td>
                <td>{feature.description}</td>
                <td>
                  <span className={`status-dot ${feature.status ? 'active' : 'inactive'}`}></span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    );
  };

  return (
    <div>
      <Header></Header>
    <div className="user-list-container">
      <div className="left-column">
        <h1>Learning Hub</h1>
        <button
          className={`management-button ${activeTab === 'userManagement' ? 'active' : ''}`}
          onClick={() => handleTabChange('userManagement')}
        >
          User Management
        </button>
        <button
          className={`management-button ${activeTab === 'featureManagement' ? 'active' : ''}`}
          onClick={() => handleTabChange('featureManagement')}
        >
          Feature Management
        </button>
      </div>
      <div className="right-column">
        {activeTab === 'userManagement' && renderUserManagement()}
        {activeTab === 'featureManagement' && renderFeatureManagement()}
      </div>
    </div>
    <Footer></Footer>
    </div>
  );
};

export default UserList;