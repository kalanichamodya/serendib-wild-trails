import { safaris } from "./content/safaris";
import { destinationCards } from "./content/destinations";

export const experienceOptions = ["Jeep Safari", "Village Tour", "Cultural Tour"];
export const destinationOptions = [
  ...safaris.map(safari => safari.location),
  ...destinationCards.map(destination => destination.name),
];

export const defaultBookingOptions = {
  experience: experienceOptions[0],
  destination: destinationOptions[0],
};
