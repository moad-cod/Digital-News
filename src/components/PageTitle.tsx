import React from 'react'
import './pageTitle.css'
export default function PageTitle({title}: { title: string }) {
  return (
    <div>
      <h3 className='category-title'>
        {title}
      </h3>
    </div>
  )
}
