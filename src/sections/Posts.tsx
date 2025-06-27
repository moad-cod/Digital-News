'use client';

import React, { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import './posts.css';
import PostItemOne from '@/components/PostItemOne';
import TrendingPost from '@/components/TrendingPost';
import Preloader from '@/components/Preloader';

export default function Posts() {
  const router = useRouter();
  const [items, setItems] = useState<any[]>([]);
  const [item, setItem] = useState<any | null>(null);

  const getItemsData = () => {
    fetch('/api/postitems')
      .then(res => res.json())
      .then(data => setItems(data))
      .catch(e => console.log('Error:', e.message));
  };

  const getSinglePostData = (id: string) => {
    fetch(`/api/postitems/${id}`)
      .then(res => {
        if (res.status === 404) {
          router.push('/not-found');
        }
        return res.json();
      })
      .then(data => setItem(data))
      .catch(e => console.log('Error:', e.message));
  };

  useEffect(() => {
    getItemsData();
    getSinglePostData('685d64d204830808a4d9a984'); // The first image on the left
  }, []);

  return (
    <section id="posts" className='posts'>
      <div className='container' data-aos="fade-up">
        <div className="row g-5">
          <div className="col-lg-4">
            {item && <PostItemOne large={true} item={item} />}
          </div>
          <div className="col-lg-8">
            <div className='row g-5'>
              <div className="col-lg-4 border-start custom-border">
                {items &&
                items.length > 0 ? 
                items
                  .filter((item) => !item.trending && !item.top)
                  .slice(0, 3)
                  .map((item: {
                    _id: string;
                    img: string;
                    category: string;
                    date: string; // Date will be serialized as string from API
                    title: string;
                    brief: string;
                    avatar: string;
                    author: string;
                  }) => (
                    <PostItemOne key={item._id}  large={false} item={item}/>
          )): <Preloader />}
              </div>
              <div className="col-lg-4 border-start custom-border">
                {items &&
                  items.length > 0 ?
                  items
                    .filter((item) => !item.trending && !item.top)
                    .slice(3, 6)
                    .map((item: {
                      _id: string;
                      img: string;
                      category: string;
                      date: string; // Date will be serialized as string from API
                      title: string;
                      brief: string;
                      avatar: string;
                      author: string;
                    }) => (
                      <PostItemOne key={item._id}  large={false} item={item}/>
                  )): <Preloader />
                  }
              </div>
              <div className="col-lg-4">
                <div className='trending'>
                  <h3>Trending</h3>
                  <ul className='treding-list'>
                    {
                      items && items.length > 0 ? 
                      items.filter((item: {trending: boolean}) => item.trending)
                        .map((item : {
                      _id: string;
                      img: string;
                      category: string;
                      date: string; // Date will be serialized as string from API
                      title: string;
                      brief: string;
                      avatar: string;
                      author: string;
                    }, index: number) => (
                      <TrendingPost key={item._id} index={index} item={item}></TrendingPost>
                    )): <Preloader />
                      
                  } 
                  </ul>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
