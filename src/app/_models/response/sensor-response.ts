export class SensorResponse {
    constructor(
        public id?:string,
        public name?: string,
        public model?: string,
        public rangeFrom?: string,
        public rangeTo?: string,
        public location?: string,
        public unit?: string,
        public type?: string,
        public description?: string
    ) { }
}