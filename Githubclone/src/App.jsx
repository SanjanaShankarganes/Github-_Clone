import  { useState } from 'react';
import Navbar from './components/Navbar';
import RepositoryHeader from './components/RepositoryHeader';
import TabNavigation from './components/TabNavigation';
import RepoContent from './components/RepoContent';

import './App.css';


const App = () => {
  const [activeTab, setActiveTab] = useState('code');
  const [query, setQuery] = useState('');
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [repos,setRepos]=useState([])
  const handleSearch = async () => {
    try {
      const response = await fetch(`https://api.github.com/users/${query}`);
      if (!response.ok) {
        throw new Error('User not found');
      }
      const data = await response.json();
      setUserData(data);
      setError(null);
      try{
          const res=await fetch(`https://api.github.com/users/${query}/repos`)
          if(res.ok){
            const data= await res.json()
            setRepos(data)
          }
      } 
      catch(error){
        setError(error.message);
        setRepos([]);
      }
    } catch (error) {
      setError(error.message);
      setUserData(null);
    }
  };
  return (
    <div className="App">
      <Navbar 
        query={query} 
        setQuery={setQuery} 
        handleSearch={handleSearch} 
      />
      <div className="container">
      <RepositoryHeader 
        repos={repos}
        userData={userData} 
        error={error} 
      />
        <TabNavigation activeTab={activeTab} setActiveTab={setActiveTab} />
        <RepoContent activeTab={activeTab} />
      </div>
    </div>
  );
};

export default App;