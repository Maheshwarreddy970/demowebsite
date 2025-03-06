"use client";
import React, { useState } from "react";

import { cn } from "@/lib/utils";

import { Label } from "./ui/label";
import { Input } from "./ui/input";
import { ScriptCopyBtn } from "./magicui/script-copy-btn";

export function SignupFormDemo({ setIsAuthenticated }: { setIsAuthenticated: (value: boolean) => void }) {
    const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        console.log("Form submitted");
    };
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const handleLogin = () => {
        // Replace with actual authentication logic
        if (email === "admin@example.com" && password === "password123") {
            setIsAuthenticated(true);
        } else {
            alert("Invalid credentials");
        }
    };

    return (
        <div className="max-w-md w-full mx-auto rounded-none md:rounded-2xl p-4 md:p-8 shadow-input bg-white dark:bg-black">
            <h2 className="font-bold text-xl text-neutral-800 dark:text-neutral-200">
                Welcome to Super World Technologies
            </h2>
            <p className="text-neutral-600 text-sm max-w-sm mt-2 dark:text-neutral-300">
                <p className=" text-base my-5">
                Copy Below Email and Password to Login
                </p>
                <ScriptCopyBtn
                    showMultiplePackageOptions={true}
                    codeLanguage="shell"
                    lightTheme="nord"
                    darkTheme="vitesse-dark"
                    commandMap="admin@example.com"
                />
                <ScriptCopyBtn
                    showMultiplePackageOptions={true}
                    codeLanguage="shell"
                    lightTheme="nord"
                    darkTheme="vitesse-dark"
                    commandMap="password123"
                />
            </p>
            <form className="my-8" onSubmit={handleSubmit}>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input           type="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)} />
                </LabelInputContainer>
                <LabelInputContainer className="mb-4">
                    <Label htmlFor="password">Password</Label>
                    <Input      type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}/>
                </LabelInputContainer>
                <button
                    className="bg-gradient-to-br relative group/btn from-black dark:from-zinc-900 dark:to-zinc-900 to-neutral-600 block dark:bg-zinc-800 w-full text-white rounded-md h-10 font-medium shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:shadow-[0px_1px_0px_0px_var(--zinc-800)_inset,0px_-1px_0px_0px_var(--zinc-800)_inset]"
                    onClick={handleLogin} 
                >
                    Sign up &rarr;
                    <BottomGradient />
                </button>
            </form>
        </div>
    );
}

const BottomGradient = () => {
    return (
        <>
            <span className="group-hover/btn:opacity-100 block transition duration-500 opacity-0 absolute h-px w-full -bottom-px inset-x-0 bg-gradient-to-r from-transparent via-cyan-500 to-transparent" />
            <span className="group-hover/btn:opacity-100 blur-sm block transition duration-500 opacity-0 absolute h-px w-1/2 mx-auto -bottom-px inset-x-10 bg-gradient-to-r from-transparent via-indigo-500 to-transparent" />
        </>
    );
};

const LabelInputContainer = ({
    children,
    className,
}: {
    children: React.ReactNode;
    className?: string;
}) => {
    return (
        <div className={cn("flex flex-col space-y-2 w-full", className)}>
            {children}
        </div>
    );
};
