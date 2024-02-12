"use client";

import React, { useEffect } from "react";
import { useRouter } from "next/navigation";
import HTTPService from "@/services/http.service";
import { useState } from "react";
import Image from "next/image";
/**
 * AppButtonRegistrate is a customizable button component for React applications.
 *
 * @component
 * @param {Function} handleClick - The function to be executed when the button is clicked.
 * @param {string} type - The type of the button (e.g., "button", "submit").
 * @param {string} className - Additional CSS classes for the button.
 * @param {string} name - The name attribute of the button.
 * @returns {React.Element} A React button element with custom properties.
 */

export default function AppButtonRegistrate({eventID, value}) {
    const [loading, setLoading] = useState(true);
    const [qrCode, setQrCode] = useState("");
    useEffect(() => {
        if (loading) {
            const getResult = async () => {
                const result = await HTTPService.put(`/events/${eventID}/participate`,{
                    "reaction": value,
                    "carpool": true,
                    "carpool_role": "DRIVER",
                    "club_name": "Club Name"
                });
                await setQrCode(result.data.participation.qr_code);
                await setLoading(false);
            }
            getResult();
        }
    }, [loading, eventID, value]);

    return (
        <>
        {!loading &&
        <div className="flex gap-[1rem] w-full items-center bg-primary-green rounded-[0.8rem] p-[0.8rem] my-[0.8rem]">
            <div className="w-2/12 aspect-square flex items-center">
                <Image
                    alt="QR code"
                    src={qrCode}
                    width={100} 
                    height={100}
                />
            </div>
            <div>
                <h2 className="text-h2 text-background">This is your registration</h2>
                <p className="text-background">Scan to registrate at the reception</p>
            </div>
        </div>}
        </>
    );
}
