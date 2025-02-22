import { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';

// Add Product

const AddProduct = () => {
  const [error, setError] = useState('')
  const [loading, setLoading] = useState(false)

  const url = `https://api.imgbb.com/1/upload?key=430f95e02b148e77494d04413a24e86c`;
  const { register, formState: { errors }, handleSubmit, reset } = useForm();
  const onSubmit = (data) => {
    setLoading(true)
    const image = data.image[0];
    const formData = new FormData()
    formData.append('image', image);
    fetch(url, {
      method: 'POST',
      body: formData
    })
      .then(res => res.json())
      .then(result => {
        if (result.success) {
          const name = data.name
          const price = data.price
          const quantity = data.quantity
          const image = result.data.url
          const description = data.description
          const newProduct = { name, price, quantity, image, description }
          console.log(newProduct)
          fetch('https://mobile-collections-backend.vercel.app/product', {
            method: "Post",
            headers: {
              'content-type': 'application/json',
              auth: localStorage.getItem('accessToken')
            },
            body: JSON.stringify(newProduct)
          }).then(res => {
            if (res.status === 200) {
              setLoading(false)
              reset()
              toast.success('Product Added Successful')
            }
          })
        }
      })
  }
  return (
    <div className='w-full'>
      <div className={`hero h-screen bg-base-200`}>
        <button>Close</button>
        <div style={{ width: '100%' }} className="hero-content">

          <div className="card w-full max-w-md shadow-2xl bg-base-100">
            <form onSubmit={handleSubmit(onSubmit)} className="card-body">
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Name</span>
                </label>
                <input
                  {...register("name", { required: true })}

                  className="input input-bordered" />
                <p className='text-red-500 mt-2 ml-2'>{errors.name?.type === 'required' && "Plz Insert A Product Name"} </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Price</span>
                </label>
                <input
                  {...register("price")}
                  className="input input-bordered" type='number' />

                <p className='text-red-500 mt-2 ml-2' >{errors.price?.type === 'required' && "Price is required"} </p>
              </div>
              <div className="form-control">
                <label className="label">
                  <span className="label-text">Quantity</span>
                </label>
                <input type='number'
                  {...register("quantity", { required: true })}
                  className="input input-bordered" />
                <p className='text-red-500 mt-2 ml-2'>{errors.quantiy?.type === 'required' && "Password Required"} </p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Description</span>
                </label>

                <textarea type='Description'
                  {...register("description", { required: true })}
                  className="input input-bordered h-40" />
                <p className='text-red-500 mt-2 ml-2'>{errors.description?.type === 'required' && "Description Required"} </p>
              </div>

              <div className="form-control">
                <label className="label">
                  <span className="label-text">Product Image</span>
                </label>
                <input type='file'
                  {...register("image", { required: true })}
                  className="input p-2 input-bordered" />
                <p className='text-red-500 mt-2 ml-2'>{errors.image?.type === 'required' && "Product Image"} </p>
              </div>

              <p className='text-red-500 mt-3'>{error}</p>
              <div className="form-control mt-6">
                <button type='submit' className={`btn btn-primary ${loading && "loading"}`}>{`${loading ? "Uploading...." : "Add"}`}</button>
              </div>

            </form>
          </div>
        </div>
      </div>

    </div>
  )
}
export default AddProduct  