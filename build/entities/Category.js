"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Category = void 0;
const core_1 = require("@mikro-orm/core");
const Company_1 = require("./Company");
let Category = class Category {
    constructor({ type }) {
        this.companies = new core_1.Collection(this);
        this.type = type;
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Category.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Category.prototype, "type", void 0);
__decorate([
    (0, core_1.ManyToMany)(() => Company_1.Company, (company) => company.categories),
    __metadata("design:type", Object)
], Category.prototype, "companies", void 0);
Category = __decorate([
    (0, core_1.Entity)(),
    __metadata("design:paramtypes", [Object])
], Category);
exports.Category = Category;
