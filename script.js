  /**
 * Roman <---> Integer conversion with validation.
 * Range supported: 1-3999.
 */

const romanMap = new Map([
  ["M", 1000],
  ["D", 500],
  ["C", 100],
  ["L", 50],
  ["X", 10],
  ["V", 5],
  ["I", 1],
]);

const intToRomanPairs = [
  [1000, "M"],
  [900, "CM"],
  [500, "D"],
  [400, "CD"],
  [100, "C"],
  [90, "XC"],
  [50, "L"],
  [40, "XL"],
  [10, "X"],
  [9, "IX"],
  [5, "V"],
  [4, "IV"],
  [1, "I"],
];

// Canonical validation for 1-3999: thousands, hundreds, tens, ones
// Rejects non-canonical forms like "IIII", "VV", "IC", etc.
const romanCanonicalRegex =
  /^(?=.{1,15}$)M{0,3}(CM|CD|D?C{0,3})(XC|XL|L?X{0,3})(IX|IV|V?I{0,3})$/i;

function toInt(str) {
  const s = String(str ?? "").trim().toUpperCase();
  if (s.length === 0) throw new Error("Please enter a Roman numeral.");
  if (!romanCanonicalRegex.test(s)) {
    throw new Error("Invalid Roman numeral (must be canonical, range 1-3999).");
  }

  let total = 0;
  for (let i = 0; i < s.length; i++) {
    const curr = romanMap.get(s[i]);
    const next = romanMap.get(s[i + 1]);
    if (next && next > curr) total -= curr;
    else total += curr;
  }
  // Extra safety: ensure conversion is consistent (canonical roundtrip)
  const roundtrip = toRoman(total);
  if (roundtrip !== s) {
    throw new Error("Invalid Roman numeral (non-canonical form).");
  }
  return total;
}

function toRoman(num) {
  const n = Number(num);
  if (!Number.isInteger(n)) throw new Error("Please enter a whole number.");
  if (n < 1 || n > 3999) throw new Error("Out of range. Use an integer from 1 to 3999.");

  let value = n;
  let result = "";
  for (const [v, sym] of intToRomanPairs) {
    while (value >= v) {
      result += sym;
      value -= v;
    }
  }
  return result;
}

function setText(id, text) {
  document.getElementById(id).textContent = text;
}

function setError(id, text) {
  setText(id, text || "");
}

function clearOutputs() {
  setText("romanOutput", "-");
  setText("intOutput", "-");
  setError("intError", "");
  setError("romanError", "");
}

function onIntConvert() {
  setError("intError", "");
  try {
    const raw = document.getElementById("intInput").value;
    const roman = toRoman(raw.trim());
    setText("romanOutput", roman);
  } catch (e) {
    setText("romanOutput", "-");
    setError("intError", e?.message || String(e));
  }
}

function onRomanConvert() {
  setError("romanError", "");
  try {
    const raw = document.getElementById("romanInput").value;
    const n = toInt(raw);
    setText("intOutput", String(n));
  } catch (e) {
    setText("intOutput", "-");
    setError("romanError", e?.message || String(e));
  }
}

function bindUI() {
  const intInput = document.getElementById("intInput");
  const romanInput = document.getElementById("romanInput");

  document.getElementById("intToRomanBtn").addEventListener("click", onIntConvert);
  document.getElementById("romanToIntBtn").addEventListener("click", onRomanConvert);

  intInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") onIntConvert();
  });
  romanInput.addEventListener("keydown", (ev) => {
    if (ev.key === "Enter") onRomanConvert();
  });

  // Small UX: clear outputs when typing
  intInput.addEventListener("input", () => { setError("intError", ""); setText("romanOutput", "-"); });
  romanInput.addEventListener("input", () => { setError("romanError", ""); setText("intOutput", "-"); });

  // Expose functions for console usage/testing
  window.toRoman = toRoman;
  window.toInt = toInt;
  window.runSelfTests = runSelfTests;
}

function assert(cond, msg) {
  if (!cond) throw new Error(msg || "Assertion failed");
}

function runSelfTests() {
  const cases = [
    [1, "I"],
    [3, "III"],
    [4, "IV"],
    [9, "IX"],
    [58, "LVIII"],
    [1994, "MCMXCIV"],
    [3999, "MMMCMXCIX"],
    [944, "CMXLIV"],
    [2024, "MMXXIV"],
  ];

  for (const [n, r] of cases) {
    assert(toRoman(n) === r, `toRoman(${n}) expected ${r}`);
    assert(toInt(r) === n, `toInt(${r}) expected ${n}`);
  }

  const invalidRomans = ["", "IIII", "VV", "IC", "IL", "XM", "MCMXCIVI", "MMMM", "VX"];
  for (const s of invalidRomans) {
    let ok = false;
    try { toInt(s); ok = true; } catch (_) {}
    assert(!ok, `Expected invalid Roman numeral: ${JSON.stringify(s)}`);
  }

  const invalidInts = [0, -1, 4000, 3.14, "abc"];
  for (const x of invalidInts) {
    let ok = false;
    try { toRoman(x); ok = true; } catch (_) {}
    assert(!ok, `Expected invalid integer input: ${JSON.stringify(x)}`);
  }

  // Random roundtrip within range
  for (let i = 0; i < 200; i++) {
    const n = 1 + Math.floor(Math.random() * 3999);
    const r = toRoman(n);
    const back = toInt(r);
    assert(back === n, `Roundtrip failed for ${n} -> ${r} -> ${back}`);
  }

  console.log("✅ Self-tests passed.");
  return true;
}

document.addEventListener("DOMContentLoaded", () => {
  clearOutputs();
  bindUI();
});