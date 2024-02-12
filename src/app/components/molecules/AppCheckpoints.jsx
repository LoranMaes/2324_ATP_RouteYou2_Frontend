"use client";
import { useState } from 'react';
import AppButton from '@/app/components/atoms/AppButton';
import AppInput from '@/app/components/atoms/AppInput';
import { useForm } from "react-hook-form";
import HttpService from '@/services/http.service';

export default function AppCheckpoints({routes}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const onSubmit = async (data) => {
    setLoading(true);
    try {
        if(data.address.split(",").length != 2) setError("Invalid address")
        else if(isNaN(parseFloat(data.address.split(",")[0])) || isNaN(parseFloat(data.address.split(",")[1]))) setError("Invalid address")
        else {
            let long = parseFloat(data.address.split(",")[0])
            let lat = parseFloat(data.address.split(",")[1])
            for (let i = 0; i < routes.length; i++) {
                await HttpService.post(`/routes/${routes[i]}/checkpoints`, {
                    "longitude": long,
                    "latitude": lat,
                    "coin": 15
                });
            }
            await location.reload();
        }
        
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
        <h3 className="text-h3 font-bold mt-[0.8rem]">Add checkpoints</h3>
        <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex flex-col md:flex-row gap-6 my-[0.8rem]"
            noValidate
            method="post"
        >
        <AppInput
            name="address"
            label=""
            type="text"
            placeholder="123.987456, 15.987456"
            register={register}
            validationSchema={{
                required: {
                value:true,
                message: "Address is required",
                },
                minLength: {
                value: 3,
                message: "Address is too short",
                },
            }}
            handleChange={(e) =>
                setValue("address", e.target.value)
            }
            autocomplete="address"
            errors={error}
        ></AppInput>
        <AppButton
            innerText={loading ? "Loading..." : "Add checkpoint"}
            type="submit"
            bg_color="bg-accent-blue"
            outline={false}
            className={`gap-4 !border-none ${
            loading ? "translate-y-0 cursor-wait opacity-80 " : ""
            }`}
        ></AppButton>
        </form>
    </>
  );
};