import Link from "next/link";

export default function Home() {
  return (
    <main className="min-h-screen flex items-center justify-center p-6
                     bg-gradient-to-br from-cyan-500 via-sky-500 to-blue-600 text-white">
      <div className="text-center max-w-xl">
        <div className="text-6xl mb-4">🚿</div>
        <h1 className="text-4xl sm:text-5xl font-bold">AutoWash Pro</h1>
        <p className="mt-4 text-white/85 text-lg">
          Hệ thống rửa xe thông minh — đặt lịch trước &amp; tích điểm thành viên.
        </p>
        <div className="mt-8 flex gap-4 justify-center">
          <Link
            href="/login"
            className="rounded-lg bg-white text-cyan-600 font-semibold px-6 py-3 hover:bg-white/90 transition"
          >
            Đăng nhập
          </Link>
          <Link
            href="/register"
            className="rounded-lg border border-white/70 font-semibold px-6 py-3 hover:bg-white/10 transition"
          >
            Đăng ký
          </Link>
        </div>
      </div>
    </main>
  );
}
