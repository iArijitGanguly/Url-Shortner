'use server';

import { revalidatePath } from 'next/cache';

import UrlRepository from '@/repositories/UrlRepository';
import UrlService from '@/services/UrlService';

const shortnerService = new UrlService(new UrlRepository());

export async function shortenUrl(formData: FormData) {
    const originalUrl = formData.get('originalUrl') as string;
    const shortUrl = await shortnerService.shortenUrl(originalUrl);
    revalidatePath('/urls');
}