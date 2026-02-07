import { WeatherIcons, WeatherIconName } from "./weatherIcons";

export type WeatherCondition =
  | "sunny"
  | "partly"
  | "cloudy"
  | "storm"
  | "lightning"
  | "snow"
  | "windy"
  | "tornado";

export function resolveWeatherIcon(
  hour: number,
  condition: WeatherCondition
) {
  const isNight = hour < 6 || hour >= 20;

  // time-of-day always wins
  if (isNight) {
    if (hour >= 20 && hour < 22) return WeatherIcons.dusk;
    if (hour >= 4 && hour < 6) return WeatherIcons.dawn;
    return WeatherIcons.night;
  }

  // daytime weather
  switch (condition) {
    case "sunny":
      return WeatherIcons.sunny;
    case "partly":
      return WeatherIcons.partlyCloudy;
    case "cloudy":
      return WeatherIcons.cloudy;
    case "storm":
      return WeatherIcons.thunderstorm;
    case "lightning":
      return WeatherIcons.lightning;
    case "snow":
      return WeatherIcons.snow;
    case "windy":
      return WeatherIcons.windy;
    case "tornado":
      return WeatherIcons.tornado;
    default:
      return WeatherIcons.sunny;
  }
}