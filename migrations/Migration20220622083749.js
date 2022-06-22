'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220622083749 extends Migration {

  async up() {
    this.addSql('create table `squad` (`id` integer not null primary key autoincrement, `type` text not null, `formed_at` datetime not null, `disbanded_at` datetime not null);');

    this.addSql('create table `soldier` (`id` integer not null primary key autoincrement, `first_name` text not null, `last_name` text not null);');

    this.addSql('create table `soldier_squads` (`soldier_id` integer not null, `squad_id` integer not null, constraint `soldier_squads_soldier_id_foreign` foreign key(`soldier_id`) references `soldier`(`id`) on delete cascade on update cascade, constraint `soldier_squads_squad_id_foreign` foreign key(`squad_id`) references `squad`(`id`) on delete cascade on update cascade, primary key (`soldier_id`, `squad_id`));');
    this.addSql('create index `soldier_squads_soldier_id_index` on `soldier_squads` (`soldier_id`);');
    this.addSql('create index `soldier_squads_squad_id_index` on `soldier_squads` (`squad_id`);');

    this.addSql('drop table if exists `category`;');

    this.addSql('drop table if exists `company`;');

    this.addSql('drop table if exists `company_categories`;');

    this.addSql('drop table if exists `employee`;');
  }

}
exports.Migration20220622083749 = Migration20220622083749;
