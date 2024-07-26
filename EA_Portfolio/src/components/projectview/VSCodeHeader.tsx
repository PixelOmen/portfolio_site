interface VSCodeHeaderProps {
  projectName?: string
  tabName?: string
}

export default function VSCodeHeader( {projectName = 'work', tabName = ''}: VSCodeHeaderProps ) {
  return (
    <div className='bg-[#181818] text-gray-300 font-sans'>
      <div className='relative px-2 pt-[4px] pb-[2px] text-[0.4rem] flex w-full justify-center'>
        <div className='flex gap-1 mr-auto'>
          <div>File</div><div>Edit</div><div>View</div>
          <div>...</div>
        </div>
        <div className='mx-auto'>
          <div className='absolute left-[50%] -translate-x-[50%] bg-[#3c3c3c] px-12 rounded-full '>
            {projectName}
          </div>
        </div>
        <div className='ml-auto mr-1 flex items-center gap-1 text-[0.5rem]'>
          <div className='pt-[2px]'>&minus;</div><div>&#9633;</div><div className='pt-[2px]'>&times;</div>
        </div>
      </div>
      <div className='text-[0.4rem] border-[1px] border-gray-800'>
        <div className='border-x-[1px] ml-1 border-gray-600 border-t-[1px] border-t-blue-500 w-max px-1'>
          {tabName} <span className='ml-1 pt-[2px]'>X</span>
        </div>
      </div>
    </div>
  )
}
