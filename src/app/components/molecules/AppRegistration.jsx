"use client";
import { useState } from 'react';
import AppButton from '@/app/components/atoms/AppButton';
import AppTextArea from '@/app/components/atoms/AppTextArea';
import { useForm } from "react-hook-form";
import HttpService from '@/services/http.service';
import { useRouter } from 'next/navigation';

export default function AppRegistration({eventID, value}) {
  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const onSubmit = async (data) => {
    setLoading(true);
    try {
      if(eventID && value) {
        if(data.message.length < 10) {setError("Message is too short. (min 10 characters)")}
        else if(data.message.length > 1000) {setError("Message is too long (max 1000 characters)")}
        else{
          await HttpService.put(`/events/${eventID}/participate`, {
          "reaction": value,
          "carpool": true,
          "carpool_role": "DRIVER",
          "club_name": "Club de Tennis",
          "problem": data.message
          });
          await router.refresh();
        }
      }
    } catch (error) {
      setError(error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className="flex flex-col gap-6 my-[0.8rem]"
      noValidate
      method="post"
    >
      <h3 className="text-h3 font-bold mt-[0.8rem]">Have a problem? Les us know!</h3>
      <AppTextArea
        name="message"
        label=" "
        placeholder="What is the problem?"
        register={register}
        validationSchema={{
            required: {
            value: true,
            message: "Please enter a message",
            },
            minLength: {
            value: 10,
            message:
                "Message is too short. (min 10 characters)",
            },
            maxLength: {
            value: 1000,
            message:
                "Message is too long (max 1000 characters)",
            },
        }}
        handleChange={(e) =>
            setValue("message", e.target.value)
        }
        errors={error}
        minLength={20}
        maxLength={1000}
        />
      <AppButton
        innerText={loading ? "Loading..." : "Send us a message"}
        type="submit"
        bg_color="bg-accent-blue"
        outline={false}
        className={`gap-4 !border-accent-blue ${
          loading ? "translate-y-0 cursor-wait opacity-80 " : ""
        }`}
      ></AppButton>
    </form>
  );
};