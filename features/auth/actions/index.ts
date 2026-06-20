"use server"

import {auth} from "@/lib/auth"
import { redirect } from "next/navigation"
import { headers } from "next/headers"
import { DEFAULT_AUTH_CALLBACK, SIGN_IN_PATH , getSafeCallbackPath} from "../utils"


export async function signInWithGithub(formData: FormData) {    
    const callbackUrl = formData.get("callbackUrl")
    const redirectTo= getSafeCallbackPath(typeof callbackUrl === "string" ? callbackUrl : null)
    const result= await auth.api.signInSocial({
        body: {
            provider: "github",
            callbackURL:redirectTo
        },
        headers:await headers()
    })
    if(result.url){
      
        redirect(result.url)
    }
}

export async function getServerSession() {
    const session = await auth.api.getSession({
        headers:await headers()
    })
    return session
}

export async function requireAuth(redirectTo: string = SIGN_IN_PATH) {
    const session = await getServerSession()
    if (!session) {
        redirect(redirectTo)
    }
    return session
}

export async function requireUnAuth(redirectTo: string = DEFAULT_AUTH_CALLBACK) {
    const session = await getServerSession()
    if (session) {
        redirect(redirectTo)
    }   
}