import { redirect } from 'next/navigation';

import UrlRepository from '@/repositories/UrlRepository';
import UrlService from '@/services/UrlService';

const shortnerService = new UrlService(new UrlRepository());

const fetchOriginalUrl = async (url: string) => {
    const response = await shortnerService.getUrlByShortUrl(url);
    return response?.originalUrl;
};

export default async function urlRedirect({ params }: { params: { id: string } }) {
    const { id } = params;
    const originalUrl = await fetchOriginalUrl(`urls/${id}`);
    if(originalUrl) {
        redirect(originalUrl);
    }
    redirect('/404');
}