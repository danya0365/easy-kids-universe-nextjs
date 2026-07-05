// props ร่วมของทุก RoundComponent (registry map gameId → component ตัวนี้)
// round เป็น unknown เพราะ registry รับประกันการจับคู่ gameId↔ชนิด content — component cast เอง
export interface GameRoundProps {
  round: unknown;
  onSubmit: (correct: boolean) => void;
  disabled: boolean;
}
