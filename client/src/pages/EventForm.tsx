import React from "react";
import { useFormContext, RegisterOptions } from "react-hook-form";
import GoogleMap from "./GoogleMap";

interface Props {
    type: string;
    register: ReturnType<typeof useFormContext>["register"];
    onFinish: any;
    formLoading: boolean;
    handleSubmit: any;
    handleLocationChange: (lat: number, lng: number) => void;
    onFinishHandler: (data: any) => void;
}

const EventForm: React.FC<Props> = ({
    type,
    register,
    onFinish,
    formLoading,
    handleSubmit,
    handleLocationChange,
    onFinishHandler,
}) => {
    return (
        <form onSubmit={handleSubmit(onFinishHandler)}>
            <div>
                <label htmlFor="title">Title</label>
                <input
                    id="title"
                    {...register("title", { required: "This field is required" })}
                />
            </div>
            <div>
                <label htmlFor="description">Description</label>
                <textarea
                    id="description"
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </div>
            <div>
                <label htmlFor="date">Date</label>
                <input
                    type="date"
                    id="date"
                    {...register("date", { required: "This field is required" })}
                />
            </div>
            <div>
                <label>Location</label>
                <GoogleMap onLocationChange={handleLocationChange} />
            </div>
            <button type="submit" disabled={formLoading}>
                {type} Event
            </button>
        </form>
    );
};

export default EventForm;
