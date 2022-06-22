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
exports.Squad = void 0;
const core_1 = require("@mikro-orm/core");
let Squad = class Squad {
    constructor() {
        this.soldiers = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Squad.prototype, "id", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", String)
], Squad.prototype, "type", void 0);
__decorate([
    (0, core_1.Property)(),
    __metadata("design:type", Date)
], Squad.prototype, "formedAt", void 0);
__decorate([
    (0, core_1.Property)({ nullable: true }),
    __metadata("design:type", Date)
], Squad.prototype, "disbandedAt", void 0);
__decorate([
    (0, core_1.ManyToMany)({ entity: "Soldier", mappedBy: "squads" }),
    __metadata("design:type", Object)
], Squad.prototype, "soldiers", void 0);
Squad = __decorate([
    (0, core_1.Entity)()
], Squad);
exports.Squad = Squad;
