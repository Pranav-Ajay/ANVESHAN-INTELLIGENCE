function TCA(caseData) {

    let fir = caseData.FIR.toLowerCase();
    let victim = caseData.VictimStatement.toLowerCase();

    let contradictions = [];
    let matches = [];

    if (!victim || victim.trim() === "") {
        caseData.TCA = {
            status: "Victim statement unavailable",
            contradictions: [],
            matches: []
        };
        return caseData;
    }

    // 🔍 Weapon mismatch
    if (fir.includes("knife") && victim.includes("gun")) {
        contradictions.push("Weapon mismatch: FIR mentions knife, victim mentions gun.");
    }

    if (fir.includes("gun") && victim.includes("knife")) {
        contradictions.push("Weapon mismatch: FIR mentions gun, victim mentions knife.");
    }

    // 🔍 Time mismatch
    if (fir.includes("night") && victim.includes("morning")) {
        contradictions.push("Time mismatch: FIR says night, victim says morning.");
    }

    if (fir.includes("morning") && victim.includes("night")) {
        contradictions.push("Time mismatch: FIR says morning, victim says night.");
    }

    // 🔍 Location mismatch example
    if (fir.includes("market") && victim.includes("park")) {
        contradictions.push("Location mismatch: FIR says market, victim says park.");
    }

    // 🔍 Simple keyword matches (basic intelligence layer)
    let firWords = fir.split(/\W+/);
    let victimWords = victim.split(/\W+/);

    firWords.forEach(word => {
        if (victimWords.includes(word) && word.length > 4) {
            matches.push(word);
        }
    });

    caseData.TCA = {
        status: contradictions.length === 0 ? "Statements Consistent" : "Contradictions Found",
        contradictions: contradictions,
        matches: [...new Set(matches)]
    };

    return caseData;
}
