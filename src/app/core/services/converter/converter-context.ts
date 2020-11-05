import { Injectable } from "@angular/core";
import { AnsiConverter } from "./ansi-converter";
import { ConverterEnum } from "./converter.enum";
import { EbcdicConverter } from "./ebcdic-converter";
import { EditorsData } from "./editors-data";
import { Strategy } from "./strategy";

@Injectable({
    providedIn: 'root'
})
export class ConverterContext {

    private strategy: Strategy;

    constructor(
        private ebcdicConverter: EbcdicConverter,
        private ansiConverter: AnsiConverter
    ) { }

    setStrategy(_strategy: string) {
        switch (_strategy) {
            case ConverterEnum.Ebcdic:
                this.strategy = this.ebcdicConverter;
                break;
            case ConverterEnum.Ansi:
                this.strategy = this.ansiConverter;
                break;
        }
    }

    public process(data: string, isFromEditor?: boolean, isFile?: boolean): EditorsData {
        return this.strategy.convert(data, isFromEditor, isFile);
    }
}
