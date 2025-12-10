import postgres from "postgres";

const sql = postgres(process.env.POSTGRES_URL!, { ssl: "require" });

async function deleteAll() {
  await sql`TRUNCATE TABLE invoices, customers, users, revenue;`;
}

export async function GET() {
  try {
    await sql.begin((sql) => [deleteAll()]);
    return Response.json({ message: "Database delete successfully" });
  } catch (error) {
    return Response.json({ error }, { status: 500 });
  }
}
