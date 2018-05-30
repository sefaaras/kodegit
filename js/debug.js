
var resultVariable;
var bt;
var cb;
var bb;
var ifCount;

function compile(code) {
    bt = 0;
    cb = 0;
    bb = 0;
    ifCount = 0;
    var parsedCode = lexicalAnalysis(code);
    alert(parsedCode);
    return syntaxAnalysis(parsedCode);
}

function lexicalAnalysis(code) {
    code = clearWhiteCharacters(code);
    return parseCode(code);
}

function parseCode(code) {

    if(code.startsWith("==")) {
        code = deleteRegexInCode(code, /\=\=/);
        return "CMP " + parseCode(code);
    } else if(code.startsWith(";")) {
        code = deleteRegexInCode(code, /\;/);
        return "END " + parseCode(code);
    } else if(code.startsWith(",")) {
        code = deleteRegexInCode(code, /\,/);
        return "BR " + parseCode(code);
    } else if(code.startsWith("=")) {
        code = deleteRegexInCode(code, /\=/);
        return "EQ " + parseCode(code);
    } else if(code.startsWith("+")) {
        code = deleteRegexInCode(code, /\+/);
        return "ADD " + parseCode(code);
    } else if(code.startsWith("-")) {
        code = deleteRegexInCode(code, /\-/);
        return "SUB " + parseCode(code);
    } else if(code.startsWith("*")) {
        code = deleteRegexInCode(code, /\*/);
        return "MUL " + parseCode(code);
    } else if(code.startsWith("/")) {
        code = deleteRegexInCode(code, /\//);
        return "DIV " + parseCode(code);
    } else if(code.startsWith("(")) {
        code = deleteRegexInCode(code, /\(/);
        return "LBT " + parseCode(code);
    } else if(code.startsWith(")")) {
        code = deleteRegexInCode(code, /\)/);
        return "RBT " + parseCode(code);
    } else if(code.startsWith("{")) {
        code = deleteRegexInCode(code, /\{/);
        return "LCB " + parseCode(code);
    } else if(code.startsWith("}")) {
        code = deleteRegexInCode(code, /\}/);
        return "RCB " + parseCode(code);
    } else if(code.startsWith("[")) {
        code = deleteRegexInCode(code, /\[/);
        return "LBB " + parseCode(code);
    } else if(code.startsWith("]")) {
        code = deleteRegexInCode(code, /\]/);
        return "RBB " + parseCode(code);
    } else if(code.startsWith("eğer")) {
        code = deleteRegexInCode(code, /eğer/);
        return "IF " + parseCode(code);
    } else if(code.startsWith("değilseeğer")) {
        code = deleteRegexInCode(code, /değilseeğer/);
        return "ELIF " + parseCode(code);
    } else if(code.startsWith("değilse")) {
        code = deleteRegexInCode(code, /değilse/);
        return "ELSE " + parseCode(code);
    } else if(code.startsWith("tekrarla")) {
        code = deleteRegexInCode(code, /tekrarla/);
        return "FOR " + parseCode(code);
    } else if(code.startsWith("olduğusürece")) {
        code = deleteRegexInCode(code, /olduğusürece/);
        return "WHL " + parseCode(code);
    } else if(code.startsWith("program")) {
        code = deleteRegexInCode(code, /program/);
        return "MAIN " + parseCode(code);
    } else if(code.startsWith("döndür")) {
        code = deleteRegexInCode(code, /döndür/);
        return "RET " + parseCode(code);
    } else if(code.startsWith("\"")) {
        code = deleteRegexInCode(code, /\"/);
        return "DQ " + parseCode(code);
    } else if(/^\d+/.test(code)) {
        code = deleteRegexInCode(code, /\d+/);
        return "INT " + parseCode(code);
    } else if(/^\w+/.test(code)) {
        code = deleteRegexInCode(code, /\w+/);
        return "ID " + parseCode(code);
    } else if(/^[\<\>\!]/.test(code)) {
        code = deleteRegexInCode(code, /[\<\>\!][=]?/);
        return "CMP " + parseCode(code);
    } else if(/^[\'\^\%\&\?\_\@\#\$\\\~]/.test(code)) {
        return "UE";
    } else if(code.startsWith("")) {
        return "";
    } else {
        return "UE";
    }
}

function syntaxAnalysis(parsedCode) {

    if(parsedCode.includes("UE")) {
        return "Uygun olmayan bir karakter kullanmamalısın.";
    }

    var codeLines = parsedCode.split(" ");

    if(codeLines.length == 1) {
        return "Verilen görevi yerine getirmek için kod yazmalısın.";
    }

    return validateCode(codeLines);
}

function validateCode(codeLines) {
    if(codeLines.length == 1) {
        return "correct";
    } else if(codeLines[0] == "RCB") {
        if(cb > 0) {
            cb--;
            return "correct";
        } else {
            return "Sanırım kod satırına yanlış bir şekilde başladın !";
        }
    } else if(codeLines[0] == "ID") {
        codeLines.splice(0, 1);
        if(codeLines.length == 1) {
            return "Değişken mi tanımlayacaksın yoksa fonksiyon mu yazacaksın ?";
        } else if(codeLines[0] == "EQ") {
            codeLines.splice(0, 1);
            return checkResult(validateVariableLeft(codeLines), codeLines);
        } else if(codeLines[0] == "LBT") {
            codeLines.splice(0, 1);
            if(codeLines[0] == "ID") {
                codeLines.splice(0, 1);
                return checkResult(validateParameter(codeLines), codeLines);
            } else if(codeLines[0] == "RBT") {
                codeLines.splice(0, 1);
                return checkResult(validateBlock(codeLines), codeLines);
            } else {
                return "Fonksiyon oluştururken parantez açtıktan sonra parantezi kapatmalısın.";
            }
        } else {
            return "Değişken tanımlamak için \'\=\'\, fonksiyon yazmak için \'\(\' kullanmalısın.";
        }
    } else if(codeLines[0] == "MAIN") {
        codeLines.splice(0, 1);
        return validateBlock(codeLines);
    } else if(codeLines[0] == "FOR") {
        codeLines.splice(0, 1);
        if(codeLines[0] == "LBT") {
            codeLines.splice(0, 1);
            if(codeLines.length == 1) {
                return "Tekrarla komutunun kaç kez çalışacağını belirtmelisin.";
            } else if(codeLines[0] == "INT") {
                codeLines.splice(0, 1);
                return validateLoop(codeLines);
            } else {
                return "Tekrarla komutunun kaç kez çalışacağını belirtmelisin.";
            }
        } else {
            return "Tekrarla komutuna ait koşulu yazmak için parantez kullanmalısın.";
        }
    } else if(codeLines[0] == "WHL") {
        codeLines.splice(0, 1);
        return validateIf(codeLines);
    } else if(codeLines[0] == "IF") {
        codeLines.splice(0, 1);
        ifCount++;
        return validateIf(codeLines);
    } else if(codeLines[0] == "ELIF") {
        if(ifCount > 0) {
            codeLines.splice(0, 1);
            return validateIf(codeLines);
        } else {
            return "Değilse eğer komutunu kullanabilmek için önce eğer komutunu kullanmalısın.";
        }
    } else if(codeLines[0] == "ELSE") {
        if(ifCount > 0) {
            codeLines.splice(0, 1);
            return validateBlock(codeLines);
        } else {
            return "Değilse komutunu kullanabilmek için önce eğer komutunu kullanmalısın.";
        }
    } else {
        return "Sanırım kod satırına yanlış bir şekilde başladın !";
    }
}

function validateVariableLeft(codeLines) {
    if(codeLines.length == 1) {
        return "Değişkene atanacak değeri yazmayı unutmuş olmalısın.";
    } else if(codeLines[0] == "LBT") {
        codeLines.splice(0, 1);
        bt++;
        return validateVariableLeft(codeLines);
    } else if(codeLines[0] == "DQ") {
        codeLines.splice(0, 1);
        if(codeLines[0] == "ID") {
            codeLines.splice(0, 1);
            if(codeLines[0] == "DQ") {
                codeLines.splice(0, 1);
                if(codeLines[0] == "END") {
                    codeLines.splice(0, 1);
                    return "correct";
                } else {
                    return "Metin tanımlama işlemini bitirmeyi unutmuş olmalısın.";
                }
            } else {
                return "Metin tanımladıktan sonra tırnak kullanmalısın.";
            }
        } else {
            return "Metin tanımlamak için tırnak içerisine bir metin yazmalısın.";
        }
    } else if(codeLines[0] == "INT") {
        codeLines.splice(0, 1);
        return validateVariableRight(codeLines);
    } else if(codeLines[0] == "ID") {
        codeLines.splice(0, 1);
        return validateVariableRight(codeLines);
    } else {
        return "Değişkene değer ataması sırasında yanlış birşey yazmış olmalısın.";
    }
}

function validateVariableRight(codeLines) {
    if(codeLines[0] == "RBT") {
        codeLines.splice(0, 1);
        bt--;
        return validateVariableRight(codeLines);
    } else if(codeLines[0] == "SUB") {
        codeLines.splice(0, 1);
        return validateVariableLeft(codeLines);
    } else if(codeLines[0] == "ADD") {
        codeLines.splice(0, 1);
        return validateVariableLeft(codeLines);
    } else if(codeLines[0] == "MUL") {
        codeLines.splice(0, 1);
        return validateVariableLeft(codeLines);
    } else if(codeLines[0] == "DIV") {
        codeLines.splice(0, 1);
        return validateVariableLeft(codeLines);
    } else if(codeLines[0] == "END") {
        codeLines.splice(0, 1);
        if(bt != 0) {
            return "Her sol paranteze karşılık bir sağ parantez kullanmasılısın.";
        } else {
            return "correct";
        }
    } else {
        return "Değişkene değer atama işlemini bitirmeyi unutmuş olmalısın.";
    }
}

function validateParameter(codeLines) {
    if(codeLines[0] == "RBT") {
        codeLines.splice(0, 1);
        return validateBlock(codeLines);
    } else if(codeLines[0] == "BR") {
        codeLines.splice(0, 1);
        if(codeLines[0] == "ID") {
            codeLines.splice(0, 1);
            return validateParameter(codeLines);
        } else {
            return "Fonksiyona parametre gönderirken virgülden sonra parametre girmelisin.";
        }
    } else {
        return "Fonksiyona parametre gönderdikten sonra parantezi kapatmalısın.";
    }
}


function validateBlock(codeLines) {
    if(codeLines[0] == "LCB") {
        codeLines.splice(0, 1);
        cb++;
        var codeResult = validateCode(codeLines);
        if(codeResult != "correct") {
            return codeResult;
        } else {
            if(codeLines[0] == "RCB") {
                codeLines.splice(0, 1);
                return validateCode(codeLines);
            } else {
                return "Kod bloğunu bitirmek için süslü parantez kullanmalısın.";
            }
        }
    } else {
        return "Kod bloğunu oluşturmak için süslü parantez kullanmalısın.";
    }
}

function validateLoop(codeLines) {
    if(codeLines[0] == "RBT") {
        codeLines.splice(0, 1);
        return validateBlock(codeLines);
    } else {
        return "Koşul ifadesini parantez kullanarak bitirmelisin.";
    }
}

function validateIf(codeLines) {
    if(codeLines[0] == "LBT") {
        codeLines.splice(0, 1);
        if(codeLines[0] == "ID" || codeLines[0] == "INT") {
            codeLines.splice(0, 1);
            if(codeLines[0] == "CMP") {
                codeLines.splice(0, 1);
                if(codeLines[0] == "ID" || codeLines[0] == "INT") {
                    codeLines.splice(0, 1);
                    return validateLoop(codeLines);
                } else {
                    return "Koşul ifadesi için ikinci karşılaştırma ifadesini girmelisin.";
                }
            } else {
                return "Koşul ifadesi için karşılaştırma operatörü yazmalısın.";
            }
        } else {
            return "Koşul ifadesi için birinci karşılaştırma ifadesini girmelisin.";
        }
    } else {
        return "Koşulu yazmak için parantez kullanmalısın.";
    }
}


function checkResult(resultVariable, codeLines) {
    if(resultVariable != "correct") {
        return resultVariable;
    } else {
        return validateCode(codeLines);
    }
}

function clearWhiteCharacters(code) {
    return deleteRegexInCode(code, /\s/g);
}

function deleteRegexInCode(code, regex) {
    return code.replace(regex, "");
}