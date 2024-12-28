/* eslint-disable array-callback-return */
import React, { useState } from 'react'
import { useQuery } from 'react-query'
import Loading from '../Loading/Loading'
import ProductCard from './ProductCard'

// Product json

const AllProduct = () => {
  const url = 'http://localhost:4000/product'
  const { isLoading, data } = useQuery(['products'], () =>
    fetch(url).then(res =>
      res.json()
    )
  )
  const [searchValue , setValue] = useState('')

  if (isLoading) {
    return <Loading />
  }

  
  return (
    <div className='container mx-auto mt-10 '>
      <h1 className='text-center text-4xl my-5 font-bold'>Our All Products</h1>
      <div className="search-feild flex justify-center">
        <input type="text" onChange={(e)=> setValue(e.target.value)} placeholder="Type here" className="rounded-none input input-bordered w-full max-w-xs" />
        <button className='btn btn-primary rounded-none'>Search</button>
      </div>
      <div className='grid grid-cols-1 lg:grid-cols-3 md:grid-cols-2 mt-10 gap-7 justify-items-center'>
        {
          data.filter((val)=> {
            if (searchValue === "") {
              return val
            }
            else if(val.name.toLowerCase().includes(searchValue.toLowerCase())){
              return val
            }
          }).map(product => <ProductCard key={product._id} product={product} />)
        }
      </div>
    </div>
  )
}

export default AllProduct