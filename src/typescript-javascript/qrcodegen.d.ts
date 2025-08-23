// Type declarations for qrcodegen

export class Ecc {
  readonly ordinal: number;
  readonly formatBits: number;
  
  static readonly LOW: Ecc;
  static readonly MEDIUM: Ecc;
  static readonly QUARTILE: Ecc;
  static readonly HIGH: Ecc;
}

export class Mode {
  readonly modeBits: number;
  
  static readonly NUMERIC: Mode;
  static readonly ALPHANUMERIC: Mode;
  static readonly BYTE: Mode;
  static readonly KANJI: Mode;
  static readonly ECI: Mode;
  
  numCharCountBits(ver: number): number;
}

export class QrSegment {
  readonly mode: Mode;
  readonly numChars: number;
  readonly data: number[];
  
  static makeBytes(data: number[]): QrSegment;
  static makeNumeric(digits: string): QrSegment;
  static makeAlphanumeric(text: string): QrSegment;
  static makeSegments(text: string): QrSegment[];
  static makeEci(assignVal: number): QrSegment;
  static isNumeric(text: string): boolean;
  static isAlphanumeric(text: string): boolean;
}

export class QrCode {
  readonly version: number;
  readonly size: number;
  readonly mask: number;
  readonly errorCorrectionLevel: Ecc;
  
  constructor(version: number, errorCorrectionLevel: Ecc, dataCodewords: number[], mask: number);
  
  getModule(x: number, y: number): boolean;
  
  static encodeText(text: string, ecl: Ecc): QrCode;
  static encodeBinary(data: number[], ecl: Ecc): QrCode;
  static encodeSegments(segs: QrSegment[], ecl: Ecc, 
    minVersion?: number, maxVersion?: number, 
    mask?: number, boostEcl?: boolean): QrCode;
  
  static readonly MIN_VERSION: number;
  static readonly MAX_VERSION: number;
}