import { StatusCodes } from 'http-status-codes';
import { NextResponse } from 'next/server';

import UrlRepository from '@/repositories/UrlRepository';
import UrlService from '@/services/UrlService';

const shortnerService = new UrlService(new UrlRepository());

export async function POST(req: Request) {
    const { originalUrl } = await req.json();
    const response = await shortnerService.shortenUrl(originalUrl);
    return NextResponse.json({
        success: true,
        message: 'Successfully created a short url for the given url',
        data: response,
        error: {}
    }, { status: StatusCodes.CREATED });
}