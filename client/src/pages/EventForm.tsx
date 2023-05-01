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
    return  (
        <form onSubmit={handleSubmit(onFinishHandler)} className="event-form">
            <div className="form-group">
                <label htmlFor="title" className="form-label">Title</label>
                <input
                    id="title"
                    className="form-control"
                    {...register("title", { required: "This field is required" })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="description" className="form-label">Description</label>
                <textarea
                    id="description"
                    className="form-control"
                    {...register("description", {
                        required: "This field is required",
                    })}
                />
            </div>
            <div className="form-group">
                <label htmlFor="date" className="form-label">Date</label>
                <input
                    type="date"
                    id="date"
                    className="form-control"
                    {...register("date", { required: "This field is required" })}
                />
            </div>
            <div className="form-group">
                <label className="form-label">Location</label>
                <GoogleMap onLocationChange={handleLocationChange} />
            </div>
            <button type="submit" disabled={formLoading} className="submit-button">
                {type} Event
            </button>
        </form>

    );
};

export default EventForm;
