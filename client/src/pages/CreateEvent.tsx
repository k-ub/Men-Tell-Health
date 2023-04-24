import { useState } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";

import { FieldValues } from "react-hook-form";

import EventForm from "./EventForm";

const CreateEvent = () => {
    const { data: user } = useGetIdentity({
        v3LegacyAuthProviderCompatible: true,
    });
    const [eventLocation, setEventLocation] = useState({ lat: 0, lng: 0 });
    const {
        refineCore: { onFinish, formLoading },
        register,
        handleSubmit,
    } = useForm();

    const handleLocationChange = (lat: number, lng: number) => {
        setEventLocation({ lat, lng });
    };

    const onFinishHandler = async (data: FieldValues) => {
        if (!eventLocation.lat || !eventLocation.lng)
            return alert("Please select a location");

        await onFinish({
            ...data,
            location: eventLocation,
            email: user.email,
        });
    };

    return (
        <EventForm
            type="Create"
            register={register}
            onFinish={onFinish}
            formLoading={formLoading}
            handleSubmit={handleSubmit}
            handleLocationChange={handleLocationChange}
            onFinishHandler={onFinishHandler}
        />
    );
};
export default CreateEvent;
