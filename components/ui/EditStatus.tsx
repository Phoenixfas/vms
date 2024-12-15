"use client";

import { useEffect, useState } from 'react';
import { VEHICLE_STATUSES, VehicleStatus } from '@/lib/types/vehicle';
import { MdModeEditOutline } from "react-icons/md";
import { IoClose } from "react-icons/io5";

export default function EditStatus({ vId }: { vId: string }) {
    const [toggled, setToggled] = useState(false);
    const [isChanging, setIsChanging] = useState(false);

    const changeStatus = async (id: string, status: string) => {
        setIsChanging(true);
        const config = {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ status }),
        }
        try {
            const response = await fetch(`/api/vehicles/${id}`, config);
            const data = await response.json();
            if (data) {
                setToggled(false);
                setIsChanging(false);
                window.location.reload();
            }
        } catch (error) {
            console.log("error:", error);
            setIsChanging(false);
        }
    }
  return (
    <button
        // variant="outline"
        // size="sm"
        className='relative w-fit py-1 px-4 bg-[#4c4c4c] text-white rounded-lg flex items-center gap-2'
        onClick={() => setToggled(!toggled)}
        disabled={isChanging}
    >
        {isChanging ? "Changing..." : "Change Status"}
        <MdModeEditOutline color='white' size={25} />

        {toggled && 
            <div className="absolute top-0 right-full z-99999 bg-white shadow-xl border p-3 rounded-md flex flex-col gap-3 text-body-sm">
                <div className="w-full flex items-center justify-between text-black">
                    <p className="text-base text-left">Change to</p>
                    <IoClose onClick={() => setToggled(false)} className="cursor-pointer" size={15} />
                </div>
                {VEHICLE_STATUSES.map((status, index) => (
                    <div key={index} className="px-20 py-1 rounded-lg bg-[#4c4c4c]/[0.08] text-[#4c4c4c] font-bold" onClick={() => changeStatus(vId, status)}>{status}</div>
                ))}
        </div>}
    </button>
  )
}
