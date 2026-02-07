// src/components/TomyUI/icons/index.ts
import Power from "./ControlPanel/Power.svg?react";
import Tuning11 from "./ControlPanel/Tuning 11.svg?react";
import Wifi from "./ControlPanel/wifi.svg?react";
import WifiOn from "./ControlPanel/wifiOn.svg?react";
import Bluetooth from "./ControlPanel/bluetooth.svg?react";
import BluetoothConnected from "./ControlPanel/bluetooth_connected.svg?react";
import On from "./ControlPanel/on.svg?react";

export const TomyIcons = {
  power: Power,
  tuning11: Tuning11,
  wifi: Wifi,
  wifiOn: WifiOn,
  bluetooth: Bluetooth,
  bluetoothConnected: BluetoothConnected,
  on: On,
} as const;

export type TomyIconName = keyof typeof TomyIcons;