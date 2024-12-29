'use client'
// Laptop js 
import React, { useState } from 'react';
import { useQuery } from 'react-query';
import Loading from '../Loading/Loading';
import LaptopCard from '../Product/LaptopCard';

const Laptop = () => {
  const url = 'https://mobile-collections-backend.vercel.app/product'
  const { isLoading, data: products = [] } = useQuery(['products'], () =>
    fetch(url).then(res => res.json())
  )
  const [searchValue, setSearchValue] = useState('')

  if (isLoading) {
    return <Loading />
  }

  const filteredProducts = products
    .filter((product, index) => 
      index >= 12 && product.name.toLowerCase().includes(searchValue.toLowerCase())
    );

  return (
    <div>
      <div className='container mx-auto mt-10 '>
        <h1 className='text-center text-4xl my-5 font-bold'>Our All Laptop</h1>
        <div className="search-field flex justify-center">
          <input 
            type="text" 
            value={searchValue}
            onChange={(e) => setSearchValue(e.target.value)} 
            placeholder="Type here" 
            className="rounded-none input input-bordered w-full max-w-xs" 
          />
             <button className='btn btn-primary rounded-none'>Search</button>
        </div>
        <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-7 justify-items-center'>
          {filteredProducts.map(product => (
            <LaptopCard key={product._id} product={product} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Laptop;

