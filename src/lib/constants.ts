// src/lib/constants.ts
import { Url } from '@/domain/value-objects/url';
import { EmailAddress } from '@/domain/value-objects/emailAddress';

export const CONTACT_INFO = {
  email: EmailAddress.create('your.email@example.com'),
  githubUrl: Url.create('https://github.com/spiral987'),
  twitterUrl: Url.create('https://x.com/spiralneet'),
  websiteUrl: null,
};