export interface IndicatedDataValue {
    valueName: string|null,
    valueMeasure: string,
    value: number,
    color: string
}

export interface IndicatedData {
    title: string,
    data: IndicatedDataValue[]
}