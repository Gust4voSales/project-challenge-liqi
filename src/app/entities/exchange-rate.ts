import { CurrencyCode } from "@app/types"

type Props = {
  baseCode: CurrencyCode
  targetCode: CurrencyCode
  conversionRate: number
  amount: number
}

export class ExchangeRate {
  private props: Props

  constructor(props: Props) {
    this.props = props
  }

  public get baseCode() {
    return this.props.baseCode
  }
  public get targetCode() {
    return this.props.targetCode
  }
  public get conversionRate() {
    return this.props.conversionRate
  }
  public get amount() {
    return this.props.amount
  }

  // calculation logic
  public get convertedAmount() {
    return this.amount * this.conversionRate
  }
}