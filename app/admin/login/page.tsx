import { signIn } from "@/app/admin/actions";

export default function LoginPage({
  searchParams,
}: {
  searchParams: { error?: string };
}) {
  return (
    <div className="login-wrap">
      <h1 className="admin-title" style={{ marginBottom: 28 }}>
        Sign in
      </h1>

      {searchParams.error && (
        <div className="error-banner">{searchParams.error}</div>
      )}

      <form action={signIn}>
        <div className="field">
          <label htmlFor="email">Email</label>
          <input id="email" name="email" type="email" required autoFocus />
        </div>
        <div className="field">
          <label htmlFor="password">Password</label>
          <input id="password" name="password" type="password" required />
        </div>
        <button type="submit" className="btn btn-primary">
          Sign in
        </button>
      </form>
    </div>
  );
}
