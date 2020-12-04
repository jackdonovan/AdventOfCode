import { count } from "console";
import fs from "fs";

let ports: any;
var passPortList: Passport[] = [];
var uniquePassports: Passport[] = [];

class Passport {
  byr: number;
  iyr: number;
  eyr: number;
  hgt: number;
  hcl: string;
  ecl: string;
  pid: string;
  cid: string;
  hgtU: string;

  constructor(
    birthYear: number,
    issueYear: number,
    expirationYear: number,
    height: number,
    hairColor: string,
    eyeColor: string,
    passportId: string,
    countryId: string,
    heightUnit: string
  ) {
    this.byr = birthYear;
    this.iyr = issueYear;
    this.eyr = expirationYear;
    this.hgt = height;
    this.hcl = hairColor;
    this.ecl = eyeColor;
    this.pid = passportId;
    this.cid = countryId;
    this.hgtU = heightUnit;
  }
}

function loadFile() {
  ports = fs.readFileSync("input.txt", "utf8");
  ports = ports.split("-");
}

function processPorts() {
  let counter = 0;
  for (let port of ports) {
    port.replace("\n", " ");
    let portArr = port.split(" ");

    let birthYear: string = "";
    let issueYear: string = "";
    let expirationYear: string = "";
    let height: string = "";
    let hairColor: string = "";
    let eyeColor: string = "";
    let passportId: string = "";
    let countryId: string = "";
    let heightUnit: string = "";
    if (
      port.includes("ecl:") &&
      port.includes("pid:") &&
      port.includes("hcl:") &&
      port.includes("hgt:") &&
      port.includes("eyr:") &&
      port.includes("iyr:") &&
      port.includes("byr:")
    ) {
      counter = counter + 1;
    }
    for (let portLine of portArr) {
      if (portLine.includes("ecl:")) {
        if (eyeColor != "") {
          eyeColor = "";
        } else {
          eyeColor = portLine;
          eyeColor = eyeColor.replace("ecl:", "").replace("\n", "").trim();
        }
      }
      if (portLine.includes("byr:")) {
        birthYear = portLine;
        birthYear = birthYear.replace("byr:", "").replace("\n", "").trim();
      }
      if (portLine.includes("iyr:")) {
        issueYear = portLine;
        issueYear = issueYear.replace("iyr:", "").replace("\n", "").trim();
      }
      if (portLine.includes("eyr:")) {
        expirationYear = portLine;
        expirationYear = expirationYear
          .replace("eyr:", "")
          .replace("\n", "")
          .trim();
      }
      if (portLine.includes("hgt:")) {
        height = portLine;
        height = height.replace("hgt:", "").replace("\n", "").trim();
        if (height.includes("cm")) {
          heightUnit = "cm";
          height = height.replace("cm", "");
        } else {
          heightUnit = "in";
          height = height.replace("in", "");
        }
      }
      if (portLine.includes("hcl:")) {
        hairColor = portLine;
        hairColor = hairColor.replace("hcl:", "").replace("\n", "").trim();
      }
      if (portLine.includes("pid:")) {
        passportId = portLine;
        passportId = passportId.replace("pid:", "").replace("\n", "").trim();
      }
      if (portLine.includes("cid:")) {
        countryId = portLine;
        countryId = countryId.replace("cid:", "").replace("\n", "").trim();
      }

      if (
        birthYear != "" &&
        issueYear != "" &&
        expirationYear != "" &&
        height != ""
      ) {
        let tempPassport = new Passport(
          parseInt(birthYear),
          parseInt(issueYear),
          parseInt(expirationYear),
          parseInt(height),
          hairColor,
          eyeColor,
          passportId,
          countryId,
          heightUnit
        );

        console.log(birthYear);
        console.log(issueYear);
        console.log(expirationYear);
        console.log(height);
        console.log(hairColor);
        console.log(eyeColor);
        console.log(passportId);
        console.log(countryId);
        console.log(heightUnit);
        passPortList.push(tempPassport);
        console.log(tempPassport);
      }
    }
    console.log(counter);
  }
}

function processParsedPorts() {
  let classCounter = 0;
  passPortList.forEach((element) => {
    let isValid = 1;
    if (
      element.pid.length != 9 ||
      element.pid.includes("cm") ||
      element.pid == ""
    )
      isValid = 0;
    if (element.iyr < 2010 || element.iyr > 2020) isValid = 0;
    if (element.byr < 1920 || element.byr > 2002) isValid = 0;
    if (element.eyr < 2020 || element.eyr > 2030) isValid = 0;
    if (element.hgtU == "in" && (element.hgt < 59 || element.hgt > 76)) {
      isValid = 0;
    }
    if (element.hgtU == "cm" && (element.hgt < 150 || element.hgt > 193)) {
      isValid = 0;
    }
    if (
      !(
        element.ecl == "amb" ||
        element.ecl == "blu" ||
        element.ecl == "brn" ||
        element.ecl == "gry" ||
        element.ecl == "grn" ||
        element.ecl == "hzl" ||
        element.ecl == "oth"
      )
    )
      isValid = 0;
    if (element.hcl.length != 7) isValid = 0;
    if (!element.hcl.includes("#")) isValid = 0;
    if (isValid) {
      classCounter = classCounter + 1;

      let found = false;
      for (var i = 0; i < uniquePassports.length; i++) {
        if (uniquePassports[i].pid == element.pid) {
          found = true;
          break;
        }
      }
      if (!found) {
        uniquePassports.push(element);
      }

      console.log(element);
      console.log("valid");
    }
  });
  console.log(uniquePassports.length);
}

loadFile();
processPorts();
processParsedPorts();
