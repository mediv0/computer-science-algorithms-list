const lcs = (str1, str2, memo = {}) => {
    const key = `${str1}|${str2}`;
    if (key in memo) return memo[key];
    if (str1.length === 0 || str2.length === 0) {
        return 0;
    }

    if (str1[0] === str2[0]) {
        memo[key] = 1 + lcs(str1.slice(1), str2.slice(1), memo);
        return memo[key];
    }

    memo[key] = Math.max(lcs(str1.slice(1), str2, memo), lcs(str1, str2.slice(1), memo));
    return memo[key];
};

console.log(lcs("acxxxxxvzvzgsgdhfhrib", "azbxusdsduiyxuiyxiuyxzcz"));
