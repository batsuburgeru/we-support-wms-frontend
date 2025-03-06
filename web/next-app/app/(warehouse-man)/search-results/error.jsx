"use client"
import React, { useEffect } from "react";

export default function Error({ error }) {
    useEffect(() => {
        console.log(error);
    }, [error]);

    return (
        <div>
            Error fetching data.
        </div>
    )
}
