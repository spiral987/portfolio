// src/infrastructure/repositories/contactRepository.ts

import { ContactInfo } from "@/domain/entities/contactInfo";

export interface IContactRepository {
  getContactInfo(): Promise<ContactInfo>;
}