export interface IndicatedDataValue {
    valueName: string
    value: number,
    color: string
}

export interface IndicatedData {
    title: string,
    data: IndicatedDataValue[]
}