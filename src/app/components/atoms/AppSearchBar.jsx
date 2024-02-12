"use client";

import Icon from "@mdi/react";
import { mdiMagnify } from "@mdi/js";
import { Controller, useForm } from "react-hook-form";

export default function AppSearchBar({ placeholder, idLabel, idButton }) {
  const { register, control, handleSubmit } = useForm({
    defaultValues: {
      search: "",
    },
  });
  const onSubmit = (data) => console.log(data);
  return (
    <form className="w-full appearance-none border rounded-2xl flex justify-between text-base h-fit">
      <Controller
        name="search"
        control={control}
        render={() => (
          <input
            aria-label="search"
            className="w-full text-gray-700 pl-[1.5rem] rounded-s-2xl"
            placeholder={placeholder}
            type={"search"}
            {...register("search")}
          />
        )}
      />
      <button id={idButton} aria-label="Magnifying glass" onSubmit={handleSubmit(onSubmit)}>
        <Icon
          className="bg-accent-gray px-2 rounded-2xl rounded-l-none"
          color="white"
          id={idLabel}
          path={mdiMagnify}
          size={3}
        />
      </button>
    </form>
  );
}
