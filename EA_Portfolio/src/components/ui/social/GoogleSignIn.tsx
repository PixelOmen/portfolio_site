import googleLogo from '../../../assets/icons/google_logo.png'

interface GoogleSignInProps {
    clickCallback?: () => void
}

export default function GoogleSignIn( {clickCallback}: GoogleSignInProps ) {
  return (
    <button className='flex items-center' onClick={clickCallback}>
        <div className='bg-gray-100 px-3 py-3 h-full flex items-center rounded-l-md'>
            <img
                src={googleLogo}
                alt="Google Logo"
                className="w-6 h-6"
            />
        </div>
        <div className='bg-[#4286f7] h-full font-roboto flex items-center px-4 py-3 text-white rounded-r-md'>
            Sign in with Google
        </div>
    </button>
  )
}
