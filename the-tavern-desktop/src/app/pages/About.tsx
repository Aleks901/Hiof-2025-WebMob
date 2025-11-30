"use client"

import { ProtectedRoute } from "../components/protected-route"

export function About(){
    return (
        <ProtectedRoute>
            <div>
                <p>
                    This is the about page.
                </p>
            </div>
        </ProtectedRoute>
    );
}