export type Urls = {
    _id: string,
    originalUrl: string,
    shortUrl: string
}

export interface URLList {
    data: Urls[]
}