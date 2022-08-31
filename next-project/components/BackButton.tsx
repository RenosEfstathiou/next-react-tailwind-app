
import React from 'react';
import { useRouter } from 'next/router'


import { ChevronLeftIcon } from '@heroicons/react/20/solid/'

const BackButton: React.FC = () => {
    const router = useRouter();

    const visibility = router.pathname == '/404' ? 'hidden' : 'fixed'



    return (
        <div className={`${visibility ? visibility : 'fixed'} z-10 bottom-9 right-1 md:right-5`}>

            <button
                title='Back'
                type="button"
                className="inline-flex items-center rounded-full border border-transparent bg-indigo-600 p-2 text-white shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                onClick={() => router.back()}
            >
                <ChevronLeftIcon className="h-5 w-5 md:h-6 md:w-6" aria-hidden="true" />
            </button >
        </div >
    )
}

export default BackButton;