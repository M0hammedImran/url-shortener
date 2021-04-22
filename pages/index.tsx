import Head from 'next/head';
import Link from 'next/link';

export default function Home() {
    return (
        <div>
            <Head>
                <title>Short URL</title>
                <link rel="icon" href="/favicon.ico" />
            </Head>

            <nav>
                <Link href="/">home</Link>
                <Link href="/new">create new alias</Link>
            </nav>
            <main>
                <h1>Hello</h1>
            </main>
        </div>
    );
}
