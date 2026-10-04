type MemberRole = "leader" | "member";

interface StudyMember {
  memberId: number;
  name: string;
  role: MemberRole;
  githubId?: string;
}

const members: StudyMember[] = [
  { memberId: 1, name: "광수", role: "leader", githubId: "gwangsoo" },
  { memberId: 2, name: "지수", role: "member" },
];

function createRoleMessage(role: MemberRole) {
  if (role === "leader") {
    return "스터디를 이끌어요.";
  }

  return "스터디에 참여해요.";
}

function createMemberMessage(memberId: number) {
  const foundMember = members.find((member) => member.memberId === memberId);

  if (!foundMember) {
    return memberId + "번 회원을 찾지 못했어요.";
  }

  const displayGithubId = foundMember.githubId ?? "등록되지 않음";

  return (
    foundMember.name + " 님, " +
    createRoleMessage(foundMember.role) + " GitHub: " + displayGithubId
  );
}

console.log(createMemberMessage(1));
console.log(createMemberMessage(2));
console.log(createMemberMessage(999));