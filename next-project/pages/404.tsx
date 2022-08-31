import Link from "next/link";
import Image from "next/image";

const ForOhFor: React.FC = () => {
    return (
        <div className="flex min-h-[99vh] flex-col bg-white">

            <main className="flex flex-grow flex-col bg-white">
                <div className="mx-auto flex w-full max-w-7xl flex-grow flex-col px-4 sm:px-6 lg:px-8">
                    <div className="my-auto flex-shrink-0 py-16 ">
                        <p className="text-base font-semibold text-indigo-600">404</p>
                        <h1 className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">Page not found</h1>
                        <p className="mt-2 text-base text-gray-500">Sorry, we couldn’t find the page you’re looking for.</p>
                        <div className="mt-6">
                            <Link href="/">
                                <div className="text-base font-medium text-gray-900 hover:text-gray-500">
                                    Go back home
                                    <span aria-hidden="true"> &rarr;</span>
                                </div>
                            </Link>
                            <a href="#" >

                            </a>
                        </div>
                    </div>
                </div>
            </main>


            <div className="hidden lg:absolute lg:inset-y-0 lg:right-0 lg:block lg:w-1/2">

                <Image src="/not_found.jpg" width={100} height={100} layout="fill" objectFit="contain" />

            </div>
        </div>
    )
}

export default ForOhFor;
