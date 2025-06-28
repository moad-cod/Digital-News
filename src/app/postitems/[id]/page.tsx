'use client'

import React, {useState, useEffect} from 'react'
import './style.css';
import { initialPost, PostProps } from '@/sections/Posts';
import Preloader from '@/components/Preloader';
import SidePostItem from '@/components/SidePostItem';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

export default function PostItem({params}: {params: {id: string}}) {
    const id: string = params.id;
    const router = useRouter();
    const [item, setItem] = useState(initialPost);
    const [items, setItems] = useState([]);

    const tabsData = [
        {id: 1, name: 'Popular', active: true},
        {id: 2, name: 'Trending', active: false},
    ];

    const [tabs, setTabs] = useState(tabsData);

    const handleTabActive = (id: number): void => {
        setTabs(
            tabsData.map(tab => {
            tab.active = false; // Reset all tabs to inactive
            if (tab.id === id) tab.active = true; // Set the clicked tab to active{
            return tab;
        }));
    };

    const getSinglePostData = () => {
        fetch(`/api/postitems/${id}`)
            .then(res => res.json())
            .then(data => setItem(data))
            .catch(e => console.log('Error:', e.message));
    }

    const getItemsData = () => {
        fetch('/api/postitems')
        .then(res => res.json())
        .then(data => setItems(data))
        .catch(e => console.log('Error:', e.message));
    };

    useEffect(() => {
        getSinglePostData();
        getItemsData();
    }, []); 

    const handleDeletePost = async (id: string) => {
        try {
            const response = await fetch(`/api/postitems/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                }
            });

            const result = response.status;
            if (result === 200) {
                console.log('Post deleted successfully');
                router.push('/postitems'); // Redirect to the post items page after deletion
            }
        } catch (error) {
            console.error('Error deleting post:', error);
        }
    };

    return (
       <main id='main'>
            <section className='single-post-content'>
                <div className='container'>
                    <div className='row'>
                        <div className='col-md-9 post-content'>
                            {
                                item && item.category !== '' ? (
                                    <div className='single-post'>
                                    <div className='post-meta'>
                                        <span className='date'>
                                            {item.category}
                                            <span className='mx-1'>
                                                <i className="bi bi-dot"></i>
                                            </span>
                                            <span>
                                                {new Date(item.date).toLocaleDateString('en-US', {
                                                    year: 'numeric',
                                                    month: 'long',
                                                    day: 'numeric'
                                                }
                                                )}
                                            </span>
                                        </span>
                                        <h1 className='mb-5'>{item.title}</h1>
                                        <p>
                                            <span className="firstcharacter">
                                                {item.brief && item.brief.charAt(0)}
                                            </span>
                                            {item.brief && item.brief.substring(1)}
                                        </p>
                                        <p>
                                            At DigitalNews, we bring you insightful stories, fresh perspectives, and in-depth coverage across culture, tech, business, lifestyle, and more. Our mission is to inform, inspire, and empower readers through credible reporting, diverse voices, and thought-provoking ideas. Whether youre looking to stay updated or explore new trends, DigitalNews is your trusted source for smart, engaging content.
                                        </p>
                                        <figure className='my-4'>
                                            {/* <Image 
                                            src={`/${item.img}`} 
                                            alt="" 
                                            className='img-fluid' 
                                            width={100} 
                                            height={100} 
                                            layout='responsive'
                                            /> */}
                                            <img src={`/${item.img}`} alt="" className='img fluid'/>
                                            <figcaption className="text-muted text-center mt-2">
                                                Your trusted source for smart, engaging stories across culture, tech, business, and lifestyle.
                                            </figcaption>
                                        </figure>
                                        <p>
                                            DigitalNews is your gateway to the world’s most compelling stories, trends, and developments. We deliver in-depth reporting and well-researched articles that not only inform but also inspire critical thinking. Our editorial team is committed to bringing clarity to complex topics — from technology and science to business, health, and culture — so readers stay aware, engaged, and empowered in an ever-changing digital age.
                                        </p>

                                        <p>
                                            Every story on DigitalNews is carefully selected to reflect the pulse of our times. We go beyond surface-level headlines to explore the deeper context behind each event, issue, or trend. Whether it’s the latest in artificial intelligence, economic shifts, or lifestyle innovations, our content is designed to help you understand how the world is evolving — and how it affects you directly.
                                        </p>

                                        <p>
                                            In a fast-moving media landscape, trust and quality are more important than ever. At DigitalNews, we prioritize accuracy, balance, and integrity in everything we publish. We collaborate with expert contributors and credible sources to ensure that each article meets the highest standards. Our aim is not only to deliver the news but to add value through meaningful analysis and practical takeaways.
                                        </p>

                                        <p>
                                            As a modern news platform, DigitalNews blends storytelling with technology to deliver content that fits your lifestyle. Whether you prefer reading on mobile, browsing topics by category, or diving deep into featured series, we make it easy to access the information you care about. Stay curious, stay informed — and let DigitalNews be your trusted companion in navigating today’s world.
                                        </p>
                                        <div className='d-flex justify-content-center gap-4'>
                                            <a
                                                className="btn btn-primary"
                                                onClick={() => handleDeletePost(id)}
                                            >
                                                <i className='bi bi-trash'></i>
                                            </a>
                                            <Link href={`/createpostitem/${id}`} className="btn btn-primary">
                                                <i className='bi bi-pen'></i>
                                            </Link>
                                        </div>
                                    </div>
                            </div>
                                ): <Preloader></Preloader>
                            }
                        </div>
                        <div className="col-md-3">
                            <div className="aside-block">

                                <ul className='nav nav-pills custom-tab-nav mb-4'>
                                    {
                                    tabs.map((tab) => (
                                        <li className='nav-item' key={tab.id}>
                                            <button 
                                            className={`nav-link ${tab.active ? 'active' : undefined}`}
                                            onClick={() => handleTabActive(tab.id)}
                                            >
                                                {tab.name}
                                            </button>
                                        </li>
                                    ))
                                    }
                                </ul>
                                <div className='tab-content'>
                                    <div className={`tab-pane fade ${tabs[0].active ? 'show active' : ''}`}>
                                        { 
                                            items.slice(0, 6)
                                            .map((item: PostProps) => (
                                                <SidePostItem key={item._id} item={item}/>
                                            ))
                                        }
                                    </div>
                                    <div className={`tab-pane fade ${tabs[1].active ? 'show active' : ''}`}>
                                        { 
                                            items.slice(6, 12)
                                            .map((item: PostProps) => (
                                                <SidePostItem key={item._id} item={item}/>
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                                <div className="aside-block">
                                    <h3 className='aside-title'>Video</h3>
                                    <div className='video-post'>
                                        <a
                                        target='_blank' 
                                        href=""
                                        className='link-video'
                                        >
                                        <span className="bi bi-play-fill">
                                        </span>
                                        <img src="/assets/img/post-landscape-3.jpg" 
                                        alt="" 
                                        className='img-fluid'
                                        />
                                    </a>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
       </main>
    )
}
