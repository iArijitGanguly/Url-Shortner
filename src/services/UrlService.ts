import { nanoid } from 'nanoid';

import UrlRepository from '@/repositories/UrlRepository';

class UrlService {
    private urlRepository;

    constructor(urlRepository: UrlRepository) {
        this.urlRepository = urlRepository;
    }

    async shortenUrl(originalUrl: string) {
        let url = await this.urlRepository.getUrlByOriginalUrl(originalUrl);
        if(url) {
            return url.shortUrl;
        }

        let shortUrl = nanoid(10);
        url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        while(url) {
            shortUrl = nanoid();
            url = await this.urlRepository.getUrlByShortUrl(shortUrl);
        }

        return await this.urlRepository.createUrl(originalUrl, `urls/${shortUrl}`);
    }

    async getAllUrls() {
        return await this.urlRepository.getAllUrl();
    }

    async getUrlByShortUrl(shortenUrl: string) {
        return await this.urlRepository.getUrlByShortUrl(shortenUrl);
    }

}

export default UrlService;