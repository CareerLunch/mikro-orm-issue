'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const Migration = require('@mikro-orm/migrations').Migration;

class Migration20220609133052 extends Migration {

  async up() {
    this.addSql('create table `company` (`id` integer not null primary key autoincrement, `name` varchar not null);');

    this.addSql('create table `employee` (`id` integer not null primary key autoincrement, `first_name` varchar not null, `last_name` varchar not null);');

    this.addSql('create table `category` (`id` integer not null primary key autoincrement, `type` varchar not null);');

    this.addSql('create table `company_categories` (`company_id` integer not null, `category_id` integer not null, primary key (`company_id`, `category_id`));');
    this.addSql('create index `company_categories_company_id_index` on `company_categories` (`company_id`);');
    this.addSql('create index `company_categories_category_id_index` on `company_categories` (`category_id`);');

    this.addSql('alter table `employee` add column `company` integer null;');
    this.addSql('create index `employee_company_index` on `employee` (`company`);');
  }

}
exports.Migration20220609133052 = Migration20220609133052;
