import chromeBar from '../../assets/chromebar/chromebar.png'

interface ChromeHeaderProps {
  fakeUrl?: string
}

export default function ChromeHeader( {fakeUrl = ''}: ChromeHeaderProps ) {
  return (
    <div className='bg-[#3c3c3c] flex py-1'>
      <div className='flex items-center '>
        <img src={chromeBar} alt="" width=""/>
      </div>
      <div
        className='bg-[#282828] w-2/3 mr-2 mb-[1px] flex items-center text-gray-400 rounded-r-full overflow-hidden'
      >
        <div className='text-[0.8rem] pl-1'>
          https://eacosta.dev/{fakeUrl}
        </div>
      </div>
    </div>
  )
}
