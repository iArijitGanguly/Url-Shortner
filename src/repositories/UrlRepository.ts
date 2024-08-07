import db from '@/config/db';
import Url, { IUrl } from '@/models/Url';

class UrlRepository {
    private urlModel;

    constructor() {
        db.connect();
        this.urlModel = Url;
    }

    async createUrl(originalUrl: string, shortUrl: string): Promise<IUrl> {
        try {
            const url = this.urlModel.create({originalUrl, shortUrl});
            return url;
        } catch (error) {
            throw error;
        }
    }

    async getUrlById(id: string): Promise<IUrl | null> {
        try {
            const url = await this.urlModel.findById(id).lean();
            return url;
        } catch (error) {
            throw error;
        }
    }

    async getUrlByShortUrl(shortUrl: string): Promise<IUrl | null> {
        try {
            const url = await this.urlModel.findOne({ shortUrl }).lean();
            return url;
        } catch (error) {
            throw error;
        }
    }

    async getUrlByOriginalUrl(originalUrl: string): Promise<IUrl | null> {
        try {
            const url = await this.urlModel.findOne({ originalUrl }).lean();
            return url;
        } catch (error) {
            throw error;
        }
    }

    async getAllUrl(): Promise<IUrl[] | null> {
        try {
            const urls = await this.urlModel.find({}).lean();
            return urls;
        } catch (error) {
            throw error;
        }
    }

    async updateShortUrl(id: string, newUrl: string): Promise<IUrl | null> {
        try {
            const url = await this.urlModel.findByIdAndUpdate(id, { shortUrl: newUrl }, { new: true });
            return url;
        } catch (error) {
            throw error;
        }
    }

    async updateOriginalUrl(id: string, newUrl: string): Promise<IUrl | null> {
        try {
            const url = await this.urlModel.findByIdAndUpdate(id, { originalUrl: newUrl }, { new: true });
            return url;
        } catch (error) {
            throw error;
        }
    }

    async deleteUrlById(id: string): Promise<IUrl | null> {
        try {
            const url = await this.urlModel.findByIdAndDelete(id).lean();
            return url;
        } catch (error) {
            throw error;
        }
    }

}

export default UrlRepository;