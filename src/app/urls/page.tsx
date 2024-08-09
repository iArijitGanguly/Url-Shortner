import Link from 'next/link';

import { URLList, Urls } from '@/types/URLList';

async function fetchUrls(): Promise<URLList> {
    const response = await fetch(`${process.env.NEXT_PUBLIC_BASE_URL}/api/urls`, {
        cache: 'force-cache'
    });
    if(!response.ok) {
        throw new Error('Failed to fetch urls');
    }
    return await response.json();
}

async function UrlList() {
    let urlResponse: URLList;
    let urls: Urls[];
    try {
        urlResponse = await fetchUrls();
        urls = urlResponse.data;
    } catch (error) {
        return (
            <div className="min-h-screen flex justify-center items-center bg-gray-100">
                <div className="p-10 bg-white rounded-lg shadow-2xl max-w-4xl w-full">
                    <h1 className="text-3xl font-bold mb-6 text-center text-gray-700">Error</h1>
                    <p className="text-center text-red-500">Failed to load urls</p>
                </div>
            </div>
        );
    }

    return (
        <div className='min-h-screen flex flex-col justify-center items-center bg-gray-100'>
            <div className='p-10 bg-white rounded-lg shadow-2xl max-w-4xl w-full'>
                <h1 className='text-3xl font-bold mb-6 text-center text-gray-700'>
                    All Short Urls
                </h1>
                <Link href='/' className='text-gray-800'>Go To Home</Link>

                <div className='overflow-x-auto'>
                    <table className='table table-zebra w-full'>
                        <thead>
                            <tr>
                                <th>
                                    Original Url
                                </th>
                                <th>
                                    Short Url
                                </th>
                            </tr>
                        </thead>

                        <tbody>
                            {urls && urls.map((url) => {
                                return (
                                    <tr key={url._id}>
                                        <td>{url.originalUrl}</td>
                                        <td>
                                            <a
                                                href={`/${url.shortUrl}`}
                                                target='_blank'
                                                className='link link-primary'
                                            >
                                                {`${process.env.NEXT_PUBLIC_BASE_URL}/${url.shortUrl}`}
                                            </a>
                                        </td>
                                    </tr>
                                );
                            })}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default UrlList;