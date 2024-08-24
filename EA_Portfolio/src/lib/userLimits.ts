import { anonAPI } from './requests';

export interface UserLimits {
    max_image_size: number;
    max_user_images: number;
    max_post_length: number;
    allowed_image_mimes: string[];
}



export function getUserLimits(): Promise<UserLimits> {
  return anonAPI.get('v1/user-limits/')
    .then(res => {
      return res.data;
    })
    .catch(err => {
      console.error(err);
    });
}

export function validateImageUpload(file: File, userLimits: UserLimits, imageCount: number): string {
  if (!userLimits) {
    return "User limits not loaded";
  }
  const currentLimits = userLimits;
  if (imageCount >= currentLimits.max_user_images) {
    return `Max images reached 😢. Delete an image to upload a new one.`;
  }
  if (file.size > currentLimits.max_image_size) {
    const maxSize = currentLimits.max_image_size / 1024 / 1024;
    return `File size too large, max size is ${maxSize}MB, sorry 😢`;
  }
  if (!currentLimits.allowed_image_mimes.includes(file.type.toLowerCase())) {
    return "File type unsupported, sorry 😢";
  }
  return "";
}