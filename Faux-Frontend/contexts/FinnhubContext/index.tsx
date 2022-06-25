import React, {createContext} from 'react'
import { dataHandler, initDataState } from './actions';
import {initialFinnhubState, dataReducer} from "./reducers";
import {IFinnhubState} from "./types";

interface FinnhubContextInterface {
    state: IFinnhubState
    dispatch: React.Dispatch<any>
}

export const FinnhubContext = createContext<FinnhubContextInterface>({
    state: initialFinnhubState,
    dispatch: () => undefined
})

interface ProviderProps {
    children: JSX.Element | JSX.Element[] | React.ReactNode
}

export const FinnhubContextProvider: React.FC<ProviderProps> = (props: ProviderProps) => {
    const [state, dispatch] = React.useReducer(dataReducer, initialFinnhubState)
    const { children } = props
    const value = { state, dispatch }

    React.useEffect(() => {
        initDataState(state, dispatch)
    }, [])

    

    return (
        <FinnhubContext.Provider
            value={value}
        >
            {children}
        </FinnhubContext.Provider>
    )
}