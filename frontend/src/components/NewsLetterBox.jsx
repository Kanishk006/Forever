import React from 'react'

const NewsletterBox = () => {
  const onSubmitHandler = (event) => {
        event.preventDefault();
  }

  return (
    <div className="w-full text-center py-10">

      <p className="text-2xl sm:text-3xl font-medium text-gray-800">
        Subscribe now & get 20% off
      </p>

      <p className="text-gray-400 mt-3 text-sm sm:text-base">
        Lorem Ipsum is simply dummy text of the printing and typesetting industry.
      </p>

      <form onSubmit={onSubmitHandler} className="w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border border-gray-300 pl-3">

        <input
          className="w-full sm:flex-1 outline-none py-3 text-sm"
          type="email"
          placeholder="Enter your email"
        />

        <button
          type="submit"
          className="bg-black text-white text-xs px-10 py-4 whitespace-nowrap"
        >
          SUBSCRIBE
        </button>
      </form>

    </div>
  )
}

export default NewsletterBox