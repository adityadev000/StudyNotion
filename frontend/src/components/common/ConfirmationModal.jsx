

const ConfirmationModal = ({modalData}) => {
    return (   
        <div className=' font-bold text-white w-[calc(100vw-1rem)] h-[calc(100vh-3.5rem)]  flex items-center justify-center fixed top-0 left-0 backdrop-blur-sm z-40 '>
            <div className=' bg-richblack-800 px-5 py-6 rounded-md border border-richblack-400 flex gap-5 flex-col'>
                <p className=' text-2xl'>  
                    {modalData.text1}
                </p>
                <p className=' text-richblack-200 font-normal tracking-wide'>
                    {modalData.text2}
                </p>
                <div className='flex gap-4'>

                    <button onClick={modalData.btn1Handler} className="flex gap-2 items-center justify-center bg-yellow-50 h-fit px-5 py-2 rounded-md text-base text-black font-semibold">
                        {modalData?.btn1Text}
                    </button>
                    <button onClick={modalData.btn2Handler} className=' bg-richblack-600  h-fit px-5 py-2 rounded-md  text-richblack-50 text-[1rem] font-semibold'>
                        {modalData?.btn2Text}
                    </button>
                </div>
            </div>
        </div>
    )
}

export default ConfirmationModal
