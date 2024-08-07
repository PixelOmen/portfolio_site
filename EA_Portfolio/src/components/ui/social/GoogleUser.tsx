interface ProfileInfo {
  email: string;
  family_name: string;
  given_name: string;
  id: string;
  name: string;
  picture: string;
  verified_email: boolean;
}

interface GoogleUserProps {
  userInfo?: ProfileInfo;
  nameOnly?: boolean;
}

export default function GoogleUser({
  userInfo,
  nameOnly = false
}: GoogleUserProps) {
  return (
    <div className="flex justify-center items-center font-roboto max-w-full p-2">
      {userInfo ? (
        <div className="flex justify-center items-center">
          {(userInfo.picture && !nameOnly) && (
            <div className="flex-none">
              <img
                src={userInfo.picture}
                alt="user"
                className="userInfo h-8 mr-2 rounded-full"
              />
            </div>
          )}
          <div className="translate-y-[1px] text-nowrap overflow-hidden overflow-ellipsis">
            {userInfo.name}
          </div>
        </div>
      ) : (
        'No User Info'
      )}
    </div>
  )
}
