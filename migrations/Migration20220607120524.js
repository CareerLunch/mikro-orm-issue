'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
const { Migration } = require('@mikro-orm/migrations');

class Migration20220607120524 extends Migration {

  async up() {
    this.addSql('create table `company` (`id` integer not null primary key autoincrement, `name` text not null);');

    this.addSql('create table `employee` (`id` integer not null primary key autoincrement, `first_name` text not null, `last_name` text not null, `company` integer null, constraint `employee_company_foreign` foreign key(`company`) references `company`(`id`) on delete set null on update cascade);');
    this.addSql('create index `employee_company_index` on `employee` (`company`);');

    this.addSql('create table `category` (`id` integer not null primary key autoincrement, `type` text not null);');

    this.addSql('create table `company_categories` (`company_id` integer not null, `category_id` integer not null, constraint `company_categories_company_id_foreign` foreign key(`company_id`) references `company`(`id`) on delete cascade on update cascade, constraint `company_categories_category_id_foreign` foreign key(`category_id`) references `category`(`id`) on delete cascade on update cascade, primary key (`company_id`, `category_id`));');
    this.addSql('create index `company_categories_company_id_index` on `company_categories` (`company_id`);');
    this.addSql('create index `company_categories_category_id_index` on `company_categories` (`category_id`);');
  }

}
exports.Migration20220607120524 = Migration20220607120524;
