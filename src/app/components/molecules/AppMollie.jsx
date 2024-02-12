"use client";
import AppButton from '@/app/components/atoms/AppButton';
import HttpService from '@/services/http.service';
import { useRouter } from 'next/navigation';

export default function AppMollie({eventID, value}) {
  const router = useRouter();

  const handlePayment = async () => {
    // Perform payment logic using Mollie API
    // Set the payment status based on the response
    const response = await HttpService.put(`/events/${eventID}/participate`, {
      "reaction": value,
      "carpool": true,
      "carpool_role": "DRIVER",
      "club_name": "Club Name"
    }
    )
    await router.push(response.data.participation.checkout_url)
    await router.refresh()
  };

  return (
    <div data-testid="app-mollie">
      <AppButton
        className="w-full bg-primary text-background text-[2rem] py-5 rounded-[0.8rem] !border-primary font-bold"
        handleClick={handlePayment}
        outline={false}
        innerText="Pay with Mollie"
        type="button"
        name="pay"
      />
    </div>
  );
};