import React from 'react'
import Navbar from '../components/navbar'


export default function Home() {
    return (
        <div> 
            <Navbar />
            <div className='flex items-center '>
                <h1 className="text-4xl font-bold text-grey-900">Welcome to Home Page!</h1>

            </div>
        </div>
  );
}
