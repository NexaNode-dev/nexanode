export interface IUserProfile {
  userId: string; // Link to the User entity
  firstName?: string;
  lastName?: string;
  displayName: string;
  biography?: string;
  profilePictureUrl?: string;
  phone?: string;
  dateOfBirth?: Date;
  gender?: string;
  websiteUrl?: string;
  socialMediaHandles?: { [key: string]: string }; // e.g., { twitter: '@example' }
  address?: {
    street: string;
    city: string;
    state?: string;
    postalCode: string;
    country: string;
  };
  language?: string;
  timezone?: string;
  occupation?: string;
  interests?: string[];
  education?: string;
  skills?: string[];
}
