type StudyMember = {
  memberId: string | number;
  name: string;
  level: number;
  isLeader: boolean;
  githubId?: string;
};


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