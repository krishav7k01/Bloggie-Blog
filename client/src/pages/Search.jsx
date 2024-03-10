import React, { useEffect, useState } from 'react'
import PostCard from '../components/PostCard';
import { Button, Select, TextInput } from 'flowbite-react';
import { useLocation, useNavigate } from 'react-router-dom';
import axios from 'axios';

const Search = () => {

    const[sidebarData, setSidebarData] = useState({

        searchTerm: 'blog',
        order: 'asc',
        category: 'all'
    })

    const [posts, setPosts] = useState([]);
    const[loading, setLoading] = useState(false)
    const [showMore, setShowMore] = useState(false)

    const location = useLocation()
    const navigate = useNavigate()

     

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search)
        const searchTermFromURL = urlParams.get('searchTerm')
        const sortFromUrl = urlParams.get('order')
        const categoryFromUrl = urlParams.get('category')

        if(searchTermFromURL || sortFromUrl || categoryFromUrl)
        {
            setSidebarData({
                ...sidebarData,
                searchTerm : searchTermFromURL,
                order : sortFromUrl || 'asc',
                category : categoryFromUrl || ''
            })
        }

        const fetchPosts = async () =>{

            setLoading(true)
            const searchQuery = urlParams.toString()
            const res = await axios.get(`/v1/api/post/getposts?${searchQuery}`)
            const data= await res.data

            if(data.success === true)
            {
                setPosts(data.data.data)
                setLoading(false)

                if(data.data.data.length === 9){
                    setShowMore(true);
                }
                else
                {
                    setShowMore(false)
                }
            }

    
        }

        fetchPosts()

    },[location.search])

    const handleChange = (e) =>{

        if(e.target.id === 'searchTerm'){

            setSidebarData({...sidebarData, searchTerm:e.target.value})

        }

        if(e.target.id === 'sort'){

            const order1 = e.target.value ? e.target.value : 'desc'
            setSidebarData({...sidebarData, order: order1})

        }

        if(e.target.id === 'category'){

            const category = e.target.value || '';
            setSidebarData({...sidebarData, category:category})

        }

    }

    const handleSubmit = (e) => {
        e.preventDefault();
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('searchTerm', sidebarData.searchTerm);
        urlParams.set('sort', sidebarData.order);
        urlParams.set('category', sidebarData.category);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);
      };
    
      const handleShowMore = async () => {
        const numberOfPosts = posts.length;
        const startIndex = numberOfPosts;
        const urlParams = new URLSearchParams(location.search);
        urlParams.set('startIndex', startIndex);
        const searchQuery = urlParams.toString();
        const res = await axios.get(`/api/post/getposts?${searchQuery}`);

        const data = await res.data
       
        if (data.success === true) {
          
          setPosts([...posts, ...data.data.data]);
          if (data.data.data.length === 9) {
            setShowMore(true);
          } else {
            setShowMore(false);
          }
        }
      };
    



    return (
        <div className='flex flex-col md:flex-row'>
          <div className='p-7 border-b md:border-r md:min-h-screen border-gray-500'>
            <form className='flex flex-col gap-8' onSubmit={handleSubmit}>
              <div className='flex   items-center gap-2'>
                <label className='whitespace-nowrap font-semibold'>
                  Search Term:
                </label>
                <TextInput
                  placeholder='Search...'
                  id='searchTerm'
                  type='text'
                  value={sidebarData.searchTerm}
                  onChange={handleChange}
                />
              </div>
              <div className='flex items-center gap-2'>
                <label className='font-semibold'>Sort:</label>
                <Select onChange={handleChange} value={sidebarData.sort} id='sort'>
                  <option value='desc'>Latest</option>
                  <option value='asc'>Oldest</option>
                </Select>
              </div>
              <div className='flex items-center gap-2'>
                <label className='font-semibold'>Category:</label>
                <Select
                  onChange={handleChange}
                  value={sidebarData.category}
                  id='category'
                >
                  <option value=''>Select a Category</option>
                    <option value='react'>React</option>
                     <option value='expressjs'>ExpressJs</option>
                     <option value='configuration'>Configuration</option>
                        <option value='javascript'>Javascript</option>
                </Select>
              </div>
              <Button type='submit' outline gradientDuoTone='purpleToPink'>
                Apply Filters
              </Button>
            </form>
          </div>
          <div className='w-full'>
            <h1 className='text-3xl font-semibold sm:border-b border-gray-500 p-3 mt-5 '>
              Posts results:
            </h1>
            <div className='p-7 flex flex-wrap gap-4'>
              {!loading && posts.length === 0 && (
                <p className='text-xl text-gray-500'>No posts found.</p>
              )}
              {loading && <p className='text-xl text-gray-500'>Loading...</p>}
              {!loading &&
                posts &&
                posts.map((post) => <PostCard key={post._id} post={post} />)}
              {showMore && (
                <button
                  onClick={handleShowMore}
                  className='text-teal-500 text-lg hover:underline p-7 w-full'
                >
                  Show More
                </button>
              )}
            </div>
          </div>
        </div>
      );
}

export default Search
