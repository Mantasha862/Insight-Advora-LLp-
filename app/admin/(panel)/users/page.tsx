import { EditUserForm, NewUserForm } from "@/components/admin/Forms";
import { PageHeader, table, td, th } from "@/components/admin/PageHeader";
import { requireUser } from "@/lib/auth";
import { prisma } from "@/lib/db";

export const metadata = { title: "Users" };

export default async function UsersPage() {
  await requireUser("admin");
  const users = await prisma.user.findMany({ orderBy: { createdAt: "asc" } });
  return (
    <>
      <PageHeader title="Users" sub="Admins manage everything; editors manage content only." />
      <table className={table}>
        <thead><tr>{["Email", "Name", "Last sign-in", "Access"].map((h) => <th key={h} className={th}>{h}</th>)}</tr></thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td className={td}>{u.email}</td>
              <td className={td}>{u.name ?? "—"}</td>
              <td className={td}>{u.lastLoginAt?.toLocaleString("en-GB") ?? "Never"}</td>
              <td className={td}><EditUserForm id={u.id} role={u.role} active={u.active} /></td>
            </tr>
          ))}
        </tbody>
      </table>
      <h2 className="mb-4 mt-10 text-[24px]">Add a user</h2>
      <NewUserForm />
    </>
  );
}
