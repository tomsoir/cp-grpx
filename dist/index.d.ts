interface Desc {
    catg: string;
    name: string;
    grp: number;
    pos: number;
}
interface Sect {
    sect: string;
    catg: string;
}
declare type DescList = Desc[];
declare type SectList = Sect[];
interface GRPXVectors {
    grp0: string;
    grp1: string;
    grp2: string;
    grp3: string;
    grp4: string;
    grp5: string;
    grp6: string;
    grp7: string;
}
declare type PackData = any[];
declare class GRPX {
    desc: DescList;
    sect: SectList;
    constructor(desc: DescList, sect: SectList);
    pack(serializeDataForm: PackData): GRPXVectors;
    unpack(grpx: GRPXVectors): any;
}
