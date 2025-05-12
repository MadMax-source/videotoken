'use client'

// import { store } from '@lib/store'
import { Fragment, PropsWithChildren } from 'react'
// import { Provider } from "react-redux"
import { Toaster } from "sonner"
import { MdErrorOutline } from "react-icons/md";
import { PiConfettiLight } from "react-icons/pi";

export default function ReduxProvider({ children }: PropsWithChildren) {
    return (
        // <Provider store={store}>
            <Fragment>
                <Toaster richColors
                expand={false}
                visibleToasts={2}
                position='top-right' icons={{
                    success: <PiConfettiLight size={29} className='pr-2' />,
                    error: <MdErrorOutline size={29} className='pr-2' />
                }} />
            {children}
            </Fragment>
        // </Provider>
    )
}
