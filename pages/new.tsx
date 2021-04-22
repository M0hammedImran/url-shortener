import Head from 'next/head';
import Link from 'next/link';
import { useState } from 'react';
import { useMutation } from 'react-query';

interface site {
    id?: number;
    createdAt?: Date | string;
    link?: string;
    alias?: string;
}

async function createAliasReq({ data }) {
    console.log(`🚀 | file: new.tsx | line 11 | data`, data);
    const response = await fetch('/api/alias/create/', {
        body: JSON.stringify({ data }),
        method: 'POST',
        headers: {
            'Content-Type': 'Application/json',
        },
    });
    const { site } = await response.json();
    return site;
}
function useCreateAlias() {
    const { mutate, isLoading, data, isSuccess } = useMutation(createAliasReq);
    return { data, mutate, isLoading, isSuccess };
}

export default function New() {
    const [siteLink, setSiteLink] = useState('');
    const {
        data,
        mutate: createAlias,
        isLoading,
        isSuccess,
    } = useCreateAlias();

    return (
        <div className="">
            <Head>
                <title>Create New Short URL</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav className="px-3 py-4 space-x-4 sticky top-0">
                <Link href="/">Home</Link>
                <Link href="/new">Create New Alias</Link>
            </nav>
            <main className="max-w-xl mx-auto min-h-screen flex items-center flex-col">
                <form
                    onSubmit={(e) => {
                        e.preventDefault();
                        createAlias({ data: { link: siteLink } });
                        setSiteLink('');
                    }}
                    className="flex flex-col space-y-4"
                >
                    <input
                        type="text"
                        id="site-link"
                        className="ring-1 ring-black px-4 py-2 focus:ring focus:ring-indigo-500 focus:outline-none rounded"
                        value={siteLink}
                        onChange={(e) => setSiteLink(e.target.value)}
                    />
                    <button
                        type="submit"
                        className={`px-6 py-2 rounded ${
                            isLoading || isSuccess
                                ? 'bg-indigo-200 text-gray-500'
                                : 'bg-indigo-500 text-white'
                        }`}
                        disabled={isLoading || isSuccess}
                    >
                        {isLoading ? 'loading...' : 'Submit'}
                    </button>
                </form>
                <h3>{data && process.env.HOST + '/' + data.alias}</h3>
            </main>
        </div>
    );
}
