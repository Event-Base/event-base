import { Suspense } from "react";
import Signin from "./signinPage";

export default function AuthPage() {
    return (
        <Suspense fallback={<div>Loading...</div>}>
            <Signin />
        </Suspense>
    );
}
