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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ProductResolver = void 0;
const type_graphql_1 = require("type-graphql");
const product_model_1 = require("../models/product.model");
const product_input_1 = require("../types/product-input");
const categories_model_1 = require("../models/categories.model");
let ProductResolver = class ProductResolver {
    returnSingleProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.ProductModel.findById({ _id: id });
        });
    }
    returnAllProduct() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield product_model_1.ProductModel.find();
        });
    }
    createProduct({ name, description, active, reserve_value, max_sale, sale_type, price, arrivedAt, estimatedDate, createdAt, udpdatedAt, category_id }) {
        return __awaiter(this, void 0, void 0, function* () {
            const product = (yield product_model_1.ProductModel.create({
                name,
                description,
                active,
                reserve_value,
                max_sale,
                sale_type,
                price,
                arrivedAt,
                estimatedDate,
                createdAt,
                udpdatedAt,
                category_id
            })).save();
            return product;
        });
    }
    deleteProduct(id) {
        return __awaiter(this, void 0, void 0, function* () {
            yield product_model_1.ProductModel.deleteOne({ id });
            return true;
        });
    }
    ;
    category(product) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(product, 'product!');
            return (yield categories_model_1.CategoriesModel.findById(product._doc.category_id));
        });
    }
};
__decorate([
    type_graphql_1.Query(_returns => product_model_1.Product, { nullable: false }),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "returnSingleProduct", null);
__decorate([
    type_graphql_1.Query(() => [product_model_1.Product]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "returnAllProduct", null);
__decorate([
    type_graphql_1.Mutation(() => product_model_1.Product),
    __param(0, type_graphql_1.Arg('data')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_input_1.ProductInput]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "createProduct", null);
__decorate([
    type_graphql_1.Mutation(() => Boolean),
    __param(0, type_graphql_1.Arg('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "deleteProduct", null);
__decorate([
    type_graphql_1.FieldResolver(_type => (categories_model_1.Categories)),
    __param(0, type_graphql_1.Root()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [product_model_1.Product]),
    __metadata("design:returntype", Promise)
], ProductResolver.prototype, "category", null);
ProductResolver = __decorate([
    type_graphql_1.Resolver(_of => product_model_1.Product)
], ProductResolver);
exports.ProductResolver = ProductResolver;
//# sourceMappingURL=product.js.map