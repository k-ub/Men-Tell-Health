import { useState, useEffect } from "react";
import { useGetIdentity } from "@refinedev/core";
import { useForm } from "@refinedev/react-hook-form";
import { FieldValues } from "react-hook-form";
import EventForm from "./EventForm";
import axios from "axios";

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

  interface Event {
    _id: string;
    title: string;
    description: string;
    date: string;
    location: {
      lat: number;
      lng: number;
    };
  }
  
  const [events, setEvents] = useState<Event[]>([]);
  
  useEffect(() => {
    const fetchEvents = async () => {
        try {
          const response = await axios.get("/api/v1/events");
          console.log(response.data); // Add this line
          setEvents(response.data.events);
        } catch (error) {
          console.log(error);
        }
      };
      

    fetchEvents();
  }, []);

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
    <>
      <EventForm
        type="Create"
        register={register}
        onFinish={onFinish}
        formLoading={formLoading}
        handleSubmit={handleSubmit}
        handleLocationChange={handleLocationChange}
        onFinishHandler={onFinishHandler}
      />
      <div>
        <h2>Events:</h2>
        <ul>
          {events.map((event) => (
            <li key={event._id}>
              {event.title} - {event.description} - {event.date}
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default CreateEvent;
