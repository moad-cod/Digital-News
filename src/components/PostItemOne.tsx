import React from 'react'
import './postItemOne.css'
import Link from 'next/link';
import Image from 'next/image';

export default function PostItemOne({large, item}: {
    large: boolean,
    item: {
        _id: string;
        img: string;
        category: string;
        date: string; // Date will be serialized as string from API
        title: string;
        brief: string;
        avatar: string;
        author: string;
    }
}) {
  return (
    <div className={`post-entry-1 ${large? 'lg' : undefined}` }>
        <Link href={`/postitems/${item._id}`}>
            <Image src={`/${item.img}`} alt="" className='img-fluid' width={600} height={400} />
        </Link>
        <div className='post-meta'>
            <span className='date'>{item.category}</span>
            <span className='mx-1'>
                <i className='bi bi-dot'></i>{' '}
            </span>{' '}
            <span>{new Date(item.date).toLocaleDateString('en-US')}</span>
        </div>
        <h2>
            <Link href={`/postitems/${item._id}`}>{item.title}</Link>
        </h2>
        { large ? (
            <>
            <p className='mb-4 d-block'>{item.brief}</p>
            <div className='d-flex align-items-center author'>
                <div className='photo'>
                    <img src={item.avatar} alt="" className='img-fluid'/>
                </div>
                <div className='name'>
                    <h3 className='m-0 p-0'>{item.author}</h3>
                </div>
             </div>
            </>
        ) : null}
    </div>
  )
}
