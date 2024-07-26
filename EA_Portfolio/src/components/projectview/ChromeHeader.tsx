import chromeBar from '../../assets/chromebar/chromebar.png'

interface ChromeHeaderProps {
  fakeUrl?: string
}

export default function ChromeHeader( {fakeUrl = ''}: ChromeHeaderProps ) {
  return (
    <div className='bg-[#3c3c3c] flex py-[5px]'>
      <div className='flex-1'>
        <img src={chromeBar} alt="" height=""/>
      </div>
      <div
        className='bg-[#282828] w-2/3 mr-2 flex items-center text-gray-400 rounded-r-full overflow-hidden text-nowrap'
      >
        <div className='text-[0.4rem] sm:text-[0.6rem] pt-[1px] overflow-hidden max-w-full max-h-full'>
          https://eacosta.dev/{fakeUrl}
        </div>
      </div>
    </div>
  )
}
