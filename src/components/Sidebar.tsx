import React, { useEffect, useState } from 'react'

type Product = {
    category: string
}

type FetchResponse = {
    products: Product[]
}

const Sidebar = () => {
    const [categories,setCategories] = useState<string[]>([])

    const [keywords,setKeyWords] = useState<string[]>([
        "Apple",
        "Watch",
        "Fashion",
        "Trend",
        "Shoes",
        "Shirt"
    ])

    useEffect(() => {
        const fetchCategories = async() => {
            try{
                const response = await fetch('https://dummyjson.com/products')

                const data: FetchResponse = await response.json()
                console.log(data)   

                {/* creating array of only unique categories */}
                const uniqueCategory = Array.from(new Set(data.products.map(product => (
                    product.category
                ))))

                setCategories(uniqueCategory)
                

            }catch(error){
                console.log(error);   
            }
        }

        fetchCategories()
    },[])
  return (
    <section className='w-64 p-5 h-full'>
        <h1 className='text-2xl font-bold mb-10 mt-4'>Craftie.</h1>

        <div>
            <input type="text" className='border-2 rounded px-2 sm:mb-0' placeholder='Search Product' />
        </div>

        <div className='flex items-center justify-center'>
            <input type="text" className='border-2 mr-2 px-5 py-3 mb-3 w-full' placeholder='Max' />
            <input type="text" className='border-2 mr-2 px-5 py-3 mb-3 w-full' placeholder='Min' />
        </div>

        {/* Categories Section */}
        <div className='mb-5'>
            <h2 className='text-xl font-semibold mb-3'>Categories</h2>
        </div>

        <div>
            {
                categories.map((category,index) => (
                    <label key={index} className='flex items-center mb-2'>
                        <input type="radio" name='category' value={category} className='mr-2 w-[16px] h-[16px]'/>
                        <span>{category.toUpperCase()}</span>
                    </label>
                ))
            }
        </div>

        {/* Kewords Section */}
        <div className='mb-5 mt-4'>
            <h2 className='text-xl font-semibold mb-3'></h2>

            <div>
                {
                    keywords.map((keyword,index) => (
                        <button key={index} className='block mb-2 px-4 py-2 w-full text-left border rounded hover:bg-slate-700'>{keyword}</button>
                    ))
                }
            </div>
        </div>

        <button className='w-full mb-[4rem] py-2 rounded bg-white text-slate-950 mt-5'>Reset Filters</button>
        
    </section>
  )
}

export default Sidebar