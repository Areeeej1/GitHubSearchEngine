import React,{useState} from 'react';
import Modal from 'react-modal';
import axios from 'axios';
import "./Home.css";
const customStyles = {
    content: {
      top: '50%',
      left: '50%',
      right: '40%',
      bottom: '-30%',
      marginRight: '-50%',
      transform: 'translate(-50%, -50%)',
      color:"green",
      backgroundColor: "#deb7b7"
    },
  };
  Modal.setAppElement('#root');
  const Home = () => {
    const[keyWord, setKeyWord]=useState("");
    const[searchResult,setSearchResult]=useState("");
    const [modalIsOpen, setIsOpen] = useState(false);
    const [error,setError]=useState("");
    const [error2,setError2]=useState("");
    const [loading,setLoading]=useState(true);
   
      
   
    
      function closeModal() {
        setIsOpen(false);
      }

   const result=(e)=>{
   
    e.preventDefault();
  
    if(keyWord.trim()!==""){
    axios.get(`https://api.github.com/users/${keyWord}`)
    .then(res=>
      {
      
      setSearchResult(res.data);
      setLoading(false);
      setIsOpen(true);
      }
    )
    .catch((error)=>{
      setLoading(false);
      setIsOpen(true);
       setError(error.response.data.message)
    
    })
    }
    else{

      setError2("UserName Required")
    }
   }
   
    return (<> <div className='inputStyle'>
     {error2? <div className='err'>{error2}</div>:null}
        <input placeholder='Enter User Name' onChange={(e)=>{setKeyWord(e.target.value);   if(error2!==""){
      setError2("")
    }}}></input>
        
        <button onClick={(e)=>result(e)}>Search</button>
        </div> 
        <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        style={customStyles}

        >
       {loading? <div>Loading</div> : error? <div>{error}</div>:<>
       <div className='modalDiv'>
        <img src={searchResult?.avatar_url} alt="pic"></img><br></br><br></br>
        UserName:{searchResult?.login===null? <span>Null</span>: <span>{searchResult?.login}</span>}<br></br>
        Name:{searchResult?.name===null? <span>Null</span>: <span>{searchResult?.name}</span>}<br></br>
        Email:{searchResult?.email===null? <span>Null</span>: <span>{searchResult?.email}</span>}<br></br>
        Followers:{searchResult?.followers===null? <span>Null</span>: <span>{searchResult?.followers}</span>}<br></br>
        Following:{searchResult?.following===null? <span>Null</span>: <span> {searchResult?.following}</span>}<br></br>
        Public_gists:{searchResult?.public_gists===null? <span>Null</span>:  <span>{searchResult?.public_gists}</span>}<br></br>
        Public_repos:{searchResult?.public_repos===null? <span>Null</span>: <span> {searchResult?.public_repos}</span>}
         
                
        </div>
       
        </>
  }
        </Modal>
        
        </>);
  };
  
  export default Home;
  