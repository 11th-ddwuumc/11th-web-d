"use strict";
const members = [
    { id: 1, name: "광수", githubId: "gwangsoo", role: "leader" },
    { id: 2, name: "지수", role: "member" },
];
function printMemberById(id) {
    const member = members.find((m) => m.id === id);
    if (!member) {
        console.log(`ID ${id}에 해당하는 회원을 찾을 수 없어요.`);
        return;
    }
    console.log(`ID: ${member.id}, Name: ${member.name}, Role: ${member.role}`);
    console.log(`GitHub ID: ${member.githubId ?? "등록되지 않음"}`);
}
printMemberById(1);
printMemberById(2);
printMemberById(999);
const studyHour = 0;
console.log(studyHour || 1);
console.log(studyHour ?? 1);
function formatMemberId(input) {
    if (typeof input === "number") {
        return `숫자 ID: ${input}`;
    }
    else if (typeof input === "string") {
        return `문자열 ID: ${input}`;
    }
    else {
        return "처리할 수 없는 ID 형식이에요";
    }
}
console.log(formatMemberId(1));
console.log(formatMemberId("1"));
console.log(formatMemberId(true));
