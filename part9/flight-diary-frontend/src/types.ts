export enum Visibility {
  Great = "great",
  Good = "good",
  Ok = "ok",
  Poor = "poor",
}

export enum Weather {
  Sunnny = "sunny",
  Rainy = "rainy",
  Cloudy = "cloudy",
  Windy = "windy",
  Stormy = "stormy",
}

export interface Diary {
  id: number;
  date: string;
  weather: Weather | string;
  visibility: Visibility | string;
  comment?: string;
}

export type NewDiary = Omit<Diary, "id">;
