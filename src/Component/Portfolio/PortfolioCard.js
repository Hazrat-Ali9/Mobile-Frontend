import React from 'react'

const PortfolioCard = ({ image, to, name }) => {
    return (
        <div className=''>
            <div id='portCard' style={{
                height: "400px", backgroundImage: `url(${image})`,
                width: "100%", backgroundSize: 'cover',
                backgroundPosition: "center"
            }} className="card  card-compact  bg-base-100 relative shadow-2xl">

                <div className="card-body w-full portdetails bg-neutral absolute bottom-0 right-0">
                    <div className="card-actions w-full justify-between items-center">
                        <div>
                            <h1 className='text-2xl text-white'>{name}</h1>
                            <h1 className=' text-white'>Developed By React</h1>
                        </div>
                        <a rel="noreferrer" href={to} target={'_blank'} className="btn btn-sm btn-accent text-white">Show Project</a>
                    </div>
                </div>
            </div>

        </div>
    )
}

export default PortfolioCard