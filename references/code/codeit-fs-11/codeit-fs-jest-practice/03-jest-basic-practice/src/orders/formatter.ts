export interface CurrencyFormatter {
  format(value: number): string;
}

export const formatter: CurrencyFormatter = {
  format(value: number): string {
    return `${value.toLocaleString('ko-KR')}원`;
  },
};
