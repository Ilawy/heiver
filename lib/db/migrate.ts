import "dotenv/config";
import { db } from ".";
import { sql } from "drizzle-orm";
const triggers = [`
CREATE TRIGGER IF NOT EXISTS
    calc_average
    AFTER INSERT ON days
    FOR EACH ROW
    BEGIN
        UPDATE days
        SET average = (religion + life + health) / 3
        WHERE NEW.average = -1;
    END;`];

async function main() {
  triggers.forEach(async (t) => {
    await db.run(sql.raw(t));
  });
}

main();
