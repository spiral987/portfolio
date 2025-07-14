// src/use-cases/contact/getContactInfoUseCase.ts

import { ContactInfo } from "@/domain/entities/contactInfo";
import { IContactRepository } from "@/infrastructure/repositories/contactRepository";

export class GetContactInfoUseCase {
    private readonly contactRepository: IContactRepository;

    constructor(contactRepository: IContactRepository) {
        this.contactRepository = contactRepository;
    }

    async execute(): Promise<ContactInfo> {
        return this.contactRepository.getContactInfo();
    }
}