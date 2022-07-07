import { Heading } from 'components/Heading';
import { useSession } from 'next-auth/react'
import Head from 'next/head';
import { useRouter } from 'next/router';
import React, { useState } from 'react'

const NewProductPage = () => {

  const { data: session, status } = useSession();
  const router = useRouter();

  const [title, setTitle] = useState('');
  const [image, setImage] = useState(null);
  const [product, setProduct] = useState(null);
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState(0);
  const [free, setFree] = useState(false);

  const loading = status === 'loading';

  if (loading) return null;

  if(!session) return router.push('/');

  return (
    <div>
      <Head>
        <title>Digital Downloads</title>
        <meta name="description" content="Digital Downloads Website" />
        <link rel="shortcut icon" href="/favicon.ico" type="image/x-icon" />
      </Head>

      <Heading />

      <h1 className='flex justify-center mt-20 text-xl'>Add new product</h1>

      <div className='flex justify-center'>
        <form
          className='mt-10'
          onSubmit={async (e) => {
            e.preventDefault()

            const body = new FormData()
            body.append('image', image)
            body.append('product', product)
            body.append('title', title)
            body.append('free', free)
            body.append('price', price)
            body.append('description', description)

            await fetch('/api/new', {
              body,
              method: 'POST',
            })

            console.log('body =>', body);

            router.push(`/dashboard`)
          }}
          // onSubmit={ async(e) => {
          //   e.preventDefault();

          //   const body = new FormData()
          //   body.append('image', image)
          //   console.log('image =>', body.image);
          //   body.append('product', product)
          //   console.log('product =>', body.product);
          //   body.append('title', title)
          //   console.log('title =>', body.title);
          //   body.append('free', free)
          //   console.log('free =>', body.free);
          //   body.append('price', price)
          //   console.log('price =>', body.price);
          //   body.append('description', description)
          //   console.log('description =>', body.description);

          //   await fetch('/api/new', {
          //     body, 
          //     method: 'POST',
          //   });

          //   router.push('/dashboard');
          // }}
        >
          <div className='flex-1 mb-5'>
            <div className='flex-1 mb-2'>
              Product title (required)
            </div>
            <input
              onChange={ (e) => setTitle(e.target.value) }
              className='border p-1 text-black mb-4'
              required
            />
            <div className='relative flex items-start mt-2 mb-3'>
              <div className='flex items-center h-5'>
                <input 
                  type='checkbox'
                  checked={ free }
                  onChange={ (e) => setFree(!free) }
                />
              </div>
              <div className='ml-3 text-sm'>
                <label>Check if the product is free</label>
              </div>
            </div>

            { !free && (
              <>
                <div className='flex-1 mb-2'>Product price in $ (required)</div>
                <input 
                  pattern='^\d*(\.\d{0,2})?$'
                  onChange={ (e) => setPrice(e.target.value) }
                  className='border p-1 text-black mb-4'
                  required
                />
              </>
            )}

            <div className='flex-1 mb-2'>Description</div>
            <textarea 
              onChange={ (e) => setDescription(e.target.value) } 
              className='border p-1 text-black'
            />
          </div>
          
          <div className='text-sm text-gray-400'>
            <label className='relative font-medium cursor-pointer my-3 block'>
              <p>Product image { image && ' ✅'}</p> (800 x 450 suggested)
              <input 
                type='file'
                accept='image/*'
                className='hidden'
                onChange={ (e) => {
                  if(e.target.files && e.target.files[0]) {
                    if(e.target.files[0].size > 3072000) {
                      alert('Maxium size allowed is 3MB');
                      return false;
                    }
                    setImage(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          <div className='text-sm text-gray-400'>
            <label className='relative font-medium cursor-pointer my-3 block'>
              <p>Product { product && ' ✅' }</p> (required)
              <input 
                type="file"
                className='hidden'
                onChange={ (e) => {
                  if(e.target.files && e.target.files[0]) {
                    if(e.target.files[0].size > 20480000) {
                      alert('Maximum size allowed is 20MB')
                      return false;
                    }
                    setProduct(e.target.files[0]);
                  }
                }}
              />
            </label>
          </div>

          <button
            disabled={ title && product && (free || price) ? false : true }
            className={`border px-8 py-2 mt-10 font-bold ${
              title && (free || price)
              ? ''
              : 'cursor-not-allowed text-gray-800 border-gray-800'
            }`}
          >
            Create product
          </button>

        </form>
      </div>

    </div>
  )
}

export default NewProductPage