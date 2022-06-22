'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220622084524 extends Migration {

  async up() {
    this.addSql('PRAGMA foreign_keys = OFF;');
    this.addSql('CREATE TABLE `_knex_temp_alter078` (`id` integer PRIMARY KEY AUTOINCREMENT NOT NULL, `type` text NOT NULL, `formed_at` datetime NOT NULL, `disbanded_at` datetime);');
    this.addSql('INSERT INTO "_knex_temp_alter078" SELECT * FROM "squad";;');
    this.addSql('DROP TABLE "squad";');
    this.addSql('ALTER TABLE "_knex_temp_alter078" RENAME TO "squad";');
    this.addSql('PRAGMA foreign_keys = ON;');
  }

}
exports.Migration20220622084524 = Migration20220622084524;
