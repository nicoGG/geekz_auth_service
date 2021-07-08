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
exports.ProductModel = exports.Product = void 0;
const typegoose_1 = require("@typegoose/typegoose");
const type_graphql_1 = require("type-graphql");
const categories_model_1 = require("./categories.model");
// import { Ref } from './types';
// enum SaleType { 'VENTA', 'PREVENTA', 'MUESTRA' }
let Product = class Product {
};
__decorate([
    type_graphql_1.Field(() => type_graphql_1.ID),
    __metadata("design:type", String)
], Product.prototype, "id", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({
        required: true
        // validate: {
        //     validator: (v) => {
        //         return v.length <= 30
        //     },
        //     message: 'El nombre excede los 30 carácteres'
        // }    
    }),
    __metadata("design:type", String)
], Product.prototype, "name", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "description", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", Boolean)
], Product.prototype, "active", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Product.prototype, "reserve_value", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Number)
], Product.prototype, "max_sale", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true }),
    __metadata("design:type", String)
], Product.prototype, "sale_type", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ required: true, maxlength: 6 }),
    __metadata("design:type", Number)
], Product.prototype, "price", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Product.prototype, "arrivedAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Product.prototype, "estimatedDate", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop({ default: Date.now }),
    __metadata("design:type", Date)
], Product.prototype, "createdAt", void 0);
__decorate([
    type_graphql_1.Field(),
    typegoose_1.prop(),
    __metadata("design:type", Date)
], Product.prototype, "udpdatedAt", void 0);
__decorate([
    type_graphql_1.Field(_type => String),
    typegoose_1.prop({ ref: categories_model_1.Categories }),
    __metadata("design:type", Object)
], Product.prototype, "category_id", void 0);
Product = __decorate([
    type_graphql_1.ObjectType({ description: 'The Product model' })
], Product);
exports.Product = Product;
exports.ProductModel = typegoose_1.getModelForClass(Product);
//# sourceMappingURL=product.model.js.map