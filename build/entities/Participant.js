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
exports.Participant = void 0;
const core_1 = require("@mikro-orm/core");
let Participant = class Participant {
    constructor() {
        this.groups = new core_1.Collection(this);
    }
};
__decorate([
    (0, core_1.PrimaryKey)(),
    __metadata("design:type", Number)
], Participant.prototype, "id", void 0);
__decorate([
    (0, core_1.ManyToMany)({
        entity: "Group",
        pivotTable: "_ParticipantToGroup",
        joinColumn: "A",
        inverseJoinColumn: "B",
        inversedBy: "participants",
    }),
    __metadata("design:type", Object)
], Participant.prototype, "groups", void 0);
Participant = __decorate([
    (0, core_1.Entity)()
], Participant);
exports.Participant = Participant;
