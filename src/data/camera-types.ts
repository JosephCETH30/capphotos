export type CameraCategory =
  | "mirrorless"
  | "dslr"
  | "compact"
  | "medium-format"
  | "action-cam"
  | "drone"
  | "cinema"
  | "film";

export type SensorSize =
  | '1/5"'
  | '1/2.3"'
  | '1/2"'
  | '1/1.9"'
  | '1/1.3"'
  | '1"'
  | "Micro Four Thirds"
  | "APS-C"
  | "Super 35"
  | "Full Frame"
  | "Medium Format"
  | "Large Format"
  | "35mm Film"
  | "Instant Film";

export interface CameraModel {
  id: string;
  name: string;
  year: number;
  sensorSize: SensorSize;
  /** Effective resolution in megapixels. Omitted for film cameras, where the concept doesn't apply. */
  megapixels?: number;
  mount: string;
  category: CameraCategory;
}

export interface CameraBrand {
  id: string;
  name: string;
  models: CameraModel[];
}
