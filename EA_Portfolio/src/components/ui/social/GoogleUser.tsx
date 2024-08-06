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
    <div>
      {userInfo ? (
        userInfo.name
      ) : (
        'No User Info'
      )}
    </div>
  )
}
