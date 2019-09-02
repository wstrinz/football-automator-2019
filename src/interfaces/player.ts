export interface Player {
  currentPosition: String;
  projected?: number;
}

export interface PlayerWithRow {
  row: HTMLElement;
  info: Player;
}
