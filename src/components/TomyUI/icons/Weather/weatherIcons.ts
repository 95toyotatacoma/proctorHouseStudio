import PartlyCloudy from "./Outline/Weather/01-partly-cloudy.svg?react";
import Thunderstorm from "./Outline/Weather/02-thunderstorm.svg?react";
import Lightning from "./Outline/Weather/03-lightning.svg?react";
import Cloudy from "./Outline/Weather/04-cloudy.svg?react";
import Tornado from "./Outline/Weather/05-tornado.svg?react";
import Night from "./Outline/Weather/06-night.svg?react";
import Sunny from "./Outline/Weather/07-sunny.svg?react";
import Snow from "./Outline/Weather/08-snow.svg?react";
import Windy from "./Outline/Weather/09-windy.svg?react";
import Dusk from "./Outline/Weather/10-dusk.svg?react";
import Dawn from "./Outline/Weather/11-dawn.svg?react";

export const WeatherIcons = {
  partlyCloudy: PartlyCloudy,
  thunderstorm: Thunderstorm,
  lightning: Lightning,
  cloudy: Cloudy,
  tornado: Tornado,
  night: Night,
  sunny: Sunny,
  snow: Snow,
  windy: Windy,
  dusk: Dusk,
  dawn: Dawn,
};

export type WeatherIconName = keyof typeof WeatherIcons;