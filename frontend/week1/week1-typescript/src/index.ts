// type StudyMember = {
//   memberId: string | number;
//   name: string;
//   level: number;
//   isLeader: boolean;
//   githubId?: string;
// };

interface StudyMember {
  memberId: string | number;
  name: string;
  level: number;
  isLeader: boolean;
  githubId?: string;
}

const members: StudyMember[] = [
  { memberId: "1", name: "광수", level: 1, isLeader: true, githubId: "gwangsoo" },
  { memberId: 2, name: "지수", level: 2, isLeader: false },
];


function getMemberInfo(memberId: string | number) {
  const member = members.find(
    (member) => String(member.memberId) === String(memberId)
  );

  if (!member) {
    return "존재하지 않는 회원입니다.";
    // console.log("존재하지 않는 회원입니다.");
  }

  else if (!member.githubId) {
    return member.name+ "존재하지 않는 회원입니다.";
    // console.log(member.name+ "존재하지 않는 회원입니다.");
  }

  else {
    return member.name+ "님의 GitHub 아이디는"+member.githubId+"입니다.";
    // console.log(member.name+ "님의 GitHub 아이디는"+member.githubId+"입니다.");
  }
}

console.log(getMemberInfo(1));
console.log(getMemberInfo(2));
console.log(getMemberInfo(999));

const studyHour: number | undefined = 0;
console.log(studyHour || 1); // 1
console.log(studyHour ?? 1); // 0

const studyHour2: number | undefined = undefined;

console.log(studyHour2 || 1); // 1
console.log(studyHour2 ?? 1); // 1

function formatMemberId(input: unknown): string {
  if (typeof input === "number") {
    // 숫자인 경우
    if (!Number.isFinite(input)) {
      return "유효하지 않은 숫자입니다.";
    }
    return `ID(숫자): ${input}`;
  } else if (typeof input === "string") {
    // 문자열인 경우
    const trimmed = input.trim();
    if (trimmed.length === 0) {
      return "빈 문자열은 유효하지 않은 ID입니다.";
    }
    return `ID(문자열): ${trimmed}`;
  } else {
    // 그 밖의 값 (boolean, null, undefined, object, symbol 등)
    return "지원하지 않는 타입의 ID입니다.";
  }
}

console.log(formatMemberId(1));          // ID(숫자): 1
console.log(formatMemberId("1"));        // ID(문자열): 1
console.log(formatMemberId("  2  "));    // ID(문자열): 2
console.log(formatMemberId(NaN));        // 유효하지 않은 숫자입니다.
console.log(formatMemberId(""));         // 빈 문자열은 유효하지 않은 ID입니다.
console.log(formatMemberId(null));       // 지원하지 않는 타입의 ID입니다.
console.log(formatMemberId(undefined));  // 지원하지 않는 타입의 ID입니다.
console.log(formatMemberId(true));       // 지원하지 않는 타입의 ID입니다.
console.log(formatMemberId({}));         // 지원하지 않는 타입의 ID입니다.