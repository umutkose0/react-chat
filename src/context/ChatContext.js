import { useContext } from "react";
import { createContext, useReducer } from "react";
import {AuthContext} from "./AuthContext"

export const ChatContext=createContext()

export const ChatContextProvider=(e)=>{
    const {currentUser}=useContext(AuthContext);

    const INITIAL_STATE={
        chatId:null,
        user:{}
    }
    const chatReducer=(state,action)=>{
        switch(action.type)
        {
            case "CHANGE_USER":
                return{
                    user:action.value,
                    chatId:currentUser.uid>action.value.uid
                    ?currentUser.uid+action.value.uid
                    :action.value.uid+currentUser.uid

                }
            default:
                return state
        }
    }
    const [state,dispatch]=useReducer(chatReducer,INITIAL_STATE);
    return(
    <ChatContext.Provider value={{data:state,dispatch}}>
        {e.children}
    </ChatContext.Provider>)
}