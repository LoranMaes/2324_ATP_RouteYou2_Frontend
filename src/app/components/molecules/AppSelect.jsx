"use client";

import React, { useEffect, useState } from "react";
import AppOption from "@/app/components/atoms/AppOption";
import HttpService from "@/services/http.service";
import { useRouter } from "next/navigation";
const AppSelect = ({ options, id, className, value, eventID, post }) => {
  const [selectedValue, setSelectedValue] = useState("");
  const [loading, setLoading] = useState(true);
  const [idEvent, setIdEvent] = useState(0);
  const router = useRouter();
  useEffect(() => {
    if (loading) {
      setSelectedValue(value);
      setIdEvent(eventID);
      setLoading(false);
    }
  }, [loading, value, eventID]);
  const handleSelect = async (event) => {
    setSelectedValue(event.target.label);
    if (post) {
      await HttpService.post(`/events/${idEvent}/participate`, {
        "reaction": event.target.value,
        "carpool": true,
        "carpool_role": "DRIVER",
        "club_name": "Club Name"
      })
      await router.refresh();
    } else {
      await HttpService.put(`/events/${idEvent}/participate`, {
        "reaction": event.target.value,
        "carpool": true,
        "carpool_role": "DRIVER",
        "club_name": "Club Name"
      })
      await router.refresh();
    }

  };
  return (
    <>
    {loading ? 
      (null) : 
      (<form data-testid='dropdown'>
        <select aria-label="select" className={`flex justify-center h-[2rem] ${className ? className : ""}`} id={id} value={selectedValue} onChange={handleSelect}>
          {options.map((option) => (
            <AppOption key={option.label} item={option.label} />
          ))}
        </select>
      </form>)}
      </>
  );
};

export default AppSelect;
