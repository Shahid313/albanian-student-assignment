import './App.css';
import axios from 'axios'
import React, {useState, useEffect} from 'react'

 function App() {
  const [content, setContent] = useState('')
  const [all_posts, setAll_posts] = useState([])

  useEffect(() => {
    getData()
  }, [])

  function getData(){
    axios.get('http://localhost:5000/apis/posts/get_all_posts').then(res => {
        setAll_posts(res.data.posts)
      
      
    })
  }

  function MakePost(){

    const data={
      "content":content
    }

     axios.post('http://localhost:5000/apis/posts/add_new_post',data).then(res => {
      if(res.data.msg === "Post added successfully"){
        getData()
      }
    })
  }

  function DeletePost(post_id){
    axios.get(`http://localhost:5000/apis/posts/delete_post?post_id=${post_id}`).then(res => {
      if(res.data.msg === 'Deleted'){
        getData()
      }
      
      
    })
  }

  return (
    <div className="App">
      <h1 className='blog-header'>BLOG</h1>
      <div className='Post-Field-Box'>
      <textarea className='postField' onChange={(e) => setContent(e.target.value)} placeholder='Write your post here...'></textarea>
      <button onClick={() => MakePost()} className='Post-Button'>Post</button>
      </div>
      
      
      {all_posts != '' ?
      all_posts.map((single_post) => (

        <div  className='Post-Card'>
        <p className='Post-Text'>{single_post.content}</p>
        <button onClick={() => DeletePost(single_post._id)} className='Delete-Button'>Delete</button>
      </div>
      )):
      <div  className='No-Post-Card'>
      <h1 className='empty'>Please add a post</h1>
      </div>
    
    }
      

      
    </div>
  );
}

export default App;
