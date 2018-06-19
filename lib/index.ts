interface Desc {
  catg: string,
  name: string,
  grp: number,
  pos: number,
}

interface Sect {
  sect: string,
  catg: string,
}

type DescList = Desc[];

type SectList = Sect[];

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

type PackData = any[];

class GRPX {
  desc: DescList;
  sect: SectList;

  constructor(desc: DescList, sect: SectList) {
    this.desc = desc;
    this.sect = sect;
  }

  pack(serializeDataForm: PackData): GRPXVectors {
    const optDesc = this.desc;
    var counter, grps: any, obj, option, _i, _j, _len, _len1;
    counter = 0;
    for (_i = 0, _len = serializeDataForm.length; _i < _len; _i++) {
      option = serializeDataForm[_i];
      if (option.value === 'Нет') {
        option.value = 'no';
      }
      if (option.value === 'Да') {
        option.value = 'yes';
      }
      if (option.value === 'on') {
        option.value = 'yes';
        delete serializeDataForm[counter - 1];
      }
      counter++;
    }

    const options: any = {};
    for (_j = 0, _len1 = serializeDataForm.length; _j < _len1; _j++) {
      obj = serializeDataForm[_j];
      if (obj != null) {
        options[obj.name] = obj.value;
      }
    }
    grps = [[0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0], [0, 0]];
    optDesc.forEach((el, ind) => {
      if (typeof options[el.catg] !== "undefined" && options[el.catg] === el.name) {
        return grps[el.grp][(el.pos > 31 ? 1 : 0)] += Math.pow(2, (el.pos > 31 ? el.pos - 32 : el.pos));
      }
    });
    const simplify = function(str: any) {
      while (str.length > 1 && str.substr(0, 1) === "0") {
        str = str.substr(1);
      }
      return str;
    };
    grps.forEach((el: any, ind: any) => {
      el[1] = simplify(el[1].toString(16) + ("00000000" + el[0].toString(16)).substr(-8));
      return el[0] = "grp" + ind;
    });
    return {
      grp0: grps[0][1],
      grp1: grps[1][1],
      grp2: grps[2][1],
      grp3: grps[3][1],
      grp4: grps[4][1],
      grp5: grps[5][1],
      grp6: grps[6][1],
      grp7: grps[7][1],
    };
  }

  unpack(grpx: GRPXVectors) {
    const opt_desc = this.desc;
    const opt_sect = this.sect;
    const compls: GRPXVectors = grpx;

    var opt_sect_rev: any = {};
    var allGroupsTitle: any = [];
    var currentGroupName = '';

    opt_sect.forEach((el, ind) => {
      var flagExist, i, item, len;
      opt_sect_rev[el.catg] = el.sect;
      if (currentGroupName !== el.sect) {
        currentGroupName = el.sect;
        flagExist = false;
        for (i = 0, len = allGroupsTitle.length; i < len; i++) {
          item = allGroupsTitle[i];
          if (item === currentGroupName) {
            flagExist = true;
          }
        }
        if (!flagExist) {
          return allGroupsTitle.push(currentGroupName);
        }
      }
    });

    let result: any = {};
    opt_desc.forEach((el3) => {
      var ofs, sect; 
      const key: (keyof GRPXVectors) = 'grp'+el3.grp as keyof GRPXVectors;
      const option: string = compls[key];
      ofs = Math.ceil(option.length - el3.pos / 4 - 1);
      if (parseInt("0x" + option.substring(ofs, ofs + 1)) & Math.pow(2, el3.pos % 4)) {
        sect = opt_sect_rev[el3.catg];
        if (result[sect] === undefined) {
          result[sect] = {};
        }
        if (result[sect][el3.catg] === undefined) {
          return result[sect][el3.catg] = el3.name;
        } else if (result[sect][el3.catg] instanceof Array) {
          return result[sect][el3.catg].push(el3.name);
        } else {
          return result[sect][el3.catg] = [result[sect][el3.catg], el3.name];
        }
      }
    });

    return result;
  }
}
