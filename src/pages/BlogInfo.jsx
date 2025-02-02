import { doc, getDoc } from 'firebase/firestore';
import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom';
import { db } from '../firebase/config';

const BlogInfo = () => {

  const params = useParams()

  //* getBlogs State 
  const [getBlogs, setGetBlogs] = useState();
  
  const getAllBlogs = async () => {

    try {
      const productTemp = await getDoc(doc(db, "blogPost", params.id))
      if (productTemp.exists()) {
        setGetBlogs(productTemp.data());
      } else {
        console.log("Document does not exist")
      }
   
    } catch (error) {
      console.log(error)
    
    }
  }
  
  useEffect(()=>{
    getAllBlogs()
   },[])
   

  return (
    <div>blog info</div>
  )
}

export default BlogInfo