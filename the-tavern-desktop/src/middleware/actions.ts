"use server"

import { redirect } from "./redirectHelper";


export async function errorRedirect(reason: string) {
    return redirect(`/error?reason={${reason}}`);
}