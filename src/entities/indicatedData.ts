export interface IndicatedDataValue {
    valueName: string,
    valueMeasure: string,
    value: number,
    color: string
}

export interface IndicatedData {
    title: string,
    data: IndicatedDataValue[]
}