'use client'

import PageTitle from '@/components/PageTitle';
import PostItemOne from '@/components/PostItemOne';
import Preloader from '@/components/Preloader';
import { PostProps } from '@/sections/Posts';
import React, {useEffect, useState} from 'react'

export default function PostItems() {
    const [items, setItems] = useState([]);

    const getItemsData = () => {
        fetch('/api/postitems')
            .then(res => res.json())
            .then(data => setItems(data))
            .catch(e => console.log('Error:', e.message));
    }

    useEffect(() => {
        getItemsData();
    }, [items]); // Re-fetch items when the component mounts

    return (
        <main id="main">
            <section id="posts" className="posts">
                <div className='container'>
                    <div className='row'>
                        <PageTitle title={'Post Items List'}></PageTitle>
                        {items && items.length > 0 ? (
                            items.map((item: PostProps) => (
                                <div className='col-lg-3 col-md-6' key={item._id}>
                                    <PostItemOne large={false} item={item} ></PostItemOne>
                                </div>
                            ))
                        ) : (
                            <Preloader></Preloader>
                        )} 
                    </div>
                </div>
            </section>
        </main>
    )
}
