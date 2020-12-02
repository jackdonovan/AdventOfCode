import fs from "fs";

class Rule {
  minRule: number;
  maxRule: number;
  letter: string;
  contentRule: string;

  constructor(min: number, max: number, character: string, text: string) {
    this.minRule = min;
    this.maxRule = max;
    this.letter = character;
    this.contentRule = text;
  }
}

let pwdRules: any;
let parsedRules: Rule[] = [];

function loadFile() {
  pwdRules = fs.readFileSync("input.txt", "utf8");
  pwdRules = pwdRules.split("\n");
}

function runPolicyParse() {
  for (let rule of pwdRules) {
    let tmpRule = new Rule(
      rule.substr(0, rule.indexOf("-")),
      rule
        .substr(rule.indexOf("-") + 1, rule.indexOf(" "))
        .substr(0, 2)
        .trim(),
      rule.substr(rule.indexOf(" ") + 1, rule.indexOf(":"))[0],
      rule.substr(rule.lastIndexOf(" "), 100).trim()
    );
    parsedRules.push(tmpRule);
  }
}

function runPolicyProcess() {
  let counter = 0;
  parsedRules.forEach((policy) => {
    let check = policy.contentRule.match(new RegExp(policy.letter, "g"));
    if (check?.length) {
      if (check.length >= policy.minRule && check.length <= policy.maxRule)
        counter = counter + 1;
    }
  });
  console.log(counter);
}

function runSecondPolicyProcess() {
  let counter = 0;

  parsedRules.forEach((policy) => {
    if (
      policy.contentRule[policy.minRule - 1] == policy.letter &&
      policy.contentRule[policy.maxRule - 1] != policy.letter
    )
      counter = counter + 1;
    else if (
      policy.contentRule[policy.minRule - 1] != policy.letter &&
      policy.contentRule[policy.maxRule - 1] == policy.letter
    )
      counter = counter + 1;
  });
  console.log(counter);
}

loadFile();
runPolicyParse();
runPolicyProcess();
runSecondPolicyProcess();
