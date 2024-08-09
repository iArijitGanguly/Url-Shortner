import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';
import { cache } from 'react';

import UrlRepository from '@/repositories/UrlRepository';
import UrlService from '@/services/UrlService';

const shortnerService = new UrlService(new UrlRepository());

const fetchUrls = async () => {
    const response = await shortnerService.getAllUrls();
    return response;
};

export async function GET() {
    const urls = await fetchUrls();
    const response = NextResponse.json({
        success: true,
        message: 'Successfully fetched all the urls and their shorter version',
        data: urls,
        error: {}
    }, { status: StatusCodes.OK });
    response.headers.set('Cache-Control', 'public, max-age=180, s-maxage=180, stale-while-revalidate=59');
    return response;
}