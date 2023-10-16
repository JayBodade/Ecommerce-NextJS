import React from 'react'

const QueryRow = ({complaints}:any) => {
  return (
    <div className="queryContainer mb-10">
<section className="text-gray-600 body-font">
  <div className="container px-5 pt-20 pb-10 mx-auto">
    <div className="flex flex-row justify-between text-center w-full mb-20">
      <h2 className="sm:text-3xl text-2xl font-medium title-font mb-4 text-gray-900">Costumers Queries</h2>
      <p>view more</p>
       </div>
    <div className="flex flex-wrap">
      {complaints && complaints.map((complaint:any,index:number)=>{
        return <div key={index} className="xl:w-1/4 lg:w-1/2 md:w-full px-8 py-6 border-l-2 border-gray-200 border-opacity-60">
        <h2 className="text-lg sm:text-xl text-gray-900 font-medium title-font mb-2">{complaint.complaintTitle}</h2>
        <p className="leading-relaxed text-base mb-4">{complaint.complaintDesc}</p>
        <a className="text-indigo-500 inline-flex items-center">Learn More
          <svg fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" className="w-4 h-4 ml-2" viewBox="0 0 24 24">
          </svg>
        </a>
      </div>
      })}
    </div>
     </div>
</section>

</div>
  )
}

export default QueryRow
