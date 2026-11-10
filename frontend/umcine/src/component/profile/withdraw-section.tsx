export default function WithdrawSection() {
  const handleWithdraw = () => {
    if (!confirm("정말 탈퇴하시겠어요? 이 작업은 되돌릴 수 없어요.")) return;
    // TODO: 회원 탈퇴 API 연동
  };

  return (
    <div className="mt-auto flex items-center justify-between gap-4 rounded-lg border border-red-300 bg-red-50 px-5 py-4">
      <div>
        <p className="text-xs font-bold text-red-600">회원 탈퇴</p>
        <p className="mt-1 text-[11px] text-red-500">
          탈퇴하면 작성한 평점, 후기와 즐겨찾기가 모두 삭제되며 복구할 수
          없습니다.
        </p>
      </div>
      <button
        type="button"
        onClick={handleWithdraw}
        className="h-8 px-4 shrink-0 rounded-lg border border-red-500 bg-white text-xs font-bold text-red-600 cursor-pointer"
      >
        회원 탈퇴
      </button>
    </div>
  );
}
