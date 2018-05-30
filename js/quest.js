
var parsedCode;
var mainCode;
var optimumCode;
var tempResult;
var codeLines;
var mainLines;

function semanticAnalysis(code) {
    code = clearWhiteCharacters(code);
    return codeGenerate(code);
}

function codeGenerate(code) {

    if(code.startsWith("==")) {
        mainCode += "== ";
        code = deleteRegexInCode(code, /\=\=/);
        return "CMP " + codeGenerate(code);
    } else if(code.startsWith(";")) {
        mainCode += "; ";
        code = deleteRegexInCode(code, /\;/);
        return "END " + codeGenerate(code);
    } else if(code.startsWith(",")) {
        mainCode += ", ";
        code = deleteRegexInCode(code, /\,/);
        return "BR " + codeGenerate(code);
    } else if(code.startsWith("=")) {
        mainCode += "= ";
        code = deleteRegexInCode(code, /\=/);
        return "EQ " + codeGenerate(code);
    } else if(code.startsWith("+")) {
        mainCode += "+ ";
        code = deleteRegexInCode(code, /\+/);
        return "ADD " + codeGenerate(code);
    } else if(code.startsWith("-")) {
        mainCode += "- ";
        code = deleteRegexInCode(code, /\-/);
        return "SUB " + codeGenerate(code);
    } else if(code.startsWith("*")) {
        mainCode += "* ";
        code = deleteRegexInCode(code, /\*/);
        return "MUL " + codeGenerate(code);
    } else if(code.startsWith("/")) {
        mainCode += "/ ";
        code = deleteRegexInCode(code, /\//);
        return "DIV " + codeGenerate(code);
    } else if(code.startsWith("(")) {
        mainCode += "( ";
        code = deleteRegexInCode(code, /\(/);
        return "LBT " + codeGenerate(code);
    } else if(code.startsWith(")")) {
        mainCode += ") ";
        code = deleteRegexInCode(code, /\)/);
        return "RBT " + codeGenerate(code);
    } else if(code.startsWith("{")) {
        mainCode += "{ ";
        code = deleteRegexInCode(code, /\{/);
        return "LCB " + codeGenerate(code);
    } else if(code.startsWith("}")) {
        mainCode += "} ";
        code = deleteRegexInCode(code, /\}/);
        return "RCB " + codeGenerate(code);
    } else if(code.startsWith("[")) {
        mainCode += "[ ";
        code = deleteRegexInCode(code, /\[/);
        return "LBB " + codeGenerate(code);
    } else if(code.startsWith("]")) {
        mainCode += "] ";
        code = deleteRegexInCode(code, /\]/);
        return "RBB " + codeGenerate(code);
    } else if(code.startsWith("eğer")) {
        mainCode += "eğer ";
        code = deleteRegexInCode(code, /eğer/);
        return "IF " + codeGenerate(code);
    } else if(code.startsWith("değilseeğer")) {
        mainCode += "değilseeğer ";
        code = deleteRegexInCode(code, /değilseeğer/);
        return "ELIF " + codeGenerate(code);
    } else if(code.startsWith("değilse")) {
        mainCode += "değilse ";
        code = deleteRegexInCode(code, /değilse/);
        return "ELSE " + codeGenerate(code);
    } else if(code.startsWith("tekrarla")) {
        mainCode += "tekrarla ";
        code = deleteRegexInCode(code, /tekrarla/);
        return "FOR " + codeGenerate(code);
    } else if(code.startsWith("olduğusürece")) {
        mainCode += "olduğusürece ";
        code = deleteRegexInCode(code, /olduğusürece/);
        return "WHL " + codeGenerate(code);
    } else if(code.startsWith("program")) {
        mainCode += "program ";
        code = deleteRegexInCode(code, /program/);
        return "MAIN " + codeGenerate(code);
    } else if(code.startsWith("döndür")) {
        mainCode += "döndür ";
        code = deleteRegexInCode(code, /döndür/);
        return "RET " + codeGenerate(code);
    } else if(code.startsWith("\"")) {
        mainCode += "\" ";
        code = deleteRegexInCode(code, /\"/);
        return "DQ " + codeGenerate(code);
    } else if(/^\d+/.test(code)) {
        mainCode += /\d+/.exec(code) + " ";
        code = deleteRegexInCode(code, /\d+/);
        return "INT " + codeGenerate(code);
    } else if(/^\w+/.test(code)) {
        mainCode += /\w+/.exec(code) + " ";
        code = deleteRegexInCode(code, /\w+/);
        return "ID " + codeGenerate(code);
    } else if(/^[\<\>\!]/.test(code)) {
        mainCode += /[\<\>\!][=]?/.exec(code) + " ";
        code = deleteRegexInCode(code, /[\<\>\!][=]?/);
        return "CMP " + codeGenerate(code);
    } else {
        return "";
    }
}

function prepare(code) {
    mainCode = "";
    optimumCode = true;
    parsedCode = semanticAnalysis(code);
    alert(mainCode);
    codeLines = parsedCode.split(" ");
    mainLines = mainCode.split(" ");
}


function e1s1(code) {
    prepare(code);
    return e1s1Check(codeLines, mainLines);
}

function e1s2(code) {
    prepare(code);
    return e1s2Check(codeLines, mainLines);
}

function e1s3(code) {
    prepare(code);
    return e1s3Check(codeLines, mainLines);
}

function e1s4(code) {
    prepare(code);
    return e1s4Check(codeLines, mainLines);
}

function e1s1Check(codeLines, mainLines) {
    if(codeLines.length == 1) {
        return tempResult;
    } else if(codeLines[0] == "ID") {
        if(mainLines[2] == 3) {
            return "correct";
        } else {
            tempResult = "Hayvanları tekrar saymalısın !";
            optimumCode = false;
            codeLines.splice(0, 1);
            mainLines.splice(0, 1);
            return e1s1Check(codeLines, mainLines);
        }
    } else {
        optimumCode = false;
        codeLines.splice(0, 1);
        mainLines.splice(0, 1);
        return e1s1Check(codeLines, mainLines);
    }
}

function e1s2Check(codeLines, mainLines) {
    if(codeLines.length == 1) {
        return tempResult;
    } else if(codeLines[0] == "ID") {
        if(mainLines[2] == 4) {
            return "correct";
        } else {
            tempResult = "Hayvanları tekrar saymalısın !";
            optimumCode = false;
            codeLines.splice(0, 1);
            mainLines.splice(0, 1);
            return e1s1Check(codeLines, mainLines);
        }
    } else {
        optimumCode = false;
        codeLines.splice(0, 1);
        mainLines.splice(0, 1);
        return e1s1Check(codeLines, mainLines);
    }
}

function e1s3Check(codeLines, mainLines) {
    if(codeLines.length == 1) {
        return tempResult;
    } else if(codeLines[0] == "ID") {
        if(mainLines[2] == 5) {
            return "correct";
        } else {
            tempResult = "Hayvanları tekrar saymalısın !";
            optimumCode = false;
            codeLines.splice(0, 1);
            mainLines.splice(0, 1);
            return e1s1Check(codeLines, mainLines);
        }
    } else {
        optimumCode = false;
        codeLines.splice(0, 1);
        mainLines.splice(0, 1);
        return e1s1Check(codeLines, mainLines);
    }
}

function e1s4Check(codeLines, mainLines) {
    if(codeLines.length == 1) {
        return tempResult;
    } else if(codeLines[0] == "ID") {
        if(mainLines[2] < 6) {
            document.getElementById('value').value = mainLines[2];
            return "correct";
        } else {
            tempResult = "Kümeste kaç tavuk olduğunu unutmamalısın !";
            optimumCode = false;
            codeLines.splice(0, 1);
            mainLines.splice(0, 1);
            return e1s1Check(codeLines, mainLines);
        }
    } else {
        optimumCode = false;
        codeLines.splice(0, 1);
        mainLines.splice(0, 1);
        return e1s1Check(codeLines, mainLines);
    }
}